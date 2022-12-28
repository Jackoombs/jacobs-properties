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
    <div className="relative flex aspect-video h-auto w-full items-center justify-center">
      <div
        className="h-full w-full overflow-hidden rounded-big"
        id="player"
      ></div>
      {!playVideo && (
        <button
          id="button"
          className="absolute top-0 flex h-full w-full items-center justify-center overflow-y-scroll duration-150 ease-in-out hover:w-screen"
          onClick={() => {}}
        >
          <img
            className="absolute top-0 h-full w-full rounded-big object-cover object-top brightness-[.65]"
            src={thumbnailPath}
            alt=""
          />
          <div className="flex aspect-square h-2/6 w-auto items-center justify-center rounded-full bg-white text-xl opacity-80">
            <FaPlay className="absolute ml-1 text-[6vw] text-primary-100 opacity-100 md:ml-3 2xl:ml-6 2xl:text-8xl" />
          </div>
        </button>
      )}
    </div>
  );
}
