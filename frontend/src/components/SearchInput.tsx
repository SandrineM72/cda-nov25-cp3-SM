import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 w-full bg-white border border-gray-300 rounded-lg px-3 py-2">
        <input
          type="search"
          placeholder="Rechercher un article..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 outline-none bg-transparent"
        />
        <button
          type="submit"
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Rechercher"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
