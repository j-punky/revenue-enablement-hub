'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    name: 'Intro to Revenue',
    href: '/intro-to-revenue',
  },
  {
    name: 'Product Updates',
    href: '/product-updates',
  },
  {
    name: 'Tech Stack',
    href: '/tech-stack',
  },
  {
    name: 'Teams',
    href: '#',
    children: [
      {
        name: 'Sales',
        href: '/teams/sales',
      },
      {
        name: 'Partnerships',
        href: '/teams/partnerships',
      },
      {
        name: 'RevOps',
        href: '/teams/revops',
      },
      {
        name: 'Sales Engineering',
        href: '/teams/sales-engineering',
      },
      {
        name: 'Customer Success',
        href: '/teams/customer-success',
      },
      {
        name: 'Solutions Architecture',
        href: '/teams/solutions-architecture',
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="block">
          <div className="text-xl font-bold text-black mb-2">CODER</div>
          <div className="text-sm text-gray-600 uppercase tracking-wide">
            REVENUE ENABLEMENT HUB
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <div>
                  <div className="text-sm font-medium text-black mb-2">
                    {item.name}
                  </div>
                  <ul className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <Link
                          href={child.href}
                          className={cn(
                            'block text-sm py-1 transition-colors',
                            pathname === child.href
                              ? 'text-black font-medium'
                              : 'text-gray-600 hover:text-black'
                          )}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'block text-sm font-medium py-1 transition-colors',
                    pathname === item.href
                      ? 'text-black'
                      : 'text-gray-600 hover:text-black'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
