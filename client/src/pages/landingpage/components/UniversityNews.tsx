import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Heart,
  Eye,
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import apiClient from "@/api/client";

// ============================================================
// TYPES
// ============================================================
interface BlogPost {
  id: number;
  title: string;
  description: string;
  content?: string;
  image: string;
  category: string;
  author: string;
  authorType: string;
  tags: string[];
  likes: number;
  views: number;
  publishedAt: string;
}

interface UniversityNewsProps {
  limit?: number;
  showHeader?: boolean;
  showFooterButton?: boolean;
}

// ============================================================
// HELPERS
// ============================================================
const getCategoryStyles = (category: string): string => {
  const styles: Record<string, string> = {
    Admissions: "bg-blue-500 text-white",
    Events: "bg-emerald-500 text-white",
    Scholarship: "bg-amber-500 text-neutral-900",
    Announcement: "bg-purple-500 text-white",
    Exam: "bg-rose-500 text-white",
    Results: "bg-cyan-500 text-white",
  };
  return styles[category] || "bg-gray-500 text-white";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatNumber = (num: number): string => {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  return num.toString();
};

// Helper to safely extract array from API response
const extractArrayData = (data: unknown): BlogPost[] => {
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

export default function UniversityNews({
  limit = 3,
  showHeader = true,
  showFooterButton = true,
}: UniversityNewsProps) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number> = {
        limit: limit,
        sortBy: "publishedAt",
        order: "desc",
      };
      const response = await apiClient.get("/blogs", { params });
      const data = extractArrayData(response.data);
      setPosts(data);
    } catch (err: any) {
      if (err.name === "AbortError" || err.name === "CanceledError") return;
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load blog posts.",
      );
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchPosts();
    return () => abortController.abort();
  }, [fetchPosts]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-brand-accent animate-spin" />
          <p className="mt-3 text-sm text-text-caption font-medium">
            Loading latest updates...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-span-full flex flex-col items-center gap-3 py-16">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-2 px-4 py-2 text-xs font-semibold bg-brand-accent text-white rounded-xl hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="col-span-full text-center py-16">
          <p className="text-sm text-text-caption">
            No blog posts available yet.
          </p>
        </div>
      );
    }

    return posts.map((post) => {
      const categoryStyles = getCategoryStyles(post.category);
      const formattedDate = formatDate(post.publishedAt);

      return (
        <article
          key={post.id}
          className="group bg-bg-surface border border-border-default rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
          onClick={() => navigate(`/blog/${post.id}`)}
        >
          <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              src={post.image}
              alt={post.title}
            />
            <span
              className={`absolute top-4 left-4 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg shadow-sm ${categoryStyles}`}
            >
              {post.category}
            </span>
          </div>

          <div className="p-5 flex flex-col justify-between flex-grow gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-accent">
                <span className="truncate">{post.author}</span>
                <span className="text-[10px] font-normal uppercase tracking-wide px-1.5 py-0.5 rounded bg-brand-highlight border border-brand-accent/5 shrink-0">
                  {post.authorType}
                </span>
              </div>

              <h3 className="text-base font-bold text-text-primary font-lexend tracking-tight leading-snug line-clamp-2 group-hover:text-brand-accent transition-colors duration-200 mt-1">
                {post.title}
              </h3>

              <p className="text-xs text-text-caption font-light leading-relaxed line-clamp-3 mt-1">
                {post.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-text-secondary bg-bg-main/60 px-2 py-1 rounded-md border border-border-default/40 font-medium"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-[10px] text-text-caption font-light">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border-default/40 pt-4 mt-1 text-text-caption">
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4 shrink-0" />
                  {formatNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 shrink-0" />
                  {formatNumber(post.views)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-light">
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </article>
      );
    });
  };

  return (
    <section className="w-full bg-bg-main py-16 px-6 sm:px-10 lg:px-24 border-b border-border-default transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-default/60 pb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-accent font-bold block mb-2">
                Latest Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-lexend">
                Institute News & Posts
              </h2>
              <p className="mt-1.5 text-sm text-text-caption font-light">
                Official updates, announcements, and notices directly from top
                Institutes across India.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-bg-surface text-text-secondary px-4 py-2.5 rounded-xl border border-border-default text-xs font-medium shadow-sm w-fit self-start md:self-end">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Only official Institute posts</span>
            </div>
          </div>
        )}

        <div
          className={`${showHeader ? "mt-12" : "mt-2"} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
        >
          {renderContent()}
        </div>

        {showFooterButton && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => navigate("/blogs")}
              className="flex items-center gap-2 px-8 py-4 bg-brand-accent hover:bg-brand-hover active:scale-98 text-white font-semibold rounded-xl shadow-lg shadow-brand-accent/10 transition-all duration-200 cursor-pointer"
            >
              View All Blogs
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
