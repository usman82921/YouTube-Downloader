export default async function handler(req, res) {
  const { url } = req.query;
  const MP3_API = "https://ytdownloader.anshppt19.workers.dev/?url=";

  try {
    const response = await fetch(MP3_API + encodeURIComponent(url));
    const data = await response.json();

    if (data.status === "success") {
      res.status(200).json({
        success: true,
        title: data.title,
        download: data.download_url
      });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
