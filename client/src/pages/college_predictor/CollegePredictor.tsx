import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
  GraduationCap,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function CollegePredictor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your AI College Advisor, connected directly to our verified institutional database. Share your stream preferences, entrance exam details, or budget metrics, and I'll find your ideal match.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Conversation Starter Quick Chips
  const prebuiltPrompts = [
    "Best choices for CSE with a 4 Lakh total fee limit?",
    "Which premier government institutes accept JEE Main scores?",
    "I want high placement packages for ECE. Where should I apply?",
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userPayload: Message = { role: "user", content: textToSend };
    const conceptualHistory = [...messages, userPayload];

    setMessages(conceptualHistory);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/predict-college", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageHistory: conceptualHistory }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
      } else {
        throw new Error();
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered an issue querying the database records. Please verify your parameter inputs and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat sessions reset. Tell me your criteria (Stream, Fees, Cutoffs) to search the database.",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-lexend pb-12 transition-colors duration-200">
      {/* BRANDING HERO LAYER */}
      <div className="bg-[var(--color-bg-hero)] text-white py-10 px-6 lg:px-16 shadow-md relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-white/90 font-bold text-xs tracking-wider uppercase bg-white/10 px-3 py-1 rounded-full w-max border border-white/10">
              <Sparkles size={14} className="text-amber-300" /> Grounded
              Database Intelligence
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mt-3">
              AI Conversational College Predictor
            </h1>
            <p className="text-white/80 text-xs md:text-sm max-w-xl mt-1.5 font-light leading-relaxed">
              Interview our index natively. Specify custom fee ranges, stream
              targets, or entry constraints to parse matching results instantly.
            </p>
          </div>
          <button
            onClick={clearChatHistory}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer"
          >
            <RefreshCw size={13} /> Reset Console
          </button>
        </div>
      </div>

      {/* CORE CHAT WRAPPER REGISTRY */}
      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-12 gap-6">
        {/* CHAT MESSAGES PANEL DISPLAY */}
        <div className="col-span-12 lg:col-span-8 flex flex-col bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-2xl h-[560px] overflow-hidden shadow-xs">
          {/* Scrollable Container */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[var(--color-bg-main)]/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3.5 sm:max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div
                  className={`p-2.5 rounded-xl border shrink-0 h-max ${
                    msg.role === "user"
                      ? "bg-[var(--color-brand-highlight)] border-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)]"
                      : "bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-brand-accent)]"
                  }`}
                >
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm font-medium leading-relaxed shadow-2xs border ${
                    msg.role === "user"
                      ? "bg-[var(--color-brand-accent)] text-white border-transparent rounded-tr-none"
                      : "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border-[var(--color-border-default)] rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* AI THINKING LOADING PLACEHOLDER */}
            {isLoading && (
              <div className="flex gap-3.5 max-w-[80%] mr-auto">
                <div className="p-2.5 h-fit rounded-xl border bg-[var(--color-bg-surface)] border-[var(--color-border-default)] text-[var(--color-brand-accent)] shrink-0">
                  <Bot size={16} className="animate-spin" />
                </div>
                <div className="bg-[var(--color-bg-surface)] text-[var(--color-text-caption)] border border-[var(--color-border-default)] p-4 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                  <span className="font-bold animate-pulse">
                    Scanning relational database parameters...
                  </span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* DYNAMIC CONTEXT INTERACTION PANEL FOOTER */}
          <div className="p-4 bg-[var(--color-bg-surface)] border-t border-[var(--color-border-default)] space-y-3">
            {/* Suggestions loop render */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {prebuiltPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] font-bold text-[var(--color-text-secondary)] bg-[var(--color-bg-main)] hover:bg-[var(--color-brand-highlight)] hover:text-[var(--color-brand-accent)] border border-[var(--color-border-default)] px-3 py-1.5 rounded-xl transition-all cursor-pointer text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="flex items-center gap-2 bg-[var(--color-bg-main)] border border-[var(--color-border-default)] rounded-xl px-3 py-2 focus-within:border-[var(--color-brand-accent)]/60 transition-colors"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about cutoffs, fees, placement matching..."
                className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-[var(--color-text-primary)] px-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[var(--color-brand-accent)] text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* SIDEBAR INTELLIGENCE HINTS REGISTRY */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] p-5 rounded-2xl shadow-xs">
            <h3 className="text-xs font-black tracking-wider uppercase text-[var(--color-text-caption)] flex items-center gap-1.5">
              <HelpCircle
                size={14}
                className="text-[var(--color-brand-accent)]"
              />{" "}
              Guarded Query Tips
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-[var(--color-text-secondary)] leading-relaxed">
              <li className="flex gap-2">
                <GraduationCap
                  size={16}
                  className="text-[var(--color-brand-accent)] shrink-0 mt-0.5"
                />
                <span>
                  <strong>Be Specific:</strong> Provide precise branch terms
                  (e.g., "CSE") along with your financial budgets to get highly
                  targeted results.
                </span>
              </li>
              <li className="flex gap-2">
                <GraduationCap
                  size={16}
                  className="text-[var(--color-brand-accent)] shrink-0 mt-0.5"
                />
                <span>
                  <strong>Exam Targets:</strong> Mention standard entry channels
                  like JEE Main or BITSAT marks to evaluate cutoff conditions
                  directly.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
