import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  ArrowUpRight,
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
  location: string; // e.g., "Delhi, Delhi" or "Bangalore, Karnataka"
  stream: string;
  category: string;
  nirfRank: number;
  annualFees: number;
  rating: number;
  image: string;
}

interface CityData {
  id: string; // slug for URL param
  name: string; // city name
  collegeCount: number; // actual count
  tag: string; // descriptive tag
  image: string; // city image URL (static for now)
}

// ============================================================
// CONSTANTS
// ============================================================
const getCityTag = (cityName: string): string => {
  const tagMap: Record<string, string> = {
    Delhi: "Capital Hub",
    Bangalore: "IT & Tech Hub",
    Mumbai: "Finance & Arts",
    Pune: "Oxford of the East",
    Hyderabad: "Engineering Hub",
    Chennai: "Automobile & Research",
    Kolkata: "Cultural Hub",
    Ahmedabad: "Business Hub",
    Jaipur: "Pink City",
    Lucknow: "Nawabi City",
  };
  return tagMap[cityName] || "Education Hub";
};

const getCitySlug = (cityName: string): string => {
  return cityName.toLowerCase().replace(/\s+/g, "-");
};

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

const FALLBACK_CITY_IMAGE = "city.png";

export default function StudyDestinations() {
  const navigate = useNavigate();
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Use limit=100 (max allowed by backend)
      const response = await apiClient.get("/colleges", {
        params: { limit: 100 },
      });
      const colleges = extractArrayData(response.data);

      const cityMap = new Map<string, { count: number; state: string }>();

      colleges.forEach((college) => {
        if (!college.location) return;
        const parts = college.location.split(",").map((s) => s.trim());
        const city = parts[0];
        const state = parts[1] || "";
        if (!city) return;

        const key = city.toLowerCase();
        const existing = cityMap.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          cityMap.set(key, { count: 1, state });
        }
      });

      const sorted = Array.from(cityMap.entries())
        .map(([key, { count, state }]) => {
          const originalCity =
            colleges
              .find(
                (c) =>
                  c.location &&
                  c.location.split(",")[0].trim().toLowerCase() === key,
              )
              ?.location.split(",")[0]
              .trim() || key.replace(/^./, (s) => s.toUpperCase());

          return {
            id: getCitySlug(originalCity),
            name: originalCity,
            collegeCount: count,
            tag: getCityTag(originalCity),
            image: FALLBACK_CITY_IMAGE,
            state,
          };
        })
        .sort((a, b) => b.collegeCount - a.collegeCount)
        .slice(0, 6);

      setCities(sorted);
    } catch (err: any) {
      if (err.name === "AbortError" || err.name === "CanceledError") return;
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load study destinations.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetchCities();
    return () => abortController.abort();
  }, [fetchCities]);

  // Render helper (unchanged)
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
            onClick={fetchCities}
            className="mt-2 px-4 py-2 text-xs font-semibold bg-brand-accent text-white rounded-xl hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    if (cities.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-sm text-text-caption">
            No study destinations found.
          </p>
        </div>
      );
    }

    return cities.map((city) => (
      <div
        key={city.id}
        onClick={() => navigate(`/find-colleges?city=${city.id}`)}
        className="group relative h-64 rounded-2xl overflow-hidden shadow-sm border border-border-default/40 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
          src={city.image}
          alt={`${city.name} skyline`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300" />

        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-lg">
            {city.tag}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-60 group-hover:opacity-100 group-hover:bg-brand-accent group-hover:border-transparent transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-red-400 shrink-0" />
            <h3 className="text-xl font-bold font-lexend tracking-tight">
              {city.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-300 pl-5 font-light mt-0.5">
            <Building2 className="w-3.5 h-3.5 opacity-70" />
            <span>{city.collegeCount} Colleges</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="w-full bg-bg-main py-20 px-6 sm:px-10 lg:px-24 border-b border-border-default transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <span className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-3">
          Study Destinations
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight text-center font-lexend">
          Explore Top Study Cities
        </h2>
        <p className="mt-4 max-w-2xl text-center text-sm sm:text-base text-text-caption font-light leading-relaxed">
          Discover India's premier educational hubs. Filter universities by
          location, browse campuses, and find your ideal learning ecosystem.
        </p>

        <div className="mt-14 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
