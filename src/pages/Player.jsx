import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Player = ({ type }) => {
  const { id } = useParams();

  const embedUrl =
    type === "movie" ? `https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true` : `https://www.vidking.net/embed/tv/${id}/1/1?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`;

 
  useEffect(() => {
    const handleMessage = (event) => {
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data?.type === "PLAYER_EVENT") {
            console.log("Player Event:", data.data);

            // OPTIONAL:
            localStorage.setItem(
              `watch-progress-${id}`,
              JSON.stringify(data.data)
            );
          }
        } catch (err){
          console.error(err);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [id]);

  return (
    <div className="w-screen h-screen bg-black">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture"
        title="Video Player"
      />
    </div>
  );
};

export default Player;

