import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// zustand is used to store some code of line which is used overall project like redux but it is easy as redux
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light", // Default theme
      setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme });
      },
      loadThemeFromStorage: (storageKey, defaultTheme) => {
        const storedTheme = localStorage.getItem(storageKey) || defaultTheme;
        set({ theme: storedTheme });
      },
      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const storedTheme = localStorage.getItem("vite-ui-theme");
          const themeToApply = storedTheme || "light"; // Default to "light" if no stored theme

          // Apply the theme to the HTML root element
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(themeToApply);

          set({ theme: themeToApply });
        }
      },
    }),
    {
      name: "theme-store", // Name of the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

