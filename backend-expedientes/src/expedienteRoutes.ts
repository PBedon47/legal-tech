import { Router } from "express";
import { authMiddleware } from "./middleware/authMiddleware";
import { nanoid } from "nanoid";

type Expediente = { id: string; nombre: string; descripcion?: string; estado?: string };
const router = Router();

let store: Expediente[] = [];

// GET all
router.get("/", authMiddleware, (req, res) => {
  res.json(store);
});

// GET by id
router.get("/:id", authMiddleware, (req, res) => {
  const found = store.find(s => s.id === req.params.id);
  if (!found) return res.status(404).json({ message: "Not found" });
  res.json(found);
});

// POST create
router.post("/", authMiddleware, (req, res) => {
  const { nombre, descripcion, estado } = req.body ?? {};
  if (!nombre || typeof nombre !== "string") return res.status(400).json({ message: "nombre required" });
  const item: Expediente = { id: nanoid(8), nombre: nombre.trim(), descripcion: descripcion ?? "", estado: estado ?? "nuevo" };
  store.push(item);
  res.status(201).json(item);
});

// PUT update
router.put("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  const idx = store.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  store[idx] = { ...store[idx], ...req.body };
  res.json(store[idx]);
});

// DELETE
router.delete("/:id", authMiddleware, (req, res) => {
  const before = store.length;
  store = store.filter(s => s.id !== req.params.id);
  if (store.length === before) return res.status(404).json({ message: "Not found" });
  res.json({ message: "deleted" });
});

export default router;
