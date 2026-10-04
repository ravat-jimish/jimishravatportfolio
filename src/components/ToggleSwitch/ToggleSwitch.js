import React, {useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.scss";
import LightIcon from "../../assets/svg/LightTheme.jsx";
import DarkIcon from "../../assets/svg/DarkTheme.jsx";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="theme-toggle-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="theme-toggle-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
    </svg>
  );
}

const ToggleSwitch = () => {
  const {isDark, changeTheme} = useContext(StyleContext);

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={isDark ? "theme-toggle theme-toggle-dark" : "theme-toggle"}
      onClick={changeTheme}
      type="button"
    >
      {isDark ? <DarkIcon /> : <LightIcon />}
    </button>
  );
};
export default ToggleSwitch;
