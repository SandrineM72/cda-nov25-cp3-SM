import Image from "next/image";
import Link from "next/link";
import { useGetArticlesQuery } from "@/graphql/generated/schema";

export default function Home() {
  const { loading, error, data } = useGetArticlesQuery({
    variables: { limit: 5 },
  });

  if (loading) return <p className="text-center py-8">Chargement des articles...</p>;
  if (error) return <p className="text-center py-8 text-red-600">Erreur : {error.message}</p>;

  const articles = data?.articles || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Derniers articles</h2>
      {articles.length === 0 ? (
        <p className="text-center text-gray-500">Aucun article disponible</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {article.mainPictureUrl && (
                  <div className="relative w-full h-48">
                    <Image
                      src={article.mainPictureUrl}
                      alt="illustration"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
