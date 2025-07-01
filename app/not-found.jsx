
export default function NotFound(){
    return (
        <div className="h-full bg-gradient-to-b from-red-500 to-gray-100 flex items-center justify-center p-4 ">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8 relative">
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-black/5 rounded-full blur-sm" />
            </div>
            
            <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Oops! It seems like you have ventured into uncharted territory. The page you are looking for has gone on vacation.
            </p>
            
            <button 
             
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Return Home
            </button>
            
            <div className="mt-12">
              <div className="flex justify-center space-x-3 text-sm text-gray-500">
                <a href="/help" className="hover:text-indigo-600 transition-colors duration-200">Help Center</a>
                <span>•</span>
                <a href="/contact" className="hover:text-indigo-600 transition-colors duration-200">Contact Support</a>
                <span>•</span>
                <a href="/status" className="hover:text-indigo-600 transition-colors duration-200">System Status</a>
              </div>
            </div>
          </div>
        </div>
      );
}