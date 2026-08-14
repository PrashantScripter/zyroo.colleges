import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";
import ThemeToggle from "../../../components/ThemeToggle";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
];

const DROP_DOWN_LINKS = [
  { value: "/universities-and-colleges-ranking", label: "Institutes Ranking" },
  { value: "/find-colleges", label: "Find Colleges" },
  { value: "/enterance-exams", label: "Enterance Exams" },
  { value: "/college-predictor", label: "College Predictor" },
  { value: "/college-comparision", label: "College Comparision" },
  { value: "/assesment-test", label: "Assesment Test" },
  { value: "/blogs", label: "Institute Blogs" },
];

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // ... existing state declarations
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

  // Load user from localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // Run on mount AND whenever the route changes (so login redirect updates the header)
  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const handleMobileNav = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false);
    closeMenu();
    navigate("/signin");
  };

  const handleScrollAnchor = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    const targetId = path.replace("#", "");
    const executeScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(executeScroll, 150);
    } else {
      executeScroll();
    }
    closeMenu();
  };

  const getUserInitial = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="flex flex-row bg-bg-main px-2 md:px-20 border-b border-bg-surface items-center justify-between text-[#333333] h-18 relative">
      {/* Logo */}
      <div className="flex flex-row items-center">
        <div className="w-16 h-16 object-cover">
          <img
            className="w-full h-full transition-all duration-200"
            src={theme === "dark" ? "zyroo_logo_dark.png" : "zyroo_logo.png"}
            alt="Zyroo logo"
          />
        </div>
        <span className="text-2xl text-logo font-bold font-cinzel">
          Zyroo Colleges
        </span>
      </div>

      {/* Navbar */}
      <nav className="hidden lg:flex" aria-label="Main Navigation">
        <ul className="flex flex-row gap-2 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              {link.path.startsWith("#") ? (
                <a
                  href={link.path}
                  onClick={(e) => handleScrollAnchor(e, link.path)}
                  className="nav-item inline-block px-4 py-2.5 rounded transition-colors duration-150 hover:underline underline-offset-4 text-md text-text-primary cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-item inline-block px-4 py-2.5 rounded transition-colors duration-150 hover:underline underline-offset-4 text-md text-text-primary ${
                      isActive ? "active-link" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
          <li>
            <Dropdown
              label="Explore"
              options={DROP_DOWN_LINKS}
              onSelect={(path) => navigate(path)}
            />
          </li>
        </ul>
      </nav>

      {/* Desktop Auth & Avatar Section */}
      <div className="hidden lg:flex flex-row items-center gap-4">
        <ThemeToggle />

        {user ? (
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-full border-2 border-[#640A10] hover:opacity-90 focus:outline-none cursor-pointer transition-all"
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || "User Avatar"}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#640A10] text-white flex items-center justify-center font-semibold text-base">
                  {getUserInitial(user.name)}
                </div>
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-bg-main border border-bg-surface rounded-2xl shadow-xl py-2 z-50 transition-all">
                <div className="px-4 py-3 border-b border-bg-surface">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {user.name || "Logged User"}
                  </p>
                  <p className="text-xs text-text-primary/70 truncate">
                    {user.email || ""}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-text-primary hover:bg-bg-surface flex items-center gap-2 font-medium cursor-pointer"
                >
                  <User size={16} /> My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-bg-surface flex items-center gap-2 font-medium cursor-pointer"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              className="bg-bg-main border-none btn btn-sm text-text-primary rounded-xl cursor-pointer"
              to="/signin"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-[#640A10] text-white btn btn-sm rounded-xl border-none cursor-pointer"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex lg:hidden items-center gap-4">
        <ThemeToggle />
        <button
          onClick={toggleMenu}
          className="text-text-primary p-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-bg-main border-l border-bg-surface p-6 z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) =>
              link.path.startsWith("#") ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleScrollAnchor(e, link.path)}
                  className="block px-4 py-3 rounded-xl font-medium transition-colors text-text-primary hover:bg-bg-surface cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl font-medium transition-colors text-text-primary hover:bg-bg-surface ${
                      isActive ? "bg-bg-surface font-semibold text-logo" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
            <div className="flex flex-col">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-text-primary hover:bg-bg-surface text-left"
              >
                <span>Explore</span>
                <ChevronDown
                  size={18}
                  className={`transform transition-transform duration-200 ${
                    isMobileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 bg-bg-surface/40 rounded-xl ${
                  isMobileDropdownOpen ? "max-h-[400px] py-1 mt-1" : "max-h-0"
                }`}
              >
                {DROP_DOWN_LINKS.map((subLink) => (
                  <button
                    key={subLink.value}
                    onClick={() => handleMobileNav(subLink.value)}
                    className="block w-full text-left px-4 py-2.5 text-sm text-text-primary/80 hover:text-logo font-medium transition-colors"
                  >
                    {subLink.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-bg-surface">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-2">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#640A10] text-white flex items-center justify-center font-bold text-lg">
                      {getUserInitial(user.name)}
                    </div>
                  )}
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-text-primary truncate">
                      {user.name}
                    </span>
                    <span className="text-xs text-text-primary/70 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-center font-semibold text-red-600 bg-red-500/10 rounded-xl hover:bg-red-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleMobileNav("/signin")}
                  className="w-full py-3 text-center font-semibold text-text-primary bg-bg-surface rounded-xl hover:bg-bg-surface/80 active:scale-98 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleMobileNav("/signup")}
                  className="w-full py-3 text-center font-semibold text-white bg-[#640A10] rounded-xl hover:opacity-90 active:scale-98 transition-all"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
