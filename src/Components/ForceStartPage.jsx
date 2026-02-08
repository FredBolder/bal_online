import { useEffect } from "react";

function ForceStartPage() {
  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.location.pathname = "/";
    }
  }, []);

  return null;
}

export default ForceStartPage;
