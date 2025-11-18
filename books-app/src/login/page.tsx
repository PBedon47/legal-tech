"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const backend = process.env.NEXT_PUBLIC_API_URL;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post(`${backend}/auth/login`, { username: user, password: pass });
      Cookies.set("token", res.data.token);
      router.push("/expedientes");
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Error de autenticación");
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="usuario" value={user} onChange={e => setUser(e.target.value)} /><br/><br/>
        <input type="password" placeholder="contraseña" value={pass} onChange={e => setPass(e.target.value)} /><br/><br/>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
