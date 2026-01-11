import { create } from "zustand";
import { persist } from "zustand/middleware";
import chooseDifficulty from "../utils/data";

export const useTSTStore = create(
  persist(
    (set, get) => ({
      // --- State Variables ---
      gameState: "idle",
      timeRemaining: 60,
      testMode: "time", // 'time' | 'passage'
      testDuration: 60,
      difficulty: "easy",
      category: "general", // 'general' | 'programming' | 'quotes' | 'numbers' | 'custom'
      customText: "", // For custom category
      text: chooseDifficulty("general", "easy").text,
      userInput: "",
      wpm: 0,
      accuracy: 0,

      // User Preferences (Persisted)
      bestWPM: 0,
      theme: "dark", // 'dark' | 'monkeytype-dark' | 'retro' | 'cyberpunk' | 'forest' | 'ocean'
      soundEnabled: false,
      soundSet: "mechanical", // 'mechanical' | 'soft' | 'silent'
      soundVolume: 50, // 0-100
      fontSize: "md", // 'sm' | 'md' | 'lg' | 'xl'
      showHeatmap: true,
      caretStyle: "block", // 'thin' | 'block' | 'underline' | 'none'
      testHistory: [], // Array of { wpm, accuracy, mode, duration, date }

      // Temporary State for Results
      charactersTyped: 0,
      charactersCorrect: 0,
      history: [], // For the chart
      keyStats: {}, // Heatmap stats
      testResult: null, // 'baseline' | 'new_pb' | 'normal'

      // --- Actions ---
      setDifficulty: (level) => {
        const { testMode, testDuration, category, customText } = get();
        set({
          difficulty: level,
          text:
            category === "custom"
              ? customText
              : chooseDifficulty(category, level).text,
          userInput: "",
          gameState: "idle",
          timeRemaining: testMode === "time" ? testDuration : 0,
          wpm: 0,
          accuracy: 0,
          charactersTyped: 0,
          charactersCorrect: 0,
          history: [],
          keyStats: {},
          testResult: null,
        });
      },

      setCategory: (newCategory) => {
        const { difficulty, testMode, testDuration, customText } = get();
        set({
          category: newCategory,
          text:
            newCategory === "custom"
              ? customText
              : chooseDifficulty(newCategory, difficulty).text,
          userInput: "",
          gameState: "idle",
          timeRemaining: testMode === "time" ? testDuration : 0,
          wpm: 0,
          accuracy: 0,
          charactersTyped: 0,
          charactersCorrect: 0,
          history: [],
          keyStats: {},
          testResult: null,
        });
      },

      setCustomText: (text) => {
        const { testMode, testDuration } = get();
        set({
          customText: text,
          text: text,
          userInput: "",
          gameState: "idle",
          timeRemaining: testMode === "time" ? testDuration : 0,
          wpm: 0,
          accuracy: 0,
          charactersTyped: 0,
          charactersCorrect: 0,
          history: [],
          keyStats: {},
          testResult: null,
        });
      },

      setTestConfig: (mode, duration) => {
        const { difficulty, category, customText } = get();
        set({
          testMode: mode,
          testDuration: duration,
          timeRemaining: mode === "time" ? duration : 0,
          gameState: "idle",
          userInput: "",
          wpm: 0,
          accuracy: 0,
          charactersTyped: 0,
          charactersCorrect: 0,
          history: [],
          keyStats: {},
          testResult: null,
          text:
            category === "custom"
              ? customText
              : chooseDifficulty(category, difficulty).text,
        });
      },

      // --- Settings Actions ---
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
      },

      setSoundSettings: ({ enabled, set: soundSet, volume }) => {
        const updates = {};
        if (enabled !== undefined) updates.soundEnabled = enabled;
        if (soundSet !== undefined) updates.soundSet = soundSet;
        if (volume !== undefined) updates.soundVolume = volume;
        set(updates);
      },

      setFontSize: (size) => {
        set({ fontSize: size });
      },

      toggleHeatmap: () => {
        set((state) => ({ showHeatmap: !state.showHeatmap }));
      },

      setCaretStyle: (style) => {
        set({ caretStyle: style });
      },

      prepareTest: () => {
        set({ gameState: "ready" });
      },

      startTest: () => {
        set({ gameState: "running" });
      },

      pauseTest: () => {
        if (get().gameState === "running" || get().gameState === "ready") {
          set({ gameState: "paused" });
        }
      },

      resumeTest: () => {
        if (get().gameState === "paused" || get().gameState === "ready") {
          set({ gameState: "running" });
        }
      },

      resetTest: () => {
        const { difficulty, testMode, testDuration, category, customText } =
          get();
        set({
          gameState: "idle",
          timeRemaining: testMode === "time" ? testDuration : 0,
          userInput: "",
          wpm: 0,
          accuracy: 0,
          charactersTyped: 0,
          charactersCorrect: 0,
          history: [],
          keyStats: {},
          testResult: null,
          text:
            category === "custom"
              ? customText
              : chooseDifficulty(category, difficulty).text,
        });
      },

      tick: () => {
        const {
          gameState,
          timeRemaining,
          charactersTyped,
          charactersCorrect,
          history,
          testMode,
          testDuration,
        } = get();

        if (gameState !== "running") return;

        let timeElapsed;
        let newTime;
        let shouldEnd = false;

        if (testMode === "time") {
          if (timeRemaining > 0) {
            newTime = timeRemaining - 1;
            timeElapsed = testDuration - newTime;
          } else {
            shouldEnd = true;
          }
        } else {
          // Passage mode: timeRemaining counts up (elapsed time)
          newTime = timeRemaining + 1;
          timeElapsed = newTime;
        }

        if (shouldEnd) {
          get().endTest();
          return;
        }

        if (newTime !== undefined) {
          // We save raw counts so the Chart can calculate Instant WPM vs Average WPM
          const newPoint = {
            time: timeElapsed,
            totalChars: charactersTyped,
            totalCorrect: charactersCorrect,
            errors: charactersTyped - charactersCorrect,
          };

          set({
            timeRemaining: newTime,
            history: [...history, newPoint],
          });
        }
      },

      endTest: () => {
        const { wpm, accuracy, bestWPM } = get();
        let newBest = bestWPM;
        let resultType = "normal";

        if (wpm > 0) {
          if (bestWPM === 0) {
            resultType = "baseline";
            newBest = wpm;
          } else if (wpm > bestWPM) {
            resultType = "new_pb";
            newBest = wpm;
          }
        }

        const currentResult = {
          wpm,
          accuracy,
          mode: get().testMode,
          duration: get().testDuration,
          date: new Date().toISOString(),
          difficulty: get().difficulty,
          category: get().category,
        };

        set((state) => ({
          gameState: "finished",
          bestWPM: newBest,
          testResult: resultType,
          testHistory: [currentResult, ...state.testHistory].slice(0, 50), // Keep last 50
        }));
      },

      clearHistory: () => {
        set({ testHistory: [] });
      },

      handleInput: (input) => {
        const { gameState, text, startTest, endTest, userInput, keyStats } =
          get();

        if (gameState === "finished" || gameState === "paused") return;

        // Transition from ready/idle to running on first input
        if (
          (gameState === "idle" || gameState === "ready") &&
          input.length > 0
        ) {
          startTest();
        }

        // --- Heatmap Logic ---
        // Only trigger if user typed a NEW character (ignore backspaces for stats if desired, or handle simpler)
        if (input.length > userInput.length) {
          const newChar = input.slice(-1).toLowerCase();
          const indexToCheck = userInput.length; // The index we are TRYING to type

          if (indexToCheck < text.length) {
            const targetChar = text[indexToCheck].toLowerCase();
            const isCorrect = newChar === targetChar;

            const newStats = { ...keyStats };
            if (!newStats[newChar])
              newStats[newChar] = { correct: 0, incorrect: 0 };

            if (isCorrect) {
              newStats[newChar].correct += 1;
            } else {
              newStats[newChar].incorrect += 1;
            }

            set({ keyStats: newStats });
          }
        }

        set({ userInput: input });

        const typedChars = input.length;
        let correctChars = 0;

        for (let i = 0; i < typedChars; i++) {
          if (input[i] === text[i]) {
            correctChars++;
          }
        }

        // Update precise character counts
        set({ charactersTyped: typedChars, charactersCorrect: correctChars });

        const accuracy =
          typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;

        let timeElapsed;
        const { testMode, timeRemaining, testDuration } = get();

        if (testMode === "time") {
          timeElapsed = testDuration - timeRemaining;
        } else {
          timeElapsed = timeRemaining;
        }

        const wpm =
          timeElapsed > 0
            ? Math.round(correctChars / 5 / (timeElapsed / 60))
            : 0;

        set({ wpm, accuracy });

        if (input.length >= text.length) {
          endTest();
        }
      },
    }),
    {
      name: "typing-speed-storage", // Key in localStorage
      partialize: (state) => ({
        bestWPM: state.bestWPM,
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        soundSet: state.soundSet,
        soundVolume: state.soundVolume,
        fontSize: state.fontSize,
        showHeatmap: state.showHeatmap,
        caretStyle: state.caretStyle,
        category: state.category,
        difficulty: state.difficulty,
        testHistory: state.testHistory,
      }),
    },
  ),
);
