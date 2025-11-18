"use client";
import { useEffect, useState } from "react";

interface Author { name: string; }
interface Book { id: number; title: string; authors: Author[]; }

export default function BooksList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("https://gutendex.com/books/?page=1");
        if (!res.ok) throw new Error("Error fetching books");
        const json = await res.json();
        const results = (json?.results ?? []) as Book[];
        if (mounted) setBooks(results.slice(0, 10));
      } catch (err: any) {
        if (mounted) setError(err.message ?? "Error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; }
  }, []);

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {books.map(b => (
        <div key={b.id} className="card" style={{ marginBottom: 8 }}>
          <strong>{b.title}</strong>
          <div style={{ color: "var(--muted)" }}>Autor: {b.authors?.[0]?.name ?? "—"}</div>
        </div>
      ))}
    </div>
  );
}
