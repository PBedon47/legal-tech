import { Router } from "express";
import { generateToken } from "./utils/generateToken";

const router = Router();

/**
 * Demo credentials:
 * username: prueba
 * password: prueba123
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) return res.status(400).json({ message: "username and password required" });

  if (username === "prueba" && password === "prueba123") {
    const token = generateToken({ username });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

export default router;
