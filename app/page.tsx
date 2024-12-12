export const metadata = {
  title: 'Academic Jobs Platform',
  description: 'Connect students with academic opportunities',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Connect Students with</span>
            <span className="block text-maroon-600">Academic Opportunities</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A platform connecting students, employers, and guidance counselors to create meaningful academic employment opportunities.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="mt-10 flex gap-4 justify-center">
            <a href="/login" className="rounded-md bg-maroon-600 px-6 py-3 text-white font-semibold hover:bg-maroon-700 transition-colors">
              Sign In with Gmail
            </a>
            <a href="/browse" className="rounded-md bg-gray-100 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-200 transition-colors">
              Browse Jobs
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Students Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-black">For Students</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Explore Job Opportunities</li>
              <li>• Create and Manage Resumes</li>
              <li>• Find Personalized Job Matches</li>
              <li>• Track Your Progress</li>
            </ul>
          </div>

          {/* Employers Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-black">For Employers</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Post and Manage Listings</li>
              <li>• Connect with Qualified Candidates</li>
              <li>• Set Job Requirements</li>
              <li>• Review Applications</li>
            </ul>
          </div>

          {/* Counselors Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-black">For Counselors</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Review Applications and Provide Recommendations</li>
              <li>• Analyze Student Job Trends</li>
              <li>• Track Student rogress</li>
              <li>• Facilitate Career Workshops or Events</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-500">
            © 2024 Academic Jobs Platform
          </div>
          <div className="flex gap-6">
            <a href="/about" className="text-sm text-gray-500 hover:text-gray-900">About</a>
            <a href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
            <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
