import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 1. Initialize state by reading localStorage or checking system preferences

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("zyroo-theme") as Theme;

    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

    // Fallback to user's computer OS preference if no manual selection exists
    return window.matchMedia("(prefers-color-scheme : dark)").matches
      ? "dark"
      : "light";
  });
    
    
    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('zyroo-theme', theme);
    }, [theme]);


    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// Custom hook for clean, easy consumption in UI files
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be wrapped within a ThemeProvider");
  return context;
}
