import React, {useContext} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const history = useHistory();
  const location = useLocation();
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;

  function navigateToSection(event, sectionId) {
    event.preventDefault();
    const scrollToSection = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({behavior: "smooth"});
      }
    };

    if (location.pathname !== "/") {
      history.push(`/#${sectionId}`);
      setTimeout(scrollToSection, 0);
    } else {
      scrollToSection();
    }
  }

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <Link to="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {viewSkills && (
            <li>
              <a href="#skills" onClick={event => navigateToSection(event, "skills")}>
                Skills
              </a>
            </li>
          )}
          {viewExperience && (
            <li>
              <a
                href="#experience"
                onClick={event => navigateToSection(event, "experience")}
              >
                Work Experiences
              </a>
            </li>
          )}
          {viewOpenSource && (
            <li>
              <a
                href="#opensource"
                onClick={event => navigateToSection(event, "opensource")}
              >
                Open Source
              </a>
            </li>
          )}
          {viewAchievement && (
            <li>
              <a
                href="#achievements"
                onClick={event => navigateToSection(event, "achievements")}
              >
                Achievements
              </a>
            </li>
          )}
          {viewBlog && (
            <li>
              <Link to="/blog">Blogs</Link>
            </li>
          )}
          {viewTalks && (
            <li>
              <a href="#talks" onClick={event => navigateToSection(event, "talks")}>
                Talks
              </a>
            </li>
          )}
          {viewResume && (
            <li>
              <a href="#resume" onClick={event => navigateToSection(event, "resume")}>
                Resume
              </a>
            </li>
          )}
          <li>
            <a href="#contact" onClick={event => navigateToSection(event, "contact")}>
              Contact Me
            </a>
          </li>
          <li>
            <ToggleSwitch />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
