
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Award,
  BookOpen,
  Building2,
  IndianRupee,
  Star,
  Calendar,
  Loader2,
  AlertCircle,
  ArrowLeft,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import apiClient from "@/api/client";

// ============================================================
// TYPES
// ============================================================
interface Course {
  id: number;
  name: string;
  key: string;
  duration: string;
  fees: number;
  avgPackage: number;
  highestPackage: number;
  seats: number;
}

interface CollegeDetail {
  id: number;
  name: string;
  location: string;
  stream: string;
  category: string;
  nirfRank: number;
  naacGrade?: string;
  annualFees: number;
  rating: number;
  image: string;
  established?: number;
  courses: Course[];
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60";

export default function UniversityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/colleges/${id}`);
        setCollege(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load college details."
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[var(--color-brand-accent)] animate-spin" />
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)] flex flex-col items-center justify-center gap-4 p-6">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
          {error || "College not found"}
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

  // helper: format currency
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-16 transition-colors duration-200">
      {/* HERO HEADER with back button */}
      <div className="bg-[var(--color-bg-hero)] text-white py-12 px-6 md:px-20 shadow-md">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center cursor-pointer gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full">
                Institution Profile
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {college.location}
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  NIRF Rank #{college.nirfRank}
                </span>
                {college.naacGrade && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    NAAC {college.naacGrade}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <span className="text-sm font-light">Rating</span>
              <span className="text-lg font-extrabold">
                {college.rating?.toFixed(1) || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 xl:px-0 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: College details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl overflow-hidden shadow-sm">
            <img
              src={college.image || FALLBACK_IMAGE}
              alt={college.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-caption)] text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" />
                Category
              </div>
              <p className="text-sm font-semibold capitalize">
                {college.category}
              </p>
            </div>
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-caption)] text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                Stream
              </div>
              <p className="text-sm font-semibold capitalize">
                {college.stream}
              </p>
            </div>
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-caption)] text-xs font-bold uppercase tracking-wider mb-2">
                <IndianRupee className="w-4 h-4" />
                Annual Fees
              </div>
              <p className="text-sm font-semibold">
                {formatCurrency(college.annualFees || 0)} / yr
              </p>
            </div>
            {college.established && (
              <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 text-[var(--color-text-caption)] text-xs font-bold uppercase tracking-wider mb-2">
                  <Calendar className="w-4 h-4" />
                  Established
                </div>
                <p className="text-sm font-semibold">{college.established}</p>
              </div>
            )}
          </div>

          {/* Courses Section */}
          {college.courses && college.courses.length > 0 && (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-[var(--color-brand-accent)]" />
                Offered Courses
              </h2>
              <div className="space-y-4">
                {college.courses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-[var(--color-border-default)] rounded-xl p-4 hover:shadow-sm transition"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[var(--color-text-primary)]">
                          {course.name} ({course.key?.toUpperCase()})
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-[var(--color-text-secondary)]">
                          <span>Duration: {course.duration || "N/A"}</span>
                          <span>Seats: {course.seats || "N/A"}</span>
                          <span>Fees: {formatCurrency(course.fees || 0)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-xs">
                        <span className="text-[var(--color-text-caption)]">
                          Avg Package
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {course.avgPackage
                            ? `₹${course.avgPackage} LPA`
                            : "N/A"}
                        </span>
                        {course.highestPackage && (
                          <span className="text-[10px] text-[var(--color-text-caption)]">
                            Highest: ₹{course.highestPackage} LPA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: Quick stats / CTA */}
        <div className="space-y-6">
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-sm sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-caption)] mb-4">
              Quick Actions
            </h3>
            <button className="w-full py-3 cursor-pointer bg-[var(--color-brand-accent)] text-white font-semibold rounded-xl hover:opacity-90 transition">
              Apply Now
            </button>
            <button
              onClick={() => navigate("/college-comparision")}
              className="w-full mt-3 py-3 cursor-pointer border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-semibold rounded-xl hover:bg-[var(--color-bg-main)] transition"
            >
              Compare
            </button>
            <div className="mt-6 pt-6 border-t border-[var(--color-border-default)]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-caption)]">
                  NIRF Rank
                </span>
                <span className="font-bold">#{college.nirfRank}</span>
              </div>
              {college.naacGrade && (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-[var(--color-text-caption)]">
                    NAAC Grade
                  </span>
                  <span className="font-bold">{college.naacGrade}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-[var(--color-text-caption)]">Rating</span>
                <span className="font-bold">
                  {college.rating?.toFixed(1) || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}