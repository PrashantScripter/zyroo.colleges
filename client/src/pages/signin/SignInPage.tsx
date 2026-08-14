import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";

export default function SignInPage() {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Status State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Email/Password Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await authService.login({ email, password, rememberMe });

      // Save token & user session
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to homepage or dashboard
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to sign in. Please check your network and credentials.";

      setError(
        Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage,
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Google OAuth Submission
  const handleGoogleSignIn = () => {
    window.location.href = authService.getGoogleAuthUrl();
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-lexend bg-white">
      {/* LEFT SIDE: BRAND CONTENT (Hidden on Mobile) */}
      <div className="relative hidden lg:flex lg:w-[45%] bg-bg-hero p-12 flex-col justify-between overflow-hidden">
        {/* Subtle Background Graphic Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-20">
          <img
            className="w-full h-full object-cover object-bottom"
            src="building.png"
            alt="Campus background graphic"
          />
        </div>

        {/* Brand Header */}
        {/* <div className="flex flex-row items-center">
          <div className="w-16 h-16 object-cover">
            <img
              className="w-full h-full transition-all duration-200 brightness-0 invert"
              src="zyroo_logo.png"
              alt="Zyroo logo"
            />
          </div>
          <span className="hidden md:flex text-2xl text-white font-bold font-qasira">
            Zyroo Colleges
          </span>
        </div> */}

        {/* Core Marketing Copy */}
        <div className="relative z-10 max-w-md my-auto">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Your journey to the perfect career path starts here.
          </h2>
          <p className="text-white/80 font-light text-base leading-relaxed">
            Sign in to track your college applications, explore personalized
            entrance exam predictions, and connect directly with counseling
            experts.
          </p>
        </div>

        {/* Footer/Back Link */}
        <div className="relative z-10">
          <NavLink
            to={"/"}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="transform group-hover:-translate-x-1 transition-transform"
            />
            Back to homepage
          </NavLink>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 bg-neutral-50/50">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="flex lg:hidden items-center justify-between mb-12">
          <div className="flex flex-row items-center">
            <div className="w-16 h-16 object-cover">
              <img
                className="w-full h-full "
                src="zyroo_logo.png"
                alt="Zyroo logo"
              />
            </div>
            <span className="text-2xl text-[#640a10] font-bold font-qasira">
              Zyroo Colleges
            </span>
          </div>

          <NavLink
            to={"/"}
            className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
          >
            Back
          </NavLink>
        </div>

        {/* Form Container Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Don't have an account?{" "}
              <NavLink
                to={"/signup"}
                className="font-semibold text-neutral-900 hover:underline"
              >
                Sign up for free
              </NavLink>
            </p>
          </div>

          {/* ERROR ALERT BOX */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm animate-in fade-in">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* SOCIAL LOGIN COMPLEMENT */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-neutral-200 text-neutral-700 font-medium px-4 py-3 rounded-xl shadow-sm hover:bg-neutral-50 transition-colors duration-200 cursor-pointer text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.65 0 3.13.57 4.3 1.69l3.22-3.22C17.56 1.61 14.99 1 12 1 7.39 1 3.44 3.65 1.5 7.5l3.85 2.99C6.26 7.04 8.91 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.69 2.86c2.16-1.99 3.42-4.92 3.42-8.59z"
              />
              <path
                fill="#FBBC05"
                d="M5.35 14.51c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.5 6.94C.54 8.88 0 11.06 0 13.33s.54 4.45 1.5 6.39l3.85-3.21z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.86c-1.02.68-2.33 1.09-3.96 1.09-3.09 0-5.74-2-6.65-4.96L1.5 16.35C3.44 20.2 7.39 23 12 23z"
              />
            </svg>
            Continue with Google
          </button>

          {/* DIVIDER */}
          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-neutral-200"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-neutral-400 uppercase tracking-widest">
              or use email
            </span>
            <div className="flex-grow border-t border-neutral-200"></div>
          </div>

          {/* CREDENTIALS FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400 pointer-events-none">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400 pointer-events-none">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white text-neutral-900 placeholder-neutral-400 border border-neutral-200 rounded-xl pl-11 pr-12 py-3 text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Box */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-[#111111]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm font-medium text-neutral-600 select-none cursor-pointer"
              >
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-neutral-900 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md hover:bg-neutral-800 active:bg-neutral-950 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In to Zyroo"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
