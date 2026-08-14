import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const html = document.documentElement;
    // Set initial theme
    setTheme(html.getAttribute("data-theme") === "dark" ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const currentTheme =
        html.getAttribute("data-theme") === "dark" ? "dark" : "light";
      setTheme(currentTheme);
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);
  
  const handleScrollToCounselling = () => {
    // This matches your LandingPage wrapper ID perfectly now
    const element = document.getElementById("bookcounselling");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-bg-surface border-t border-border-default py-12 px-6 sm:px-10 lg:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* ==================== TOP SECTION: LINKS & BRAND INFO ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 pb-10 border-b border-border-default">
          {/* COLUMN 1: BRANDING & CONTACT INFO (Adjusted to 5 Columns for extra breathing room) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Logo Configuration */}
            <div className="flex flex-row items-center">
              <div className="w-16 h-16 object-cover">
                <img
                  className="w-full h-full transition-all duration-200"
                  src={
                    theme === "dark" ? "zyroo_logo_dark.png" : "zyroo_logo.png"
                  }
                  alt="Zyroo logo"
                />
              </div>
              <span className="text-2xl text-logo font-bold font-cinzel">
                Zyroo Colleges
              </span>
            </div>

            <p className="text-sm text-text-caption font-light leading-relaxed max-w-sm">
              India's most trusted platform for students to discover colleges,
              explore academic programs, predict cutoffs, and connect with
              expert counselors.
            </p>

            {/* Contact Details List */}
            <div className="flex flex-col gap-2.5 mt-2 text-xs text-text-secondary">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-brand-accent shrink-0" />
                <a
                  href="mailto:support@zyroocolleges.com"
                  className="hover:text-brand-accent transition-colors"
                >
                  support@zyroocolleges.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-brand-accent shrink-0" />
                <a
                  href="tel:+9118001234567"
                  className="hover:text-brand-accent transition-colors"
                >
                  +91 1800-123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-brand-accent shrink-0" />
                <span>New Delhi, Delhi, India</span>
              </div>
            </div>

            {/* Social Media Links Wrapper */}
            <div className="flex items-center gap-2 mt-2">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 bg-bg-main border border-border-default rounded-xl text-text-caption hover:text-brand-accent hover:border-brand-accent/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Twitter / X */}
              {/* <a
                href="#"
                aria-label="Twitter"
                className="p-2 bg-bg-main border border-border-default rounded-xl text-text-caption hover:text-brand-accent hover:border-brand-accent/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M20 20l-6.768-6.768" />
                </svg>
              </a> */}

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 bg-bg-main border border-border-default rounded-xl text-text-caption hover:text-brand-accent hover:border-brand-accent/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              {/* <a
                href="#"
                aria-label="Youtube"
                className="p-2 bg-bg-main border border-border-default rounded-xl text-text-caption hover:text-brand-accent hover:border-brand-accent/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" ry="2" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </a> */}

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="Linkedin"
                className="p-2 bg-bg-main border border-border-default rounded-xl text-text-caption hover:text-brand-accent hover:border-brand-accent/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: EXPLORE PANEL (Adjusted to 4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary font-lexend">
              Explore Programs
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-text-caption">
              <li>
                <NavLink
                  to={"/find-colleges"}
                  className="hover:text-brand-accent transition-colors font-light"
                >
                  Find Colleges
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/universities-and-colleges-ranking"}
                  className="hover:text-brand-accent transition-colors font-light"
                >
                  University Rankings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/enterance-exams"}
                  className="hover:text-brand-accent transition-colors font-light"
                >
                  Explore Entrance Exams
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/you-college-predictor"}
                  className="hover:text-brand-accent transition-colors font-light"
                >
                  College Predictor
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/college-comparision"}
                  className="hover:text-brand-accent transition-colors font-light"
                >
                  College Comparision
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/assesment-test"}
                  className="hover:text-brand-accent transition-colors font-light"
                >
                  Assessment Test
                </NavLink>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CORPORATE & LEGAL LINKS (Adjusted to 3 Columns) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary font-lexend">
                Company
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-text-caption">
                <li>
                  <NavLink
                    to={"/about-us"}
                    className="hover:text-brand-accent transition-colors font-light"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/zyroo-careers"}
                    className="hover:text-brand-accent transition-colors font-light"
                  >
                    Careers
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleScrollToCounselling}
                    className="hover:text-brand-accent cursor-pointer transition-colors font-light"
                  >
                    Book Free Counseling
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary font-lexend">
                Legal
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-text-caption">
                <li>
                  <NavLink
                    to={"/privacy-policy"}
                    className="hover:text-brand-accent transition-colors font-light"
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/term-and-condition"}
                    className="hover:text-brand-accent transition-colors font-light"
                  >
                    Terms & Conditions
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM SECTION: LEGAL & TRUST FOOTNOTE ==================== */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-caption font-light">
          <div>
            © 2026{" "}
            <span className="font-medium text-text-secondary">
              Zyroo Colleges
            </span>
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
