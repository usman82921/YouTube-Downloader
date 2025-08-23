import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: "highestvideo" });

    if (!format || !format.url) {
      return res.status(500).json({ error: "No downloadable format found" });
    }

    // Instead of streaming → redirect to actual video file
    res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
    res.setHeader("Content-Type", "video/mp4");
    res.redirect(format.url);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
