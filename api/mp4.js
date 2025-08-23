import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;

    // Temporary redirect to internal download API
    res.json({
      title,
      download: `/api/mp4-download?url=${encodeURIComponent(url)}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
