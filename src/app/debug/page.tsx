import Link from "next/link"

export default function DebugPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">🎨 Crafty Kid - Navigation Guide</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="font-semibold text-green-800 mb-2">✅ Server is Running!</h2>
            <p className="text-sm text-green-700">Your Next.js development server is working correctly.</p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h2 className="font-semibold text-blue-800 mb-3">📍 Available Pages:</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/home" className="text-blue-600 hover:underline font-medium">
                  → Homepage (Dynamic Content from Database)
                </Link>
                <p className="text-sm text-gray-600 ml-4">The main homepage with all page builder blocks</p>
              </li>
              <li>
                <Link href="/test" className="text-blue-600 hover:underline font-medium">
                  → Test Page
                </Link>
                <p className="text-sm text-gray-600 ml-4">Simple test page to verify server is working</p>
              </li>
              <li>
                <Link href="/for-parents" className="text-blue-600 hover:underline font-medium">
                  → For Parents
                </Link>
                <p className="text-sm text-gray-600 ml-4">Marketing page (if it exists in database)</p>
              </li>
              <li>
                <Link href="/for-creators" className="text-blue-600 hover:underline font-medium">
                  → For Creators
                </Link>
                <p className="text-sm text-gray-600 ml-4">Instructor information page (if it exists in database)</p>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h2 className="font-semibold text-yellow-800 mb-2">⚠️ Getting 404?</h2>
            <p className="text-sm text-yellow-700">
              If you're getting a 404 on <code className="bg-yellow-100 px-1 rounded">/home</code>, 
              it means the page might not exist in the database. Try running:
            </p>
            <code className="block mt-2 p-2 bg-gray-100 rounded text-xs">
              npm run db:seed
            </code>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded">
            <h2 className="font-semibold text-purple-800 mb-2">🗄️ Database Status:</h2>
            <p className="text-sm text-purple-700">
              Your database is connected to Supabase. You can view your data at:
            </p>
            <a 
              href="https://supabase.com/dashboard/project/zcldjvbejigmqycfsjzb/editor" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline text-sm"
            >
              → Supabase Table Editor
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
