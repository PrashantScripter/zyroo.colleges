import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Building2,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavLink } from "react-router-dom";

export default function ContactUs() {
  return (
    <div className="w-full bg-bg-main min-h-screen transition-colors duration-300">
      {/* ==================== 1. HERO / BREADCRUMB BANNER (The Header Separation Layer) ==================== */}
      <div className="w-full bg-bg-surface border-b border-border-default py-10 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary font-lexend tracking-tight">
              Contact Our Team
            </h1>
            <p className="text-xs sm:text-sm text-text-caption font-light mt-1">
              Have questions? We love to chat and help resolve your queries.
            </p>
          </div>

          {/* Breadcrumbs for structured visual navigation */}
          <div className="flex items-center gap-2 text-xs font-medium text-text-caption self-start sm:self-center">
            <NavLink to={'/'} className="hover:text-brand-accent cursor-pointer transition-colors">
              Home
            </NavLink>  
            <ChevronRight size={12} className="text-text-caption/60" />
            <span className="text-text-secondary font-semibold">
              Contact Us
            </span>
          </div>
        </div>
      </div>

      {/* ==================== 2. MAIN CONTENT GRID (Padded Off-Grid Layout) ==================== */}
      <div className="w-full py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT PANEL: CONTACT INFO & HUBS (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-brand-accent font-bold block mb-1">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl font-extrabold text-text-primary tracking-tight font-lexend leading-tight">
                We're Here to Help You Grow
              </h2>
              <p className="mt-3 text-sm text-text-caption font-light leading-relaxed">
                Have questions about college admissions, counseling programs, or
                partnerships? Reach out, and our team will respond within 24
                hours.
              </p>
            </div>

            {/* CONTACT INFO CARD STACKS */}
            <div className="flex flex-col gap-4">
              {/* Office Address */}
              <div className="flex gap-4 p-5 bg-bg-surface border border-border-default rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-brand-highlight border border-brand-accent/10 flex items-center justify-center shrink-0 text-brand-accent">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-text-primary font-lexend">
                    Our Headquarters
                  </span>
                  <p className="text-sm text-text-secondary font-light leading-snug">
                    42, Innovation Hub, Tech Enclave, <br />
                    Sector 62, Noida, UP — 201301
                  </p>
                </div>
              </div>

              {/* Email & Phone Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3 p-4 bg-bg-surface border border-border-default rounded-2xl shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-brand-highlight border border-brand-accent/10 flex items-center justify-center shrink-0 text-brand-accent">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary font-lexend">
                      Email Us
                    </span>
                    <a
                      href="mailto:support@zyroocolleges.com"
                      className="text-xs text-text-secondary font-light hover:text-brand-accent transition-colors mt-0.5 break-all"
                    >
                      support@zyroocolleges.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 p-4 bg-bg-surface border border-border-default rounded-2xl shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-brand-highlight border border-brand-accent/10 flex items-center justify-center shrink-0 text-brand-accent">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary font-lexend">
                      Call Center
                    </span>
                    <a
                      href="tel:+911800123456"
                      className="text-xs text-text-secondary font-light hover:text-brand-accent transition-colors mt-0.5"
                    >
                      +91 1800-123-456
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4 p-5 bg-bg-surface border border-border-default rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-brand-highlight border border-brand-accent/10 flex items-center justify-center shrink-0 text-brand-accent">
                  <Clock size={20} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-text-primary font-lexend">
                    Operating Hours
                  </span>
                  <p className="text-sm text-text-secondary font-light">
                    Monday – Saturday: 9:00 AM – 6:30 PM
                  </p>
                  <span className="text-[10px] text-text-caption font-light italic">
                    *Closed on National Holidays
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT AREA: THE CONTACT FORM (7 Cols) */}
          <div className="lg:col-span-7 bg-bg-surface border border-border-default rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-text-primary font-lexend mb-6">
              Send us a Message
            </h3>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5"
            >
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                    <input
                      type="tel"
                      placeholder="+91 98765-43210"
                      className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Inquiry Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  What are you looking for?
                </label>
                <Select>
                  <SelectTrigger className="w-full h-[42px] px-4 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:ring-0 focus:ring-offset-0 focus:border-brand-accent focus:outline-hidden transition-colors cursor-pointer">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-surface border border-border-default text-text-primary rounded-xl shadow-md">
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="admission">Admission Support</SelectItem>
                    <SelectItem value="partnership">
                      College Partnership
                    </SelectItem>
                    <SelectItem value="technical">
                      Technical Support / Bug Report
                    </SelectItem>
                    <SelectItem value="other">Other Concerns</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Row 4: Subject Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Subject
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Row 5: Message Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Your Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-text-caption" />
                  <textarea
                    rows={4}
                    placeholder="Write your detailed message or query here..."
                    className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors resize-none min-h-[110px]"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-brand-accent hover:bg-brand-hover active:bg-brand-active text-text-accent-btn font-semibold rounded-xl text-sm transition-colors shadow-sm focus:outline-hidden active:scale-[0.99] cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
