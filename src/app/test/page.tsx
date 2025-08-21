export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-craft-soft via-white to-craft-paint/10">
      <div className="text-center space-y-4 p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-gray-900">🎉 Server is Working!</h1>
        <p className="text-gray-600">Your Next.js server is running successfully.</p>
        <p className="text-sm text-gray-500">
          To see the full app, complete the Supabase setup by running:
          <code className="block mt-2 bg-gray-100 p-2 rounded">./setup-supabase.sh</code>
        </p>
      </div>
    </div>
  )
}
