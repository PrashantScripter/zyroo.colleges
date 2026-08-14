import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Calendar,
  GraduationCap,
  Clock,
  Building2,
  SlidersHorizontal,
  RefreshCw,
  ChevronRight,
  Check,
  FileText,
  Laptop,
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
import apiClient from "@/api/client"; // Adjust path if client.ts is located elsewhere (e.g., "@/lib/client")
import { useNavigate } from "react-router-dom";

export interface ExamTimeline {
  registration: string;
  examDates: string;
}

export interface EntranceExam {
  id: string;
  name: string;
  stream: string;
  conductingBody: string;
  mode: string;
  status: "open" | "upcoming" | "closed" | string;
  timeline: ExamTimeline;
  eligibility: string;
  targetColleges: string;
}

const STREAM_OPTIONS = [
  { value: "engineering", label: "Engineering & Architecture" },
  { value: "medical", label: "Medical & Life Sciences" },
  { value: "management", label: "Management & MBA" },
  { value: "law", label: "Law Studies" },
  { value: "general", label: "General & Central Arts/Science" },
];

export default function EntranceExams() {
    const navigate = useNavigate();

  const [exams, setExams] = useState<EntranceExam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedStream, setSelectedStream] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");

  // Debounce search query to prevent backend spam on fast typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Exams from NestJS Backend using apiClient
  const fetchExams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string> = {};

      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      if (selectedStream !== "all") params.stream = selectedStream;
      if (selectedStatus !== "all") params.status = selectedStatus;
      if (selectedMode !== "all") params.mode = selectedMode;

      const response = await apiClient.get<EntranceExam[]>("/entrance-exams", {
        params,
      });

      setExams(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred while fetching data.",
      );
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedStream, selectedStatus, selectedMode]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedStream("all");
    setSelectedStatus("all");
    setSelectedMode("all");
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      case "upcoming":
        return "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400";
      default:
        return "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-16 transition-colors duration-200">
      {/* HEADER HERO AREA */}
      <div className="bg-[var(--color-bg-hero)] text-white py-12 px-6 md:px-20 shadow-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full">
            Admissions Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
            National Entrance Exams Directory
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mt-2 font-light">
            Stay ahead with unified schedules, structured eligibility rubrics,
            and comprehensive listings of destination campuses.
          </p>
        </div>
      </div>

      {/* CORE LAYOUT STRUCTURE */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* INTERACTIVE SIDEBAR FILTERS */}
        <div className="lg:col-span-1 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-xs h-fit lg:sticky top-6 transition-colors duration-200">
          <div className="flex items-center justify-between border-b border-[var(--color-border-default)] pb-4 mb-5">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)] text-md">
              <SlidersHorizontal
                size={18}
                className="text-[var(--color-brand-accent)]"
              />
              <span>Exam Filters</span>
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
                Search Exam / Body
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
                  placeholder="e.g., JEE, NTA..."
                  className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] placeholder-[var(--color-text-caption)]/60 border border-[var(--color-border-default)] rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--color-brand-accent)] transition-all"
                />
              </div>
            </div>

            {/* Academic Stream Filters */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2">
                Academic Stream
              </label>
              <div className="space-y-1 border border-[var(--color-border-default)] rounded-xl p-1.5 bg-[var(--color-bg-main)]">
                <button
                  type="button"
                  onClick={() => setSelectedStream("all")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedStream === "all"
                      ? "bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)]"
                  }`}
                >
                  <span>All Fields</span>
                  {selectedStream === "all" && <Check size={14} />}
                </button>

                {STREAM_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedStream(opt.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedStream === opt.value
                        ? "bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedStream === opt.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Application Status Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2">
                Registration Status
              </label>
              <Select
                value={selectedStatus}
                onValueChange={(val) => {
                  if (val) setSelectedStatus(val);
                }}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="All Timelines" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    All Timelines
                  </SelectItem>
                  <SelectItem
                    value="open"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Applications Ongoing
                  </SelectItem>
                  <SelectItem
                    value="upcoming"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Upcoming Announcements
                  </SelectItem>
                  <SelectItem
                    value="closed"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Closed For Current Cycle
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Exam Testing Mode Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-2">
                Testing Delivery Mode
              </label>
              <Select
                value={selectedMode}
                onValueChange={(val) => {
                  if (val) setSelectedMode(val);
                }}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-3.5 py-5 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue placeholder="All Formats" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <SelectItem
                    value="all"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    All Formats
                  </SelectItem>
                  <SelectItem
                    value="Online"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Online Computer Test (CBT)
                  </SelectItem>
                  <SelectItem
                    value="Offline"
                    className="text-xs font-semibold focus:bg-[var(--color-brand-highlight)] focus:text-[var(--color-brand-accent)] cursor-pointer"
                  >
                    Offline Pen & Paper
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* WORKSPACE DIRECTORY AREA */}
        <div className="lg:col-span-3 space-y-5">
          <div className="flex items-center justify-between mb-1 px-1">
            <p className="text-xs font-bold text-[var(--color-text-caption)] uppercase tracking-wider">
              {loading
                ? "Loading examinations..."
                : `Found ${exams.length} Academic Admissions Entryways`}
            </p>
            {loading && (
              <Loader2
                className="animate-spin text-[var(--color-brand-accent)]"
                size={16}
              />
            )}
          </div>

          {/* ERROR STATE */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 text-center text-rose-600 dark:text-rose-400">
              <AlertCircle size={32} className="mx-auto mb-2" />
              <p className="font-bold text-sm">Failed to load entrance exams</p>
              <p className="text-xs mt-1 opacity-80">{error}</p>
              <button
                onClick={fetchExams}
                className="mt-4 px-4 py-2 bg-rose-500 text-white font-semibold text-xs rounded-xl hover:bg-rose-600 transition-colors"
              >
                Retry Request
              </button>
            </div>
          )}

          {/* LOADING SKELETON */}
          {loading && !error && (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 animate-pulse space-y-4"
                >
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                  <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {/* DATA PRESENTATION */}
          {!loading &&
            !error &&
            exams.length > 0 &&
            exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Header Information Section */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[var(--color-border-default)] pb-4 mb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`border px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${getStatusStyle(
                          exam.status,
                        )}`}
                      >
                        <Clock size={11} /> Registration: {exam.status}
                      </span>
                      <span className="bg-[var(--color-brand-highlight)] border border-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)] text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
                        {exam.stream}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-[var(--color-text-primary)] text-lg leading-snug">
                      {exam.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-caption)] font-medium">
                      Conducted by:{" "}
                      <span className="font-semibold text-[var(--color-text-secondary)]">
                        {exam.conductingBody}
                      </span>
                    </p>
                  </div>

                  <div className="bg-[var(--color-bg-main)] border border-[var(--color-border-default)] rounded-xl px-3 py-2 flex items-center gap-2 self-start text-xs font-semibold text-[var(--color-text-secondary)]">
                    <Laptop
                      size={14}
                      className="text-[var(--color-brand-accent)]"
                    />
                    <span>{exam.mode}</span>
                  </div>
                </div>

                {/* Main Body Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  {/* Timeline Frame */}
                  <div className="space-y-1 bg-[var(--color-bg-main)]/50 p-3 rounded-xl border border-[var(--color-border-default)]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-accent)] uppercase tracking-wider">
                      <Calendar size={13} /> Key Schedule
                    </div>
                    <div className="text-xs space-y-0.5 text-[var(--color-text-secondary)] pt-1 font-medium">
                      <p>
                        <span className="text-[var(--color-text-caption)] font-normal">
                          Apply:
                        </span>{" "}
                        {exam.timeline?.registration || "N/A"}
                      </p>
                      <p>
                        <span className="text-[var(--color-text-caption)] font-normal">
                          Exam:
                        </span>{" "}
                        {exam.timeline?.examDates || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Eligibility Frame */}
                  <div className="space-y-1 bg-[var(--color-bg-main)]/50 p-3 rounded-xl border border-[var(--color-border-default)] md:col-span-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-accent)] uppercase tracking-wider">
                      <FileText size={13} /> Minimum Eligibility Criteria
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] pt-1 font-medium leading-relaxed">
                      {exam.eligibility}
                    </p>
                  </div>
                </div>

                {/* Target Colleges Footer Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="flex items-start gap-2 max-w-xl">
                    <Building2
                      size={16}
                      className="text-[var(--color-text-caption)] mt-0.5 flex-shrink-0"
                    />
                    <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed">
                      <span className="font-bold text-[var(--color-text-primary)]">
                        Accepting Institutions:
                      </span>{" "}
                      {exam.targetColleges}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/exam/${exam.id}`)}
                    className="bg-[var(--color-text-primary)] text-[var(--color-bg-main)] hover:opacity-90 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer group whitespace-nowrap self-stretch sm:self-auto"
                  >
                    <span>View Syllabus & Pattern</span>
                    <ChevronRight
                      size={14}
                      className="transform group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))}

          {/* EMPTY STATE */}
          {!loading && !error && exams.length === 0 && (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] border-dashed rounded-2xl p-12 text-center max-w-md mx-auto mt-12">
              <GraduationCap
                size={40}
                className="mx-auto text-[var(--color-text-caption)] mb-4 opacity-60"
              />
              <h3 className="font-bold text-[var(--color-text-primary)] text-md">
                No Entrance Exams Found
              </h3>
              <p className="text-[var(--color-text-caption)] text-xs mt-1.5 leading-relaxed">
                No active exams matched your current filter selection.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer hover:opacity-90"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
