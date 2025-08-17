import Link from 'next/link'

// Card data matching the design mockup
const cards = [
  {
    id: '1',
    title: "Coder's GTM Strategy",
    category: 'Revenue',
    href: '/gtm-strategy',
  },
  {
    id: '2',
    title: "Coder's Pitch",
    category: 'Revenue',
    href: '/pitch',
  },
  {
    id: '3',
    title: "Coder's Value",
    category: 'Revenue',
    href: '/value',
  },
  {
    id: '4',
    title: 'Value Hypothesis Tool',
    category: 'Revenue',
    href: '/value-hypothesis-tool',
  },
  {
    id: '5',
    title: 'Commercial Pricing & Structuring',
    category: 'Revenue',
    href: '/commercial-pricing',
  },
  {
    id: '6',
    title: "Coder's Pipeline",
    category: 'Revenue',
    href: '/pipeline',
  },
  {
    id: '7',
    title: 'Intro to Tooling',
    category: 'Sales',
    href: '/intro-to-tooling-sales',
  },
  {
    id: '8',
    title: 'Intro to Tooling',
    category: 'Partnerships',
    href: '/intro-to-tooling-partnerships',
  },
]

// Category color mapping
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Revenue':
      return 'bg-purple-100 text-purple-800'
    case 'Sales':
      return 'bg-blue-100 text-blue-800'
    case 'Partnerships':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function HomePage() {
  return (
    <div className="p-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.id} href={card.href}>
            <div className="bg-gray-100 rounded-lg p-6 h-48 flex flex-col justify-between hover:bg-gray-200 transition-colors cursor-pointer">
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                  {card.title}
                </h3>
              </div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    getCategoryColor(card.category)
                  }`}
                >
                  {card.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
