export const __VARS = {
  domain: process.env.NEXT_PUBLIC_HOME_URL,
  serverUrl: process.env.NEXT_PUBLIC_LK_SERVER_URL,
  socketUrl: process.env.NEXT_PUBLIC_SOOCKET_URL ?? "",
  tokenCookieKey: process.env.NEXT_PUBLIC_TOKEN_COOKIE_KEY ?? "token",
  dashboardPage: "/workspaces/all",
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
  userTimeTrackerId: "user-timer-tracker",
};
