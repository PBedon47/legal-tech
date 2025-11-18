"use client";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Navbar() {
  const logout = () => { Cookies.remove("token"); window.location.href = "/login"; };
  return (
    <nav style={{ background: "#0f172a", padding: 12, color: "white" }}>
      <Link href="/" style={{ color: "white", marginRight: 12 }}>Home</Link>
      <Link href="/expedientes" style={{ color: "white", marginRight: 12 }}>Expedientes</Link>
      <Link href="/login" style={{ color: "white" }}>Login</Link>
    </nav>
  );
}
