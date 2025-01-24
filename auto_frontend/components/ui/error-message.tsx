interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 text-red-600 p-4 rounded-md">
      {message}
    </div>
  )
} 