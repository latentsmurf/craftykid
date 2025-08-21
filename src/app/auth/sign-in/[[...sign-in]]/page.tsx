import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to Crafty Kid
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a href="/auth/sign-up" className="font-medium text-primary hover:text-primary/80">
              create a new account
            </a>
          </p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-gray-300 shadow-sm",
              socialButtonsBlockButtonText: "font-normal",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500 bg-gray-50",
              formFieldLabel: "text-gray-700",
              formFieldInput: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary",
              footerActionLink: "text-primary hover:text-primary/80",
            },
          }}
        />
      </div>
    </div>
  );
}
