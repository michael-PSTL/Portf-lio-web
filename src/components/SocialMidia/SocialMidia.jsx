import { useEffect, useState } from "react";
import "./SocialMidia.css";

function SocialMidia() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function loadLinks() {
      try {
        const res = await fetch(
          "https://curriculo-api-qirm.onrender.com/sociallinks"
        );
        const data = await res.json();

        const urls = data
         .map((item) => item.url)
         .filter((url) => !url.includes("google.com/maps"));
         
        setLinks(urls);

      } catch (err) {
        console.error("Erro ao buscar social links:", err);
      }
    }

    loadLinks();
  }, []);

  const getIcon = (url) => {
    if (url.includes("github")) return "#github";
    if (url.includes("linkedin")) return "#linkedin";
    if (url.includes("instagram")) return "#instagram";
    if (url.includes("tiktok")) return "#tiktok";
    if (url.includes("wa.me") || url.includes("whatsapp")) return "#whatsapp";
    if (url.startsWith("mailto:")) return "#email";
    return "#link";
  };

  const getClass = (url) => {
    if (url.includes("github")) return "github";
    if (url.includes("linkedin")) return "linkedin";
    if (url.includes("instagram")) return "instagram";
    if (url.includes("tiktok")) return "tiktok";
    if (url.includes("wa.me") || url.includes("whatsapp")) return "whatsapp";
    if (url.startsWith("mailto:")) return "email";
    return "social";
  };

  const getLabel = (url) => {
    if (url.includes("github")) return "GitHub";
    if (url.includes("linkedin")) return "LinkedIn";
    if (url.includes("instagram")) return "Instagram";
    if (url.includes("tiktok")) return "TikTok";
    if (url.includes("wa.me") || url.includes("whatsapp")) return "WhatsApp";
    if (url.startsWith("mailto:")) return "Email";
    return "Link";
  };

  return (
    <div className="socials">
      {links.map((url, index) => (
        <a
          key={index}
          className={`social-item ${getClass(url)}`}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          <svg className="icon">
            <use href={`/${getIcon(url)}`} />
          </svg>
          <span className="social-label">{getLabel(url)}</span>
        </a>
      ))}
    </div>
  );
}

export default SocialMidia;