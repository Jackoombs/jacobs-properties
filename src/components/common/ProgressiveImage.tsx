import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  /**
   * true (default): image absolutely fills a wrapper you've given an
   * aspect-ratio/fixed size — use for cards, carousels, anything with a
   * known crop. Gets the full skeleton-pulse-then-fade treatment.
   * false: image sizes itself (intrinsic aspect ratio, e.g. a gallery
   * lightbox showing the whole photo). No skeleton box (nothing to size it
   * against before the image loads) — just an opacity fade-in on load.
   */
  fill?: boolean;
}

export default function ProgressiveImage({
  src,
  alt,
  className,
  wrapperClassName,
  fill = true,
  onLoad,
  onError,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Covers the image-served-from-cache case: onLoad may never fire (or
  // already fired before this ran) if the browser had it cached.
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  const img = !errored && (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setErrored(true);
        onError?.(e);
      }}
      className={cn(
        // Plain `transition` (not `transition-opacity`) so a caller's hover
        // zoom animates too: Tailwind v4's scale-* drives the standalone
        // `scale` property, which the default transition list covers but
        // `transition-opacity` does not.
        "transition duration-500",
        fill && "absolute inset-0 h-full w-full",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
      {...props}
    />
  );

  if (!fill) return img;

  return (
    <span className={cn("relative block overflow-hidden", wrapperClassName)}>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-primary-200 transition-opacity duration-300",
          errored ? "opacity-100" : loaded ? "pointer-events-none opacity-0" : "animate-pulse opacity-100",
        )}
      />
      {img}
    </span>
  );
}
