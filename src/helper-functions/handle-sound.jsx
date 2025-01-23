import { useEffect } from "react";

export default function HandleSound({ audioRef }) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
