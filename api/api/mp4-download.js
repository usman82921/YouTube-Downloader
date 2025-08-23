import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { file } = req.query;
  const filePath = path.join("/tmp", file);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File expired" });
  }

  res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
  res.setHeader("Content-Type", "video/mp4");

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);

  res.on("finish", () => {
    fs.unlinkSync(filePath);
    console.log("Deleted temp file:", filePath);
  });
}
