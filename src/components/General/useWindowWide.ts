import { useState, useEffect } from "react";

export default function useWindowWide(size: number) {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth]);

  return width > size;
}
