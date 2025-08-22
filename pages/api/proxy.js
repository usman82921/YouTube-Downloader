import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    ytdl(url, { format: "mp4" }).pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Failed to download video", details: err.message });
  }
}
