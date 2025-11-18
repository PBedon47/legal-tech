"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Expediente {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export default function ExpedientesPage() {
  const [lista, setLista] = useState<Expediente[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/expedientes")
      .then((r) => r.json())
      .then(setLista);
  }, []);

  return (
    <div>
      <h1>Expedientes</h1>
      <Link href="/expedientes/create">Crear nuevo</Link>

      <ul>
        {lista.map((e) => (
          <li key={e.id}>
            {e.nombre} — {e.estado}
            <Link href={`/expedientes/${e.id}/edit`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
