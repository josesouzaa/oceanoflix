import Link from 'next/link'

const itensMenu = [
  {
    name: 'Home',
    slug: '/'
  },
  {
    name: 'Busca',
    slug: '/search'
  },
  {
    name: 'Categorias',
    slug: '/categorys'
  },
  {
    name: 'Favoritos',
    slug: '/favorites'
  }
]

export function Header() {
  return (
    <header className="bg-brand-blue-400 text-zinc-100">
      <div className="custom-container py-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-brand-green-400">Oceano</span>Flix
        </h1>

        <nav>
          <ul className="flex items-center gap-4">
            {itensMenu.map((i) => (
              <li
                key={i.slug}
                className="hover:text-brand-green-400 font-semibold transition"
              >
                <Link href={i.slug}>{i.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
