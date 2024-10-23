// colors.ts
export const getCSSVariableValue = (variable: string) => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim()
  }
  return ""
}

export const colors = {
  primary: {
    default: getCSSVariableValue("--primary"),
    background: getCSSVariableValue("--primary-background"),
    primaryForeground: getCSSVariableValue("--primary-foreground"),
    primaryLabel: getCSSVariableValue("--primary-label"),
    primaryLight: getCSSVariableValue("--primary-light"),
    body: getCSSVariableValue("--primary-body"),
  },
  grayscale: {
    grayscaleCaption: getCSSVariableValue("--grayscale-caption"),
    grayscaleSubtitle: getCSSVariableValue("--grayscale-subtitle"),
  },
  secondary: {
    default: getCSSVariableValue("--secondary"),
    foreground: getCSSVariableValue("--secondary-foreground"),
  },
  destructive: getCSSVariableValue("--destructive"),
  background: getCSSVariableValue("--background"),
  foreground: getCSSVariableValue("--foreground"),
  error: {
    default: getCSSVariableValue("--error"),
  },
  warning: {
    default: getCSSVariableValue("--warning"),
    light: getCSSVariableValue("--warning-light"),
  },
  success: {
    default: getCSSVariableValue("--success"),
  },
  // Add more as needed
}

export const __VARS = {
  domain: process.env.NEXT_PUBLIC_HOME_URL,
  serverUrl: process.env.NEXT_PUBLIC_LK_SERVER_URL,
  socketUrl: process.env.NEXT_PUBLIC_SOOCKET_URL ?? "",
  tokenCookieKey: process.env.NEXT_PUBLIC_TOKEN_COOKIE_KEY ?? "token",
  dashboardPage: "/dashboard",
  loginPage: `/auth/login`,
  registerPage: `/auth/register`,
  forgetPasswordPage: `/auth/forget-password`,
  signOutApiPage: `/api/auth/sign-out`,
  voiceAreaRadius: 200,
  defaultPositionOfUserX: 400,
  jailNodeType: "jailNode",
  backgroundNodeType: "backgroundNode",
  defaultPerPage: 20,
  pagesLimitDiff: 6,
  defaultPositionOfUserY: 400,
  teleportMargin: 40,
}
