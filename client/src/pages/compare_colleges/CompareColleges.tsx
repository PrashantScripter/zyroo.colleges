import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Building2,
  MapPin,
  Award,
  Briefcase,
  Search,
  X,
  Plus,
  Filter,
  Sparkles,
  Check,
  ChevronDown,
  Download,
  Star,
  ArrowUpDown,
  FileCheck,
  Loader2,
} from "lucide-react";
import apiClient from "@/api/client"; // Path to your configured axios client

// Types matching the updated Prisma Schema and API DTOs
export interface CourseData {
  id?: number;
  key: string;
  name: string;
  fees: number;
  hostelFees: number;
  avgPackage: number;
  medianPackage: number;
  highestPackage: number;
  placementRate: number;
  cutoff: string;
  acceptedExams: string;
  duration: string;
  seats: number;
}

export interface CollegeResponse {
  id: number;
  name: string;
  location: string;
  stream: string;
  category: string;
  nirfRank: number;
  naacGrade?: string | null;
  annualFees: number;
  rating: number;
  image: string;
  established?: number | null;
  campusSize?: number | null;
  phdFacultyPct?: number | null;
  ratingAcademics?: number | null;
  ratingPlacements?: number | null;
  ratingInfrastructure?: number | null;
  ratingCampusLife?: number | null;
  facilities?: string[] | any;
  courses: CourseData[] | Record<string, CourseData>;
}

// Normalized internal structure for component rendering
export interface College {
  id: number;
  name: string;
  location: string;
  type: string;
  established: number;
  campusSize: number;
  naacGrade: string;
  phdFacultyPct: number;
  nirfRank: number;
  overallRating: number;
  ratingsBreakdown: {
    academics: number;
    placements: number;
    infrastructure: number;
    campusLife: number;
  };
  facilities: string[];
  courses: Record<string, CourseData>;
}

type MatrixTab =
  | "overview"
  | "placements"
  | "fees"
  | "infrastructure"
  | "reviews";

export default function CompareColleges() {
  const [slots, setSlots] = useState<(number | null)[]>([null, null, null]);
  const [selectedColleges, setSelectedColleges] = useState<
    Record<number, College>
  >({});
  const [selectedStreams, setSelectedStreams] = useState<
    Record<number, string>
  >({
    0: "cse",
    1: "cse",
    2: "cse",
  });
  const [activeTab, setActiveTab] = useState<MatrixTab>("overview");
  const [showDiffsOnly, setShowDiffsOnly] = useState<boolean>(false);

  // Search & Async API Loading States
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<College[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize API data to internal component structure
  const normalizeCollegeData = useCallback((data: CollegeResponse): College => {
    let coursesMap: Record<string, CourseData> = {};
    if (Array.isArray(data.courses)) {
      data.courses.forEach((c) => {
        coursesMap[
          c.key || (c.name.toLowerCase().includes("electric") ? "ece" : "cse")
        ] = c;
      });
    } else if (data.courses && typeof data.courses === "object") {
      coursesMap = data.courses;
    }

    let parsedFacilities: string[] = [];
    if (Array.isArray(data.facilities)) {
      parsedFacilities = data.facilities;
    } else if (typeof data.facilities === "string") {
      try {
        parsedFacilities = JSON.parse(data.facilities);
      } catch {
        parsedFacilities = [];
      }
    }

    return {
      id: data.id,
      name: data.name,
      location: data.location,
      type: data.category
        ? data.category.charAt(0).toUpperCase() + data.category.slice(1)
        : "Government",
      established: data.established || 1960,
      campusSize: data.campusSize || 0,
      naacGrade: data.naacGrade || "N/A",
      phdFacultyPct: data.phdFacultyPct || 0,
      nirfRank: data.nirfRank,
      overallRating: data.rating || 0.0,
      ratingsBreakdown: {
        academics: data.ratingAcademics || 0.0,
        placements: data.ratingPlacements || 0.0,
        infrastructure: data.ratingInfrastructure || 0.0,
        campusLife: data.ratingCampusLife || 0.0,
      },
      facilities: parsedFacilities,
      courses: coursesMap,
    };
  }, []);

  // Fetch colleges dynamically from Backend API via apiClient
  const fetchColleges = useCallback(
    async (query: string) => {
      setIsLoadingSearch(true);
      try {
        const response = await apiClient.get("/colleges", {
          params: query.trim() ? { search: query.trim() } : undefined,
        });

        // Handles both raw array and paginated { data: [...] } responses safely
        const rawList = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const normalized = rawList.map(normalizeCollegeData);
        setSearchResults(normalized);
      } catch (err) {
        console.error("Error fetching colleges for comparison:", err);
        setSearchResults([]);
      } finally {
        setIsLoadingSearch(false);
      }
    },
    [normalizeCollegeData],
  );

  // Initial load and debounced search triggers
  useEffect(() => {
    if (activeSearchIndex !== null) {
      const timer = setTimeout(() => {
        fetchColleges(searchQuery);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, activeSearchIndex, fetchColleges]);

  // Handle outside click to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveSearchIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadedColleges = useMemo(() => {
    return slots.map((id) =>
      id !== null ? selectedColleges[id] || null : null,
    );
  }, [slots, selectedColleges]);

  const activeCount = useMemo(() => slots.filter(Boolean).length, [slots]);

  const filteredCollegesOptions = useMemo(() => {
    const selectedIds = slots.filter((id): id is number => id !== null);
    return searchResults.filter((c) => !selectedIds.includes(c.id));
  }, [searchResults, slots]);

  const handleSelectCollege = (index: number, college: College) => {
    const updatedSlots = [...slots];
    updatedSlots[index] = college.id;

    setSelectedColleges((prev) => ({ ...prev, [college.id]: college }));
    setSlots(updatedSlots);

    const availableStreamKeys = Object.keys(college.courses);
    if (availableStreamKeys.length > 0) {
      setSelectedStreams((prev) => ({
        ...prev,
        [index]: availableStreamKeys[0],
      }));
    }

    setActiveSearchIndex(null);
    setSearchQuery("");
  };

  const handleRemoveSlot = (index: number) => {
    const updated = [...slots];
    updated[index] = null;
    setSlots(updated);
  };

  const handleStreamChange = (index: number, streamKey: string) => {
    setSelectedStreams((prev) => ({ ...prev, [index]: streamKey }));
  };

  const clearAllSlots = () => {
    setSlots([null, null, null]);
    setSelectedStreams({ 0: "cse", 1: "cse", 2: "cse" });
  };

  const checkIsWinner = (
    currentVal: number,
    allVals: number[],
    logic: "higher" | "lower",
  ): boolean => {
    if (allVals.length < 2) return false;
    const cleanVals = allVals.filter((v) => v !== undefined && !isNaN(v));
    if (cleanVals.length === 0) return false;
    const target =
      logic === "higher" ? Math.max(...cleanVals) : Math.min(...cleanVals);
    return currentVal === target;
  };

  const evaluateRowUniformity = (valuesArray: any[]): boolean => {
    const activeValues = valuesArray.filter(
      (v) => v !== undefined && v !== null,
    );
    if (activeValues.length <= 1) return false;
    return activeValues.every(
      (val) => JSON.stringify(val) === JSON.stringify(activeValues[0]),
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-24 transition-colors duration-200">
      {/* VEHICLE GRADIENT HERO HEADER */}
      <div className="bg-[var(--color-bg-hero)] text-white py-12 px-6 lg:px-16 shadow-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-white/90 font-bold text-xs tracking-wider uppercase bg-white/10 px-3 py-1 rounded-full w-max border border-white/10">
              <Sparkles size={14} /> Ultimate Selection Matrix
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
              College Comparison Hub
            </h1>
            <p className="text-white/80 text-xs md:text-sm max-w-xl mt-2 font-light leading-relaxed">
              Compare up to three premier institutes side-by-side. Switch fields
              dynamically to reference localized placement packages, threshold
              cutoffs, and verified infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              <Download size={14} /> Export Report
            </button>
          </div>
        </div>
      </div>

      {/* THREE-SLOT SELECTION INTERACTIVE PANEL */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {slots.map((slotId, index) => {
            const college = loadedColleges[index];
            return (
              <div
                key={index}
                className={`bg-[var(--color-bg-surface)] rounded-2xl p-5 border transition-all duration-200 relative ${
                  college
                    ? "border-[var(--color-brand-accent)]/30 shadow-xs"
                    : "border-dashed border-[var(--color-border-default)] shadow-xs"
                }`}
              >
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[var(--color-bg-main)] text-[var(--color-text-caption)] px-2 py-0.5 rounded-md border border-[var(--color-border-default)]">
                    Slot 0{index + 1}
                  </span>
                  {college && (
                    <button
                      onClick={() => handleRemoveSlot(index)}
                      className="text-[var(--color-text-caption)] hover:text-rose-500 p-1 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                {college ? (
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[var(--color-brand-accent)] font-bold text-xs uppercase tracking-wide">
                        <Award size={12} /> NIRF National Rank #
                        {college.nirfRank}
                      </div>
                      <h3 className="font-bold text-sm md:text-base mt-1 text-[var(--color-text-primary)] line-clamp-2 pr-12 min-h-[48px]">
                        {college.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[var(--color-text-caption)] text-xs mt-1">
                        <MapPin size={12} className="shrink-0" />
                        <span>{college.location}</span>
                      </div>
                    </div>

                    <div className="bg-[var(--color-bg-main)] p-2.5 rounded-xl border border-[var(--color-border-default)]">
                      <label className="block text-[10px] font-bold uppercase text-[var(--color-text-caption)] tracking-wider mb-1">
                        Compare Stream / Degree
                      </label>
                      <div className="relative">
                        <select
                          value={selectedStreams[index] || ""}
                          onChange={(e) =>
                            handleStreamChange(index, e.target.value)
                          }
                          className="w-full bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] font-bold text-xs py-1.5 pl-2 pr-8 border border-[var(--color-border-default)] rounded-lg outline-none appearance-none cursor-pointer focus:border-[var(--color-brand-accent)]"
                        >
                          {Object.keys(college.courses).length > 0 ? (
                            Object.keys(college.courses).map((streamKey) => (
                              <option key={streamKey} value={streamKey}>
                                {college.courses[streamKey]?.name ||
                                  streamKey.toUpperCase()}
                              </option>
                            ))
                          ) : (
                            <option value="">No Course Options</option>
                          )}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-caption)] pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 pb-2 relative">
                    <p className="text-xs font-bold text-[var(--color-text-caption)] mb-2">
                      Assign Institution Component
                    </p>
                    {activeSearchIndex === index ? (
                      <div ref={dropdownRef} className="space-y-2">
                        <div className="flex items-center bg-[var(--color-bg-main)] border border-[var(--color-brand-accent)] rounded-xl px-3 py-2">
                          <Search
                            size={16}
                            className="text-[var(--color-brand-accent)] mr-2"
                          />
                          <input
                            type="text"
                            placeholder="Type to find college..."
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none outline-none text-xs text-[var(--color-text-primary)]"
                          />
                          {isLoadingSearch ? (
                            <Loader2
                              size={14}
                              className="animate-spin text-[var(--color-brand-accent)]"
                            />
                          ) : (
                            <button
                              onClick={() => {
                                setActiveSearchIndex(null);
                                setSearchQuery("");
                              }}
                              className="text-[var(--color-text-caption)]"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>

                        <div className="absolute left-0 right-0 top-[102%] bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-xl shadow-xl max-h-52 overflow-y-auto z-40 p-1">
                          {filteredCollegesOptions.length > 0 ? (
                            filteredCollegesOptions.map((c) => (
                              <button
                                key={c.id}
                                onClick={() => handleSelectCollege(index, c)}
                                className="w-full text-left p-2.5 hover:bg-[var(--color-bg-main)] rounded-lg transition-colors flex flex-col gap-0.5 cursor-pointer"
                              >
                                <span className="text-xs font-bold text-[var(--color-text-primary)] line-clamp-1">
                                  {c.name}
                                </span>
                                <span className="text-[10px] text-[var(--color-text-caption)]">
                                  {c.location} • NIRF #{c.nirfRank}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="text-center py-4 text-xs text-[var(--color-text-caption)]">
                              {isLoadingSearch
                                ? "Searching colleges..."
                                : "No matching colleges found"}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveSearchIndex(index);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--color-bg-main)] hover:bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-xl py-6 text-xs text-[var(--color-text-secondary)] font-bold group transition-all cursor-pointer"
                      >
                        <Plus
                          size={16}
                          className="text-[var(--color-text-caption)] group-hover:text-[var(--color-brand-accent)] transition-colors"
                        />
                        <span>Search & Append College</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CONTROLS & REGISTRY TAB-BAR */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] p-4 rounded-2xl shadow-xs">
          <div className="flex items-center overflow-x-auto gap-1 no-scrollbar">
            {(
              [
                "overview",
                "placements",
                "fees",
                "infrastructure",
                "reviews",
              ] as MatrixTab[]
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)]"
                }`}
              >
                {tab === "reviews"
                  ? "Student Reviews"
                  : tab === "fees"
                    ? "Fees & ROI"
                    : tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-secondary)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiffsOnly}
                onChange={(e) => setShowDiffsOnly(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--color-border-default)] accent-[var(--color-brand-accent)] cursor-pointer focus:ring-0"
              />
              <span className="flex items-center gap-1">
                <Filter size={13} /> Show Differences Only
              </span>
            </label>

            {activeCount > 0 && (
              <button
                onClick={clearAllSlots}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 bg-rose-500/5 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/10 transition-colors cursor-pointer"
              >
                Reset Canvas
              </button>
            )}
          </div>
        </div>

        {/* COMPARISON GRID ENGINE */}
        <div className="mt-6">
          {activeCount >= 1 ? (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl overflow-hidden shadow-xs">
              <div className="grid grid-cols-12 bg-[var(--color-bg-main)]/60 border-b border-[var(--color-border-default)] p-4 text-xs font-bold text-[var(--color-text-caption)] tracking-wider uppercase items-center">
                <div className="col-span-3">Comparison Parameter</div>
                <div className="col-span-3 text-center px-2 text-[var(--color-text-secondary)] line-clamp-1">
                  {loadedColleges[0]?.name || "Slot 1 Empty"}
                </div>
                <div className="col-span-3 text-center px-2 text-[var(--color-text-secondary)] line-clamp-1">
                  {loadedColleges[1]?.name || "Slot 2 Empty"}
                </div>
                <div className="col-span-3 text-center px-2 text-[var(--color-text-secondary)] line-clamp-1">
                  {loadedColleges[2]?.name || "Slot 3 Empty"}
                </div>
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <>
                  <DataRow
                    label="NIRF Standing Rank"
                    values={loadedColleges.map((c) =>
                      c ? `#${c.nirfRank}` : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.nirfRank),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c) =>
                        !!c &&
                        checkIsWinner(
                          c.nirfRank,
                          loadedColleges.map(
                            (col) => col?.nirfRank || Infinity,
                          ),
                          "lower",
                        ),
                    )}
                  />
                  <DataRow
                    label="University Ownership"
                    values={loadedColleges.map((c) => c?.type || null)}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.type),
                    )}
                    hideRow={showDiffsOnly}
                  />
                  <DataRow
                    label="Established Year"
                    values={loadedColleges.map((c) =>
                      c ? `${c.established}` : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.established),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c) =>
                        !!c &&
                        checkIsWinner(
                          c.established,
                          loadedColleges.map(
                            (col) => col?.established || Infinity,
                          ),
                          "lower",
                        ),
                    )}
                  />
                  <DataRow
                    label="Campus Size"
                    values={loadedColleges.map((c) =>
                      c ? `${c.campusSize} Acres` : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.campusSize),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c) =>
                        !!c &&
                        checkIsWinner(
                          c.campusSize,
                          loadedColleges.map((col) => col?.campusSize || 0),
                          "higher",
                        ),
                    )}
                  />
                  <DataRow
                    label="NAAC Accreditation"
                    values={loadedColleges.map((c) => (c ? c.naacGrade : null))}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.naacGrade),
                    )}
                    hideRow={showDiffsOnly}
                  />
                  <DataRow
                    label="Assigned Course Degree"
                    values={loadedColleges.map((c, i) =>
                      c ? c.courses[selectedStreams[i]]?.name || "N/A" : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.name,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                  />
                </>
              )}

              {/* PLACEMENTS TAB */}
              {activeTab === "placements" && (
                <>
                  <div className="bg-[var(--color-bg-main)]/40 px-4 py-2.5 text-[10px] font-black tracking-widest text-[var(--color-text-caption)] uppercase border-b border-[var(--color-border-default)] flex items-center gap-1.5">
                    <Briefcase
                      size={12}
                      className="text-[var(--color-brand-accent)]"
                    />{" "}
                    Placement Performance Breakdown
                  </div>
                  <DataRow
                    label="Average Package (CTC)"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? `₹${c.courses[selectedStreams[i]].avgPackage} LPA`
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.avgPackage,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c, i) =>
                        !!c &&
                        checkIsWinner(
                          c.courses[selectedStreams[i]]?.avgPackage || 0,
                          loadedColleges.map(
                            (col, idx) =>
                              col?.courses[selectedStreams[idx]]?.avgPackage ||
                              0,
                          ),
                          "higher",
                        ),
                    )}
                  />
                  <DataRow
                    label="Median Package (Real)"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? `₹${c.courses[selectedStreams[i]].medianPackage} LPA`
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.medianPackage,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c, i) =>
                        !!c &&
                        checkIsWinner(
                          c.courses[selectedStreams[i]]?.medianPackage || 0,
                          loadedColleges.map(
                            (col, idx) =>
                              col?.courses[selectedStreams[idx]]
                                ?.medianPackage || 0,
                          ),
                          "higher",
                        ),
                    )}
                  />
                  <DataRow
                    label="Batch Placement Rate"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? `${c.courses[selectedStreams[i]].placementRate}% Placed`
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.placementRate,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c, i) =>
                        !!c &&
                        checkIsWinner(
                          c.courses[selectedStreams[i]]?.placementRate || 0,
                          loadedColleges.map(
                            (col, idx) =>
                              col?.courses[selectedStreams[idx]]
                                ?.placementRate || 0,
                          ),
                          "higher",
                        ),
                    )}
                  />
                  <DataRow
                    label="Highest Salary Package"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? `₹${c.courses[selectedStreams[i]].highestPackage} LPA`
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) =>
                          c?.courses[selectedStreams[i]]?.highestPackage,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c, i) =>
                        !!c &&
                        checkIsWinner(
                          c.courses[selectedStreams[i]]?.highestPackage || 0,
                          loadedColleges.map(
                            (col, idx) =>
                              col?.courses[selectedStreams[idx]]
                                ?.highestPackage || 0,
                          ),
                          "higher",
                        ),
                    )}
                  />
                </>
              )}

              {/* FEES & ROI TAB */}
              {activeTab === "fees" && (
                <>
                  <div className="bg-[var(--color-bg-main)]/40 px-4 py-2.5 text-[10px] font-black tracking-widest text-[var(--color-text-caption)] uppercase border-b border-[var(--color-border-default)] flex items-center gap-1.5">
                    <FileCheck
                      size={12}
                      className="text-[var(--color-brand-accent)]"
                    />{" "}
                    Admission Requirement & Costs
                  </div>
                  <DataRow
                    label="Accepted Exams"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? c.courses[selectedStreams[i]].acceptedExams
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.acceptedExams,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                  />
                  <DataRow
                    label="Annual Tuition Fee"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? `₹${c.courses[selectedStreams[i]].fees.toLocaleString("en-IN")}`
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.fees,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c, i) =>
                        !!c &&
                        checkIsWinner(
                          c.courses[selectedStreams[i]]?.fees || Infinity,
                          loadedColleges.map(
                            (col, idx) =>
                              col?.courses[selectedStreams[idx]]?.fees ||
                              Infinity,
                          ),
                          "lower",
                        ),
                    )}
                  />
                  <DataRow
                    label="Annual Hostel & Mess Cost"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? `₹${c.courses[selectedStreams[i]].hostelFees.toLocaleString("en-IN")}`
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.hostelFees,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c, i) =>
                        !!c &&
                        checkIsWinner(
                          c.courses[selectedStreams[i]]?.hostelFees || Infinity,
                          loadedColleges.map(
                            (col, idx) =>
                              col?.courses[selectedStreams[idx]]?.hostelFees ||
                              Infinity,
                          ),
                          "lower",
                        ),
                    )}
                  />
                  <DataRow
                    label="Allotment Cutoff Threshold"
                    values={loadedColleges.map((c, i) =>
                      c && c.courses[selectedStreams[i]]
                        ? c.courses[selectedStreams[i]].cutoff
                        : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map(
                        (c, i) => c?.courses[selectedStreams[i]]?.cutoff,
                      ),
                    )}
                    hideRow={showDiffsOnly}
                  />
                </>
              )}

              {/* INFRASTRUCTURE TAB */}
              {activeTab === "infrastructure" && (
                <>
                  <div className="bg-[var(--color-bg-main)]/40 px-4 py-2.5 text-[10px] font-black tracking-widest text-[var(--color-text-caption)] uppercase border-b border-[var(--color-border-default)] flex items-center gap-1.5">
                    <Building2
                      size={12}
                      className="text-[var(--color-brand-accent)]"
                    />{" "}
                    Physical Campus Infrastructure Checklist
                  </div>
                  <div className="grid grid-cols-12 border-b border-[var(--color-border-default)] p-4 text-xs items-start min-h-[70px]">
                    <div className="col-span-3 font-bold text-[var(--color-text-secondary)] self-center">
                      Signature On-Campus Facilities
                    </div>
                    {loadedColleges.map((college, idx) => (
                      <div
                        key={idx}
                        className="col-span-3 px-3 flex flex-wrap gap-1 justify-center"
                      >
                        {college &&
                        college.facilities &&
                        college.facilities.length > 0 ? (
                          college.facilities.map((fac, fIdx) => (
                            <span
                              key={fIdx}
                              className="bg-[var(--color-bg-main)] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[var(--color-border-default)] text-[var(--color-text-secondary)] text-center block"
                            >
                              {fac}
                            </span>
                          ))
                        ) : (
                          <span className="text-[var(--color-text-caption)] text-xs italic">
                            -
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* STUDENT REVIEWS TAB */}
              {activeTab === "reviews" && (
                <>
                  <DataRow
                    label="Aggregated Core Rating"
                    values={loadedColleges.map((c) =>
                      c ? `${c.overallRating} / 5.0` : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.overallRating),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c) =>
                        !!c &&
                        checkIsWinner(
                          c.overallRating,
                          loadedColleges.map((col) => col?.overallRating || 0),
                          "higher",
                        ),
                    )}
                  />
                  <DataRow
                    label="Faculty with Ph.D. (%)"
                    values={loadedColleges.map((c) =>
                      c ? `${c.phdFacultyPct}%` : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.phdFacultyPct),
                    )}
                    hideRow={showDiffsOnly}
                    winners={loadedColleges.map(
                      (c) =>
                        !!c &&
                        checkIsWinner(
                          c.phdFacultyPct,
                          loadedColleges.map((col) => col?.phdFacultyPct || 0),
                          "higher",
                        ),
                    )}
                  />
                  <div className="bg-[var(--color-bg-main)]/40 px-4 py-2.5 text-[10px] font-black tracking-widest text-[var(--color-text-caption)] uppercase border-b border-[var(--color-border-default)] flex items-center gap-1.5">
                    <Star size={12} className="text-amber-500" /> Scorecard
                    Breakdown Dimensions
                  </div>
                  <DataRow
                    label="Academic Rigor Scoring"
                    values={loadedColleges.map((c) =>
                      c ? `${c.ratingsBreakdown.academics}★` : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.ratingsBreakdown.academics),
                    )}
                    hideRow={showDiffsOnly}
                  />
                  <DataRow
                    label="Placement Cell Efficacy"
                    values={loadedColleges.map((c) =>
                      c ? `${c.ratingsBreakdown.placements}★` : null,
                    )}
                    isUniform={evaluateRowUniformity(
                      loadedColleges.map((c) => c?.ratingsBreakdown.placements),
                    )}
                    hideRow={showDiffsOnly}
                  />
                </>
              )}
            </div>
          ) : (
            <div className="border border-[var(--color-border-default)] border-dashed rounded-3xl p-16 text-center max-w-lg mx-auto bg-[var(--color-bg-surface)] mt-12">
              <div className="bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] p-4 rounded-2xl w-max mx-auto mb-4 border border-[var(--color-brand-accent)]/10">
                <ArrowUpDown size={32} />
              </div>
              <h3 className="font-bold text-[var(--color-text-primary)] text-lg">
                Awaiting Choice Insertion
              </h3>
              <p className="text-[var(--color-text-caption)] text-xs mt-2 leading-relaxed max-w-sm mx-auto">
                Populate at least one institutional slot using the search
                triggers above to activate the side-by-side matrices.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DataRowProps {
  label: string;
  values: (string | null)[];
  isUniform: boolean;
  hideRow: boolean;
  winners?: boolean[];
}

function DataRow({ label, values, isUniform, hideRow, winners }: DataRowProps) {
  if (hideRow && isUniform) return null;

  return (
    <div className="grid grid-cols-12 border-b border-[var(--color-border-default)] p-4 text-xs font-bold items-center transition-colors hover:bg-[var(--color-bg-main)]/30">
      <div className="col-span-3 text-[var(--color-text-secondary)] font-medium">
        {label}
      </div>
      {values.map((value, idx) => {
        const isWinner = winners ? winners[idx] : false;
        return (
          <div key={idx} className="col-span-3 px-2 text-center">
            {value !== null ? (
              <div className="inline-flex items-center justify-center gap-1">
                <span
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    isWinner
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border-emerald-500/20"
                      : "text-[var(--color-text-primary)] border-transparent"
                  }`}
                >
                  {value}
                </span>
                {isWinner && (
                  <Check size={12} className="text-emerald-500 shrink-0" />
                )}
              </div>
            ) : (
              <span className="text-[var(--color-text-caption)] font-normal italic">
                Unassigned
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
