import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "@/components/Layout-component";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  if (!q || typeof q !== "string") {
    return (
      <Layout>
        <p className="text-center py-8">Aucune recherche effectuée</p>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Dev Blog - Recherche</title>
        <meta name="description" content="Les derniers articles du blog" />
      </Head>
      <Layout>
        <SearchPage />
      </Layout>
    </>
  );
}
