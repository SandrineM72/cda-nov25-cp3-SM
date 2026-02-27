import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-center">Dev Blog</h1>
        </Link>
        <ul className="flex justify-center gap-6 mt-4">
          <li>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/create-article-page"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Créer un article
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
