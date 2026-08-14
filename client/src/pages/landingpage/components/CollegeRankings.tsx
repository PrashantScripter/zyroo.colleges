import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Cpu,
  ArrowRight,
  ExternalLink,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import apiClient from "@/api/client";

// ============================================================
// TYPES
// ============================================================
interface College {
  id: number;
  name: string;
  location: string; // e.g. "Chennai, Tamil Nadu"
  stream: string;
  category: string;
  nirfRank: number;
  annualFees: number;
  rating: number;
  image: string;
}

// ============================================================
// CONSTANTS
// ============================================================
const DEPARTMENTS = [
  "Overall",
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Arts & Science",
];

// Map UI labels to backend stream values
const STREAM_MAP: Record<string, string | null> = {
  Overall: null,
  Engineering: "engineering",
  Medical: "medical",
  Management: "management",
  Law: "law",
  "Arts & Science": "science", // adjust to your actual stream name if different
};

// Helper to extract city and state from location string
const parseLocation = (location: string) => {
  const parts = location.split(",").map((s) => s.trim());
  return { city: parts[0] || "", state: parts[1] || "" };
};

// Helper to safely extract array from API response
const extractArrayData = (data: unknown): College[] => {
  if (Array.isArray(data)) return data;
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray((data as any).data)
  ) {
    return (data as any).data;
  }
  return [];
};

export default function CollegeRankings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overall");

  // Data state
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch function
  const fetchRankings = useCallback(async (tab: string) => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string | number> = {
        sortBy: "nirf",
        limit: 5,
      };

      const stream = STREAM_MAP[tab];
      if (stream) {
        params.stream = stream;
      }

      const response = await apiClient.get("/colleges", { params });
      const data = extractArrayData(response.data);
      setColleges(data);
    } catch (err: any) {
      // Handle aborted requests gracefully
      if (err.name === "AbortError" || err.name === "CanceledError") return;
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load ranking data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch when activeTab changes
  useEffect(() => {
    const abortController = new AbortController();
    fetchRankings(activeTab);
    return () => abortController.abort();
  }, [activeTab, fetchRankings]);

  // Render helpers
  const renderContent = () => {
    if (loading) {
      return (
        <div className="py-12 text-center flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 text-brand-accent animate-spin" />
          <p className="text-sm text-text-caption">Loading rankings...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-12 text-center flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => fetchRankings(activeTab)}
            className="mt-2 px-4 py-2 text-xs font-semibold bg-brand-accent text-white rounded-xl hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (colleges.length === 0) {
      return (
        <div className="py-12 text-center">
          <p className="text-sm text-text-caption">
            No colleges found for this category.
          </p>
        </div>
      );
    }

    return (
      <div className="divide-y divide-border-default/50">
        {colleges.map((college, index) => {
          const { city, state } = parseLocation(college.location);
          const rank = index + 1; // Since we limit to 5, rank is position in list

          return (
            <div
              key={college.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-bg-main/40 transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Rank Circle */}
                <div className="w-10 h-10 rounded-xl bg-bg-main border border-border-default/80 flex items-center justify-center font-bold text-text-primary shrink-0 group-hover:border-brand-accent/30 transition-colors">
                  #{rank}
                </div>

                {/* College Info */}
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-text-primary tracking-tight truncate font-lexend group-hover:text-brand-accent transition-colors">
                    {college.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-caption flex-wrap">
                    <span className="px-1.5 py-0.5 rounded bg-brand-highlight text-brand-accent font-medium text-[10px] uppercase">
                      {college.category || "N/A"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {city}
                      {state ? `, ${state}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Score / Rating */}
              <div className="text-right shrink-0">
                <span className="text-xs text-text-caption block font-light">
                  Rating
                </span>
                <span className="text-sm font-bold text-text-primary tracking-tight font-lexend">
                  {college.rating ? college.rating.toFixed(1) : "—"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="w-full bg-bg-main py-20 px-6 sm:px-10 lg:px-24 border-b border-border-default transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-default/60 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
              NIRF 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-lexend">
              Institutes Rankings 2026
            </h2>
            <p className="mt-1.5 text-sm text-text-caption font-light">
              Based on official NIRF, QS World, and Times Higher Education
              parameters.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-brand-highlight text-brand-accent px-4 py-2 rounded-xl border border-brand-accent/10 font-semibold text-xs md:text-sm w-fit self-start md:self-end">
            <Award className="w-4 h-4" />
            NIRF Rankings Released
          </div>
        </div>

        {/* TABS */}
        <div className="mt-8 flex flex-row gap-2 overflow-x-auto no-scrollbar pb-2">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveTab(dept)}
              className={`px-4 py-2.5 text-sm font-medium rounded-xl border transition-all shrink-0 cursor-pointer ${
                activeTab === dept
                  ? "bg-brand-accent text-white border-brand-accent font-semibold shadow-sm shadow-brand-accent/20"
                  : "bg-bg-surface text-text-secondary border-border-default hover:text-text-primary hover:border-brand-accent/40"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: Ranking List */}
          <div className="lg:col-span-2 bg-bg-surface border border-border-default rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-bg-surface border-b border-border-default/60 flex items-center justify-between">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider pl-2">
                Top Performance List
              </span>
              <span className="text-xs text-brand-accent font-semibold">
                Active: {activeTab}
              </span>
            </div>

            {renderContent()}

            {/* Footer Action */}
            <div className="p-4 bg-bg-surface border-t border-border-default/60 flex justify-center">
              <button
                onClick={() => navigate("/universities-and-colleges-ranking")}
                className="text-xs font-bold text-brand-accent hover:text-brand-hover flex items-center gap-1 cursor-pointer"
              >
                View Full Ranking List Matrix
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Predictor Widget */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#640a10] to-[#3a0408] dark:from-[#212121] dark:to-[#171717] dark:border dark:border-border-default rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between min-h-[340px] relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-brand-highlight border border-white/10 flex items-center justify-center shadow-inner">
                <Cpu className="w-6 h-6 text-red-200 dark:text-brand-accent" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-lexend leading-snug">
                  Predict Your <br /> College Admission
                </h3>
                <p className="mt-2 text-sm text-red-100/70 dark:text-text-caption font-light leading-relaxed">
                  Enter your score and get AI-powered cutoff chance predictions
                  instantly.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/college-predictor")}
              className="mt-8 w-full bg-white hover:bg-neutral-100 dark:bg-brand-accent dark:hover:bg-brand-hover active:scale-97 text-[#640a10] dark:text-white font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg text-sm tracking-tight transition-all duration-200 cursor-pointer"
            >
              Try College Predictor
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
