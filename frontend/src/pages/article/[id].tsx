import { useRouter } from "next/router";
import ArticleDetail from "@/components/ArticleDetail";
import Layout from "@/components/Layout-component";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return (
      <Layout>
        <p className="text-center py-8"> Chargement ...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ArticleDetail articleId={Number(id)} />
    </Layout>
  );
}
