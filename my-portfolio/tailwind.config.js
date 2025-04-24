/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f8ff",
          100: "#e0f0fe",
          200: "#c0e0fd",
          300: "#94c9fc",
          400: "#5aa4f8",
          500: "#2d7ff3", /* Professional deep blue */
          600: "#1c63d4",
          700: "#1750b0",
          800: "#17428f",
          900: "#183a74",
          950: "#0f2249",
        },
        secondary: {
          50: "#f2f7fd",
          100: "#e6eefc",
          200: "#cfdcf9",
          300: "#adbef3",
          400: "#859aec",
          500: "#5871e3", /* Modern sophisticated indigo */
          600: "#4253c2",
          700: "#3643a0",
          800: "#2f3983",
          900: "#28326b",
          950: "#191d40",
        },
        accent: {
          50: "#f3f3ff",
          100: "#e9e9fe",
          200: "#d5d5fd",
          300: "#b5b5fb",
          400: "#8d89f7",
          500: "#6366f1", /* Elegant indigo accent */
          600: "#554cdf",
          700: "#4839ba",
          800: "#3c2f97",
          900: "#342b7b",
          950: "#1f184a",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        dark: "#0f172a",
        light: "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
        button: "0 5px 15px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        shine: "shine 2s infinite",
        float: "float 3s infinite",
        bounce: "bounce 1s infinite",
        "spin-slow": "spin 15s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "flow-x": "flow-x 8s linear infinite",
        "flow-y": "flow-y 12s linear infinite",
        "server-ping": "server-ping 3s ease-in-out infinite",
        "data-pulse": "data-pulse 5s ease-in-out infinite",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center"
          }
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left top"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right bottom"
          }
        },
        "flow-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        },
        "flow-y": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" }
        },
        "server-ping": {
          "0%": {
            transform: "scale(1)",
            opacity: "0.5"
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.8"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "0.5"
          }
        },
        "data-pulse": {
          "0%": {
            opacity: "0.1",
            strokeWidth: "1"
          },
          "50%": {
            opacity: "0.5",
            strokeWidth: "2"
          },
          "100%": {
            opacity: "0.1",
            strokeWidth: "1"
          }
        }
      },
    },
  },
  plugins: [],
};