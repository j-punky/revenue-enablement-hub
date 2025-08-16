import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${remainingMinutes}m`
}

export function getDepartmentColor(department: string): string {
  const colors: Record<string, string> = {
    'sales': 'bg-blue-100 text-blue-800',
    'partnerships': 'bg-green-100 text-green-800',
    'sales-ops': 'bg-purple-100 text-purple-800',
    'sales-engineering': 'bg-orange-100 text-orange-800',
    'customer-success': 'bg-pink-100 text-pink-800',
    'solutions-architecture': 'bg-indigo-100 text-indigo-800',
  }
  return colors[department] || 'bg-gray-100 text-gray-800'
}

export function getResourceTypeIcon(resourceType: string): string {
  const icons: Record<string, string> = {
    'document': '📄',
    'video': '🎥',
    'presentation': '📊',
    'template': '📋',
    'guide': '📖',
    'case-study': '📈',
    'training': '🎓',
    'onboarding': '🚀',
    'product-training': '💡',
    'sales-training': '💼',
    'process-training': '⚙️',
    'certification': '🏆',
  }
  return icons[resourceType] || '📄'
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    'beginner': 'bg-green-100 text-green-800',
    'intermediate': 'bg-yellow-100 text-yellow-800',
    'advanced': 'bg-red-100 text-red-800',
  }
  return colors[difficulty] || 'bg-gray-100 text-gray-800'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-')
}