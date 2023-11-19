import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <SignUp
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
