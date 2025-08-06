import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url.startsWith("http")) {
      setError("❌ Please enter a valid YouTube URL.");
      return;
    }
    setLoading(true);
    setError("");
    setTitle("");
    setDownloadUrl("");

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (data.status === "success") {
        setTitle(data.title);
        setDownloadUrl(data.download_url);
      } else {
        setError("❌ Failed to fetch audio. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>🎵 YouTube to MP3 Downloader</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "80%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? "Processing..." : "Download MP3"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {downloadUrl && (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
              alt="Music Icon"
              style={{ width: "100px" }}
            />
            <p><strong>{title || "Untitled"}</strong></p>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              🎧 Download MP3
            </a>
          </>
        )}
      </div>
    </div>
  );
}
