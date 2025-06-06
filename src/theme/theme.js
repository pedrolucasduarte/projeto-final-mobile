export const COLORS = {
  primary: "#007AFF",
  primaryDark: "#003E7E",
  primaryLight: "#E5F0FF",
  background: "#F5F7FA",
  surface: "#FFFFFF",
  text: "#1C1C1E",
  muted: "#8E8E93",
  border: "#D1D5DB",
  accent: "#5AC8FA",
};

export const theme = {
  dark: false,
  roundness: 10,
  colors: {
    primary: COLORS.primary,
    background: COLORS.background,
    surface: COLORS.surface,
    text: COLORS.text,
    placeholder: COLORS.muted,
    disabled: COLORS.muted,
    onPrimary: COLORS.surface,
    elevation: {
      level0: "transparent",
      level1: COLORS.surface,
    },
  },
};
