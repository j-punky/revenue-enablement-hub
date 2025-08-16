'use client'

import { useState } from 'react'
import { Search, Clock, BookOpen, Play, CheckCircle } from 'lucide-react'
import { DEPARTMENT_NAMES, MODULE_TYPE_NAMES } from '@/lib/types'
import { getDepartmentColor, getResourceTypeIcon, formatDuration, getDifficultyColor } from '@/lib/utils'
import Link from 'next/link'

// Mock data - in real app this would come from Sanity
const mockModules = [
  {
    id: '1',
    title: 'New Hire Revenue Onboarding',
    slug: { current: 'new-hire-revenue-onboarding' },
    description: 'Comprehensive onboarding program for new Revenue team members covering company culture, processes, and tools.',
    moduleType: 'onboarding' as const,
    targetDepartments: ['sales', 'customer-success', 'partnerships'] as const,
    difficulty: 'beginner' as const,
    estimatedDuration: 240,
    lessonsCount: 12,
    author: 'Sarah Johnson',
    completionRate: 85
  },
  {
    id: '2',
    title: 'Advanced Sales Techniques',
    slug: { current: 'advanced-sales-techniques' },
    description: 'Master advanced sales methodologies including MEDDIC, Challenger Sale, and consultative selling approaches.',
    moduleType: 'sales-training' as const,
    targetDepartments: ['sales', 'sales-engineering'] as const,
    difficulty: 'advanced' as const,
    estimatedDuration: 180,
    lessonsCount: 8,
    author: 'Mike Chen',
    completionRate: 72
  },
  {
    id: '3',
    title: 'Customer Success Fundamentals',
    slug: { current: 'customer-success-fundamentals' },
    description: 'Learn the core principles of customer success, retention strategies, and expansion techniques.',
    moduleType: 'product-training' as const,
    targetDepartments: ['customer-success'] as const,
    difficulty: 'intermediate' as const,
    estimatedDuration: 150,
    lessonsCount: 10,
    author: 'Alex Rivera',
    completionRate: 91
  },
  {
    id: '4',
    title: 'Partnership Development Mastery',
    slug: { current: 'partnership-development-mastery' },
    description: 'Strategic approach to building and managing successful partnerships that drive revenue growth.',
    moduleType: 'sales-training' as const,
    targetDepartments: ['partnerships'] as const,
    difficulty: 'intermediate' as const,
    estimatedDuration: 120,
    lessonsCount: 6,
    author: 'Jordan Kim',
    completionRate: 68
  },
  {
    id: '5',
    title: 'Sales Operations Excellence',
    slug: { current: 'sales-operations-excellence' },
    description: 'Optimize sales processes, implement effective reporting, and drive operational efficiency.',
    moduleType: 'process-training' as const,
    targetDepartments: ['sales-ops'] as const,
    difficulty: 'advanced' as const,
    estimatedDuration: 200,
    lessonsCount: 14,
    author: 'Taylor Swift',
    completionRate: 79
  },
  {
    id: '6',
    title: 'Solutions Architecture Certification',
    slug: { current: 'solutions-architecture-certification' },
    description: 'Complete certification program for solutions architects covering technical design and customer engagement.',
    moduleType: 'certification' as const,
    targetDepartments: ['solutions-architecture'] as const,
    difficulty: 'advanced' as const,
    estimatedDuration: 300,
    lessonsCount: 20,
    author: 'Casey Johnson',
    completionRate: 56
  }
]

export default function ModulesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModuleType, setSelectedModuleType] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')

  const filteredModules = mockModules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesModuleType = selectedModuleType === 'all' || module.moduleType === selectedModuleType
    const matchesDifficulty = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty
    const matchesDepartment = selectedDepartment === 'all' || 
                             module.targetDepartments.includes(selectedDepartment as keyof typeof DEPARTMENT_NAMES)

    return matchesSearch && matchesModuleType && matchesDifficulty && matchesDepartment
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Learning Modules</h1>
        <p className="text-gray-600">
          Structured learning paths and training modules designed for Revenue team development.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Module Type Filter */}
          <div>
            <select
              value={selectedModuleType}
              onChange={(e) => setSelectedModuleType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {Object.entries(MODULE_TYPE_NAMES).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {Object.entries(DEPARTMENT_NAMES).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredModules.map((module) => (
          <div key={module.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">
                  {getResourceTypeIcon(module.moduleType)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    getDifficultyColor(module.difficulty)
                  }`}>
                    {module.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {module.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {module.description}
              </p>

              {/* Module Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{module.lessonsCount}</div>
                  <div className="text-xs text-gray-500">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{formatDuration(module.estimatedDuration)}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{module.completionRate}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>

              {/* Target Departments */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">Target Departments:</div>
                <div className="flex flex-wrap gap-1">
                  {module.targetDepartments.map((dept) => (
                    <span key={dept} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      getDepartmentColor(dept)
                    }`}>
                      {DEPARTMENT_NAMES[dept]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Module Type and Author */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{MODULE_TYPE_NAMES[module.moduleType]}</span>
                <span>by {module.author}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Completion Rate</span>
                  <span>{module.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link 
                  href={`/modules/${module.slug.current}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Module
                </Link>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BookOpen className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  )
}