import React from "react";
import {Link} from "react-router-dom";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import buildAnimation from "../../assets/lottie/build.json";
import codingAnimation from "../../assets/lottie/codingPerson.json";
import emailAnimation from "../../assets/lottie/email.json";
import landingAnimation from "../../assets/lottie/landingPerson.json";
import "./HelperPage.scss";

const pageContent = {
  unauthorized: {
    eyebrow: "403 | Unauthorized",
    title: "This space is off limits.",
    description: "You do not have permission to view this page. Let us get you back to somewhere useful.",
    animation: codingAnimation
  },
  notFound: {
    eyebrow: "404 | Not found",
    title: "This page took a wrong turn.",
    description: "The page you are looking for does not exist or may have moved somewhere else.",
    animation: landingAnimation
  },
  comingSoon: {
    eyebrow: "Coming soon",
    title: "Something thoughtful is on the way.",
    description: "This page is still being shaped. Check back soon for the finished work.",
    animation: emailAnimation
  },
  maintenance: {
    eyebrow: "Maintenance",
    title: "A little behind-the-scenes work.",
    description: "This page is temporarily offline while it gets a careful tune-up. It will be back shortly.",
    animation: buildAnimation
  }
};

export default function HelperPage({page}) {
  const content = pageContent[page] || pageContent.notFound;

  return (
    <main className="helper-page">
      <div className="helper-page-content">
        <p className="helper-page-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="helper-page-description">{content.description}</p>
        <Link className="helper-page-button" to="/">
          Back to homepage
        </Link>
      </div>
      <div className="helper-page-illustration" aria-hidden="true">
        <DisplayLottie animationData={content.animation} />
      </div>
    </main>
  );
}