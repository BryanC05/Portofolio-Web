import { useState, useEffect } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Panel } from "@/components/Panel";
import { StarBackground } from "@/components/StarBackground";
import { 
  Save, ArrowLeft, Plus, Trash2, Key, Download, Upload, Image, 
  FileText, Shield, User, Award, FolderOpen, Mail, Sparkles 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const compressImageFromBase64 = (base64Str, maxWidth = 1200, maxHeight = 1200, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    if (!base64Str || !base64Str.startsWith("data:image/")) {
      resolve(base64Str);
      return;
    }
    const img = new window.Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get 2D context"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      const compressed = canvas.toDataURL("image/jpeg", quality);
      resolve(compressed);
    };
    img.onerror = (err) => reject(err);
  });
};

export const Admin = () => {
  const { data, loading, saveData } = usePortfolioData();
  const { toast } = useToast();
  
  const [passcode, setPasscode] = useState(() => sessionStorage.getItem("sees_admin_passcode") || "");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [editedData, setEditedData] = useState(null);
  const [saving, setSaving] = useState(false);

  // Sync loaded data to local editable state
  useEffect(() => {
    if (data) {
      setEditedData(JSON.parse(JSON.stringify(data)));
    }
  }, [data]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!passcode) {
      toast({ title: "Access Denied", description: "Please enter a passcode", variant: "destructive" });
      return;
    }
    
    // Cache the passcode for the session
    sessionStorage.setItem("sees_admin_passcode", passcode);
    setIsUnlocked(true);
    toast({ title: "SEES Auth Success", description: "System Access Unlocked // Welcome Bryan" });
  };

  const handleOptimizeAll = async () => {
    if (!editedData || !editedData.projects) return;

    toast({ 
      title: "Optimization Initiated", 
      description: "Compressing and optimizing all existing base64 images in your portfolio config. Please wait..." 
    });

    const originalSize = JSON.stringify(editedData).length;
    let optimizedCount = 0;
    
    try {
      const newProjects = await Promise.all(editedData.projects.map(async (project) => {
        const copyProj = { ...project };
        
        // Optimize cover image if base64
        if (copyProj.image && copyProj.image.startsWith("data:image/")) {
          copyProj.image = await compressImageFromBase64(copyProj.image);
          optimizedCount++;
        }
        
        // Optimize gallery images
        if (copyProj.images && copyProj.images.length > 0) {
          copyProj.images = await Promise.all(copyProj.images.map(async (img) => {
            if (img && img.startsWith("data:image/")) {
              optimizedCount++;
              return await compressImageFromBase64(img);
            }
            return img;
          }));
        }
        
        return copyProj;
      }));

      const newConfig = {
        ...editedData,
        projects: newProjects
      };

      const optimizedSize = JSON.stringify(newConfig).length;
      
      setEditedData(newConfig);

      const savedKB = ((originalSize - optimizedSize) / 1024).toFixed(0);
      const currentKB = (optimizedSize / 1024).toFixed(0);
      
      toast({
        title: "Optimization Complete",
        description: `Successfully optimized ${optimizedCount} images. Reduced configuration size by ${savedKB}KB. New size: ${currentKB}KB. Click 'Commit Overwrite' to save changes!`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Optimization Failed",
        description: "An error occurred while optimizing images: " + err.message,
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    if (!passcode) {
      toast({ title: "Authorization Error", description: "Passcode is missing.", variant: "destructive" });
      return;
    }

    // Check total payload size (Vercel Serverless limit is 4.5MB, Upstash Free is 1MB)
    const payloadSize = JSON.stringify(editedData).length;
    if (payloadSize > 950 * 1024) { 
      const isCritical = payloadSize > 4 * 1024 * 1024;
      toast({ 
        title: isCritical ? "Payload Too Large" : "Large Configuration Detected", 
        description: `Config size: ${(payloadSize / 1024).toFixed(0)}KB. ${isCritical ? "This exceeds Vercel limits (4.5MB)." : "This may exceed Vercel KV free tier limits (1MB)."} Click the 'Optimize Images' button at the top to compress your base64 images, or use external image URLs.`, 
        variant: isCritical ? "destructive" : "default"
      });
      if (isCritical) return;
    }

    setSaving(true);
    const result = await saveData(editedData, passcode);
    setSaving(false);

    if (result.success) {
      toast({ title: "System Overwrite Complete", description: result.message });
    } else {
      toast({ title: "Sync failed", description: result.error, variant: "destructive" });
    }
  };

  // Profile fields helper
  const updateProfileField = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  // Skill sets helper
  const updateSkillLevel = (category, index, value) => {
    const levelVal = parseInt(value, 10) || 0;
    setEditedData(prev => {
      const copy = { ...prev };
      copy.skillSets[category][index].level = Math.min(100, Math.max(0, levelVal));
      
      // If updating 'all', sync category list if applicable
      if (category === "all") {
        const skillName = copy.skillSets.all[index].name;
        for (const cat of ["frontend", "backend", "tools"]) {
          const list = copy.skillSets[cat] || [];
          const matchedIndex = list.findIndex(s => s.name === skillName);
          if (matchedIndex !== -1) {
            list[matchedIndex].level = copy.skillSets.all[index].level;
          }
        }
      }
      return copy;
    });
  };

  const updateSkillText = (category, index, field, value) => {
    setEditedData(prev => {
      const copy = { ...prev };
      copy.skillSets[category][index][field] = value;
      return copy;
    });
  };

  const addSkill = (category) => {
    const newSkill = {
      name: "NEW SKILL",
      category: category === "all" ? "frontend" : category,
      level: 80,
      note: "Description here"
    };

    setEditedData(prev => {
      const copy = { ...prev };
      copy.skillSets[category] = [...copy.skillSets[category], newSkill];
      if (category !== "all") {
        copy.skillSets.all = [...copy.skillSets.all, newSkill];
      }
      return copy;
    });
  };

  const deleteSkill = (category, index) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const targetName = copy.skillSets[category][index].name;
      
      copy.skillSets[category] = copy.skillSets[category].filter((_, i) => i !== index);
      
      // If deleting from sub-category, also delete from 'all'
      if (category !== "all") {
        copy.skillSets.all = copy.skillSets.all.filter(s => s.name !== targetName);
      } else {
        // If deleting from 'all', delete from respective sub-category
        for (const cat of ["frontend", "backend", "tools"]) {
          copy.skillSets[cat] = (copy.skillSets[cat] || []).filter(s => s.name !== targetName);
        }
      }
      return copy;
    });
  };

  // Projects helpers
  const updateProjectField = (projId, field, value) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const idx = copy.projects.findIndex(p => p.id === projId);
      if (idx !== -1) {
        copy.projects[idx][field] = value;
      }
      return copy;
    });
  };

  // Base64 file uploader reader with client-side compression
  const handleImageUpload = async (projId, file) => {
    if (!file) return;
    
    toast({ title: "Processing Image", description: "Optimizing and compressing image..." });

    try {
      const compressedBase64 = await compressImage(file, 1200, 1200, 0.75);
      updateProjectField(projId, "image", compressedBase64);
      
      const originalKB = (file.size / 1024).toFixed(0);
      const compressedKB = (compressedBase64.length * 0.75 / 1024).toFixed(0);
      
      toast({ 
        title: "Image Loaded", 
        description: `Compressed successfully from ${originalKB}KB to ${compressedKB}KB!` 
      });
    } catch (err) {
      console.error(err);
      toast({ 
        title: "Compression Failed", 
        description: "Could not optimize image. Falling back to original resolution.", 
        variant: "destructive" 
      });
      
      if (file.size > 0.8 * 1024 * 1024) {
        toast({ 
          title: "File Too Large", 
          description: "Images must be smaller than 800KB.", 
          variant: "destructive" 
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          updateProjectField(projId, "image", e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectGalleryUpload = async (projId, file) => {
    if (!file) return;
    
    toast({ title: "Processing Image", description: "Optimizing and compressing image..." });

    try {
      const compressedBase64 = await compressImage(file, 1200, 1200, 0.75);
      
      setEditedData(prev => {
        const copy = { ...prev };
        const pIdx = copy.projects.findIndex(p => p.id === projId);
        if (pIdx !== -1) {
          const p = copy.projects[pIdx];
          if (!p.images) {
            p.images = p.image ? [p.image] : [];
          }
          p.images.push(compressedBase64);
          if (p.images.length === 1) {
            p.image = p.images[0];
          }
        }
        return copy;
      });

      const originalKB = (file.size / 1024).toFixed(0);
      const compressedKB = (compressedBase64.length * 0.75 / 1024).toFixed(0);
      
      toast({ 
        title: "Image Uploaded", 
        description: `Added to project gallery. Compressed from ${originalKB}KB to ${compressedKB}KB!` 
      });
    } catch (err) {
      console.error(err);
      toast({ 
        title: "Compression Failed", 
        description: "Could not optimize image. Falling back to original resolution.", 
        variant: "destructive" 
      });
      
      if (file.size > 0.8 * 1024 * 1024) {
        toast({ 
          title: "File Too Large", 
          description: "Images must be smaller than 800KB.", 
          variant: "destructive" 
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setEditedData(prev => {
            const copy = { ...prev };
            const pIdx = copy.projects.findIndex(p => p.id === projId);
            if (pIdx !== -1) {
              const p = copy.projects[pIdx];
              if (!p.images) {
                p.images = p.image ? [p.image] : [];
              }
              p.images.push(e.target.result);
              if (p.images.length === 1) {
                p.image = p.images[0];
              }
            }
            return copy;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProjectGalleryImage = (projId, imgIdx, value) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const pIdx = copy.projects.findIndex(p => p.id === projId);
      if (pIdx !== -1) {
        const p = copy.projects[pIdx];
        if (!p.images) {
          p.images = p.image ? [p.image] : [];
        }
        p.images[imgIdx] = value;
        if (imgIdx === 0) {
          p.image = value;
        }
      }
      return copy;
    });
  };

  const addProjectGalleryImage = (projId) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const pIdx = copy.projects.findIndex(p => p.id === projId);
      if (pIdx !== -1) {
        const p = copy.projects[pIdx];
        if (!p.images) {
          p.images = p.image ? [p.image] : [];
        }
        p.images.push("/projects/project2.png");
        if (p.images.length === 1) {
          p.image = p.images[0];
        }
      }
      return copy;
    });
  };

  const deleteProjectGalleryImage = (projId, imgIdx) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const pIdx = copy.projects.findIndex(p => p.id === projId);
      if (pIdx !== -1) {
        const p = copy.projects[pIdx];
        if (!p.images) {
          p.images = p.image ? [p.image] : [];
        }
        p.images = p.images.filter((_, idx) => idx !== imgIdx);
        p.image = p.images.length > 0 ? p.images[0] : "";
      }
      return copy;
    });
  };

  const addProject = () => {
    const newProj = {
      id: Date.now(),
      title: "NEW PROJECT",
      description: "Project description goes here.",
      image: "/projects/project2.png",
      tags: ["React"],
      demoUrl: "https://",
      githubUrl: "https://github.com/",
      status: "New release",
      details: {
        stack: [
          { category: "Frontend", items: ["Vite", "React"] },
          { category: "Backend", items: ["Node.js"] }
        ],
        setup: ["npm run dev"]
      }
    };

    setEditedData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const deleteProject = (projId) => {
    setEditedData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projId)
    }));
  };

  // Project stack/detail helpers
  const updateProjectStackItem = (projId, groupIndex, itemIndex, value) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const pIdx = copy.projects.findIndex(p => p.id === projId);
      if (pIdx !== -1 && copy.projects[pIdx].details) {
        copy.projects[pIdx].details.stack[groupIndex].items[itemIndex] = value;
      }
      return copy;
    });
  };

  const addProjectStackItem = (projId, groupIndex) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const pIdx = copy.projects.findIndex(p => p.id === projId);
      if (pIdx !== -1 && copy.projects[pIdx].details) {
        copy.projects[pIdx].details.stack[groupIndex].items.push("New Stack Item");
      }
      return copy;
    });
  };

  const deleteProjectStackItem = (projId, groupIndex, itemIndex) => {
    setEditedData(prev => {
      const copy = { ...prev };
      const pIdx = copy.projects.findIndex(p => p.id === projId);
      if (pIdx !== -1 && copy.projects[pIdx].details) {
        copy.projects[pIdx].details.stack[groupIndex].items = 
          copy.projects[pIdx].details.stack[groupIndex].items.filter((_, i) => i !== itemIndex);
      }
      return copy;
    });
  };

  // JSON Import/Export
  const exportData = () => {
    const blob = new Blob([JSON.stringify(editedData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolioData.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Config Exported", description: "Downloaded portfolioData.json successfully." });
  };

  const importData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.profile && parsed.projects && parsed.skillSets) {
          setEditedData(parsed);
          toast({ title: "Config Imported", description: "Successfully loaded new configuration state." });
        } else {
          throw new Error("Invalid structure");
        }
      } catch (err) {
        toast({ title: "Import Failed", description: "Selected file is not a valid portfolio config JSON.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
  };

  if (loading || !editedData) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#070e17] text-foreground">
        <StarBackground />
        <span className="text-sm font-bold tracking-[0.25em] text-primary animate-pulse">INITIATING SEES ACCESS...</span>
      </div>
    );
  }

  // PASSCODE LOCK SCREEN
  if (!isUnlocked && !sessionStorage.getItem("sees_admin_passcode")) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4 bg-[#070e17] text-foreground">
        <StarBackground />
        <motion.div 
          initial={{ opacity: 0, y: 20, skewX: -4 }}
          animate={{ opacity: 1, y: 0, skewX: 0 }}
          className="w-full max-w-md"
        >
          <Panel className="p-6 md:p-8" variant="diagonal">
            <form onSubmit={handleUnlock} className="space-y-6 text-left">
              <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
                <Shield size={24} className="text-primary text-glow animate-pulse" />
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wider text-foreground">SYSTEM ACCESS</h2>
                  <p className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase">SEES CONTROL INTERCEPT</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  ENTER ACCESS CODE
                </label>
                <div className="relative flex items-center">
                  <Key size={14} className="absolute left-4 text-primary" />
                  <input
                    type="password"
                    placeholder="PASSCODE (DEFAULT: admin123)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] pl-10 pr-4 py-3.5 text-xs uppercase tracking-widest text-foreground placeholder:text-muted-foreground/35 transition-all duration-300 focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                  />
                </div>
              </div>

              <button type="submit" className="action-button w-full">
                INITIATE SYNC
              </button>
            </form>
          </Panel>
        </motion.div>
      </div>
    );
  }

  // ACTIVE EDITOR INTERFACE
  return (
    <div className="relative min-h-screen bg-[#070e17] text-foreground pb-20 pt-10 px-4">
      <StarBackground />
      
      <div className="container max-w-6xl relative z-10 space-y-8">
        {/* Header toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-primary/25 pb-6">
          <div className="flex items-center gap-4 text-left">
            <a 
              href="/"
              className="flex h-10 w-10 items-center justify-center border border-primary/30 bg-primary/5 text-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
            </a>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-glow text-primary flex items-center gap-2">
                <span>SYSTEM CONTROL PANEL</span>
                <span className="text-[10px] font-bold border border-accent/40 bg-accent/10 px-2 py-0.5 text-accent tracking-widest uppercase">
                  SEES
                </span>
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                Bryan Chan Portfolio Data Editor
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleOptimizeAll} 
              className="border border-amber-500/30 text-amber-400 bg-amber-500/5 hover:bg-amber-500 hover:text-black transition-colors py-2.5 px-4 text-xs font-bold uppercase tracking-widest flex items-center cursor-pointer"
            >
              <Sparkles size={14} className="mr-1 animate-pulse" /> Optimize Images
            </button>

            <button onClick={exportData} className="action-button-secondary py-2.5 px-4">
              <Download size={14} className="mr-1" /> Export config
            </button>
            
            <button onClick={handleSave} disabled={saving} className="action-button py-2.5 px-5">
              <Save size={14} className="mr-1 text-glow" /> {saving ? "Syncing..." : "Commit Overwrite"}
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-1 border-b border-primary/10 pb-4">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "skills", label: "Skills", icon: Award },
            { id: "projects", label: "Projects", icon: FolderOpen },
            { id: "system", label: "Access & System", icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 border-l-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  isActive ? "text-primary text-glow font-black border-l-primary bg-primary/5" : "text-muted-foreground border-l-primary/10 hover:text-primary hover:border-l-primary"
                }`}
              >
                <Icon size={14} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeAdminTab"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary"
                    style={{ boxShadow: "0 0 10px rgba(0, 229, 255, 0.8)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab contents */}
        <div className="text-left">
          {/* TAB 1: PROFILE EDITOR */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Panel className="p-6 md:p-8" variant="default">
                <div className="space-y-6">
                  <h3 className="text-base font-bold uppercase tracking-[0.2em] text-accent border-b border-primary/25 pb-2">
                    BIOGRAPHICAL DETAILS // INITIAL DATA
                  </h3>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Name</span>
                      <input
                        type="text"
                        value={editedData.profile.name}
                        onChange={(e) => updateProfileField("name", e.target.value)}
                        className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                      />
                    </label>

                    <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Location</span>
                      <input
                        type="text"
                        value={editedData.profile.location}
                        onChange={(e) => updateProfileField("location", e.target.value)}
                        className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                      />
                    </label>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span>SEES Badge Label</span>
                      <input
                        type="text"
                        value={editedData.profile.seesBadge}
                        onChange={(e) => updateProfileField("seesBadge", e.target.value)}
                        className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                      />
                    </label>

                    <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Status Label</span>
                      <input
                        type="text"
                        value={editedData.profile.status}
                        onChange={(e) => updateProfileField("status", e.target.value)}
                        className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                      />
                    </label>
                  </div>

                  <label className="block space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Main Headline</span>
                    <input
                      type="text"
                      value={editedData.profile.headline}
                      onChange={(e) => updateProfileField("headline", e.target.value)}
                      className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                    />
                  </label>

                  <label className="block space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Brief Biography / Subtitle</span>
                    <textarea
                      rows={3}
                      value={editedData.profile.description}
                      onChange={(e) => updateProfileField("description", e.target.value)}
                      className="w-full resize-none border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                    />
                  </label>

                  <label className="block space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Work Philosophy Statement</span>
                    <textarea
                      rows={3}
                      value={editedData.philosophy}
                      onChange={(e) => setEditedData(prev => ({ ...prev, philosophy: e.target.value }))}
                      className="w-full resize-none border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                    />
                  </label>
                </div>
              </Panel>
            </motion.div>
          )}

          {/* TAB 2: SKILLS EDITOR */}
          {activeTab === "skills" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Panel className="p-6 md:p-8" variant="default">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-primary/25 pb-2">
                    <h3 className="text-base font-bold uppercase tracking-[0.2em] text-accent">
                      SKILL SETS // CATEGORY MANAGEMENT
                    </h3>
                    <button 
                      onClick={() => addSkill("all")}
                      className="action-button-secondary py-1.5 px-3 text-[10px]"
                    >
                      <Plus size={12} className="mr-1" /> Add skill
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {editedData.skillSets.all.map((skill, index) => (
                      <div 
                        key={`${skill.name}-${index}`} 
                        className="flex flex-col gap-4 md:flex-row md:items-center border border-primary/10 bg-primary/5 p-4 rounded-lg relative group"
                      >
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 flex-1">
                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground">
                            <span>NAME</span>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkillText("all", index, "name", e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-[11px] text-foreground focus:border-primary"
                            />
                          </label>

                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground">
                            <span>CATEGORY</span>
                            <select
                              value={skill.category}
                              onChange={(e) => updateSkillText("all", index, "category", e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-[11px] text-foreground focus:border-primary"
                            >
                              <option value="frontend">Frontend</option>
                              <option value="backend">Backend</option>
                              <option value="tools">Tools</option>
                            </select>
                          </label>

                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground">
                            <span>LEVEL (%)</span>
                            <input
                              type="number"
                              value={skill.level}
                              onChange={(e) => updateSkillLevel("all", index, e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-[11px] text-foreground focus:border-primary"
                            />
                          </label>

                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground col-span-2 md:col-span-1">
                            <span>NOTE</span>
                            <input
                              type="text"
                              value={skill.note}
                              onChange={(e) => updateSkillText("all", index, "note", e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-[11px] text-foreground focus:border-primary"
                            />
                          </label>
                        </div>

                        <button 
                          onClick={() => deleteSkill("all", index)}
                          className="h-9 w-9 flex items-center justify-center border border-red-500/35 text-red-400 bg-red-500/5 hover:bg-red-500 hover:text-white transition-colors shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </motion.div>
          )}

          {/* TAB 3: PROJECTS EDITOR */}
          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Panel className="p-6 md:p-8" variant="default">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-primary/25 pb-2">
                    <h3 className="text-base font-bold uppercase tracking-[0.2em] text-accent">
                      PROJECT PORTFOLIO // RELEASE CONTROL
                    </h3>
                    <button 
                      onClick={addProject}
                      className="action-button-secondary py-1.5 px-3 text-[10px]"
                    >
                      <Plus size={12} className="mr-1" /> Add project
                    </button>
                  </div>

                  <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
                    {editedData.projects.map((project, index) => (
                      <div 
                        key={project.id}
                        className="border border-primary/20 bg-primary/[0.02] p-5 rounded-xl space-y-4 relative"
                      >
                        {/* Title and delete */}
                        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                          <h4 className="text-sm font-black uppercase text-glow text-primary">
                            PROJECT #{index + 1} // {project.title || "UNTITLED"}
                          </h4>
                          <button 
                            onClick={() => deleteProject(project.id)}
                            className="flex h-8 items-center justify-center gap-1.5 px-3 border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500 hover:text-white transition-colors text-[10px] uppercase font-bold"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>

                        {/* Basic inputs */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground">
                            <span>TITLE</span>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProjectField(project.id, "title", e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-xs text-foreground focus:border-primary"
                            />
                          </label>

                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground">
                            <span>STATUS INDICATOR (e.g. Featured project)</span>
                            <input
                              type="text"
                              value={project.status}
                              onChange={(e) => updateProjectField(project.id, "status", e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-xs text-foreground focus:border-primary"
                            />
                          </label>
                        </div>

                        {/* Image Gallery Editor */}
                        <div className="border border-primary/10 bg-background/50 p-4 rounded-lg space-y-4">
                          <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              PROJECT IMAGES GALLERY (FIRST IMAGE IS USED AS COVER)
                            </p>
                            <div className="flex gap-2">
                              {/* Upload local image to gallery */}
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="image/*"
                                  id={`gallery-upload-${project.id}`}
                                  onChange={(e) => handleProjectGalleryUpload(project.id, e.target.files?.[0])}
                                  className="hidden"
                                />
                                <label 
                                  htmlFor={`gallery-upload-${project.id}`}
                                  className="action-button-secondary py-1.5 px-3 text-[10px] cursor-pointer inline-flex items-center"
                                >
                                  <Upload size={12} className="mr-1" /> Upload Image
                                </label>
                              </div>
                              <button 
                                type="button"
                                onClick={() => addProjectGalleryImage(project.id)}
                                className="action-button-secondary py-1.5 px-3 text-[10px] inline-flex items-center"
                              >
                                <Plus size={12} className="mr-1" /> Add URL
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-3">
                            {((project.images && project.images.length > 0) ? project.images : [project.image || ""]).map((img, imgIdx) => (
                              <div key={imgIdx} className="grid gap-3 sm:grid-cols-[80px_1fr_40px] items-center border border-primary/10 bg-primary/5 p-2 rounded">
                                <div className="h-12 border border-primary/15 bg-secondary/80 overflow-hidden relative"
                                     >
                                  {img ? (
                                    <img src={img} alt={`Gallery ${imgIdx}`} className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="h-full flex items-center justify-center text-primary/30"><Image size={16} /></div>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  value={img}
                                  placeholder="Image URL or Base64 data"
                                  onChange={(e) => updateProjectGalleryImage(project.id, imgIdx, e.target.value)}
                                  className="w-full border border-primary/15 bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary"
                                />
                                <button 
                                  type="button"
                                  onClick={() => deleteProjectGalleryImage(project.id, imgIdx)}
                                  className="h-8 w-8 flex items-center justify-center border border-red-500/25 text-red-400 hover:bg-red-500 hover:text-white transition-colors shrink-0"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* URLs */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground">
                            <span>DEMO LINK</span>
                            <input
                              type="text"
                              value={project.demoUrl}
                              onChange={(e) => updateProjectField(project.id, "demoUrl", e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-xs text-foreground focus:border-primary"
                            />
                          </label>

                          <label className="space-y-1 text-[10px] font-bold text-muted-foreground">
                            <span>SOURCE REPO LINK</span>
                            <input
                              type="text"
                              value={project.githubUrl}
                              onChange={(e) => updateProjectField(project.id, "githubUrl", e.target.value)}
                              className="w-full border border-primary/20 bg-background px-3 py-2 text-xs text-foreground focus:border-primary"
                            />
                          </label>
                        </div>

                        <label className="block space-y-1 text-[10px] font-bold text-muted-foreground">
                          <span>DESCRIPTION</span>
                          <textarea
                            rows={3}
                            value={project.description}
                            onChange={(e) => updateProjectField(project.id, "description", e.target.value)}
                            className="w-full resize-none border border-primary/20 bg-background px-3 py-2 text-xs text-foreground focus:border-primary"
                          />
                        </label>

                        {/* Tags */}
                        <label className="block space-y-1 text-[10px] font-bold text-muted-foreground">
                          <span>TAGS (COMMA SEPARATED)</span>
                          <input
                            type="text"
                            value={project.tags.join(", ")}
                            onChange={(e) => updateProjectField(project.id, "tags", e.target.value.split(",").map(t => t.trim()))}
                            className="w-full border border-primary/20 bg-background px-3 py-2 text-xs text-foreground focus:border-primary"
                          />
                        </label>

                        {/* Technical Spec List */}
                        {project.details && (
                          <div className="border border-primary/10 bg-background/30 p-4 rounded-lg space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-accent border-b border-primary/10 pb-1">
                              TECHNICAL SPECIFICATIONS // DETAILED
                            </p>
                            
                            <div className="grid gap-4 sm:grid-cols-2">
                              {project.details.stack.map((group, groupIdx) => (
                                <div key={group.category} className="space-y-2 border border-primary/10 bg-primary/5 p-3 rounded">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-primary">{group.category}</span>
                                    <button 
                                      type="button"
                                      onClick={() => addProjectStackItem(project.id, groupIdx)}
                                      className="text-[9px] font-bold border border-primary/20 bg-background px-2 py-0.5 text-accent hover:bg-primary/10"
                                    >
                                      + Add item
                                    </button>
                                  </div>
                                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                                    {group.items.map((item, itemIdx) => (
                                      <div key={itemIdx} className="flex gap-1.5">
                                        <input
                                          type="text"
                                          value={item}
                                          onChange={(e) => updateProjectStackItem(project.id, groupIdx, itemIdx, e.target.value)}
                                          className="w-full border border-primary/15 bg-background px-2 py-1 text-[10px] text-foreground"
                                        />
                                        <button 
                                          type="button"
                                          onClick={() => deleteProjectStackItem(project.id, groupIdx, itemIdx)}
                                          className="text-red-400 hover:text-red-500 shrink-0 px-1 border border-primary/10 bg-background"
                                        >
                                          <Trash2 size={10} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </motion.div>
          )}

          {/* TAB 4: ACCESS & SYSTEM SETTINGS */}
          {activeTab === "system" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Panel className="p-6 md:p-8" variant="default">
                <div className="space-y-6">
                  <h3 className="text-base font-bold uppercase tracking-[0.2em] text-accent border-b border-primary/25 pb-2">
                    SYSTEM SYNC & CONFIG CONTROL
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Passcode Reset */}
                    <div className="border border-primary/15 border-l-2 border-l-primary bg-primary/5 p-5 space-y-4">
                      <h4 className="text-xs font-bold uppercase text-glow text-primary flex items-center gap-1.5">
                        <Key size={12} /> SECURE GATE ACCESS
                      </h4>
                      <p className="text-xs text-muted-foreground/90 leading-5">
                        Change the passcode cache used to sync commits to the database API. This is saved only in your current browser session.
                      </p>
                      <label className="block space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">ADMIN PASSCODE</span>
                        <input
                          type="password"
                          value={passcode}
                          onChange={(e) => {
                            setPasscode(e.target.value);
                            sessionStorage.setItem("sees_admin_passcode", e.target.value);
                          }}
                          className="w-full border border-primary/20 bg-background px-3 py-2 text-xs uppercase tracking-widest text-foreground focus:border-primary"
                        />
                      </label>
                    </div>

                    {/* Config files upload */}
                    <div className="border border-primary/15 border-l-2 border-l-accent bg-primary/5 p-5 space-y-4">
                      <h4 className="text-xs font-bold uppercase text-glow text-accent flex items-center gap-1.5">
                        <FileText size={12} /> RESTORE FROM CONFIG
                      </h4>
                      <p className="text-xs text-muted-foreground/90 leading-5">
                        Import an external configuration JSON file. This will update the editor state. Click "Commit Overwrite" at the top to save it permanently.
                      </p>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".json"
                          id="config-file-upload"
                          onChange={(e) => importData(e.target.files?.[0])}
                          className="hidden"
                        />
                        <label 
                          htmlFor="config-file-upload"
                          className="action-button-secondary py-2.5 px-4 text-xs cursor-pointer inline-flex items-center"
                          style={{ padding: "0.6rem 0.9rem" }}
                        >
                          <Upload size={14} className="mr-1" /> Upload portfolioData.json
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
