import "./Style.css";

export default function LandingPage({ inAR, playsound, setInAR }) {
  if (!inAR) {
    return (
      <div className="landing-page-container">
        <img
          src="/images/links.png"
          alt="Descriptive Text"
          className="left-image"
        />
        <img
          src="/images/rechts.png"
          alt="Descriptive Text"
          className="right-image"
        />

        <div className="content-container">
          <h1 className="text1">kin_</h1>

          <p className="text2">
            Tippe auf das Bild,
            <br />
            um die Augmented Reality zu starten{" "}
          </p>

          <img
            src="/images/kin_preview.jpg"
            alt="Descriptive Text"
            onClick={() => {
              setInAR(true);
              playsound();
            }}
            className="preview-image"
          />

          <p className="text3">Mehr Informationen</p>
          <a
            href="https://www.theater-an-der-ruhr.de/de/programm/5759-erweiterte-realitaten"
            target="_blank"
            className="info-image"
          >
            <img src="/images/Info.png" alt="Descriptive Text" />
          </a>
        </div>
      </div>
    );
  }
}
