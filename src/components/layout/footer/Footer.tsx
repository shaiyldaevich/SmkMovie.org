import { FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";

import scss from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.infoText}>
          <p>
            {" "}
            Ai-Movie - a unique website providing fascinating information about
            movies and TV shows. Here you can discover all the necessary details
            about your favorite films, actors, directors, ratings, and much
            more. Ai-Movie boasts a stylish and intuitive interface that makes
            your search for cinematic masterpieces as convenient and enjoyable
            as possible.
          </p>
        </div>
        <div className={scss.socialIcons}>
          <a href="https://www.instagram.com/mannapo_v/" target="_blank">
            <span className={scss.icon}>
              <FaInstagram />
            </span>
          </a>

          <a href="https://web.telegram.org/k/" target="_blank">
            <span className={scss.icon}>
              <FaTelegram />
            </span>
          </a>
          <a href="https://github.com/aibekmannapov/" target="_blank">
            <span className={scss.icon}>
              <FaGithub />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
