import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import apiClient from "@/api/client";

// ============================================================
// TYPES
// ============================================================
interface ExamTimeline {
  registration: string;
  examDates: string;
}

interface EntranceExam {
  id: string;
  name: string;
  stream: string;
  conductingBody: string;
  mode: string;
  status: string; // "open", "upcoming", "closed"
  timeline: ExamTimeline;
  eligibility: string;
  targetColleges: string;
}

// ============================================================
// CONSTANTS
// ============================================================
const STREAMS = ["All", "Engineering", "Medical", "Management", "Law"];

// Map UI stream labels to backend values (lowercase)
const STREAM_MAP: Record<string, string | null> = {
  All: null,
  Engineering: "engineering",
  Medical: "medical",
  Management: "management",
  Law: "law",
};

// Helper to get status styles and display label
const getStatusInfo = (status: string) => {
  switch (status?.toLowerCase()) {
    case "open":
      return {
        label: "Applications Open",
        styles:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      };
    case "upcoming":
      return {
        label: "Upcoming",
        styles:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      };
    case "closed":
      return {
        label: "Closed",
        styles:
          "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      };
    default:
      return {
        label: status || "N/A",
        styles: "bg-neutral-500/10 text-text-caption border-border-default/40",
      };
  }
};

// Helper to safely extract array from API response
const extractArrayData = (data: unknown): EntranceExam[] => {
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

export default function TopEntranceExams() {
  const navigate = useNavigate();
  const [activeStream, setActiveStream] = useState("All");

  // Data state
  const [exams, setExams] = useState<EntranceExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch function
  const fetchExams = useCallback(async (stream: string) => {
    setLoading(true);
    setError(null);

    try {
      // Only send parameters that are accepted by the backend DTO
      const params: Record<string, string> = {};

      const backendStream = STREAM_MAP[stream];
      if (backendStream) {
        params.stream = backendStream;
      }

      // No 'limit' or 'sort' – these are not in GetEntranceExamsDto
      const response = await apiClient.get("/entrance-exams", { params });
      const data = extractArrayData(response.data);

      // Show only the first 3 exams (frontend slicing)
      setExams(data.slice(0, 3));
    } catch (err: any) {
      if (err.name === "AbortError" || err.name === "CanceledError") return;
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load entrance exams.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch when stream filter changes
  useEffect(() => {
    const abortController = new AbortController();
    fetchExams(activeStream);
    return () => abortController.abort();
  }, [activeStream, fetchExams]);

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
            onClick={() => fetchExams(activeStream)}
            className="mt-2 px-4 py-2 text-xs font-semibold bg-brand-accent text-white rounded-xl hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (exams.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-sm text-text-caption">
            No exams found for this stream.
          </p>
        </div>
      );
    }

    return exams.map((exam) => {
      const statusInfo = getStatusInfo(exam.status);

      return (
        <div
          key={exam.id}
          className="group bg-bg-surface border border-border-default rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          {/* Top Meta */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-md border ${statusInfo.styles}`}
              >
                {statusInfo.label}
              </span>
              <span className="text-xs text-text-caption font-light">
                {exam.mode || "N/A"}
              </span>
            </div>

            <div className="mt-1">
              <h3 className="text-xl font-bold text-text-primary font-lexend tracking-tight group-hover:text-brand-accent transition-colors">
                {exam.name}
              </h3>
              <p className="text-xs text-text-caption font-light truncate mt-0.5">
                {exam.conductingBody}
              </p>
            </div>
          </div>

          {/* Timeline Info */}
          <div className="flex flex-col gap-3 py-4 border-y border-border-default/40 bg-bg-main/30 rounded-xl px-3">
            <div className="flex items-center gap-2.5 text-sm text-text-secondary">
              <Clock className="w-4 h-4 text-text-caption shrink-0" />
              <div className="flex flex-col sm:flex-row sm:gap-1.5">
                <span className="text-text-caption font-light">
                  Registration:
                </span>
                <span className="font-medium truncate">
                  {exam.timeline?.registration || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-text-secondary">
              <Calendar className="w-4 h-4 text-text-caption shrink-0" />
              <div className="flex flex-col sm:flex-row sm:gap-1.5">
                <span className="text-text-caption font-light">Exam Date:</span>
                <span className="font-semibold text-text-primary truncate">
                  {exam.timeline?.examDates || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              onClick={() => navigate(`/exam/${exam.id}`)}
              className="w-full text-center py-2.5 border border-border-default hover:border-brand-accent rounded-xl text-xs font-bold text-text-secondary hover:text-brand-accent transition-all cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={() => navigate(`/exam/${exam.id}/apply`)}
              className="w-full text-center py-2.5 bg-brand-accent hover:bg-brand-hover text-white rounded-xl text-xs font-bold shadow-sm shadow-brand-accent/10 transition-all cursor-pointer flex items-center justify-center gap-1 group/btn"
            >
              Apply Now
              <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="w-full bg-bg-main py-20 px-6 sm:px-10 lg:px-24 border-b border-border-default transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-default/60 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
              Upcoming 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-lexend">
              Top Entrance Exams
            </h2>
          </div>

          {/* Stream Filters */}
          <div className="flex flex-wrap gap-2 bg-bg-surface p-1.5 rounded-xl border border-border-default shadow-sm w-fit self-start md:self-end">
            {STREAMS.map((stream) => (
              <button
                key={stream}
                onClick={() => setActiveStream(stream)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeStream === stream
                    ? "bg-brand-accent text-white shadow-sm font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-main/50"
                }`}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
