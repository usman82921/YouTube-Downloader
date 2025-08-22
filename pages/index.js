import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  const handleDownload = () => {
    if (!url) return;
    window.location.href = `/api/proxy?url=${encodeURIComponent(url)}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>YouTube Video Downloader (via Proxy)</h2>
      <input
        type="text"
        placeholder="Paste googlevideo link here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "70%", padding: "10px" }}
      />
      <br />
      <button
        onClick={handleDownload}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Download
      </button>
    </div>
  );
}
