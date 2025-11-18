"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CreateExpediente() {
  const [nombre, setNombre] = useState("");
  const [desc, setDesc] = useState("");
  const backend = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  async function save() {
    const token = Cookies.get("token");
    if (!token) { alert("No auth"); return; }
    try {
      await axios.post(`${backend}/expedientes`, { nombre, descripcion: desc }, { headers: { Authorization: `Bearer ${token}` } });
      router.push("/expedientes");
    } catch { alert("Error"); }
  }

  return (
    <div>
      <h2>Crear expediente</h2>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} /><br/>
      <textarea placeholder="Descripción" value={desc} onChange={e => setDesc(e.target.value)} /><br/>
      <button onClick={save}>Guardar</button>
    </div>
  );
}
