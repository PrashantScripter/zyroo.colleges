import { useState, useMemo, useEffect } from "react";
import {
  Award,
  BookOpen,
  SlidersHorizontal,
  RefreshCw,
  ChevronRight,
  Check,
  ShieldCheck,
  ArrowUpDown,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/api/client"; // Imported apiClient instance

interface College {
  id: number;
  name: string;
  location: string;
  nirfRank: number;
  naacGrade: string;
  image?: string;
}

const NAAC_OPTIONS = ["A++", "A+", "A"];
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60";

export default function CollegeRankings() {
  // Live Database State - Initialized as an empty array
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pure Ranking Filtering States
  const [selectedRankTier, setSelectedRankTier] = useState<string>("all");
  const [selectedNaacGrade, setSelectedNaacGrade] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("nirf"); // Default sorting metric

  // NAAC grade priority weights map for sorting capabilities
  const gradeWeights: Record<string, number> = { "A++": 3, "A+": 2, A: 1 };

  // Fetch data using apiClient
  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/colleges");
      const json = response.data;

      // Extract array correctly whether API returns [ ...] or { data: [ ... ], meta: { ... } }
      const collegeList = Array.isArray(json) ? json : json.data || [];
      setColleges(collegeList);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load colleges from the database server.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // Strict Ranking Filter and Sort Logic Pipeline
  const filteredAndRankedColleges = useMemo(() => {
    // Defensive check to ensure we always work with an array
    const list = Array.isArray(colleges) ? colleges : [];

    return list
      .filter((college) => {
        // 1. Evaluate NIRF Tier Bracket
        let matchesNirf = true;
        if (selectedRankTier === "top10") matchesNirf = college.nirfRank <= 10;
        else if (selectedRankTier === "top30")
          matchesNirf = college.nirfRank <= 30;
        else if (selectedRankTier === "top100")
          matchesNirf = college.nirfRank <= 100;

        // 2. Evaluate NAAC Grade Matrix
        const matchesNaac =
          selectedNaacGrade === "all" ||
          college.naacGrade === selectedNaacGrade;

        return matchesNirf && matchesNaac;
      })
      .sort((a, b) => {
        // 3. Apply Active Leaderboard Sorting Rule
        if (sortBy === "nirf") {
          return a.nirfRank - b.nirfRank; // Lowest number = top rank (#1, #2...)
        } else {
          const weightA = gradeWeights[a.naacGrade] || 0;
          const weightB = gradeWeights[b.naacGrade] || 0;
          return weightB - weightA; // Highest tier weight first (A++ > A+ > A)
        }
      });
  }, [colleges, selectedRankTier, selectedNaacGrade, sortBy]);

  const handleResetFilters = () => {
    setSelectedRankTier("all");
    setSelectedNaacGrade("all");
    setSortBy("nirf");
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-16 transition-colors duration-200">
      {/* HEADER HERO AREA */}
      <div className="bg-[var(--color-bg-hero)] text-white py-12 px-6 md:px-20 shadow-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full">
            Official Data Evaluator
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            Institutes Ranking
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-2 font-light">
            Compare premium academic institutions based strictly on unified
            metrics, verified NIRF standing frameworks, and absolute NAAC
            council scores.
          </p>
        </div>
      </div>

      {/* CORE CONTROL AND DISPLAY STRUCTURAL GRID */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR: PURE RANKING CONTROLS */}
        <div className="lg:col-span-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-xs h-fit lg:sticky top-6 transition-colors duration-200">
          <div className="flex items-center justify-between border-b border-[var(--color-border-default)] pb-4 mb-5">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)] text-md">
              <SlidersHorizontal
                size={18}
                className="text-[var(--color-brand-accent)]"
              />
              <span>Rank Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[var(--color-text-caption)] hover:text-[var(--color-brand-accent)] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>

          <div className="space-y-6">
            {/* Primary Order Metric Selector using Shadcn UI */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2.5 flex items-center gap-2 select-none px-0.5">
                <span className="flex items-center justify-center p-1 bg-[var(--color-brand-highlight)] rounded-md text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/10">
                  <ArrowUpDown size={11} strokeWidth={2.5} />
                </span>
                Sort Leaderboard By
              </label>

              <Select
                value={sortBy}
                onValueChange={(val) => {
                  if (val) setSortBy(val);
                }}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="Sort metric" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <SelectItem
                    value="nirf"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    NIRF Rank Score (Ascending)
                  </SelectItem>
                  <SelectItem
                    value="naac"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    NAAC Accreditation Tier (Descending)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* NIRF Bracket Dropdown using Shadcn UI */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2.5 flex items-center gap-2 select-none px-0.5">
                <span className="flex items-center justify-center p-1 bg-[var(--color-brand-highlight)] rounded-md text-[var(--color-brand-accent)] border border-[var(--color-brand-accent)]/10">
                  <Award size={11} strokeWidth={2.5} />
                </span>
                NIRF Ranking Bracket
              </label>

              <Select
                value={selectedRankTier}
                onValueChange={(val) => {
                  if (val) setSelectedRankTier(val);
                }}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="Select rank tier" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Show All National Ranks
                  </SelectItem>
                  <SelectItem
                    value="top10"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Top 10 Tier Elite
                  </SelectItem>
                  <SelectItem
                    value="top30"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Top 30 Tier High
                  </SelectItem>
                  <SelectItem
                    value="top100"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Top 100 Verified List
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* NAAC Accreditation List Options */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2 flex items-center gap-1">
                <ShieldCheck size={12} /> NAAC Grade Category
              </label>
              <div className="space-y-1 border border-[var(--color-border-default)] rounded-xl p-1.5 bg-[var(--color-bg-main)]">
                <button
                  onClick={() => setSelectedNaacGrade("all")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                    selectedNaacGrade === "all"
                      ? "bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)]"
                  }`}
                >
                  <span>All CGPA Grades</span>
                  {selectedNaacGrade === "all" && <Check size={14} />}
                </button>

                {NAAC_OPTIONS.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedNaacGrade(grade)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                      selectedNaacGrade === grade
                        ? "bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)]"
                    }`}
                  >
                    <span>Grade {grade}</span>
                    {selectedNaacGrade === grade && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* WORKSPACE DISPLAY AREA */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-xs font-bold text-[var(--color-text-caption)] uppercase tracking-wider">
              Showing {filteredAndRankedColleges.length} Verified Institutions
              Ranked By {sortBy === "nirf" ? "NIRF Score" : "NAAC Merit"}
            </p>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-16 text-center shadow-xs flex flex-col items-center justify-center min-h-[300px]">
              <Loader2
                className="animate-spin text-[var(--color-brand-accent)] mb-3"
                size={32}
              />
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                Loading live records from database...
              </p>
            </div>
          ) : error ? (
            /* ERROR STATE */
            <div className="bg-[var(--color-bg-surface)] border border-red-500/30 rounded-2xl p-12 text-center max-w-md mx-auto mt-6">
              <AlertCircle size={40} className="mx-auto text-red-500 mb-3" />
              <h3 className="font-bold text-[var(--color-text-primary)] text-md">
                Failed to Connect to Database
              </h3>
              <p className="text-[var(--color-text-caption)] text-xs mt-1.5 leading-relaxed">
                {error}
              </p>
              <button
                onClick={fetchColleges}
                className="mt-4 inline-flex items-center gap-2 bg-[var(--color-brand-accent)] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer hover:opacity-90 shadow-xs"
              >
                <RefreshCw size={14} /> Retry Server Connection
              </button>
            </div>
          ) : filteredAndRankedColleges.length > 0 ? (
            /* DATA LISTING STATE */
            filteredAndRankedColleges.map((college) => (
              <div
                key={college.id}
                className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
              >
                {/* Media Frame Container */}
                <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-[var(--color-bg-main)] flex-shrink-0 relative border border-[var(--color-border-default)]">
                  <img
                    src={college.image || FALLBACK_IMAGE}
                    alt={college.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Core Rankings Metadata Block */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Primary Highlighted Ranking Badges */}
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Award size={11} /> NIRF National Rank: #
                      {college.nirfRank}
                    </span>
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <ShieldCheck size={11} /> NAAC Grade: {college.naacGrade}
                    </span>
                  </div>

                  <h3 className="font-bold text-[var(--color-text-primary)] text-base leading-snug hover:text-[var(--color-brand-accent)] transition-colors cursor-pointer">
                    {college.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-1">
                      <MapPin
                        size={14}
                        className="text-[var(--color-text-caption)]"
                      />
                      <span>{college.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action Redirect CTA */}
                <button className="w-full sm:w-auto self-stretch sm:self-auto bg-[var(--color-text-primary)] text-[var(--color-bg-main)] hover:opacity-90 font-semibold text-xs px-4 py-2.5 sm:py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group">
                  <span>View Ranking Details</span>
                  <ChevronRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            ))
          ) : (
            /* Fallback Vector Empty State */
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] border-dashed rounded-2xl p-12 text-center max-w-md mx-auto mt-12">
              <BookOpen
                size={40}
                className="mx-auto text-[var(--color-text-caption)] mb-4 opacity-60"
              />
              <h3 className="font-bold text-[var(--color-text-primary)] text-md">
                No Rankings Matched
              </h3>
              <p className="text-[var(--color-text-caption)] text-xs mt-1.5 leading-relaxed">
                No institutions match this specific ranking profile crossover.
                Try broadening your NIRF/NAAC metrics criteria list.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer hover:opacity-90"
              >
                Reset Ranking Metrics
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
