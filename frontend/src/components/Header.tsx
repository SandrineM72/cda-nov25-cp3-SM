import Link from "next/link";
import type React from "react";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <h1>Dev Blog</h1>
        </Link>
        <ul>
          <li>
            <Link href="/">Accueil</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
