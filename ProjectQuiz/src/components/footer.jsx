import { useState } from "react";
import "./footer.css";
import AboutusModal from "./Modals/AboutusModal";
import GithubModal from "./Modals/GithubModal";
import HelpModal from "./Modals/HelpModal";
import ReadmeModal from "./Modals/ReadmeModal";

function Footer() {
  const [showModalGithub, setShowModalGithub] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showModalAboutus, setShowModalAboutus] = useState(false);
  const [showModalHelp, setShowModalHelp] = useState(false);
  const [showModalReadme, setShowModalReadme] = useState(false);

  const openModalGithub = () => {
    setShowModalGithub(true);
  };

  const openModalContact = () => {
    setShowModalContact(true);
  };

  const openModalAboutus = () => {
    setShowModalAboutus(true);
  };

  const openModalHelp = () => {
    setShowModalHelp(true);
  };

  const openModalReadme = () => {
    setShowModalReadme(true);
  };

  return (
    <footer>
      <div className="links">
        <button className="footerButtons" onClick={openModalGithub} id="githubBtn">
          GitHub
        </button>
        {showModalGithub ? <GithubModal setShowModal={setShowModalGithub} /> : null}
        <button className="footerButtons" onClick={openModalAboutus} id="aboutusBtn">
          About Us
        </button>
        {showModalAboutus ? <AboutusModal setShowModal={setShowModalAboutus} /> : null}
        <button className="footerButtons" onClick={openModalHelp} id="helpBtn">
          Help
        </button>
        {showModalHelp ? <HelpModal setShowModal={setShowModalHelp} /> : null}
        <button className="footerButtons" onClick={openModalReadme} id="readmeBtn">
          Read Me
        </button>
        {showModalReadme ? <ReadmeModal setShowModal={setShowModalReadme} /> : null}
      </div>
    </footer>
  );
}

export default Footer;
