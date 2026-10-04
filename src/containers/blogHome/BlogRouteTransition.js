import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import SplashScreen from "../splashScreen/SplashScreen";
import "./BlogRouteTransition.scss";

export default function BlogRouteTransition({children}) {
  const history = useHistory();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef(null);
  const isReplayingClick = useRef(false);

  useEffect(() => {
    scrollToTop();
    setIsTransitioning(true);
    transitionTimer.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);

    return () => clearTimeout(transitionTimer.current);
  }, []);

  function scrollToTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function handleClickCapture(event) {
    if (isTransitioning || isReplayingClick.current) {
      return;
    }

    const clickedElement = event.target;
    const interactiveElement = clickedElement.closest
      ? clickedElement.closest("a, button")
      : null;
    const isInsideTransition = interactiveElement
      ? event.currentTarget.contains(interactiveElement)
      : false;

    if (!isInsideTransition) {
      return;
    }

    const linkPath = isInsideTransition
      ? interactiveElement.getAttribute("href")
      : null;

    event.preventDefault();
    event.stopPropagation();
    setIsTransitioning(true);

    transitionTimer.current = setTimeout(() => {
      if (interactiveElement && interactiveElement.tagName === "A" && linkPath) {
        if (linkPath.startsWith("/")) {
          history.push(linkPath);
        } else {
          window.location.href = linkPath;
        }
      } else if (interactiveElement && interactiveElement.tagName === "BUTTON") {
        isReplayingClick.current = true;
        interactiveElement.click();
        isReplayingClick.current = false;
      }

      scrollToTop();
      setIsTransitioning(false);
    }, 1000);
  }

  return (
    <div className="blog-route-transition" onClickCapture={handleClickCapture}>
      {children}
      {isTransitioning && (
        <div className="blog-transition-overlay">
          <SplashScreen />
        </div>
      )}
    </div>
  );
}