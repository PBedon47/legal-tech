"use client";

import React, { useEffect, useState } from "react";

// Interfaces para tipado TypeScript
interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
}

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://gutendex.com/books/?page=1");
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setBooks(data.results.slice(0, 10));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Libros</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> —{" "}
            {book.authors.length > 0 ? book.authors[0].name : "Autor desconocido"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
