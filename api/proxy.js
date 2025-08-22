export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
        "Accept": "*/*",
        "Accept-Encoding": "identity",
        "Connection": "keep-alive",
        "Range": req.headers.range || "bytes=0-", // important for video download
      },
    });

    res.setHeader("Content-Type", response.headers.get("content-type") || "video/mp4");
    if (response.headers.get("content-length")) {
      res.setHeader("Content-Length", response.headers.get("content-length"));
    }

    // download ke liye header
    res.setHeader("Content-Disposition", "attachment; filename=video.mp4");

    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
