import {
  Target,
  ShieldCheck,
  Cpu,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function AboutUs() {
  const stats = [
    { label: "Verified Institutes", value: "500+" },
    { label: "Data Points Tracked", value: "25,000+" },
    { label: "Student Consultations", value: "10k+" },
    { label: "Placement Records Indexed", value: "100%" },
  ];

  const pillars = [
    {
      icon: (
        <ShieldCheck className="text-[var(--color-brand-accent)]" size={24} />
      ),
      title: "Grounded Data Transparency",
      description:
        "We don't deal in hyperbole or scraped rumors. Every average package, hostel fee, and seat matrix comes directly from verified institutional audits and raw data pipelines.",
    },
    {
      icon: <Cpu className="text-[var(--color-brand-accent)]" size={24} />,
      title: "Deterministic AI matching",
      description:
        "Our AI College Predictor doesn't surf the open web to hallucinate generic advice. It uses isolated database tool-calling to evaluate real constraints against real records.",
    },
    {
      icon: <Target className="text-[var(--color-brand-accent)]" size={24} />,
      title: "Unbiased Selection Architecture",
      description:
        "We are built for students, not advertisement revenue. Our comparison engine runs on absolute metrics, offering unbiased side-by-side clarity to protect your academic future.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-24 transition-colors duration-200">
      {/* BRANDING HERO LAYER */}
      <div className="bg-[var(--color-bg-hero)] text-white py-16 px-6 lg:px-16 shadow-md relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-white/90 font-bold text-xs tracking-wider uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10 mx-auto">
            <Sparkles size={14} className="text-amber-300" /> Democratizing
            Higher Education
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            About Zyroo Colleges
          </h1>
          <p className="text-white/80 text-xs md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            We build structural analytics engines and grounded AI advisor
            systems to cut through the noise of college recruitment and help
            students make definitive, data-driven decisions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-12 space-y-16">
        {/* STATS INFOGRAPHIC ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, sIdx) => (
            <div
              key={sIdx}
              className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] p-6 rounded-2xl text-center shadow-2xs"
            >
              <div className="text-2xl md:text-3xl font-black text-[var(--color-brand-accent)]">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs font-bold text-[var(--color-text-caption)] uppercase tracking-wide mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <hr className="border-[var(--color-border-default)]" />

        {/* MISSION & VISION DUAL LAYER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--color-brand-accent)] font-bold text-xs uppercase tracking-wider">
              <GraduationCap size={16} /> The Problem We Solve
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Why we engineered Zyroo Colleges.
            </h2>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed font-medium">
              Finding the right university shouldn't feel like navigating a maze
              of hidden sponsorships and outdated forums. Most platforms
              prioritize premium listing banners over verifiable metrics.
            </p>
            <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed font-medium">
              Zyroo Colleges was built to change that. By designing objective,
              multi-slot matrices like our{" "}
              <span className="text-[var(--color-brand-accent)] font-bold">
                Comparison Hub
              </span>{" "}
              and deploying context-isolated intelligence in our{" "}
              <span className="text-[var(--color-brand-accent)] font-bold">
                AI Predictor
              </span>
              , we put raw, functional telemetry back into the hands of
              prospective candidates.
            </p>
          </div>

          <div className="bg-[var(--color-brand-highlight)]/30 border border-[var(--color-brand-accent)]/10 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 text-[var(--color-brand-accent)]/5 pointer-events-none">
              <GraduationCap size={200} />
            </div>
            <h3 className="font-bold text-sm md:text-base text-[var(--color-brand-accent)] uppercase tracking-wider">
              Our Vision
            </h3>
            <p className="mt-3 text-xs md:text-sm text-[var(--color-text-primary)] leading-relaxed font-semibold">
              "To establish an absolute source of educational truth where
              algorithmic predictability entirely replaces marketing bias,
              empowering every student to navigate their career with
              uncompromised clarity."
            </p>
          </div>
        </div>

        <hr className="border-[var(--color-border-default)]" />

        {/* THE CORE OPERATING PILLARS */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[var(--color-brand-accent)] font-bold text-xs uppercase tracking-wider">
              <Users size={16} /> Architectural Foundations
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
              Our Guiding Architecture
            </h2>
            <p className="text-xs md:text-sm text-[var(--color-text-caption)] max-w-lg mx-auto leading-relaxed">
              Every feature we roll out follows three uncompromising core rules
              to guarantee data integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, pIdx) => (
              <div
                key={pIdx}
                className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] p-6 rounded-2xl flex flex-col gap-4 shadow-3xs hover:border-[var(--color-brand-accent)]/20 transition-colors"
              >
                <div className="p-3 bg-[var(--color-bg-main)] rounded-xl border border-[var(--color-border-default)] w-max">
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-[var(--color-text-primary)] tracking-tight">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
