import "./Footer.css";

import rammusOk from "../../assets/rammusOk.png";

const Footer = () => {
    return (
        <footer className="footerContainer">
            <img src={rammusOk} alt="Rammus OK" className="rammusOkIcon" />

            <div className="infoContainer">
                <h3>My Info</h3>

                <a
                    href="https://www.linkedin.com/in/gabriel-osorno/"
                    className="footerLink"
                    target="_blank"
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/greatGOSVi?tab=repositories"
                    className="footerLink"
                    target="_blank"
                >
                    GitHub
                </a>
            </div>

            <div className="infoContainer">
                <h3>Sources</h3>

                <a
                    href="https://developer.riotgames.com/apis"
                    className="footerLink"
                    target="_blank"
                >
                    RIOT APIs
                </a>
                <a
                    href="https://developer.riotgames.com/docs/lol"
                    className="footerLink"
                    target="_blank"
                >
                    RIOT Docs
                </a>
            </div>

            <div className="infoContainer">
                <h3>Special Thanks!</h3>

                <span>
                    <a
                        href="https://www.linkedin.com/in/roberto-cervera-chacón-30506716b/"
                        className="footerLink"
                        target="_blank"
                    >
                        Roberto Cervera{" "}
                    </a>
                    (React mentoring)
                </span>
                <span>
                    <a
                        href="https://www.linkedin.com/in/marisolosorno/"
                        className="footerLink"
                        target="_blank"
                    >
                        Marisol Osorno{" "}
                    </a>
                    (Web Design tips)
                </span>
            </div>
        </footer>
    );
};

export default Footer;
