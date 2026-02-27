import Link from "next/link";
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-center mb-4">Dev Blog</h1>
        <ul className="flex justify-center gap-6 mb-4">
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
        <SearchInput />
      </nav>
    </header>
  );
}
