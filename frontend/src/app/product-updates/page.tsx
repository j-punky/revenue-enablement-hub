export default function ProductUpdatesPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-black mb-6">
          Product Updates
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 mb-4">
            This page will contain the latest product updates, release notes, and feature announcements.
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
