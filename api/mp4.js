export default async function handler(req, res) {
  const { url } = req.query;
  const MP4_API = "https://youtube.anshppt19.workers.dev/anshapi";

  try {
    const response = await fetch(MP4_API + "?url=" + encodeURIComponent(url) + "&format=mp4hd");
    const data = await response.json();

    if (data.success) {
      res.status(200).json({
        success: true,
        title: data.data.name_mp4,
        download: data.data.url_mp4_youtube   // fresh direct link
      });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
