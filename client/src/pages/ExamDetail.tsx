// src/pages/ExamDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Building2,
  FileText,
  Laptop,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Award,
  GraduationCap,
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
  status: string;
  timeline: ExamTimeline;
  eligibility: string;
  targetColleges: string;
}

// Helper to get status label and styles
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

export default function ExamDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [exam, setExam] = useState<EntranceExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/entrance-exams/${id}`);
        setExam(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load exam details.",
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExam();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[var(--color-brand-accent)] animate-spin" />
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)] flex flex-col items-center justify-center gap-4 p-6">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
          {error || "Exam not found"}
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-4 py-2 bg-[var(--color-brand-accent)] text-white rounded-xl hover:opacity-90 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const statusInfo = getStatusInfo(exam.status);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-16 transition-colors duration-200">
      {/* HERO HEADER */}
      <div className="bg-[var(--color-bg-hero)] text-white py-12 px-6 md:px-20 shadow-md">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full">
                Entrance Exam
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
                {exam.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {exam.conductingBody}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" />
                  {exam.stream}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusInfo.styles}`}
                >
                  {statusInfo.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <Laptop className="w-4 h-4" />
              <span className="text-sm font-semibold">{exam.mode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Schedule & Eligibility Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-caption)] text-xs font-bold uppercase tracking-wider mb-3">
                <Calendar className="w-4 h-4" />
                Key Schedule
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-[var(--color-text-caption)]">
                    Registration:
                  </span>
                  <p className="font-semibold">
                    {exam.timeline?.registration || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-[var(--color-text-caption)]">
                    Exam Dates:
                  </span>
                  <p className="font-semibold">
                    {exam.timeline?.examDates || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-caption)] text-xs font-bold uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4" />
                Eligibility Criteria
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {exam.eligibility || "N/A"}
              </p>
            </div>
          </div>

          {/* Target Colleges */}
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[var(--color-brand-accent)]" />
              Accepting Institutions
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {exam.targetColleges || "Information not available"}
            </p>
          </div>
        </div>

        {/* RIGHT SIDEBAR: Quick Actions */}
        <div className="space-y-6">
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-sm sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-4">
              Quick Actions
            </h3>
            <button className="w-full py-3 cursor-pointer bg-[var(--color-brand-accent)] text-white font-semibold rounded-xl hover:opacity-90 transition">
              Apply Now
            </button>
            <button className="w-full mt-3 py-3 cursor-pointer border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-semibold rounded-xl hover:bg-[var(--color-bg-main)] transition">
              Download Syllabus
            </button>
            <div className="mt-6 pt-6 border-t border-[var(--color-border-default)]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-caption)]">Status</span>
                <span
                  className={`font-bold ${statusInfo.styles} px-2 py-0.5 rounded-full text-xs`}
                >
                  {statusInfo.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-[var(--color-text-caption)]">Mode</span>
                <span className="font-bold">{exam.mode}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-[var(--color-text-caption)]">Stream</span>
                <span className="font-bold capitalize">{exam.stream}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
