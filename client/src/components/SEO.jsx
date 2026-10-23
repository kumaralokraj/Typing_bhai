
import { useEffect } from "react";

const SITE_URL = "https://typingbhai.codingbhai.online";

function SEO({ title, description, path = "/", noindex = false }) {
  useEffect(() => {
    document.title = title;

    function setMeta(name, content, attribute = "name") {
      let element = document.head.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    }

    setMeta("description", description);
    setMeta(
      "robots",
      noindex ? "noindex, follow" : "index, follow"
    );

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `${SITE_URL}${path}`;

    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `${SITE_URL}${path}`, "property");
    setMeta("og:type", "website", "property");
  }, [title, description, path, noindex]);

  return null;
}

export default SEO;
