"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";

export default function EditExpediente() {
  const params = useParams() as any;
  const id = params.id;
  const backend = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [form, setForm] = useState({ nombre: "", descripcion: "", estado: "" });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;
    axios.get(`${backend}/expedientes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setForm(r.data))
      .catch(() => {});
  }, [id]);

  async function save() {
    const token = Cookies.get("token");
    if (!token) return;
    await axios.put(`${backend}/expedientes/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
    router.push("/expedientes");
  }

  return (
    <div>
      <h2>Editar expediente</h2>
      <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} /><br/>
      <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} /><br/>
      <input value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })} /><br/>
      <button onClick={save}>Actualizar</button>
    </div>
  );
}
