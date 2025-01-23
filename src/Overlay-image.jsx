export function OverlayImage({ showOverlay }) {
  const redirectToWebsite = () => {
    window.location.href =
      "https://www.theater-an-der-ruhr.de/de/programm/5759-erweiterte-realitaten";
  };
  if (showOverlay) {
    return (
      <div className="overlay-image-container" onClick={redirectToWebsite}>
        <img
          src="/images/VorabVisuals.png"
          alt="Descriptive Text"
          className="responsive-image"
        />
      </div>
    );
  } else return null;
}
