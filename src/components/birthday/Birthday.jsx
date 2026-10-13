import React, {useEffect, useMemo, useState} from "react";
import kruti_1 from "../../assets/images/Kruti_1.JPG";
import kruti_2 from "../../assets/images/Kruti_2.JPG";
import kruti_3 from "../../assets/images/Kruti_3.JPG";
import kruti_4 from "../../assets/images/Kruti_4.PNG";

/*
  ============================================================
  KRUTI'S BIRTHDAY — ONE COMPONENT EXPERIENCE
  ============================================================

  Change these two values:
*/
const HER_NAME = "Kruti";
const YOUR_NAME = "Jimish";

const CHUMBAK_IMAGE =
  "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQWBF_mXv-E_z-3fJ7m02ZbNiHY2rkEgvTBfMHJpqH6VTmIc48sw-TumC_fqpetMbCw9bHONRTkJ1vp6_ENYvQ3wOMV-sCDeCsdD8Wa1wdbpQrft_67vLPaZYzJIBljjVO-QBo_chX3jhyJZBHuuFwC3c2Co.jpg?r=15e";

const CHUMBAK_DIALOGUES = [
  {
    label: "ROMANTIC MOMENT: ATTEMPT #1",
    emoji: "💑",
    speaker: "Jimish:",
    line: "Aaj birthday pe sirf tum, main aur ek romantic dinner.",
    replySpeaker: "Chumbak Colony:",
    reply:
      "Bahut badhiya! Hum sab bhi aa rahe hain. Cake kitne logon ka mangwaya? 😂"
  },
  {
    label: "THE SURPRISE COMMITTEE",
    emoji: "🕵️",
    speaker: "Kruti:",
    line: "Mujhe bas ek chhota sa surprise chahiye.",
    replySpeaker: "Jimish:",
    reply:
      "Surprise ready hai. Bas uska planning meeting, budget approval aur execution pending hai. 😭"
  },
  {
    label: "PREM KI PARIKSHA",
    emoji: "🌙",
    speaker: "Jimish:",
    line: "Tumhare liye chaand-taare tod laaunga.",
    replySpeaker: "Kruti:",
    reply: "Pehle dinner ka restaurant decide kar lo, Mr. Astronomer. 🌝"
  },
  {
    label: "COLONY KI BREAKING NEWS",
    emoji: "📢",
    speaker: "Neighbour Aunty:",
    line: "Hum kisi ki personal life mein interfere nahi karte.",
    replySpeaker: "Also Aunty, 2 seconds later:",
    reply:
      "Achha, toh birthday pe kya gift diya? Aur shaadi kab hai? Sab details batao. 👀"
  },
  {
    label: "SACHCHA PYAAR",
    emoji: "❤️",
    speaker: "Jimish:",
    line: "Main tumhari har baat maanunga.",
    replySpeaker: "Kruti:",
    reply: "Screenshot le rahi hoon. Baad mein mukarne mat dena. 📸"
  },
  {
    label: "FINAL COLONY VERDICT",
    emoji: "⚖️",
    speaker: "Colony Committee:",
    line: "In dono ko award milna chahiye.",
    replySpeaker: "Award category:",
    reply: "Best Couple in Romance, Bakchodi & Unnecessary Arguments. 🏆😂"
  }
];

/*
  Replace these image URLs with your own photos.
  You can simply paste your Cloudinary / Supabase / public image URLs.
*/
const PHOTOS = [
  {
    src: kruti_1,
    title: "The smile",
    text: "Honestly, this smile should require a license. Also this cuteness should be illegal. 😘"
  },
  {
    src: kruti_2,
    title: "Uff those eyes",
    text: "That look. Those eyes. That smile. That hair. That everything. My favourite person in the world."
  },
  {
    src: kruti_3,
    title: "First Date Vibes",
    text: "A little chaos, a lot of laughter, and somehow... my favourite thing."
  },
  {
    src: kruti_4,
    title: "My person",
    text: "Out of everyone in this giant world, I somehow got you."
  }
];

const REASONS = [
  "I love the way you make ordinary days feel special My Dear Krutiii ❤️",
  "I love how your smile can completely change my mood my sweet Kaju Katlii ❤️",
  "I love our silly conversations that somehow last forever my cutiee ❤️",
  "I love that I can be completely myself around you and no wonder how crazy I get my sweet pumpkins ❤️",
  "I love the little things you do that you don't even realize I notice.",
  "I love imagining all the places, memories and adventures we'll have together in the future my sweetiee ❤️",
  "And most importantly... I love that it's you. Always you and only you Babyy ❤️"
];

const LOVE_LETTER = `
My beautiful ${HER_NAME},

Today is technically and practically your birthday. And which makes this day most important for my life.

But somehow, I feel like I am the lucky one who got this awesome sweet present in my life. You. 😘

You have become such a beautiful part of my life that sometimes I genuinely wonder how I got so lucky.

You are my favourite person to talk to,
my favourite person to annoy,
my favourite person to miss,
my favorite person to laugh with,
my favourite person to make memories with,
and definitely my favourite person to love.

I hope this new year of your life gives you everything your heart wishes for and god bless you with all the happiness, love and success in the world.

I hope we travel to places we've never seen,
eat food we absolutely did not need,
laugh at jokes that make absolutely no sense,
take approximately 1000000 unnecessary photos,
and continue irritating each other for many, many years. From twinkles till wrinkles. 😘

There will be amazing days.
There will be difficult days.
There will be days when we disagree over something completely stupid.

But through all of them,
I want you beside me.

Because life feels a little more beautiful with you in it.

Happy Birthday, my love, Krutii

Stay exactly the way you are.

Cute.
Crazy.
Beautiful.
Sexyy.
Hottie.
And completely, ridiculously, wonderfully YOU.

And also most importantly, stay mine. Forever. ❤️

I love you more than this tiny website could ever explain.

Forever yours,
${YOUR_NAME} ❤️
`;

export default function BirthdayExperience({onSignOut}) {
  const [phase, setPhase] = useState("intro");

  const [noCount, setNoCount] = useState(0);

  const [missions, setMissions] = useState([false, false, false]);

  const [flippedPhotos, setFlippedPhotos] = useState([]);

  const [reasonIndex, setReasonIndex] = useState(-1);

  const [loveLevel, setLoveLevel] = useState(0);

  const [giftOpened, setGiftOpened] = useState(false);

  const [letterText, setLetterText] = useState("");

  const [showNickname, setShowNickname] = useState(false);

  const [chumbakIndex, setChumbakIndex] = useState(0);

  const allMissionsComplete = missions.every(Boolean);

  const allPhotosOpened = flippedPhotos.length === PHOTOS.length;

  const progress = useMemo(() => {
    const phases = [
      "intro",
      "identity",
      "mission",
      "chumbak",
      "memories",
      "reasons",
      "meter",
      "final"
    ];

    const index = phases.indexOf(phase);

    return Math.round(((index + 1) / phases.length) * 100);
  }, [phase]);

  /*
    Typewriter effect for the final letter.
  */
  useEffect(() => {
    if (!giftOpened) {
      setLetterText("");
      return;
    }

    let index = 0;

    const timer = setInterval(() => {
      index += 1;
      setLetterText(LOVE_LETTER.slice(0, index));

      if (index >= LOVE_LETTER.length) {
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [giftOpened]);

  const goTo = nextPhase => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setPhase(nextPhase);
  };

  const toggleMission = index => {
    setMissions(current =>
      current.map((value, i) => (i === index ? true : value))
    );
  };

  const togglePhoto = index => {
    setFlippedPhotos(current =>
      current.includes(index) ? current : [...current, index]
    );
  };

  const nextReason = () => {
    if (reasonIndex < REASONS.length - 1) {
      setReasonIndex(current => current + 1);
    }
  };

  const increaseLove = () => {
    setLoveLevel(current => Math.min(current + 20, 100));
  };

  return (
    <div className="birthday-app">
      {/* =====================================================
          GLOBAL DECORATION
      ====================================================== */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #160d17;
        }

        button {
          font-family: inherit;
        }

        .birthday-app {
          all: initial;
          display: block;
          min-height: 100vh;
          overflow-x: hidden;
          color: #fff7fb;
          font-family: "DM Sans", sans-serif;
          color-scheme: dark;
          isolation: isolate;
          background:
            radial-gradient(circle at 10% 10%, rgba(255, 120, 170, 0.20), transparent 28%),
            radial-gradient(circle at 90% 20%, rgba(185, 115, 255, 0.20), transparent 25%),
            radial-gradient(circle at 50% 100%, rgba(255, 80, 135, 0.14), transparent 35%),
            linear-gradient(160deg, #170c17 0%, #261020 48%, #140a16 100%);
          position: relative;
        }

        .birthday-app,
        .birthday-app * {
          color: inherit;
        }

        .birthday-app::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.06;
          background-image:
            radial-gradient(#fff 0.7px, transparent 0.7px);
          background-size: 16px 16px;
          z-index: 0;
        }

        .page {
          width: min(100%, 480px);
          margin: 0 auto;
          min-height: 100vh;
          padding: 18px 18px 60px;
          position: relative;
          z-index: 2;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .tiny-brand {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .progress-label {
          font-size: 11px;
          font-weight: 600;
          opacity: 0.65;
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.10);
          border-radius: 50px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #ff709f, #eaa7ff);
          transition: width 0.6s ease;
        }

        .birthday-signout {
          display: block;
          margin: -10px 0 18px auto;
          border: 0;
          color: #bda4b3;
          background: transparent;
          cursor: pointer;
          font-size: 11px;
        }

        .birthday-signout:hover {
          color: #ffabc7;
        }

        .phase-card {
          animation: pageIn 0.65s ease both;
        }

        @keyframes pageIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .eyebrow {
          color: #ff9fc3;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .title {
          font-family: "Playfair Display", serif;
          font-size: clamp(40px, 11vw, 62px);
          line-height: 0.98;
          margin: 0;
          letter-spacing: -0.04em;
        }

        .subtitle {
          color: #e8ccd9;
          font-size: 15px;
          line-height: 1.75;
          margin: 16px 0 0;
        }

        .script {
          font-family: "Caveat", cursive;
          color: #ffaccb;
          font-size: 31px;
          line-height: 1;
        }

        .glass {
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow:
            0 20px 80px rgba(0,0,0,0.28),
            inset 0 1px rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .hero {
          min-height: calc(100vh - 100px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          padding: 26px 4px;
        }

        .floating-hearts {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-hearts span {
          position: absolute;
          font-size: 20px;
          animation: floatUp linear infinite;
          opacity: 0.65;
        }

        .floating-hearts span:nth-child(1) {
          left: 7%;
          bottom: -10%;
          animation-duration: 8s;
        }

        .floating-hearts span:nth-child(2) {
          left: 23%;
          bottom: -15%;
          animation-duration: 11s;
          animation-delay: 1.4s;
        }

        .floating-hearts span:nth-child(3) {
          left: 50%;
          bottom: -10%;
          animation-duration: 9s;
          animation-delay: 2s;
        }

        .floating-hearts span:nth-child(4) {
          left: 73%;
          bottom: -15%;
          animation-duration: 12s;
          animation-delay: 0.5s;
        }

        .floating-hearts span:nth-child(5) {
          left: 91%;
          bottom: -10%;
          animation-duration: 10s;
          animation-delay: 2.6s;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-115vh) rotate(25deg);
            opacity: 0;
          }
        }

        .illustration {
          width: 170px;
          height: 170px;
          margin: 0 auto 26px;
          display: grid;
          place-items: center;
          position: relative;
        }

        .heart-orbit {
          width: 134px;
          height: 134px;
          border: 1px solid rgba(255,170,203,0.30);
          border-radius: 50%;
          animation: pulseOrbit 3s ease-in-out infinite;
          display: grid;
          place-items: center;
          background: rgba(255, 119, 163, 0.06);
        }

        @keyframes pulseOrbit {
          0%, 100% {
            transform: scale(0.97);
          }
          50% {
            transform: scale(1.04);
          }
        }

        .big-heart {
          font-size: 68px;
          filter: drop-shadow(0 8px 20px rgba(255,75,130,0.25));
          animation: heartbeat 1.7s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.08); }
          30% { transform: scale(1); }
          45% { transform: scale(1.06); }
        }

        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 999px;
          font-size: 11px;
          color: #f5dbe6;
          margin: 16px 0 20px;
        }

        .primary-btn {
          width: 100%;
          border: 0;
          border-radius: 18px;
          padding: 16px 18px;
          font-size: 15px;
          font-weight: 700;
          color: #321320;
          background: linear-gradient(135deg, #ff94b9, #ffc3d7);
          box-shadow:
            0 14px 30px rgba(255, 116, 165, 0.20),
            inset 0 1px rgba(255,255,255,0.7);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-top: 22px;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
        }

        .primary-btn:active {
          transform: scale(0.98);
        }

        .secondary-btn {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 14px 18px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: rgba(255,255,255,0.06);
          cursor: pointer;
          transition: 0.2s ease;
          margin-top: 12px;
        }

        .secondary-btn:hover {
          background: rgba(255,255,255,0.10);
        }

        .joke-card {
          margin-top: 24px;
          padding: 18px;
          border-radius: 22px;
          text-align: left;
        }

        .joke-card .joke-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffafc8;
          margin-bottom: 8px;
        }

        .joke-card p {
          margin: 0;
          color: #ead4df;
          line-height: 1.65;
          font-size: 14px;
        }

        .choice-wrap {
          margin-top: 28px;
        }

        .choice-btn {
          width: 100%;
          border-radius: 18px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          background: rgba(255,255,255,0.06);
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.25s ease;
        }

        .choice-btn.yes {
          background: rgba(255,124,169,0.17);
          border-color: rgba(255,150,189,0.35);
        }

        .choice-btn:hover {
          transform: translateY(-2px);
        }

        .funny-message {
          min-height: 44px;
          margin-top: 12px;
          text-align: center;
          color: #ffb1c9;
          font-size: 13px;
          line-height: 1.55;
        }

        .security-card {
          padding: 24px;
          border-radius: 28px;
          margin-top: 22px;
        }

        .security-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .security-icon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          font-size: 25px;
        }

        .security-title {
          font-size: 17px;
          font-weight: 700;
          margin: 0;
        }

        .security-small {
          font-size: 11px;
          opacity: 0.6;
          margin-top: 4px;
        }

        .question {
          font-family: "Playfair Display", serif;
          font-size: 30px;
          line-height: 1.15;
          margin: 0 0 18px;
        }

        .mission-list {
          display: grid;
          gap: 14px;
          margin-top: 24px;
        }

        .mission {
          border-radius: 20px;
          padding: 17px;
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.045);
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .mission.done {
          border-color: rgba(255,156,194,0.35);
          background: rgba(255,110,160,0.10);
        }

        .mission-emoji {
          width: 46px;
          height: 46px;
          border-radius: 15px;
          display: grid;
          place-items: center;
          background: rgba(255,255,255,0.07);
          font-size: 23px;
          flex-shrink: 0;
        }

        .mission-text {
          flex: 1;
        }

        .mission-name {
          font-size: 14px;
          font-weight: 700;
        }

        .mission-note {
          font-size: 12px;
          color: #cdb4c1;
          margin-top: 4px;
          line-height: 1.4;
        }

        .check {
          font-size: 18px;
          opacity: 0.5;
        }

        .done .check {
          opacity: 1;
        }

        .section-heading {
          margin-bottom: 22px;
        }

        .section-heading .title {
          font-size: 43px;
        }

        .memory-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 22px;
        }

        .memory-card {
          aspect-ratio: 0.82;
          perspective: 900px;
          cursor: pointer;
          border: 0;
          background: transparent;
          padding: 0;
        }

        .memory-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(.2,.75,.2,1);
        }

        .memory-card.flipped .memory-inner {
          transform: rotateY(180deg);
        }

        .memory-front,
        .memory-back {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .memory-front {
          background: #2a1625;
        }

        .memory-front img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .memory-front::after {
          content: "Tap me ♥";
          position: absolute;
          left: 10px;
          bottom: 10px;
          font-size: 10px;
          background: rgba(0,0,0,0.38);
          border: 1px solid rgba(255,255,255,0.20);
          padding: 6px 9px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }

        .memory-back {
          transform: rotateY(180deg);
          background:
            linear-gradient(145deg, rgba(255,148,185,0.22), rgba(175,124,255,0.12)),
            #261320;
          border: 1px solid rgba(255,255,255,0.10);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
          text-align: left;
        }

        .memory-back .memory-title {
          font-family: "Playfair Display", serif;
          font-size: 20px;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .memory-back p {
          margin: 0;
          color: #dec7d2;
          font-size: 12px;
          line-height: 1.5;
        }

        .counter {
          text-align: center;
          font-size: 12px;
          color: #cdb5c1;
          margin-top: 18px;
        }

        .reason-card {
          margin-top: 24px;
          min-height: 280px;
          border-radius: 28px;
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .reason-card::before {
          content: "♥";
          position: absolute;
          top: -36px;
          right: -15px;
          font-size: 150px;
          color: rgba(255,255,255,0.035);
          font-family: Georgia, serif;
        }

        .reason-number {
          font-family: "Caveat", cursive;
          font-size: 30px;
          color: #ffa6c5;
        }

        .reason-text {
          font-family: "Playfair Display", serif;
          font-size: clamp(27px, 7.5vw, 36px);
          line-height: 1.20;
          max-width: 95%;
          position: relative;
          z-index: 1;
        }

        .reason-footer {
          color: #cdb8c4;
          font-size: 12px;
          position: relative;
          z-index: 1;
        }

        .meter-card {
          padding: 26px 20px;
          border-radius: 28px;
          margin-top: 24px;
          text-align: center;
        }

        .meter-heart {
          font-size: 68px;
          margin: 10px 0;
          animation: heartbeat 1.7s infinite;
        }

        .meter-number {
          font-family: "Playfair Display", serif;
          font-size: 46px;
          margin-top: 5px;
        }

        .meter-label {
          font-size: 12px;
          color: #cdb8c4;
          margin-top: 4px;
        }

        .meter-track {
          margin: 26px 0 20px;
          width: 100%;
          height: 14px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
        }

        .meter-fill {
          height: 100%;
          width: 0;
          border-radius: inherit;
          background: linear-gradient(90deg, #ff6f9b, #d899ff);
          transition: width 0.5s ease;
        }

        .meter-joke {
          min-height: 40px;
          font-family: "Caveat", cursive;
          color: #ffabc7;
          font-size: 22px;
        }

        .final-page {
          text-align: center;
          padding-top: 20px;
        }

        .gift-box {
          width: 150px;
          height: 130px;
          margin: 40px auto 30px;
          position: relative;
          cursor: pointer;
          animation: giftFloat 2.5s ease-in-out infinite;
        }

        @keyframes giftFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .gift-lid {
          position: absolute;
          width: 150px;
          height: 34px;
          top: 8px;
          left: 0;
          border-radius: 10px;
          background: linear-gradient(135deg, #ff80ab, #e7a0ff);
          box-shadow: 0 15px 35px rgba(255,97,154,0.22);
          transition: transform 0.7s cubic-bezier(.2,.8,.2,1);
          z-index: 3;
        }

        .gift-body {
          position: absolute;
          width: 136px;
          height: 94px;
          left: 7px;
          top: 38px;
          border-radius: 7px 7px 16px 16px;
          background: linear-gradient(160deg, #ff88af, #c995f6);
          z-index: 2;
        }

        .gift-ribbon-v {
          position: absolute;
          left: 61px;
          top: 0;
          width: 28px;
          height: 100%;
          background: rgba(255,255,255,0.30);
          z-index: 4;
        }

        .gift-ribbon-h {
          position: absolute;
          left: 0;
          top: 15px;
          width: 100%;
          height: 17px;
          background: rgba(255,255,255,0.28);
          z-index: 4;
        }

        .gift-open .gift-lid {
          transform: translateY(-72px) rotate(-10deg);
        }

        .confetti {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          top: -20px;
          width: 9px;
          height: 15px;
          border-radius: 2px;
          animation: confettiFall 3.4s linear infinite;
          opacity: 0.9;
        }

        @keyframes confettiFall {
          0% {
            transform:
              translate3d(0, -20px, 0)
              rotate(0deg);
          }

          100% {
            transform:
              translate3d(var(--drift), 110vh, 0)
              rotate(720deg);
          }
        }

        .letter {
          margin-top: 28px;
          padding: 25px 20px;
          border-radius: 26px;
          text-align: left;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.045)
            );
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 30px 80px rgba(0,0,0,0.30);
        }

        .letter::before {
          content: "♥";
          display: block;
          text-align: center;
          font-size: 32px;
          margin-bottom: 16px;
          color: #ff9dbc;
        }

        .letter-content {
          white-space: pre-wrap;
          color: #f2dce6;
          font-size: 14px;
          line-height: 1.9;
        }

        .cursor {
          display: inline-block;
          width: 7px;
          height: 18px;
          background: #ff9ebe;
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.7s infinite;
        }

        @keyframes blink {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0; }
        }

        .signature {
          margin-top: 25px;
          text-align: center;
          font-family: "Caveat", cursive;
          font-size: 29px;
          color: #ffabc6;
        }

        .final-tag {
          margin-top: 24px;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #bca6b4;
        }

        .tiny-love {
          margin-top: 30px;
          color: #8f7483;
          font-size: 10px;
          line-height: 1.5;
        }

        .reveal {
          animation: reveal 0.5s ease both;
        }
/* CHUMBAK COLONY COMEDY */

.chumbak-banner {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  margin-top: 24px;
  background: #281625;
  border: 1px solid rgba(255, 160, 195, 0.24);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.28);
}

.chumbak-image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: center;
  animation: colonyEntrance 0.65s ease both;
}

@keyframes colonyEntrance {
  0% {
    opacity: 0.5;
    transform: scale(1.07);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.chumbak-image-caption {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  width: fit-content;
  max-width: calc(100% - 24px);
  padding: 8px 11px;
  border-radius: 999px;
  background: rgba(20, 10, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(10px);
  font-size: 10px;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.chumbak-comedy-card {
  margin-top: 18px;
  padding: 20px;
  border-radius: 24px;
  animation: pageIn 0.45s ease both;
}

.chumbak-label {
  font-size: 10px;
  font-weight: 700;
  color: #ffacc8;
  letter-spacing: 0.13em;
  line-height: 1.6;
  text-transform: uppercase;
}

.chumbak-scene-emoji {
  font-size: 32px;
  margin: 12px 0 16px;
  animation: heartbeat 1.7s ease-in-out infinite;
}

.dialogue-bubble {
  margin-top: 13px;
  padding: 15px;
  border-radius: 17px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.dialogue-bubble.reply {
  margin-left: 18px;
  background: rgba(255, 132, 178, 0.11);
  border-color: rgba(255, 153, 194, 0.18);
}

.dialogue-speaker {
  margin-bottom: 6px;
  font-size: 11px;
  color: #ffabc8;
  font-weight: 700;
}

.dialogue-text {
  margin: 0;
  font-size: 14px;
  color: #f5e4ec;
  line-height: 1.75;
}

.colony-verdict {
  padding: 14px;
  text-align: center;
  margin-top: 18px;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
  color: #cdb5c3;
  font-size: 11px;
  line-height: 1.7;
}

.chumbak-controls {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.chumbak-controls .primary-btn,
.chumbak-controls .secondary-btn {
  margin-top: 0;
}

.comedy-counter {
  text-align: center;
  color: #bfa6b6;
  font-size: 11px;
  margin-top: 12px;
}

@media (prefers-reduced-motion: reduce) {
  .chumbak-image,
  .chumbak-scene-emoji {
    animation: none;
  }
}
        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 700px) {
          .page {
            padding-top: 28px;
          }
        }
      `}</style>

      <div className="floating-hearts">
        <span>💗</span>
        <span>♡</span>
        <span>💕</span>
        <span>✨</span>
        <span>💖</span>
      </div>

      <main className="page">
        {/* TOP PROGRESS */}

        <div className="topbar">
          <div className="tiny-brand">For {HER_NAME} ♡</div>

          <div className="progress-label">{progress}% unlocked</div>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{width: `${progress}%`}} />
        </div>

        {onSignOut && <button className="birthday-signout" onClick={onSignOut} type="button">Close our little world</button>}

        {/* =====================================================
            PHASE 1 — THE HOOK
        ====================================================== */}

        {phase === "intro" && (
          <section className="phase-card hero">
            <div className="illustration">
              <div className="heart-orbit">
                <div className="big-heart">💗</div>
              </div>
            </div>

            <div className="eyebrow">⚠️ Very Important Announcement</div>

            <h1 className="title">
              Wait...
              <br />
              This is for
              <br />
              <span style={{color: "#ff9fbe"}}>you.</span>
            </h1>

            <p className="subtitle">
              There is something extremely important you need to investigate.
            </p>

            <div className="glass joke-card">
              <div className="joke-title">🚨 INTERNET EMERGENCY</div>

              <p>
                Authorities have confirmed that one person has become
                dangerously cute again.
                <br />
                <br />
                Unfortunately...
                <strong> it's you.</strong> 😭❤️
              </p>
            </div>

            <button className="primary-btn" onClick={() => goTo("identity")}>
              Okay... Investigate 👀
            </button>

            <div className="badge">🔐 Classified • Birthday Protocol v1.0</div>
          </section>
        )}

        {/* =====================================================
            PHASE 2 — IDENTITY CHECK
        ====================================================== */}

        {phase === "identity" && (
          <section className="phase-card">
            <div className="eyebrow">Phase 02 • Security Check</div>

            <h1 className="title">
              First,
              <br />
              prove who
              <br />
              <span style={{color: "#ff9fbe"}}>you are.</span>
            </h1>

            <div className="glass security-card">
              <div className="security-header">
                <div className="security-icon">🔐</div>

                <div>
                  <div className="security-title">Birthday Security System</div>

                  <div className="security-small">
                    Highly sophisticated technology (definitely not made by me)
                  </div>
                </div>
              </div>

              <p className="question">Are you actually {HER_NAME}? 👀</p>

              <div className="choice-wrap">
                <button
                  className="choice-btn yes"
                  onClick={() => goTo("mission")}
                >
                  Obviously! 😌
                </button>

                <button
                  className="choice-btn"
                  onClick={() => setNoCount(count => count + 1)}
                >
                  {noCount === 0
                    ? "Hmm... maybe not 🤨"
                    : noCount === 1
                    ? "Still thinking... 😏"
                    : noCount === 2
                    ? "Okay fine, I am suspicious 😂"
                    : "I give up 😭"}
                </button>
              </div>

              <div className="funny-message">
                {noCount === 0 && "Choose wisely. This system has feelings."}

                {noCount === 1 &&
                  "Interesting... security team is watching you 👁️"}

                {noCount === 2 &&
                  "Madam, you are literally the birthday girl. 😂"}

                {noCount >= 3 &&
                  "Fine. You win. Please continue before I get emotionally defeated. 😭❤️"}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            PHASE 3 — MINI MISSIONS
        ====================================================== */}

        {phase === "mission" && (
          <section className="phase-card">
            <div className="eyebrow">Phase 03 • Tiny Mission</div>

            <h1 className="title">
              Before I
              <br />
              reveal the
              <br />
              <span style={{color: "#ff9fbe"}}>good stuff...</span>
            </h1>

            <p className="subtitle">
              You need to complete three highly scientific birthday missions.
            </p>

            <div className="glass security-card">
              <div className="security-header">
                <div className="security-icon">🧪</div>

                <div>
                  <div className="security-title">Mission Control</div>

                  <div className="security-small">
                    Progress: {missions.filter(Boolean).length}/3
                  </div>
                </div>
              </div>

              <div className="mission-list">
                <button
                  className={`mission ${missions[0] ? "done" : ""}`}
                  onClick={() => toggleMission(0)}
                >
                  <div className="mission-emoji">🥰</div>

                  <div className="mission-text">
                    <div className="mission-name">Smile</div>

                    <div className="mission-note">
                      Think of your favourite person.
                    </div>
                  </div>

                  <div className="check">{missions[0] ? "✅" : "○"}</div>
                </button>

                <button
                  className={`mission ${missions[1] ? "done" : ""}`}
                  onClick={() => toggleMission(1)}
                >
                  <div className="mission-emoji">💕</div>

                  <div className="mission-text">
                    <div className="mission-name">A little Joy Dance</div>

                    <div className="mission-note">
                      Yes, this is absolutely necessary.
                    </div>
                  </div>

                  <div className="check">{missions[1] ? "✅" : "○"}</div>
                </button>

                <button
                  className={`mission ${missions[2] ? "done" : ""}`}
                  onClick={() => toggleMission(2)}
                >
                  <div className="mission-emoji">💋</div>

                  <div className="mission-text">
                    <div className="mission-name">Give kisses to the person created this</div>

                    <div className="mission-note">
                      Delivery successful. Probably.
                    </div>
                  </div>

                  <div className="check">{missions[2] ? "✅" : "○"}</div>
                </button>
              </div>

              {allMissionsComplete && (
                <div className="reveal">
                  <button
                    className="primary-btn"
                    onClick={() => goTo("chumbak")}
                  >
                    Enter Chumbak Colony 😂
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =====================================================
    PHASE 4 — CHUMBAK COLONY COMEDY SPECIAL
====================================================== */}

        {phase === "chumbak" && (
          <section className="phase-card">
            <div className="eyebrow">Phase 04 • Special Comedy Episode 😂</div>

            <h1 className="title">
              Welcome to
              <br />
              <span style={{color: "#ff9fbe"}}>Chumbak Colony.</span>
            </h1>

            <p className="subtitle">
              Jahaan pyaar personal hota hai...
              <br />
              lekin uski investigation poori colony karti hai. 🕵️
            </p>

            <div className="chumbak-banner">
              <img
                className="chumbak-image"
                src={CHUMBAK_IMAGE}
                alt="Promotional still from the Netflix series Chumbak"
                loading="lazy"
                onError={event => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="chumbak-image-caption">
                CHUMBAK COLONY • PRIVACY NOT FOUND 🔍
              </div>
            </div>

            <div key={chumbakIndex} className="glass chumbak-comedy-card">
              <div className="chumbak-label">
                {CHUMBAK_DIALOGUES[chumbakIndex].label}
              </div>

              <div className="chumbak-scene-emoji">
                {CHUMBAK_DIALOGUES[chumbakIndex].emoji}
              </div>

              <div className="dialogue-bubble">
                <div className="dialogue-speaker">
                  {CHUMBAK_DIALOGUES[chumbakIndex].speaker}
                </div>

                <p className="dialogue-text">
                  {CHUMBAK_DIALOGUES[chumbakIndex].line}
                </p>
              </div>

              <div className="dialogue-bubble reply">
                <div className="dialogue-speaker">
                  {CHUMBAK_DIALOGUES[chumbakIndex].replySpeaker}
                </div>

                <p className="dialogue-text">
                  {CHUMBAK_DIALOGUES[chumbakIndex].reply}
                </p>
              </div>

              <div className="colony-verdict">
                📋 Official Chumbak Colony Report
                <br />
                Romance: 100% • Privacy: 0% • Drama: Unlimited
              </div>
            </div>

            <div className="comedy-counter">
              Comedy scene {chumbakIndex + 1} of {CHUMBAK_DIALOGUES.length}
            </div>

            <div className="chumbak-controls">
              {chumbakIndex < CHUMBAK_DIALOGUES.length - 1 ? (
                <button
                  className="primary-btn"
                  onClick={() => {
                    setChumbakIndex(current => current + 1);
                    window.scrollTo({top: 0, behavior: "smooth"});
                  }}
                >
                  Next Colony Kaand 😂
                </button>
              ) : (
                <button
                  className="primary-btn"
                  onClick={() => goTo("memories")}
                >
                  Bas Bas, Ab Romance Pe Aao ❤️
                </button>
              )}

              <button
                className="secondary-btn"
                onClick={() => goTo("memories")}
              >
                Skip the drama → Show me our memories
              </button>
            </div>

            <p
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#907b8a",
                lineHeight: 1.7,
                marginTop: 22
              }}
            >
              A fan-made birthday tribute inspired by neighbourhood comedy and
              romantic chaos. Not affiliated with Netflix.
            </p>
          </section>
        )}

        {/* =====================================================
            PHASE 4 — MEMORIES
        ====================================================== */}

        {phase === "memories" && (
          <section className="phase-card">
            <div className="section-heading">
              <div className="eyebrow">Phase 04 • Classified Memories</div>

              <h1 className="title">
                A few of my
                <br />
                favourite
                <br />
                <span style={{color: "#ff9fbe"}}>moments.</span>
              </h1>

              <p className="subtitle">
                Tap each photo.
                <br />
                There is something hidden behind every one.
              </p>
            </div>

            <div className="memory-grid">
              {PHOTOS.map((photo, index) => (
                <button
                  key={index}
                  className={`memory-card ${
                    flippedPhotos.includes(index) ? "flipped" : ""
                  }`}
                  onClick={() => togglePhoto(index)}
                  aria-label={`Open memory ${index + 1}`}
                >
                  <div className="memory-inner">
                    <div className="memory-front">
                      <img
                        src={photo.src}
                        alt={`${HER_NAME} memory ${index + 1}`}
                      />
                    </div>

                    <div className="memory-back">
                      <div className="memory-title">{photo.title}</div>

                      <p>{photo.text}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="counter">
              {flippedPhotos.length}/{PHOTOS.length} memories opened
            </div>

            {allPhotosOpened && (
              <div className="reveal">
                <button className="primary-btn" onClick={() => goTo("reasons")}>
                  There is more... 👀
                </button>
              </div>
            )}
          </section>
        )}

        {/* =====================================================
            PHASE 5 — REASONS I LOVE YOU
        ====================================================== */}

        {phase === "reasons" && (
          <section className="phase-card">
            <div className="section-heading">
              <div className="eyebrow">Phase 05 • Confession Department</div>

              <h1 className="title">
                Things I
                <br />
                <span style={{color: "#ff9fbe"}}>love</span>
                about you.
              </h1>

              <p className="subtitle">
                Warning: the list is unfairly long.
                <br />I selected only a few.
              </p>
            </div>

            {reasonIndex >= 0 ? (
              <div key={reasonIndex} className="glass reason-card reveal">
                <div>
                  <div className="reason-number">#{reasonIndex + 1}</div>
                </div>

                <div className="reason-text">{REASONS[reasonIndex]}</div>

                <div className="reason-footer">
                  And yes, I could keep going forever.
                </div>
              </div>
            ) : (
              <div className="glass reason-card reveal">
                <div className="reason-number">✨</div>

                <div className="reason-text">
                  Shall I tell you why I love you?
                </div>

                <div className="reason-footer">Prepare yourself.</div>
              </div>
            )}

            {reasonIndex < REASONS.length - 1 ? (
              <button className="primary-btn" onClick={nextReason}>
                {reasonIndex === -1 ? "Tell me ❤️" : "Another one..."}
              </button>
            ) : (
              <button className="primary-btn" onClick={() => goTo("meter")}>
                Okay, this is getting emotional 🥹
              </button>
            )}
          </section>
        )}

        {/* =====================================================
            PHASE 6 — LOVE METER
        ====================================================== */}

        {phase === "meter" && (
          <section className="phase-card">
            <div className="section-heading">
              <div className="eyebrow">Phase 06 • Scientific Measurement</div>

              <h1 className="title">
                How much do
                <br />
                I love
                <br />
                <span style={{color: "#ff9fbe"}}>you?</span>
              </h1>

              <p className="subtitle">
                We need to conduct one final scientific experiment.
              </p>
            </div>

            <div className="glass meter-card">
              <div className="meter-heart">
                {loveLevel < 40
                  ? "🤍"
                  : loveLevel < 80
                  ? "💗"
                  : loveLevel < 100
                  ? "💖"
                  : "💘"}
              </div>

              <div className="meter-number">{loveLevel}%</div>

              <div className="meter-label">Current Love Level</div>

              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{
                    width: `${loveLevel}%`
                  }}
                />
              </div>

              <div className="meter-joke">
                {loveLevel === 0 && "Press the button. Science awaits. 🧪"}

                {loveLevel === 20 && "Cute. But nowhere near enough."}

                {loveLevel === 40 && "Okay... now we're getting somewhere."}

                {loveLevel === 60 &&
                  "WARNING: Heart is getting suspiciously full."}

                {loveLevel === 80 && "Almost there... ❤️"}

                {loveLevel === 100 &&
                  "ERROR 404: Maximum Love Capacity Exceeded. 😭❤️"}
              </div>

              {loveLevel < 100 ? (
                <button className="primary-btn" onClick={increaseLove}>
                  Increase Love ❤️
                </button>
              ) : (
                <button className="primary-btn" onClick={() => goTo("final")}>
                  Open Your Actual Present 🎁
                </button>
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            PHASE 7 — FINAL GIFT
        ====================================================== */}

        {phase === "final" && (
          <section className="phase-card final-page">
            {!giftOpened ? (
              <>
                <div className="eyebrow">Final Phase • One Last Thing</div>

                <h1 className="title">
                  I saved
                  <br />
                  something
                  <br />
                  <span style={{color: "#ff9fbe"}}>for you.</span>
                </h1>

                <p className="subtitle">
                  You have unlocked everything.
                  <br />
                  But the last thing isn't a photo.
                </p>

                <div
                  className="gift-box"
                  onClick={() => {
                    setGiftOpened(true);
                    setShowNickname(true);
                  }}
                >
                  <div className="gift-lid" />

                  <div className="gift-body">
                    <div className="gift-ribbon-v" />
                    <div className="gift-ribbon-h" />
                  </div>
                </div>

                <div className="script">Tap the gift 🎁</div>

                <button
                  className="primary-btn"
                  onClick={() => {
                    setGiftOpened(true);
                    setShowNickname(true);
                  }}
                >
                  Open my heart ❤️
                </button>
              </>
            ) : (
              <div className="reveal">
                {/* CONFETTI */}

                <div className="confetti">
                  {Array.from({length: 34}).map((_, index) => (
                    <span
                      key={index}
                      className="confetti-piece"
                      style={{
                        left: `${(index * 17) % 100}%`,
                        animationDelay: `${(index % 9) * 0.17}s`,
                        animationDuration: `${2.5 + (index % 6) * 0.3}s`,
                        width: `${6 + (index % 4) * 2}px`,
                        height: `${10 + (index % 5) * 3}px`,
                        background: [
                          "#ff8db4",
                          "#ffc3d7",
                          "#d6a6ff",
                          "#fff0a6",
                          "#9be7ff"
                        ][index % 5],
                        "--drift": `${((index * 29) % 160) - 80}px`
                      }}
                    />
                  ))}
                </div>

                <div className="eyebrow">🎉 Happy Birthday</div>

                <h1 className="title">
                  Happy
                  <br />
                  Birthday,
                  <br />
                  <span style={{color: "#ff9fbe"}}>{HER_NAME}.</span>
                </h1>

                {showNickname && (
                  <p className="script" style={{marginTop: 18}}>
                    My favourite human. ❤️
                  </p>
                )}

                <div className="letter">
                  <div className="letter-content">
                    {letterText}
                    {letterText.length < LOVE_LETTER.length && (
                      <span className="cursor" />
                    )}
                  </div>

                  {letterText.length >= LOVE_LETTER.length && (
                    <div className="reveal">
                      <div className="signature">
                        Forever yours,
                        <br />
                        {YOUR_NAME} ❤️
                      </div>

                      <div className="final-tag">
                        made with an unreasonable amount of love
                      </div>

                      <div className="tiny-love">
                        P.S. You thought this was the end?
                        <br />
                        It isn't.
                        <br />
                        We still have approximately 10,000 memories left to
                        make. 🥹❤️
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
