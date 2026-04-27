import Link from 'next/link'
import { BreadcrumbSchema } from './SchemaMarkup'

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null

  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="面包屑导航" className="text-sm text-gray-400 py-2 px-4">
        <ol className="flex flex-wrap items-center gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li key={index} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {index < items.length - 1 ? (
                <>
                  <Link
                    href={item.url}
                    className="hover:text-white transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                  <meta itemProp="position" content={String(index + 1)} />
                  <span className="mx-1 text-gray-600">/</span>
                </>
              ) : (
                <>
                  <span className="text-white" itemProp="name">{item.name}</span>
                  <meta itemProp="position" content={String(index + 1)} />
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}