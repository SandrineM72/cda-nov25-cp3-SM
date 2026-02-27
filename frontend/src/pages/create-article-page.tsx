import Head from "next/head";
import CreateArticleForm from "@/components/CreateArticleForm";
import Layout from "@/components/Layout-component";

export default function CreateArticlePage() {
  return (
    <>
      <Head>
        <title>Dev Blog - Création page</title>
        <meta name="description" content="Les derniers articles du blog" />
      </Head>
      <Layout>
        <CreateArticleForm />
      </Layout>
    </>
  );
}
