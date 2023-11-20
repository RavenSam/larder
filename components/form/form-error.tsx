interface FormErrorProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormError = ({ id, errors }: FormErrorProps) => {
  if (!errors) return null

  return (
    <>
      {errors?.[id]?.map((error) => (
        <div
          key={error}
          className="font-semibold text-sm text-rose-500 p-2 py-0"
        >
          {error}
        </div>
      ))}
    </>
  )
}
