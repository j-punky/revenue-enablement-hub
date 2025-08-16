import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries
export const queries = {
  // Get all resources with basic info
  allResources: `*[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    department,
    resourceType,
    isCustomerFacing,
    accessLevel,
    tags,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  }`,

  // Get resources by department
  resourcesByDepartment: `*[_type == "resource" && department == $department] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    resourceType,
    isCustomerFacing,
    accessLevel,
    tags,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  }`,

  // Get single resource with full content
  resourceBySlug: `*[_type == "resource" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    department,
    resourceType,
    content,
    downloadableFiles,
    externalUrl,
    isCustomerFacing,
    accessLevel,
    tags,
    publishedAt,
    updatedAt,
    "author": author-> {
      name,
      email,
      department,
      avatar
    },
    "categories": categories[]-> {
      title,
      slug,
      color
    }
  }`,

  // Get all learning modules
  allLearningModules: `*[_type == "learningModule" && isActive == true] | order(createdAt desc) {
    _id,
    title,
    slug,
    description,
    moduleType,
    targetDepartments,
    difficulty,
    estimatedDuration,
    "lessonsCount": count(lessons),
    "author": author->name
  }`,

  // Get learning module by slug with full content
  learningModuleBySlug: `*[_type == "learningModule" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    moduleType,
    targetDepartments,
    difficulty,
    estimatedDuration,
    lessons[] {
      title,
      order,
      content,
      estimatedDuration,
      "resources": resources[]-> {
        title,
        slug,
        resourceType
      }
    },
    "prerequisites": prerequisites[]-> {
      title,
      slug
    },
    completionCriteria,
    "author": author-> {
      name,
      email,
      department
    }
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon,
    "parent": parent->title,
    order
  }`,

  // Search resources and modules
  searchContent: `*[
    _type in ["resource", "learningModule"] && 
    (title match $searchTerm || description match $searchTerm || tags[] match $searchTerm)
  ] | order(publishedAt desc, createdAt desc) {
    _id,
    _type,
    title,
    slug,
    description,
    "type": _type,
    "department": select(
      _type == "resource" => department,
      _type == "learningModule" => targetDepartments[0]
    ),
    "resourceType": select(
      _type == "resource" => resourceType,
      _type == "learningModule" => moduleType
    ),
    "date": select(
      _type == "resource" => publishedAt,
      _type == "learningModule" => createdAt
    )
  }`
}

// Helper function to fetch data
export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  })
}