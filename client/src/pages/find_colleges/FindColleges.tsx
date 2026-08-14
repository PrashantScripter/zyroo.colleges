import { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  IndianRupee,
  Award,
  BookOpen,
  SlidersHorizontal,
  RefreshCw,
  ChevronRight,
  Building2,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/api/client";
import { useNavigate } from "react-router-dom";

interface College {
  id: number;
  name: string;
  location: string;
  stream: string;
  category: string;
  nirfRank: number;
  annualFees: number;
  rating: number;
  image: string;
}

const STREAM_OPTIONS = [
  "engineering",
  "medical",
  "management",
  "law",
  "science",
  "pharmacy",
  "architecture",
  "humanities",
  "commerce",
  "dental",
];

const CATEGORY_OPTIONS = ["government", "private", "deemed"];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60";

export default function FindColleges() {
    const navigate = useNavigate();

  // Live Database State
  const [colleges, setColleges] = useState<College[]>([]);
  const [allLocations, setAllLocations] = useState<College[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Operational filtering state variables
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState("all");
  const [streamSearchQuery, setStreamSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRankTier, setSelectedRankTier] = useState("all");
  const [maxFees, setMaxFees] = useState(2000000);
  const [debouncedMaxFees, setDebouncedMaxFees] = useState(2000000);

  // Geolocation state tracking variables
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  // Helper function to safely extract array data regardless of API response wrapper
  const extractArrayData = (data: unknown): College[] => {
    if (Array.isArray(data)) return data;
    if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      Array.isArray((data as { data: unknown }).data)
    ) {
      return (data as { data: College[] }).data;
    }
    return [];
  };

  // Debounce search query to prevent rapid API spamming
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Debounce max fees slider input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMaxFees(maxFees);
    }, 200);
    return () => clearTimeout(handler);
  }, [maxFees]);

  // Initial fetch using apiClient to load master location list
  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        const response = await apiClient.get<College[]>("/colleges");
        setAllLocations(extractArrayData(response.data));
      } catch {
        setAllLocations([]);
      }
    };
    fetchMasterList();
  }, []);

  // Fetch data from NestJS Backend via apiClient with Query DTO params & AbortController
  const fetchColleges = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number> = {};

      if (debouncedSearchQuery.trim())
        params.search = debouncedSearchQuery.trim();
      if (selectedStream !== "all") params.stream = selectedStream;
      if (selectedCategory !== "all") params.category = selectedCategory;
      if (selectedRankTier !== "all") params.rankTier = selectedRankTier;
      if (selectedState !== "all") params.state = selectedState;
      if (selectedCity !== "all") params.city = selectedCity;
      if (debouncedMaxFees < 2000000) params.maxFees = debouncedMaxFees;

      const response = await apiClient.get<College[]>("/colleges", {
        params,
        signal,
      });

      setColleges(extractArrayData(response.data));
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        (err.name === "AbortError" || err.name === "CanceledError")
      ) {
        return;
      }
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load colleges from the database server.",
      );
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchColleges(controller.signal);

    return () => {
      controller.abort();
    };
  }, [
    debouncedSearchQuery,
    selectedStream,
    selectedCategory,
    selectedRankTier,
    selectedState,
    selectedCity,
    debouncedMaxFees,
  ]);

  // Dynamically extract full location choices safely
  const { uniqueStates, uniqueCities } = useMemo(() => {
    const statesSet = new Set<string>();
    const citiesSet = new Set<string>();

    const safeLocations = Array.isArray(allLocations) ? allLocations : [];
    const safeColleges = Array.isArray(colleges) ? colleges : [];

    const targetSource =
      safeLocations.length > 0 ? safeLocations : safeColleges;

    targetSource.forEach((college) => {
      if (!college || !college.location) return;
      const parts = college.location.split(",").map((p) => p.trim());
      if (parts[0]) citiesSet.add(parts[0]);
      if (parts[1]) statesSet.add(parts[1]);
    });

    return {
      uniqueStates: Array.from(statesSet).sort(),
      uniqueCities: Array.from(citiesSet).sort(),
    };
  }, [allLocations, colleges]);

  // Filter available streams list inside panel lookup container
  const filteredStreamsList = useMemo(() => {
    return STREAM_OPTIONS.filter((stream) =>
      stream.toLowerCase().includes(streamSearchQuery.toLowerCase()),
    );
  }, [streamSearchQuery]);

  // Client-side fallback pipeline ensuring array safety
  const filteredColleges = useMemo(() => {
    const list = Array.isArray(colleges) ? colleges : [];

    return list.filter((college) => {
      if (!college) return false;

      const [city, state] = college.location
        ? college.location.split(",").map((p) => p.trim())
        : ["", ""];

      const matchesSearch =
        !searchQuery ||
        college.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStream =
        selectedStream === "all" || college.stream === selectedStream;

      const matchesCategory =
        selectedCategory === "all" || college.category === selectedCategory;

      const matchesFees = (college.annualFees ?? 0) <= maxFees;

      const matchesState = selectedState === "all" || state === selectedState;

      const matchesCity = selectedCity === "all" || city === selectedCity;

      let matchesRank = true;
      if (selectedRankTier === "top10")
        matchesRank = (college.nirfRank ?? 999) <= 10;
      else if (selectedRankTier === "top30")
        matchesRank = (college.nirfRank ?? 999) <= 30;
      else if (selectedRankTier === "top100")
        matchesRank = (college.nirfRank ?? 999) <= 100;

      return (
        matchesSearch &&
        matchesStream &&
        matchesCategory &&
        matchesFees &&
        matchesRank &&
        matchesState &&
        matchesCity
      );
    });
  }, [
    colleges,
    searchQuery,
    selectedStream,
    selectedCategory,
    selectedRankTier,
    maxFees,
    selectedState,
    selectedCity,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setSelectedStream("all");
    setStreamSearchQuery("");
    setSelectedCategory("all");
    setSelectedRankTier("all");
    setMaxFees(2000000);
    setDebouncedMaxFees(2000000);
    setSelectedState("all");
    setSelectedCity("all");
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-16 transition-colors duration-200">
      {/* HERO HEADER AREA */}
      <div className="bg-[var(--color-bg-hero)] text-white py-12 px-6 md:px-20 shadow-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full">
            Official Data Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            Find Institutions
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-2 font-light">
            Filter verified cut-offs, authentic NIRF tier scores, and
            transparent annual institutional tuition ranges to evaluate your
            match.
          </p>
        </div>
      </div>

      {/* CORE CONTROL/DISPLAY LAYOUT STRUCTURE GRID */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* INTERACTIVE COMPONENT FILTER SIDEBAR */}
        <div className="lg:col-span-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-xs h-fit lg:sticky top-6 transition-colors duration-200">
          <div className="flex items-center justify-between border-b border-[var(--color-border-default)] pb-4 mb-5">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)] text-md">
              <SlidersHorizontal
                size={18}
                className="text-[var(--color-brand-accent)]"
              />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[var(--color-text-caption)] hover:text-[var(--color-brand-accent)] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RefreshCw size={12} /> Clear All
            </button>
          </div>

          <div className="space-y-6">
            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2">
                Search Name / Location
              </label>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-caption)]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., IIT, Delhi..."
                  className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] placeholder-[var(--color-text-caption)]/60 border border-[var(--color-border-default)] rounded-xl pl-10 pr-9 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-accent)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-caption)] hover:text-[var(--color-text-primary)]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Stream Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2 flex items-center gap-1">
                <BookOpen size={12} /> Academic Stream
              </label>
              <Select
                value={selectedStream}
                onValueChange={(val) => setSelectedStream(val ?? "all")}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="All Streams" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <div className="p-2 border-b border-[var(--color-border-default)]">
                    <input
                      type="text"
                      placeholder="Search stream..."
                      value={streamSearchQuery}
                      onChange={(e) => setStreamSearchQuery(e.target.value)}
                      className="w-full bg-[var(--color-bg-main)] text-xs px-2.5 py-1.5 rounded-lg border border-[var(--color-border-default)] focus:outline-none"
                    />
                  </div>
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    All Streams
                  </SelectItem>
                  {filteredStreamsList.map((stream) => (
                    <SelectItem
                      key={stream}
                      value={stream}
                      className="text-xs font-semibold uppercase focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                    >
                      {stream}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* State Region Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2 flex items-center gap-1">
                <MapPin size={12} /> State Region
              </label>
              <Select
                value={selectedState}
                onValueChange={(val) => setSelectedState(val ?? "all")}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend max-h-60 overflow-y-auto">
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    All States
                  </SelectItem>
                  {uniqueStates.map((state) => (
                    <SelectItem
                      key={state}
                      value={state}
                      className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                    >
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2 flex items-center gap-1">
                <Building2 size={12} /> City / District
              </label>
              <Select
                value={selectedCity}
                onValueChange={(val) => setSelectedCity(val ?? "all")}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend max-h-60 overflow-y-auto">
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    All Cities
                  </SelectItem>
                  {uniqueCities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                      className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2">
                Institution Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={(val) => setSelectedCategory(val ?? "all")}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    All Categories
                  </SelectItem>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-xs font-semibold uppercase focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* NIRF Rank Tier Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2 flex items-center gap-1">
                <Award size={12} /> NIRF Rank Tier
              </label>
              <Select
                value={selectedRankTier}
                onValueChange={(val) => setSelectedRankTier(val ?? "all")}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="All Ranks" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Show All Ranks
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

            {/* Maximum Annual Fees Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] flex items-center gap-1">
                  <IndianRupee size={12} /> Max Annual Fees
                </label>
                <span className="text-xs font-extrabold text-[var(--color-brand-accent)]">
                  ₹{maxFees.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={2000000}
                step={25000}
                value={maxFees}
                onChange={(e) => setMaxFees(Number(e.target.value))}
                className="w-full accent-[var(--color-brand-accent)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* WORKSPACE DISPLAY AREA */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-2 px-1">
            <p className="text-xs font-bold text-[var(--color-text-caption)] uppercase tracking-wider">
              Showing {filteredColleges.length} Verified Institutions
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
                onClick={() => fetchColleges()}
                className="mt-4 inline-flex items-center gap-2 bg-[var(--color-brand-accent)] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer hover:opacity-90 shadow-xs"
              >
                <RefreshCw size={14} /> Retry Server Connection
              </button>
            </div>
          ) : filteredColleges.length > 0 ? (
            /* DATA LISTING STATE */
            filteredColleges.map((college) => (
              <div
                key={college.id}
                className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
              >
                {/* Media Container */}
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

                {/* Core Metadata Block */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Award size={11} /> NIRF: #{college.nirfRank}
                    </span>
                    <span className="bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <BookOpen size={11} /> {college.stream}
                    </span>
                    <span className="bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Building2 size={11} /> {college.category}
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
                    <div className="flex items-center gap-1 text-[var(--color-brand-accent)] font-bold">
                      <IndianRupee size={13} />
                      <span>
                        ₹{(college.annualFees ?? 0).toLocaleString("en-IN")} /
                        yr
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Action */}
                <button onClick={() => navigate(`/institute/${college.id}`)} className="w-full sm:w-auto self-stretch sm:self-auto bg-[var(--color-text-primary)] text-[var(--color-bg-main)] hover:opacity-90 font-semibold text-xs px-4 py-2.5 sm:py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group">
                  <span>View Details</span>
                  <ChevronRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] border-dashed rounded-2xl p-12 text-center max-w-md mx-auto mt-12">
              <BookOpen
                size={40}
                className="mx-auto text-[var(--color-text-caption)] mb-4 opacity-60"
              />
              <h3 className="font-bold text-[var(--color-text-primary)] text-md">
                No Colleges Matched
              </h3>
              <p className="text-[var(--color-text-caption)] text-xs mt-1.5 leading-relaxed">
                No institutions match this specific set of filter criteria. Try
                adjusting stream, location, or max fee settings.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer hover:opacity-90"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
