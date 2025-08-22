export default function Home() {
  return (
    <div style={{textAlign: "center", marginTop: "50px"}}>
      <h1>YouTube Downloader</h1>
      <p>Paste YouTube link below 👇</p>

      <form action="/api/proxy" method="GET">
        <input 
          type="text" 
          name="url" 
          placeholder="Enter YouTube URL" 
          style={{width:"300px", padding:"10px"}} 
          required
        />
        <button 
          type="submit" 
          style={{marginLeft:"10px", padding:"10px"}}
        >
          Download
        </button>
      </form>
    </div>
  );
}
