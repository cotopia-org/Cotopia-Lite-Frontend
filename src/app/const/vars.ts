export const __VARS = {
  serverUrl: process.env.NEXT_PUBLIC_LK_SERVER_URL,
  socketUrl: process.env.NEXT_PUBLIC_SOOCKET_URL ?? "",
  tokenCookieKey: process.env.NEXT_PUBLIC_TOKEN_COOKIE_KEY ?? "token",
  dashboardPage: "/dashboard",
  loginPage: `/auth/login`,
  registerPage: `/auth/register`,
  forgetPasswordPage: `/auth/forget-password`,
  signOutApiPage: `/api/auth/sign-out`,
};
