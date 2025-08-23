import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const filePath = path.resolve("/tmp", `video-${Date.now()}.mp4`);

    const video = ytdl(url, { quality: "highest" });
    const writeStream = fs.createWriteStream(filePath);

    video.pipe(writeStream);

    writeStream.on("finish", () => {
      res.status(200).json({
        download_url: `/api/mp4-download?file=${path.basename(filePath)}`
      });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
