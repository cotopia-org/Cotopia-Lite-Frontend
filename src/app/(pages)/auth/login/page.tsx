import SignInForm from "./sign-in-form";

export const metadata = {
  title: "Login to your account",
};

export default function LoginPage() {
  return (
    <main className='w-screen h-screen flex flex-col items-center justify-center'>
      <SignInForm />
    </main>
  );
}
