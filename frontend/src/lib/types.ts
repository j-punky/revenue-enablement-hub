// Sanity image type
interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

// Sanity file type
interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Resource {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  department: Department
  resourceType: ResourceType
  content?: unknown[]
  downloadableFiles?: SanityFile[]
  externalUrl?: string
  isCustomerFacing?: boolean
  accessLevel: AccessLevel
  tags?: string[]
  publishedAt: string
  updatedAt?: string
  author?: {
    name: string
    email: string
    department: string
    avatar?: SanityImage
  }
  categories?: {
    title: string
    slug: {
      current: string
    }
    color: string
  }[]
}

export interface LearningModule {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  moduleType: ModuleType
  targetDepartments: Department[]
  difficulty: Difficulty
  estimatedDuration?: number
  lessons?: Lesson[]
  prerequisites?: {
    title: string
    slug: {
      current: string
    }
  }[]
  completionCriteria?: string
  lessonsCount?: number
  author?: {
    name: string
    email: string
    department: string
  }
}

export interface Lesson {
  title: string
  order: number
  content?: unknown[]
  estimatedDuration?: number
  resources?: {
    title: string
    slug: {
      current: string
    }
    resourceType: ResourceType
  }[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color: string
  icon?: string
  parent?: string
  order?: number
}

export interface User {
  _id: string
  name: string
  email: string
  role: UserRole
  department: Department
  avatar?: SanityImage
  bio?: string
  isActive: boolean
  joinedAt: string
}

export type Department = 
  | 'sales'
  | 'partnerships'
  | 'sales-ops'
  | 'sales-engineering'
  | 'customer-success'
  | 'solutions-architecture'

export type ResourceType = 
  | 'document'
  | 'video'
  | 'presentation'
  | 'template'
  | 'guide'
  | 'case-study'
  | 'training'

export type ModuleType = 
  | 'onboarding'
  | 'product-training'
  | 'sales-training'
  | 'process-training'
  | 'certification'

export type Difficulty = 
  | 'beginner'
  | 'intermediate'
  | 'advanced'

export type AccessLevel = 
  | 'public'
  | 'internal'
  | 'department'

export type UserRole = 
  | 'editor'
  | 'viewer'
  | 'admin'

export interface SearchResult {
  _id: string
  _type: 'resource' | 'learningModule'
  title: string
  slug: {
    current: string
  }
  description?: string
  type: 'resource' | 'learningModule'
  department?: Department
  resourceType?: ResourceType | ModuleType
  date: string
}

// Department display names
export const DEPARTMENT_NAMES: Record<Department, string> = {
  'sales': 'Sales',
  'partnerships': 'Partnerships',
  'sales-ops': 'Sales Operations',
  'sales-engineering': 'Sales Engineering',
  'customer-success': 'Customer Success',
  'solutions-architecture': 'Solutions Architecture',
}

// Resource type display names
export const RESOURCE_TYPE_NAMES: Record<ResourceType, string> = {
  'document': 'Document',
  'video': 'Video',
  'presentation': 'Presentation',
  'template': 'Template',
  'guide': 'Guide',
  'case-study': 'Case Study',
  'training': 'Training Material',
}

// Module type display names
export const MODULE_TYPE_NAMES: Record<ModuleType, string> = {
  'onboarding': 'Onboarding',
  'product-training': 'Product Training',
  'sales-training': 'Sales Training',
  'process-training': 'Process Training',
  'certification': 'Certification',
}