import { useEffect } from "react";
import { FaPlay } from "react-icons/fa/index.js";
import { useState } from "react";

interface Props {
  videoId: string;
  thumbnailPath: string;
  origin: URL;
}

export default function Video({ videoId, thumbnailPath, origin }: Props) {
  const [playVideo, setPlayVideo] = useState(false);

  var player: any;
  console.log(player);
  const loadVideo = () => {
    window.YT.ready(function () {
      player = new window.YT.Player("player", {
        height: "full",
        width: "full",
        videoId: `${videoId}`,
        events: {
          onReady: onPlayerReady,
        },
        origin: origin,
      });
    });

    function onPlayerReady(event: any) {
      console.log("ready");
      const button = document.getElementById("button");
      button?.addEventListener("click", () => {
        player.playVideo();
        setPlayVideo(true);
      });
    }
  };

  const useYoutube = (callback: any) => {
    useEffect(() => {
      if (!window.YT) {
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        tag.onload = callback;
      } else {
        callback();
      }
    }, []);
  };
  useYoutube(loadVideo);

  return (
    <div className="relative aspect-video h-auto w-full overflow-hidden rounded-xl bg-slate-700">
      <div className="h-full w-full" id="player"></div>
      {!playVideo && (
        <button
          id="button"
          className="absolute top-0 flex h-full w-full items-center justify-center"
          onClick={() => {}}
        >
          <img
            className="absolute top-0 h-full w-full object-cover object-top brightness-[.65]"
            src={thumbnailPath}
            alt=""
          />
          <div className="absolute flex aspect-square h-2/6 items-center justify-center rounded-full bg-white opacity-80"></div>
          <FaPlay className="absolute ml-1 text-3xl text-primary-100 opacity-100 sm:text-5xl md:text-[400%] lg:ml-4 lg:text-[600%]" />
        </button>
      )}
    </div>
  );
}
