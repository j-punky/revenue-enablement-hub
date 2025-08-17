export default function PipelinePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-black mb-6">
          Coder&apos;s Pipeline
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Revenue
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            This page will contain pipeline management processes, forecasting methodologies, and sales stage definitions.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Content will be populated from Sanity CMS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}