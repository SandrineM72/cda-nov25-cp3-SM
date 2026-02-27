import { useRouter } from "next/router";
import Layout from "@/components/Layout-component";
import SearchResults from "@/components/SearchResults";

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  // Tant que le routeur n'a pas récupéré le paramètre
  if (!q || typeof q !== "string") {
    return (
      <Layout>
        <p className="text-center py-8">Aucune recherche effectuée</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <SearchResults searchQuery={q} />
    </Layout>
  );
}
