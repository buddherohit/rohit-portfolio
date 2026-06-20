// src/components/SEO.jsx
import { useEffect } from "react";

export default function SEO({ 
  title, 
  description, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogUrl, 
  twitterCard = "summary_large_image",
  schemaData = null 
}) {
  useEffect(() => {
    // Dynamic page title
    const defaultTitle = "Rohit Buddhe | Developer Portfolio";
    document.title = title ? `${title} | Rohit Buddhe` : defaultTitle;

    // Meta Description helper
    const updateMetaTag = (nameAttr, propertyAttr, content) => {
      if (!content) return;
      
      let selector = "";
      if (nameAttr) selector = `meta[name="${nameAttr}"]`;
      if (propertyAttr) selector = `meta[property="${propertyAttr}"]`;

      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (nameAttr) element.setAttribute("name", nameAttr);
        if (propertyAttr) element.setAttribute("property", propertyAttr);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard SEO tags
    updateMetaTag("description", null, description || "Rohit Buddhe's personal portfolio highlighting full-stack engineering, GenAI projects, achievements, and case studies.");

    // Open Graph / Facebook tags
    updateMetaTag(null, "og:title", ogTitle || title || defaultTitle);
    updateMetaTag(null, "og:description", ogDescription || description);
    updateMetaTag(null, "og:url", ogUrl || window.location.href);
    updateMetaTag(null, "og:image", ogImage || "/image.png");
    updateMetaTag(null, "og:type", ogUrl?.includes("/blog/") ? "article" : "website");

    // Twitter tags
    updateMetaTag("twitter:card", null, twitterCard);
    updateMetaTag("twitter:title", null, ogTitle || title || defaultTitle);
    updateMetaTag("twitter:description", null, ogDescription || description);
    updateMetaTag("twitter:image", null, ogImage || "/image.png");

    // Dynamic JSON-LD Structured Data
    let scriptTag = document.getElementById("json-ld-structured-data");
    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "json-ld-structured-data";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaData);
    } else {
      if (scriptTag) {
        scriptTag.remove();
      }
    }

    return () => {
      // Keep main tags but clean up schema script to prevent layout leaks
      const cleanScript = document.getElementById("json-ld-structured-data");
      if (cleanScript) cleanScript.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, twitterCard, schemaData]);

  return null;
}
