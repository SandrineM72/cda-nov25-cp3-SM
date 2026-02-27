import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCreateArticleMutation, useGetCategoriesQuery } from "@/graphql/generated/schema";

export default function CreateArticleForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mainPictureUrl, setMainPictureUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [createdArticleId, setCreatedArticleId] = useState<number | null>(null);

  const { data: categoriesData, loading: categoriesLoading } = useGetCategoriesQuery();
  const [createArticle, { loading: createLoading, error }] = useCreateArticleMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body || !mainPictureUrl || !categoryId) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    try {
      const result = await createArticle({
        variables: {
          data: {
            title,
            body,
            mainPictureUrl,
            category: { id: parseInt(categoryId) },
          },
        },
      });

      if (result.data?.createArticle) {
        setCreatedArticleId(result.data.createArticle.id);
        alert("Article créé avec succès !");
      }
    } catch (err) {
      console.error("Erreur lors de la création de l'article :", err);
    }
  };

  if (categoriesLoading) {
    return <p className="text-center py-8">Chargement des catégories...</p>;
  }

  const categories = categoriesData?.categories || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Créer un article</h1>

      {createdArticleId && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-bold mb-2">Article créé avec succès !</p>
          <Link
            href={`/article/${createdArticleId}`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Voir l'article
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Titre */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Titre de l'article"
            required
          />
        </div>

        {/* Catégorie */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Catégorie *
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* URL de l'image */}
        <div className="mb-4">
          <label htmlFor="mainPictureUrl" className="block text-gray-700 font-medium mb-2">
            URL de l'image principale *
          </label>
          <input
            type="url"
            id="mainPictureUrl"
            value={mainPictureUrl}
            onChange={(e) => setMainPictureUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://images.unsplash.com/..."
            required
          />
        </div>

        {/* Corps de l'article */}
        <div className="mb-6">
          <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
            Contenu de l'article *
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contenu de l'article..."
            required
          />
        </div>

        {/* Messages d'erreur */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Erreur : {error.message}
          </div>
        )}

        {/* Boutons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={createLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {createLoading ? "Création en cours..." : "Créer l'article"}
          </button>
          <Link
            href="/"
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors text-center"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
