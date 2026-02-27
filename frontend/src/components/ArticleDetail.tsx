import Image from "next/image";
import Link from "next/link";
import { useGetArticleQuery } from "@/graphql/generated/schema";

interface ArticleDetailProps {
  articleId: number;
}

export default function ArticleDetail({ articleId }: ArticleDetailProps) {
  const { loading, error, data } = useGetArticleQuery({
    variables: { id: articleId },
  });

  if (loading) {
    return <p className="text-center py-8">Chargement de l'article...</p>;
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

  if (!data?.article) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Article non trouvé</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const article = data.article;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/" className="inline-block mb-6 text-blue-600 hover:underline">
        ← Retour aux articles
      </Link>

      {article.mainPictureUrl && (
        <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
          <Image src={article.mainPictureUrl} alt={article.title} fill className="object-cover" />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
        <span className="font-medium text-blue-600">{article.category.name}</span>
        <span>Publié le : {new Date(article.createdAt).toLocaleDateString("fr-FR")}</span>
        {article.updatedAt !== article.createdAt && (
          <span>Mis à jour le : {new Date(article.updatedAt).toLocaleDateString("fr-FR")}</span>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{article.body}</p>
      </div>
    </div>
  );
}
