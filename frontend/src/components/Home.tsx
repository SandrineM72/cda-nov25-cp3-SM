import Image from "next/image";
import { useGetArticlesQuery } from "@/graphql/generated/schema";

export default function Home() {
  const { loading, error, data } = useGetArticlesQuery({
    variables: { limit: 5 },
  });

  if (loading) return <p>Chargement des articles...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const articles = data?.articles || [];

  return (
    <div>
      <h2>Derniers articles</h2>
      {articles.length === 0 ? (
        <p>Aucun article disponible</p>
      ) : (
        <div>
          {articles.map((article) => (
            <article key={article.id}>
              {article.mainPictureUrl && (
                <Image
                  src={article.mainPictureUrl}
                  alt={article.title}
                  width={800}
                  height={400}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
              <h3>{article.title}</h3>
              <p>
                <small>
                  Catégorie : {article.category.name} | Publié le :{" "}
                  {new Date(article.createdAt).toLocaleDateString("fr-FR")}
                </small>
              </p>
              <p>{article.body.substring(0, 200)}...</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
