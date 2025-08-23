import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const filePath = path.join("/tmp", `video-${Date.now()}.mp4`);
    const videoStream = ytdl(url, { quality: "highestvideo" });
    const fileStream = fs.createWriteStream(filePath);

    videoStream.pipe(fileStream);

    fileStream.on("finish", () => {
      res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
      res.setHeader("Content-Type", "video/mp4");

      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);

      res.on("close", () => {
        fs.unlink(filePath, () => {}); // delete after send
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
