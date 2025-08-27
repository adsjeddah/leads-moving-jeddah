'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              حدث خطأ ما!
            </h2>
            <p className="text-gray-600 mb-6">
              نعتذر، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
            </p>
            <button
              onClick={() => reset()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
