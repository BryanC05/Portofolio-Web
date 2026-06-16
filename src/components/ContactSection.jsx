import { Linkedin, Mail, MapPin, MessageCircle, Phone, Send, Github } from "lucide-react";
import { useState } from "react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";
import { useToast } from "@/hooks/use-toast";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const iconMap = {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  Github,
  MessageCircle,
};

export const ContactSection = () => {
  const { data, loading } = usePortfolioData();
  const { toast } = useToast();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading || !data) return null;

  const { contactMethods, socialLinks } = data;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xkoeqkgp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        setFormState({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error sending your message. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="If you’re planning your next"
      accent="web project"
      description="I’m open to collaborating on web applications, landing pages, and interface-heavy products that need sharper visual design and dependable frontend execution."
      className="pb-28"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left column details */}
        <Panel className="p-6 md:p-8" variant="default">
          <div className="space-y-6 pt-2 text-left">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">GET IN TOUCH // SEES</p>
              <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl leading-snug">
                Let’s turn your idea into a polished digital experience.
              </h3>
            </div>

            <div className="space-y-4">
              {contactMethods.map(({ label, value, href, iconName }) => {
                const Icon = iconMap[iconName] || Mail;
                return (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 border border-primary/10 bg-primary/[0.03] p-4 transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.08]"
                    style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary/25 animate-pulse-subtle"
                          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                      <Icon size={18} className="text-glow" />
                    </span>
                    <div>
                      <span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-accent">{label}</span>
                      <span className="mt-0.5 block text-xs font-bold text-foreground uppercase tracking-wide">{value}</span>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="border border-primary/10 bg-primary/[0.02] p-5 text-xs leading-5 text-muted-foreground/80"
                 style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%)" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">AVAILABILITY</p>
              Currently open to freelance opportunities, part-time roles, and project-based work with a focus on web development.
            </div>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/15">
              {socialLinks.map(({ name, href, iconName }) => {
                const Icon = iconMap[iconName] || Send;
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="data-pill hover:border-primary hover:text-foreground"
                  >
                    <Icon size={13} className="mr-1" /> {name}
                  </a>
                );
              })}
            </div>
          </div>
        </Panel>

        {/* Right column form */}
        <Panel className="p-6 md:p-8" variant="alt">
          <form onSubmit={handleSubmit} className="space-y-5 pt-2 text-left">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70">SEND A MESSAGE // TERMINAL</p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-foreground text-glow">
                Let's discuss your project.
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="YOUR NAME"
                  className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                />
              </label>
              <label className="space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="NAME@EXAMPLE.COM"
                  className="w-full border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                />
              </label>
            </div>

            <label className="block space-y-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>Message</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={7}
                placeholder="SHARE YOUR PROJECT DETAILS, TIMELINE, OR ANY QUESTIONS YOU HAVE."
                className="w-full resize-none border border-primary/25 bg-[rgba(8,18,34,0.65)] px-4 py-3 text-xs uppercase tracking-widest text-foreground placeholder:text-muted-foreground/40 transition-all duration-300 focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.25)] focus:bg-[rgba(8,18,34,0.85)]"
                style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}
              />
            </label>

            <button type="submit" disabled={isSubmitting} className="action-button w-full sm:w-auto">
              {isSubmitting ? "Sending..." : "Send message"}
              <Send size={13} className="text-glow" />
            </button>
          </form>
        </Panel>
      </div>
    </SectionShell>
  );
};
