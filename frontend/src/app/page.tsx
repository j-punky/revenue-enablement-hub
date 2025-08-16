import Link from 'next/link'
import { BookOpen, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { DEPARTMENT_NAMES, RESOURCE_TYPE_NAMES } from '@/lib/types'
import { getDepartmentColor, getResourceTypeIcon } from '@/lib/utils'

// Mock data for demonstration - in real app this would come from Sanity
const recentResources = [
  {
    id: '1',
    title: 'Q4 Sales Playbook',
    department: 'sales' as const,
    resourceType: 'guide' as const,
    publishedAt: '2024-01-15',
    author: 'Sarah Johnson'
  },
  {
    id: '2',
    title: 'Customer Success Onboarding',
    department: 'customer-success' as const,
    resourceType: 'training' as const,
    publishedAt: '2024-01-14',
    author: 'Mike Chen'
  },
  {
    id: '3',
    title: 'Partnership Agreement Template',
    department: 'partnerships' as const,
    resourceType: 'template' as const,
    publishedAt: '2024-01-13',
    author: 'Alex Rivera'
  }
]

const featuredModules = [
  {
    id: '1',
    title: 'New Hire Onboarding',
    moduleType: 'onboarding' as const,
    difficulty: 'beginner' as const,
    estimatedDuration: 120,
    lessonsCount: 8
  },
  {
    id: '2',
    title: 'Advanced Sales Techniques',
    moduleType: 'sales-training' as const,
    difficulty: 'advanced' as const,
    estimatedDuration: 180,
    lessonsCount: 12
  }
]

const departmentStats = [
  { department: 'sales', resourceCount: 45, moduleCount: 8 },
  { department: 'partnerships', resourceCount: 23, moduleCount: 4 },
  { department: 'sales-ops', resourceCount: 31, moduleCount: 6 },
  { department: 'sales-engineering', resourceCount: 38, moduleCount: 7 },
  { department: 'customer-success', resourceCount: 29, moduleCount: 5 },
  { department: 'solutions-architecture', resourceCount: 34, moduleCount: 6 }
]

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to the Revenue Enablement Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your one-stop-shop for training materials, resources, and learning modules 
          across all Revenue team departments.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">200+</p>
              <p className="text-gray-600">Resources</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">36</p>
              <p className="text-gray-600">Learning Modules</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-gray-600">Hours of Content</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-gray-600">Departments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Departments Overview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Departments</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departmentStats.map((dept) => (
                  <Link
                    key={dept.department}
                    href={`/departments/${dept.department}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {DEPARTMENT_NAMES[dept.department as keyof typeof DEPARTMENT_NAMES]}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div className="flex space-x-4 text-sm text-gray-600">
                      <span>{dept.resourceCount} resources</span>
                      <span>{dept.moduleCount} modules</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Resources */}
        <div>
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Resources</h2>
              <Link href="/resources" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentResources.map((resource) => (
                  <div key={resource.id} className="flex items-start space-x-3">
                    <div className="text-2xl">
                      {getResourceTypeIcon(resource.resourceType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {resource.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          getDepartmentColor(resource.department)
                        }`}>
                          {DEPARTMENT_NAMES[resource.department]}
                        </span>
                        <span className="text-xs text-gray-500">
                          by {resource.author}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Learning Modules */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Featured Modules</h2>
              <Link href="/modules" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {featuredModules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{module.title}</h3>
                      <span className="text-2xl">
                        {getResourceTypeIcon(module.moduleType)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{module.lessonsCount} lessons</span>
                      <span>•</span>
                      <span>{Math.floor(module.estimatedDuration / 60)}h {module.estimatedDuration % 60}m</span>
                      <span>•</span>
                      <span className="capitalize">{module.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}