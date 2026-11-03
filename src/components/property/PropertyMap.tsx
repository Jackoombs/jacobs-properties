import { useRef } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import LocationDot from "@/assets/common/location-dot-solid.svg";
import type { LatLngLiteral } from "@/lib/types";

interface Props {
  location: LatLngLiteral | undefined;
  markers: (LatLngLiteral | undefined)[];
  zoom?: number;
  children?: React.ReactNode;
  state?: LatLngLiteral | undefined;
  setState?: (marker: LatLngLiteral | undefined) => void;
}

export default function PropertyMap({
  location,
  markers,
  zoom = 14,
  children,
  state,
  setState,
}: Props) {
  const currentMarker = useRef<HTMLElement | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) {
    return <div className="aspect-property w-full animate-pulse rounded-big bg-gray-200" />;
  }

  const handleClick = (e: google.maps.MapMouseEvent, marker: LatLngLiteral | undefined) => {
    const target = e.domEvent.target as HTMLElement;
    currentMarker.current = target.parentElement;
    setState?.(marker);
  };

  return (
    <div className="bg-gray-200 lg:relative">
      <GoogleMap
        zoom={zoom}
        center={location}
        mapContainerClassName="w-full aspect-property h-auto min-h-[12rem] rounded-big"
        mapContainerStyle={{ filter: state !== undefined ? "grayscale(90%)" : "" }}
        onMouseDown={() => setState?.(undefined)}
        onZoomChanged={() => setState?.(undefined)}
      >
        {markers.map(
          (marker, index) =>
            marker !== undefined && (
              <MarkerF
                key={index}
                onClick={(e) => handleClick(e, marker)}
                position={marker}
                onLoad={(markerInstance) => {
                  markerInstance.setIcon({
                    path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
                    fillColor: "#032954",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2.5,
                    scale: 0.08,
                  });
                }}
              />
            ),
        )}
      </GoogleMap>
      {children}
      <div style={{ position: "absolute", left: "50%", top: "50%", zIndex: 10, width: "100%" }}>
        {currentMarker.current && state !== undefined && (
          <div
            className="absolute z-10 hidden bg-primary-100 lg:block"
            style={{
              WebkitMask: `url(${LocationDot.src}) no-repeat center`,
              mask: `url(${LocationDot.src}) no-repeat center`,
              top: currentMarker.current.style.top,
              left: currentMarker.current.style.left,
              height: currentMarker.current.style.height,
              width: currentMarker.current.style.width,
            }}
          />
        )}
      </div>
    </div>
  );
}
