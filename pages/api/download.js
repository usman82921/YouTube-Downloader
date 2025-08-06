export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url } = req.body;
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const apiUrl = `https://ytdownloader.anshppt19.workers.dev/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "success") {
      res.status(200).json({
        status: "success",
        title: data.title || "Unknown Title",
        download_url: data.download_url,
      });
    } else {
      res.status(500).json({ status: "error", message: "Failed to get audio" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "API call failed" });
  }
}
