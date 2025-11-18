import { Router } from "express";
const router = Router();

interface Author { name: string }
interface Book { id: number; title: string; authors: Author[] }
interface GutendexResponse { results: Book[] }

router.get("/", async (_req, res) => {
  try {
    const resp = await fetch("https://gutendex.com/books/?page=1");
    const data = (await resp.json()) as GutendexResponse;

    if (!data?.results) return res.status(500).json({ message: "Unexpected API format" });

    // return first 10
    return res.json(data.results.slice(0, 10));
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

export default router;
