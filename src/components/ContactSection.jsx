import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Panel } from "@/components/Panel";
import { SectionShell } from "@/components/SectionShell";
import { useToast } from "@/hooks/use-toast";

const contactMethods = [
  {
    label: "Primary mail",
    value: "05bryanchan05@gmail.com",
    href: "mailto:05bryanchan05@gmail.com",
    icon: Mail,
  },
  {
    label: "Direct line",
    value: "+62 855-9167-6171",
    href: "tel:+6285591676171",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Bekasi, Harapan Indah",
    href: "#contact",
    icon: MapPin,
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bryan-chan-824658230/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/BryanC05",
    icon: Send,
  },
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
  },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      toast({
        title: "Transmission received",
        description: "Thanks for reaching out. I’ll follow up through your provided contact channel.",
      });
      setFormState({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Communications"
      title="If you’re planning the next"
      accent="high-impact build"
      description="I’m open to collaborating on portfolio refreshes, landing pages, and interface-heavy products that need sharper visual systems and dependable frontend execution."
      className="pb-28"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel className="motion-panel p-6 md:p-8">
          <div className="panel-line space-y-6 pt-6 text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Open channel</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
                Let’s turn a rough direction into a polished interface.
              </h3>
            </div>

            <div className="space-y-4">
              {contactMethods.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-primary/25 hover:bg-primary/6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
                    <span className="mt-1 block text-sm font-medium text-foreground">{value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Availability</p>
              <p className="mt-3 text-sm leading-7 text-foreground">
                Currently open to freelance opportunities, collaborative product work, and landing page redesigns with a strong visual direction.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="data-pill transition-colors hover:border-primary/35 hover:text-foreground"
                >
                  <Icon size={14} /> {name}
                </a>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="motion-panel p-6 md:p-8">
          <form onSubmit={handleSubmit} className="panel-line space-y-5 pt-6 text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Message relay</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                Send a project brief.
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-input bg-background/80 px-4 py-3 text-foreground placeholder:text-muted-foreground/70"
                />
              </label>
              <label className="space-y-2 text-sm text-muted-foreground">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-input bg-background/80 px-4 py-3 text-foreground placeholder:text-muted-foreground/70"
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm text-muted-foreground">
              <span>Mission brief</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={7}
                placeholder="Share the product, timeline, and type of experience you want to build."
                className="w-full resize-none rounded-[1.5rem] border border-input bg-background/80 px-4 py-3 text-foreground placeholder:text-muted-foreground/70"
              />
            </label>

            <button type="submit" disabled={isSubmitting} className="action-button w-full sm:w-auto">
              {isSubmitting ? "Transmitting..." : "Transmit message"}
              <Send size={16} />
            </button>
          </form>
        </Panel>
      </div>
    </SectionShell>
  );
};
