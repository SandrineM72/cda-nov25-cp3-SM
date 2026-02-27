import Link from "next/link";
import { useSearchArticlesQuery } from "@/graphql/generated/schema";

interface SearchResultsProps {
  searchQuery: string;
}

export default function SearchResults({ searchQuery }: SearchResultsProps) {
  const { loading, error, data } = useSearchArticlesQuery({
    variables: { title: searchQuery },
  });

  if (loading) {
    return <p className="text-center py-8">Recherche en cours...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Erreur : {error.message}</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const articles = data?.articles || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-2">Résultats de recherche</h1>
      <p className="text-center text-gray-600 mb-8">
        Recherche pour : <span className="font-semibold">"{searchQuery}"</span>
      </p>

      {articles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Aucun article trouvé</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {articles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/article/${article.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                    {article.title}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
