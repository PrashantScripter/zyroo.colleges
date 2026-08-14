// src/pages/BlogDetail.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Heart,
  Eye,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Tag,
  User,
} from "lucide-react";
import apiClient from "@/api/client";

// ============================================================
// TYPES
// ============================================================
interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorType: string;
  tags: string[];
  likes: number;
  views: number;
  publishedAt: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
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

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/blogs/${id}`);
        setPost(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load blog post.",
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-accent animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center gap-4 p-6">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-text-primary">
          {error || "Post not found"}
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-4 py-2 bg-brand-accent text-white rounded-xl hover:opacity-90 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-lexend pb-16 transition-colors duration-200">
      {/* HERO HEADER */}
      <div className="bg-bg-hero text-white py-12 px-6 md:px-20 shadow-md">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full">
              Blog
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {formatNumber(post.views)} views
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                {formatNumber(post.likes)} likes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-8">
        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden shadow-sm mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[480px] object-cover"
          />
        </div>

        {/* Category & Author Type */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-highlight text-brand-accent border border-brand-accent/10">
            {post.category}
          </span>
          <span className="text-xs font-medium text-text-caption">
            {post.authorType}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="text-text-secondary leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border-default">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs font-medium bg-bg-surface border border-border-default px-3 py-1.5 rounded-full text-text-secondary"
                >
                  <Tag className="w-3 h-3" />#{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions (optional) */}
        <div className="mt-10 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium cursor-pointer text-text-caption hover:text-brand-accent transition-colors"
          >
            ← Back to posts
          </button>
        </div>
      </div>
    </div>
  );
}
