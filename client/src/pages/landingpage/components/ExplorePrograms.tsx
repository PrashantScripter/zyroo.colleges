import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Search,
  FileText,
  Cpu,
  GitCompare,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";

const PROGRAMS_DATA = [
  {
    id: 1,
    icon: <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
    badge: "Updated 2026",
    badgeStyles:
      "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
    title: "Insititute Rankings",
    desc: "Explore NIRF, QS & Times Higher rankings.",
    path: "/universities-and-colleges-ranking",
  },
  {
    id: 2,
    icon: <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badge: "40K+ Colleges",
    badgeStyles:
      "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
    title: "Find Colleges",
    desc: "Search from 40,000+ colleges across India.",
    path: "/find-colleges",
  },
  {
    id: 3,
    icon: <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
    iconBg: "bg-orange-50 dark:bg-orange-950/40",
    badge: "200+ Exams",
    badgeStyles:
      "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900/50",
    title: "Exams",
    desc: "JEE, NEET, CAT, CLAT & 200+ entrance exams.",
    path: "/enterance-exams",
  },
  {
    id: 4,
    icon: <Cpu className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
    iconBg: "bg-pink-50 dark:bg-pink-950/40",
    badge: "AI Powered",
    badgeStyles:
      "bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-900/50",
    title: "College Predictor",
    desc: "AI powered admission chance predictor.",
    path: "/college-predictor",
  },
  {
    id: 5,
    icon: <GitCompare className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    iconBg: "bg-cyan-50 dark:bg-cyan-950/40",
    badge: "Free Tool",
    badgeStyles:
      "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-900/50",
    title: "College Compare",
    desc: "Compare colleges side-by-side on key factors.",
    path: "/college-comparision",
  },
  {
    id: 6,
    icon: (
      <ClipboardCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
    ),
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    badge: "New",
    badgeStyles:
      "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
    title: "Assessment Test",
    desc: "Discover your strengths & ideal career paths.",
    path: "/assesment-test",
  },
];

export default function ExplorePrograms() {
  const navigate = useNavigate();

  return (
    // Uses your theme's dynamic main background color variable
    <section className="w-full bg-bg-main py-20 px-6 sm:px-10 lg:px-24 border-b border-border-default transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* UPPER CAPTION */}
        {/* Safely links to your primary theme brand accent color variables */}
        <span className="text-xs uppercase tracking-widest text-logo font-bold mb-3">
          Everything You Need
        </span>

        {/* MAIN TITLE */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight text-center font-lexend">
          Explore Programs
        </h2>

        {/* SUBTITLE */}
        <p className="mt-4 max-w-2xl text-center text-sm sm:text-base text-text-caption font-light leading-relaxed">
          All the tools to help you find the right college, predict your
          admission, and plan your career successfully.
        </p>

        {/* CARDS GRID LAYOUT */}
        <div className="mt-14 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROGRAMS_DATA.map((program) => (
            <div
              key={program.id}
              onClick={() => navigate(program.path)}
              // 🛠️ FIX: Replaced bg-white with bg-bg-surface and set dynamic border parameters
              className="group relative bg-bg-surface border border-border-default rounded-2xl p-6 sm:p-7 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-brand-accent transition-all duration-300 cursor-pointer"
            >
              {/* Top Row: Icon Container and Custom Arrow */}
              <div className="flex flex-row justify-between items-start">
                <div
                  className={`p-3 rounded-xl flex items-center justify-center ${program.iconBg}`}
                >
                  {program.icon}
                </div>
                {/* Fixed arrow background and token colors for dark layout mode */}
                <div className="p-1.5 rounded-full bg-bg-main text-text-caption group-hover:text-brand-accent transform group-hover:translate-x-1 transition-all duration-300">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Status Badge Tag Row */}
              <div className="mt-2 flex">
                <span
                  className={`text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-md border ${program.badgeStyles}`}
                >
                  {program.badge}
                </span>
              </div>

              {/* Title & Description Combo Layout */}
              <div className="flex flex-col gap-1.5">
                {/* 🛠️ FIX: Linked title to global text-text-primary and descriptions to text-text-secondary */}
                <h3 className="text-lg font-bold text-text-primary font-lexend tracking-tight group-hover:text-brand-accent transition-colors duration-200">
                  {program.title}
                </h3>
                <p className="text-sm text-text-secondary leading-normal font-light">
                  {program.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
