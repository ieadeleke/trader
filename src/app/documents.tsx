'use client';
import { useEffect } from "react";


export default function TawkLayout() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67b87e648b7209190e99a990/1ikkaremr";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      // Clean up the script if needed
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
    </div>
  );
}
