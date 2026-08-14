import { Sparkles } from "lucide-react";
import UniversityNews from "../landingpage/components/UniversityNews";

export default function BlogsLists() {
  return (
    <div className="min-h-screen bg-bg-main">
      {/* PREMIUM CENTRAL ARCHIVE HEADER */}
      <div className="bg-[var(--color-bg-hero)] text-white py-16 px-6 lg:px-16 shadow-md relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-white/90 font-bold text-xs tracking-wider uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10 mx-auto">
            <Sparkles size={14} className="text-amber-300" /> Academic Press &
            Insights
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-lexend">
            The Knowledge Ledger
          </h1>
          <p className="text-white/80 text-xs md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Browse through unified official compliance news, cutoff
            announcements, and timeline disclosures directly from certified
            administrative portals across the sub-continent.
          </p>
        </div>
      </div>

      {/* RENDER FULL LIST BY OMITTING LIMIT AND FOOTER BUTTON */}
      <div className="max-w-7xl mx-auto py-8">
        <UniversityNews showHeader={false} showFooterButton={false} />
      </div>
    </div>
  );
}
