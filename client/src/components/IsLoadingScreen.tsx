export default function IsLoadingScreen() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-500 dark:border-gray-400 border-t-transparent" />
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading...</p>
        </div>
      </div>
    )
  }