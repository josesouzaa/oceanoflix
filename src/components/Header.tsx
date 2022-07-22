import Link from 'next/link'

const itensMenu = [
  {
    name: 'Home',
    slug: '/'
  },
  {
    name: 'Busca',
    slug: '/search'
  }
]

export function Header() {
  return (
    <header className="bg-brand-blue-400 text-zinc-100">
      <div className="custom-container py-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-brand-green-400">Oceano</span>Flix
        </h1>

        <nav className="hidden sm:block">
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

        <nav className="block sm:hidden relative group">
          <span className="font-bold bg-brand-green-400 text-brand-blue-900 p-1 rounded-sm cursor-pointer group-hover:bg-brand-blue-900 group-hover:text-brand-green-400 transition">
            Menu
          </span>

          <ul className="flex flex-col items-center px-4 py-2 rounded-sm bg-brand-blue-900 gap-2 absolute top-[100%] right-0 invisible max-h-0 group-hover:visible group-hover:max-h-fit hover:visible hover:max-h-full border-t-4 border-brand-blue-400 transition">
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
