import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Edit2,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/api/client";

export default function BookCounselling() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    targetCollege: "",
    stream: "",
    preferredDate: "",
    preferredTime: "",
    concerns: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await apiClient.post("/counseling/book", formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          targetCollege: "",
          stream: "",
          preferredDate: "",
          preferredTime: "",
          concerns: "",
        });
        document
          .querySelector(".lg\\:col-span-7")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to book session. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-bg-main py-16 px-6 sm:px-10 lg:px-20 border-b border-border-default transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANEL – unchanged */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brand-accent font-bold block mb-1">
              FREE GUIDANCE
            </span>
            <h2 className="text-3xl sm:text-[2.25rem] font-extrabold text-text-primary tracking-tight font-lexend leading-tight">
              Book a Free Counselling Session
            </h2>
            <p className="mt-3 text-sm text-text-caption font-light leading-relaxed">
              Get personalized guidance from expert counselors who help students
              find their ideal colleges and careers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3.5 bg-brand-highlight border border-brand-accent/10 rounded-xl">
              <span className="text-brand-accent text-sm">🪄</span>
              <span className="text-xs sm:text-sm font-semibold text-text-secondary">
                100% Free Session
              </span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-brand-highlight border border-brand-accent/10 rounded-xl">
              <span className="text-brand-accent text-sm">🛡️</span>
              <span className="text-xs sm:text-sm font-semibold text-text-secondary">
                Expert Counselors
              </span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-brand-highlight border border-brand-accent/10 rounded-xl">
              <span className="text-brand-accent text-sm">⭐</span>
              <span className="text-xs sm:text-sm font-semibold text-text-secondary">
                4.9/5 Rated Service
              </span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-brand-highlight border border-brand-accent/10 rounded-xl">
              <span className="text-brand-accent text-sm">✅</span>
              <span className="text-xs sm:text-sm font-semibold text-text-secondary">
                No Hidden Charges
              </span>
            </div>
          </div>

          <div className="bg-brand-accent rounded-2xl p-5 text-text-accent-btn shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-bold font-lexend tracking-tight border-b border-white/10 pb-2">
              What our students say
            </h3>
            <div className="flex flex-col gap-3">
              <div className="bg-white/10 dark:bg-black/10 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                <p className="text-xs sm:text-sm font-light text-white/90">
                  "The counselor helped me choose the right branch and I got
                  into IIT Delhi!"
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    <User size={12} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-none text-white">
                      Priya Sharma
                    </span>
                    <span className="text-[10px] font-light text-white/70">
                      IIT Delhi
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 dark:bg-black/10 border border-white/5 rounded-xl p-4 flex flex-col gap-2">
                <p className="text-xs sm:text-sm font-light text-white/90">
                  "Amazing guidance for MBA preparation. Got into my dream
                  B-school."
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    <User size={12} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-none text-white">
                      Rahul Verma
                    </span>
                    <span className="text-[10px] font-light text-white/70">
                      IIM Ahmedabad
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AREA: FORM */}
        <div className="lg:col-span-7 bg-bg-surface border border-border-default rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl font-bold text-text-primary font-lexend mb-6">
            Book Free Session
          </h3>

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">
                Session booked successfully! We've sent a confirmation email.
              </span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-secondary">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors"
                />
              </div>
            </div>

            {/* Target College */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-secondary">
                Select Target College
              </label>
              <Select
                value={formData.targetCollege}
                onValueChange={(val) =>
                  handleChange("targetCollege", val || "")
                }
              >
                <SelectTrigger className="w-full h-[42px] px-4 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:ring-0 focus:ring-offset-0 focus:border-brand-accent transition-colors cursor-pointer">
                  <SelectValue placeholder="Choose a college" />
                </SelectTrigger>
                <SelectContent className="bg-bg-surface border border-border-default text-text-primary rounded-xl shadow-md">
                  <SelectItem value="IIT Delhi">IIT Delhi</SelectItem>
                  <SelectItem value="IIM Ahmedabad">IIM Ahmedabad</SelectItem>
                  <SelectItem value="BITS Pilani">BITS Pilani</SelectItem>
                  <SelectItem value="VIT Vellore">VIT Vellore</SelectItem>
                  <SelectItem value="DTU">
                    Delhi Technological University (DTU)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stream */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-secondary">
                Stream of Interest
              </label>
              <Select
                value={formData.stream}
                onValueChange={(val) => handleChange("stream", val || "")}
              >
                <SelectTrigger className="w-full h-[42px] px-4 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:ring-0 focus:ring-offset-0 focus:border-brand-accent transition-colors cursor-pointer">
                  <SelectValue placeholder="Select stream" />
                </SelectTrigger>
                <SelectContent className="bg-bg-surface border border-border-default text-text-primary rounded-xl shadow-md">
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Law">Law</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-caption pointer-events-none" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      handleChange("preferredDate", e.target.value)
                    }
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Preferred Time
                </label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(val) =>
                    handleChange("preferredTime", val || "")
                  }
                >
                  <SelectTrigger className="w-full h-[42px] px-4 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:ring-0 focus:ring-offset-0 focus:border-brand-accent transition-colors cursor-pointer">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-surface border border-border-default text-text-primary rounded-xl shadow-md">
                    <SelectItem value="Morning Slot">Morning Slot</SelectItem>
                    <SelectItem value="Afternoon Slot">
                      Afternoon Slot
                    </SelectItem>
                    <SelectItem value="Evening Slot">Evening Slot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-secondary">
                Your Concerns (Optional)
              </label>
              <div className="relative">
                <Edit2 className="absolute left-3 top-3 w-4 h-4 text-text-caption" />
                <textarea
                  rows={3}
                  placeholder="Tell us about your career goals or queries..."
                  value={formData.concerns}
                  onChange={(e) => handleChange("concerns", e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-bg-main border border-border-default rounded-xl text-sm text-text-primary focus:outline-hidden focus:border-brand-accent transition-colors resize-none min-h-[90px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-brand-accent hover:bg-brand-hover active:bg-brand-active text-text-accent-btn font-semibold rounded-xl text-sm transition-colors shadow-sm focus:outline-hidden active:scale-[0.99] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Book Free Session"
              )}
            </button>

            <p className="text-center text-xs text-text-caption mt-1">
              You need to sign in to book a session
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
