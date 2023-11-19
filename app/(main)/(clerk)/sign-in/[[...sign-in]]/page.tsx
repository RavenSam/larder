import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: {
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            border: "1px solid hsl(var(--border))",
          },
        },
      }}
    />
  )
}
