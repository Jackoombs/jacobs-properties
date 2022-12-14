import Thumbnail from "../../assets/images/thumbnail.jpg";
import YouTube, { YouTubeProps } from "react-youtube";
import { FaPlay } from "react-icons/fa/index.js";
import { useState } from "react";

export default function Video() {
  const [playVideo, setPlayVideo] = useState(false);

  const onStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (e.target.getPlayerState() === 1) setPlayVideo(true);
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
  };

  return (
    <div className="relative aspect-video h-auto w-full overflow-hidden rounded-xl bg-slate-700">
      <YouTube
        videoId="Xsao1lF-6fQ"
        opts={opts}
        className="aspect-video h-full w-full"
        onStateChange={onStateChange}
      />
      {!playVideo && (
        <button
          className="pointer-events-none absolute top-0 flex h-full w-full items-center justify-center"
          onClick={() => setPlayVideo(true)}
        >
          <img
            className="absolute top-0 h-full w-full object-cover object-top brightness-[.65]"
            src={Thumbnail}
            alt=""
          />
          <div className="absolute flex aspect-square h-2/6 items-center justify-center rounded-full bg-white opacity-80"></div>
          <FaPlay className="absolute ml-1 text-3xl text-primary-100 opacity-100 sm:text-5xl md:text-[400%] lg:ml-4 lg:text-[600%]" />
        </button>
      )}
    </div>
  );
}
