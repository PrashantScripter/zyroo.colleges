import { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  RefreshCw,
  Loader2,
  HelpCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/api/client"; // Adjust this import path based on your project structure

// --- TYPES & INTERFACES ---
interface College {
  id: number;
  name: string;
  location: string;
  stream: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

interface AssessmentResult {
  correct: number;
  total: number;
  percentage: number;
}

const TEST_DURATION_SECONDS = 600; // 10 Minutes allocation

export default function AssessmentTest() {
  // Directory & Data States
  const [colleges, setColleges] = useState<College[]>([]);
  const [isCollegesLoading, setIsCollegesLoading] = useState<boolean>(true);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>("none");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Test Execution States
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TEST_DURATION_SECONDS);

  // Score Result State (populated by Backend API response)
  const [scoreMetrics, setScoreMetrics] = useState<AssessmentResult>({
    correct: 0,
    total: 0,
    percentage: 0,
  });

  // 1. Fetch Colleges on Component Mount
  useEffect(() => {
    const fetchColleges = async () => {
      setIsCollegesLoading(true);
      try {
        const response = await apiClient.get<College[]>(
          "/assessments/colleges",
        );
        setColleges(response.data);
      } catch (error) {
        console.error("Failed to load colleges:", error);
      } finally {
        setIsCollegesLoading(false);
      }
    };

    fetchColleges();
  }, []);

  // 2. Fetch Questions when Institution Selection Changes
  useEffect(() => {
    if (selectedCollegeId === "none") {
      setQuestions([]);
      return;
    }

    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get<Question[]>(
          `/assessments/questions/${selectedCollegeId}`,
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to load questions:", error);
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedCollegeId]);

  // 3. Test Countdown Timer Loop
  useEffect(() => {
    if (!testStarted || testSubmitted) return;

    if (timeLeft <= 0) {
      submitAssessmentApi();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [testStarted, timeLeft, testSubmitted]);

  // Derived Active Institution Detail
  const activeCollege = useMemo(() => {
    return colleges.find((c) => c.id === parseInt(selectedCollegeId, 10));
  }, [colleges, selectedCollegeId]);

  // Action Controllers
  const handleStartTest = () => {
    if (questions.length === 0) return;
    setTestStarted(true);
    setTestSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(TEST_DURATION_SECONDS);
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (testSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Submit assessment payload to Backend API
  const submitAssessmentApi = async () => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post<AssessmentResult>(
        "/assessments/submit",
        {
          collegeId: parseInt(selectedCollegeId, 10),
          answers: selectedAnswers,
        },
      );

      setScoreMetrics(response.data);
      setTestSubmitted(true);
    } catch (error) {
      console.error("Failed to submit assessment:", error);
      alert(
        "An error occurred while submitting your assessment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualSubmit = () => {
    if (
      window.confirm("Are you sure you want to submit your assessment answers?")
    ) {
      submitAssessmentApi();
    }
  };

  const handleResetAssessment = () => {
    setTestStarted(false);
    setTestSubmitted(false);
    setSelectedCollegeId("none");
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setScoreMetrics({ correct: 0, total: 0, percentage: 0 });
  };

  // Timer Formatter
  const formatTime = (secondsNum: number) => {
    const mins = Math.floor(secondsNum / 60);
    const secs = secondsNum % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-16 transition-colors duration-200">
      {/* HEADER SECTION */}
      <div className="bg-[var(--color-bg-hero)] text-white py-10 px-6 md:px-20 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1 rounded-full">
              Examination Module
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
              Adaptive Placement Assessments
            </h1>
          </div>
          {testStarted && !testSubmitted && (
            <div
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black border tracking-wider transition-colors ${
                timeLeft < 60
                  ? "bg-red-500/20 border-red-500 text-red-200 animate-pulse"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              <Clock size={16} />
              <span>TIME REMAINING: {formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        {/* VIEW 1: PRE-EXAM INSTITUTE SELECTION */}
        {!testStarted && (
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 md:p-8 shadow-xs max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Building2
                  className="text-[var(--color-brand-accent)]"
                  size={20}
                />
                <span>Select Your Institution</span>
              </h2>
              <p className="text-xs text-[var(--color-text-caption)]">
                Choose an academy below to pull custom metrics and diagnostic
                evaluation papers mapped to their dynamic technical criteria.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)]">
                Target Placement Institution
              </label>
              <Select
                value={selectedCollegeId}
                onValueChange={(val) => setSelectedCollegeId(val ?? "none")}
                disabled={isCollegesLoading}
              >
                <SelectTrigger className="w-full bg-[var(--color-bg-main)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-xl px-4 py-6 text-xs font-semibold focus:ring-4 focus:ring-[var(--color-brand-accent)]/10 focus:border-[var(--color-brand-accent)] transition-all cursor-pointer">
                  <SelectValue
                    placeholder={
                      isCollegesLoading
                        ? "Loading institutions..."
                        : "Select an institution..."
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] rounded-xl font-lexend">
                  <SelectItem
                    value="none"
                    className="text-xs font-semibold cursor-pointer"
                  >
                    Select an institution...
                  </SelectItem>
                  {colleges.map((college) => (
                    <SelectItem
                      key={college.id}
                      value={college.id.toString()}
                      className="text-xs font-semibold cursor-pointer"
                    >
                      {college.name} ({college.stream})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* DYNAMIC LOADING STATE */}
            {isLoading && (
              <div className="py-8 flex flex-col items-center justify-center gap-3 border border-dashed border-[var(--color-border-default)] rounded-xl bg-[var(--color-bg-main)]">
                <Loader2
                  size={24}
                  className="text-[var(--color-brand-accent)] animate-spin"
                />
                <span className="text-xs font-medium text-[var(--color-text-caption)]">
                  Querying assessment syllabus parameters...
                </span>
              </div>
            )}

            {/* SYLLABUS INSTRUCTIONS PANEL */}
            {!isLoading && selectedCollegeId !== "none" && activeCollege && (
              <div className="border border-[var(--color-border-default)] rounded-xl p-5 bg-[var(--color-bg-main)] space-y-4 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)] rounded-lg">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)]">
                      Syllabus Details
                    </h3>
                    <p className="text-sm font-bold mt-0.5">
                      {activeCollege.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-caption)] mt-0.5">
                      {activeCollege.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border-default)] pt-4 text-xs font-semibold">
                  <div>
                    <span className="text-[var(--color-text-caption)] block">
                      Total Questions:
                    </span>
                    <span className="text-sm font-bold">
                      {questions.length} Concepts Linked
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--color-text-caption)] block">
                      Time Allocation:
                    </span>
                    <span className="text-sm font-bold">10 Minutes (600s)</span>
                  </div>
                </div>

                {questions.length > 0 ? (
                  <button
                    onClick={handleStartTest}
                    className="w-full bg-[var(--color-brand-accent)] hover:opacity-95 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Initialize Core Examination</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-xl text-xs font-medium">
                    <AlertTriangle size={16} />
                    <span>
                      No test sets are registered for this profile segment yet.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: ACTIVE QUESTION SCREEN */}
        {testStarted && !testSubmitted && questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Primary Live Test Content */}
            <div className="lg:col-span-2 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--color-border-default)] pb-4">
                <span className="text-xs font-bold text-[var(--color-brand-accent)] uppercase tracking-wider bg-[var(--color-brand-highlight)] px-3 py-1 rounded-md">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-xs font-medium text-[var(--color-text-caption)]">
                  ID: #{questions[currentQuestionIndex].id}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base font-bold leading-relaxed text-[var(--color-text-primary)]">
                {questions[currentQuestionIndex].text}
              </h3>

              {/* Multiple Choice Option Loop */}
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, idx) => {
                  const isSelected =
                    selectedAnswers[questions[currentQuestionIndex].id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        handleSelectOption(
                          questions[currentQuestionIndex].id,
                          idx,
                        )
                      }
                      className={`w-full text-left p-4 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? "bg-[var(--color-brand-highlight)] border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] font-bold shadow-xs"
                          : "bg-[var(--color-bg-main)] border-[var(--color-border-default)] hover:border-[var(--color-text-caption)]/40 text-[var(--color-text-secondary)]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border transition-colors ${
                            isSelected
                              ? "bg-[var(--color-brand-accent)] text-white border-[var(--color-brand-accent)]"
                              : "bg-[var(--color-bg-surface)] text-[var(--color-text-caption)] border-[var(--color-border-default)]"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Lower Controls Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-default)]">
                <button
                  onClick={() =>
                    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentQuestionIndex === 0 || isSubmitting}
                  className="px-4 py-2 border border-[var(--color-border-default)] rounded-xl text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-main)] disabled:opacity-40 disabled:hover:bg-transparent transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft size={14} /> Back
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-[var(--color-text-primary)] text-[var(--color-bg-main)] rounded-xl text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleManualSubmit}
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} /> Submit Assessment
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Track Status Grid */}
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 shadow-xs space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-1">
                  Progress Matrix
                </h4>
                <p className="text-[11px] text-[var(--color-text-caption)]">
                  Quickly jump between tracking nodes anytime during processing.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isActive = currentQuestionIndex === idx;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      disabled={isSubmitting}
                      className={`h-10 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                        isActive
                          ? "ring-2 ring-[var(--color-brand-accent)] border-[var(--color-brand-accent)] bg-[var(--color-brand-highlight)] text-[var(--color-brand-accent)]"
                          : isAnswered
                            ? "bg-[var(--color-text-primary)] border-[var(--color-text-primary)] text-[var(--color-bg-main)]"
                            : "bg-[var(--color-bg-main)] border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-caption)]/40"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-[var(--color-border-default)] pt-4 space-y-2 text-[11px] font-semibold text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[var(--color-brand-highlight)] border border-[var(--color-brand-accent)]" />
                  <span>Active Selection Focus</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[var(--color-text-primary)]" />
                  <span>Answer Logged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[var(--color-bg-main)] border border-[var(--color-border-default)]" />
                  <span>Unvisited Module</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: COMPREHENSIVE PERFORMANCE DASHBOARD METRICS */}
        {testSubmitted && (
          <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn">
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 md:p-8 shadow-xs text-center space-y-5">
              <div className="mx-auto w-14 h-14 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                <Award size={32} />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-black">Assessment Finalized</h2>
                <p className="text-xs text-[var(--color-text-caption)]">
                  Your tracking metrics have been logged against the active
                  institutional parameter rules.
                </p>
              </div>

              {/* Score Dashboard Circles layout */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto bg-[var(--color-bg-main)] p-4 border border-[var(--color-border-default)] rounded-xl">
                <div className="text-center border-r border-[var(--color-border-default)]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-caption)]">
                    Raw Score
                  </span>
                  <p className="text-xl font-extrabold text-[var(--color-text-primary)] mt-0.5">
                    {scoreMetrics.correct} / {scoreMetrics.total}
                  </p>
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-caption)]">
                    Accuracy Rate
                  </span>
                  <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {scoreMetrics.percentage}%
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetAssessment}
                className="inline-flex items-center gap-1.5 bg-[var(--color-text-primary)] text-[var(--color-bg-main)] hover:opacity-90 text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <RefreshCw size={14} /> Close & Return to Directory
              </button>
            </div>

            {/* HISTORICAL ANSWER LOG REVIEW SYLLABUS */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-caption)] pl-1">
                Granular Solution Review
              </h3>

              {questions.map((q, index) => {
                const userSelection = selectedAnswers[q.id];
                const isCorrect = userSelection === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className={`bg-[var(--color-bg-surface)] border rounded-2xl p-5 space-y-4 ${
                      isCorrect ? "border-emerald-500/30" : "border-red-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isCorrect
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--color-text-primary)] leading-relaxed">
                        {q.text}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold">
                      {q.options.map((option, idx) => {
                        const wasSelected = userSelection === idx;
                        const wasCorrectAns = q.correctOptionIndex === idx;

                        let optionStyle =
                          "bg-[var(--color-bg-main)] border-[var(--color-border-default)] text-[var(--color-text-secondary)]";
                        if (wasCorrectAns) {
                          optionStyle =
                            "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold";
                        } else if (wasSelected && !isCorrect) {
                          optionStyle =
                            "bg-red-500/10 border-red-400 text-red-600 dark:text-red-400 font-bold";
                        }

                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{option}</span>
                            {wasCorrectAns && (
                              <CheckCircle2
                                size={14}
                                className="text-emerald-600 shrink-0"
                              />
                            )}
                            {wasSelected && !isCorrect && (
                              <AlertTriangle
                                size={14}
                                className="text-red-500 shrink-0"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Technical Explanation Block */}
                    <div className="bg-[var(--color-bg-main)] border border-[var(--color-border-default)] rounded-xl p-3.5 flex gap-2 items-start text-xs text-[var(--color-text-secondary)]">
                      <HelpCircle
                        size={15}
                        className="text-[var(--color-brand-accent)] shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="font-bold text-[var(--color-text-primary)] block mb-0.5">
                          Explanation:
                        </span>
                        <p className="leading-relaxed font-medium">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
