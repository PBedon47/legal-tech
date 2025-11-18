import BooksList from "./components/BooksList";

export default function Home() {
  return (
    <div style={{ marginTop: 16 }}>
      <h1>Libros públicos</h1>
      <div style={{ marginTop: 12 }}>
        <BooksList />
      </div>
    </div>
  );
}
