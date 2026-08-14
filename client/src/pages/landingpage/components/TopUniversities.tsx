import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Award,
  ArrowUpRight,
  ArrowRight,
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
  location: string;
  stream: string;
  category: string; // "government", "private", "deemed"
  nirfRank: number;
  annualFees: number;
  rating: number;
  image?: string;
  established?: number; // optional if not in DB
}

// ============================================================
// CONSTANTS
// ============================================================
const FILTER_CATEGORIES = ["All", "Government", "Private", "Deemed"];

// Map UI category labels to backend values (lowercase)
const CATEGORY_MAP: Record<string, string | null> = {
  All: null,
  Government: "government",
  Private: "private",
  Deemed: "deemed",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60";

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

export default function TopUniversities() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  // Data state
  const [universities, setUniversities] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch function
  const fetchUniversities = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string | number> = {
        sortBy: "nirf",
        limit: 3, // show top 3
      };

      const backendCategory = CATEGORY_MAP[category];
      if (backendCategory) {
        params.category = backendCategory;
      }

      const response = await apiClient.get("/colleges", { params });
      const data = extractArrayData(response.data);
      setUniversities(data);
    } catch (err: any) {
      if (err.name === "AbortError" || err.name === "CanceledError") return;
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load university data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch when filter changes
  useEffect(() => {
    const abortController = new AbortController();
    fetchUniversities(activeFilter);
    return () => abortController.abort();
  }, [activeFilter, fetchUniversities]);

  // Derive filtered list (client-side if needed, but API already filters)
  // We'll use the fetched data directly; the filter is already applied.
  const filteredUniversities = universities;

  // Render helper for content
  const renderContent = () => {
    if (loading) {
      return (
        <div className="col-span-full flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-brand-accent animate-spin" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-span-full flex flex-col items-center gap-2 py-12">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => fetchUniversities(activeFilter)}
            className="mt-2 px-4 py-2 text-xs font-semibold bg-brand-accent text-white rounded-xl hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (filteredUniversities.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-sm text-text-caption">
            No universities found for this category.
          </p>
        </div>
      );
    }

    return filteredUniversities.map((uni) => (
      <div
        key={uni.id}
        className="group bg-bg-surface border border-border-default rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      >
        {/* Card Image Area */}
        <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={uni.image || FALLBACK_IMAGE}
            alt={uni.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            NIRF Rank #{uni.nirfRank ?? "—"}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-grow justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-brand-highlight text-brand-accent border border-brand-accent/10">
                {uni.category || "N/A"}
              </span>
              {uni.established && (
                <span className="text-xs text-text-caption">
                  Est. {uni.established}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-text-primary font-lexend tracking-tight line-clamp-2 group-hover:text-brand-accent transition-colors duration-200 mt-1">
              {uni.name}
            </h3>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3 pt-3 border-t border-border-default/40">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin className="w-4 h-4 text-text-caption shrink-0" />
              <span className="truncate">{uni.location}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate(`/institute/${uni.id}`)}
            className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border-default hover:border-brand-accent hover:bg-brand-highlight text-sm font-semibold text-text-primary group-hover:text-brand-accent transition-all duration-200 cursor-pointer"
          >
            View Details
            <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="w-full bg-bg-main py-20 px-6 sm:px-10 lg:px-24 border-b border-border-default transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-default/60 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
              Best in India
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-lexend">
              Top 10 Institutes
            </h2>
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-2 bg-bg-surface p-1.5 rounded-xl border border-border-default shadow-sm w-fit">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeFilter === category
                    ? "bg-brand-accent text-white shadow-sm font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-main/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* CARD GRID */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderContent()}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => navigate("/find-colleges")}
            className="flex items-center gap-2 px-8 py-4 bg-brand-accent hover:bg-brand-hover active:scale-98 text-white font-semibold rounded-xl shadow-lg shadow-brand-accent/10 transition-all duration-200 cursor-pointer"
          >
            View All Institutes
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
