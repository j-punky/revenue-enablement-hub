'use client'

import { useState } from 'react'
import { Search, Filter, Download, ExternalLink } from 'lucide-react'
import { DEPARTMENT_NAMES, RESOURCE_TYPE_NAMES } from '@/lib/types'
import { getDepartmentColor, getResourceTypeIcon, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

// Mock data - in real app this would come from Sanity
const mockResources = [
  {
    id: '1',
    title: 'Q4 Sales Playbook',
    slug: { current: 'q4-sales-playbook' },
    description: 'Comprehensive guide for Q4 sales strategies and tactics',
    department: 'sales' as const,
    resourceType: 'guide' as const,
    isCustomerFacing: false,
    tags: ['sales', 'strategy', 'Q4'],
    publishedAt: '2024-01-15T10:00:00Z',
    author: 'Sarah Johnson',
    categories: ['Sales Strategy']
  },
  {
    id: '2',
    title: 'Customer Success Onboarding Checklist',
    slug: { current: 'cs-onboarding-checklist' },
    description: 'Step-by-step checklist for onboarding new customers',
    department: 'customer-success' as const,
    resourceType: 'template' as const,
    isCustomerFacing: true,
    tags: ['onboarding', 'checklist', 'customer-success'],
    publishedAt: '2024-01-14T14:30:00Z',
    author: 'Mike Chen',
    categories: ['Onboarding', 'Templates']
  },
  {
    id: '3',
    title: 'Partnership Agreement Template',
    slug: { current: 'partnership-agreement-template' },
    description: 'Legal template for partnership agreements',
    department: 'partnerships' as const,
    resourceType: 'template' as const,
    isCustomerFacing: false,
    tags: ['legal', 'partnerships', 'template'],
    publishedAt: '2024-01-13T09:15:00Z',
    author: 'Alex Rivera',
    categories: ['Legal', 'Templates']
  },
  {
    id: '4',
    title: 'Sales Engineering Demo Best Practices',
    slug: { current: 'se-demo-best-practices' },
    description: 'Video training on delivering effective product demos',
    department: 'sales-engineering' as const,
    resourceType: 'video' as const,
    isCustomerFacing: false,
    tags: ['demo', 'training', 'best-practices'],
    publishedAt: '2024-01-12T16:45:00Z',
    author: 'Jordan Kim',
    categories: ['Training', 'Demos']
  },
  {
    id: '5',
    title: 'Solutions Architecture Framework',
    slug: { current: 'solutions-architecture-framework' },
    description: 'Framework for designing customer solutions',
    department: 'solutions-architecture' as const,
    resourceType: 'guide' as const,
    isCustomerFacing: true,
    tags: ['architecture', 'framework', 'solutions'],
    publishedAt: '2024-01-11T11:20:00Z',
    author: 'Taylor Swift',
    categories: ['Architecture', 'Frameworks']
  },
  {
    id: '6',
    title: 'Sales Operations Metrics Dashboard',
    slug: { current: 'sales-ops-metrics-dashboard' },
    description: 'Interactive dashboard for tracking sales metrics',
    department: 'sales-ops' as const,
    resourceType: 'document' as const,
    isCustomerFacing: false,
    tags: ['metrics', 'dashboard', 'analytics'],
    publishedAt: '2024-01-10T13:00:00Z',
    author: 'Casey Johnson',
    categories: ['Analytics', 'Dashboards']
  }
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedResourceType, setSelectedResourceType] = useState<string>('all')
  const [showCustomerFacing, setShowCustomerFacing] = useState<boolean | null>(null)

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesDepartment = selectedDepartment === 'all' || resource.department === selectedDepartment
    const matchesResourceType = selectedResourceType === 'all' || resource.resourceType === selectedResourceType
    const matchesCustomerFacing = showCustomerFacing === null || resource.isCustomerFacing === showCustomerFacing

    return matchesSearch && matchesDepartment && matchesResourceType && matchesCustomerFacing
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Resources</h1>
        <p className="text-gray-600">
          Browse and search through all training materials, guides, templates, and resources.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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

          {/* Resource Type Filter */}
          <div>
            <select
              value={selectedResourceType}
              onChange={(e) => setSelectedResourceType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {Object.entries(RESOURCE_TYPE_NAMES).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          {/* Customer Facing Filter */}
          <div>
            <select
              value={showCustomerFacing === null ? 'all' : showCustomerFacing.toString()}
              onChange={(e) => {
                const value = e.target.value
                setShowCustomerFacing(value === 'all' ? null : value === 'true')
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Resources</option>
              <option value="true">Customer Facing</option>
              <option value="false">Internal Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">
                  {getResourceTypeIcon(resource.resourceType)}
                </div>
                <div className="flex space-x-2">
                  {resource.isCustomerFacing && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Customer Facing
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {resource.description}
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  getDepartmentColor(resource.department)
                }`}>
                  {DEPARTMENT_NAMES[resource.department]}
                </span>
                <span className="text-xs text-gray-500">
                  {RESOURCE_TYPE_NAMES[resource.resourceType]}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>by {resource.author}</span>
                <span>{formatDate(resource.publishedAt)}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
                {resource.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{resource.tags.length - 3} more</span>
                )}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  View Resource
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}