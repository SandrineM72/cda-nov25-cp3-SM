import Head from "next/head";
import Home from "@/components/Home";
import Layout from "@/components/Layout-component";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dev Blog - Accueil</title>
        <meta name="description" content="Les derniers articles du blog" />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </>
  );
}
