/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Jimish Ravat",
  title: "Hey, Jimish here",
  subTitle: emoji(
    "I am a Software Developer 🚀 | Tech Enthusiast 💻 | Lifelong Learner 📚"
  ),
  resumeLink:
    "https://drive.google.com/file/d/1x-5lUwCBGm4B7IhxL1NM8_h19FyIbBlO/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/jimishravat",
  linkedin: "https://www.linkedin.com/in/jimishravat/",
  gmail: "jimishravat2802@gmail.com",
  // gitlab: "https://gitlab.com/saadpasta",
  // facebook: "https://www.facebook.com/saad.pasta7",
  medium: "https://medium.com/@jimishravat2802",
  // stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "Skills that I have",
  subTitle: "",
  skills: [
    emoji(
      "⚡ Architect and deploy scalable SaaS applications with production-grade infrastructure, ensuring reliability, security, and optimal performance"
    ),
    emoji(
      "⚡ Create engaging, responsive UX/UI experiences across web and mobile platforms with modern frameworks and accessibility best practices"
    ),
    emoji(
      "⚡ Seamlessly integrate third-party APIs and services (Twilio, OpenAI, Cloudinary) to extend application functionality and enhance user capabilities"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "css3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "reactjs",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "sql-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Redux",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "Mongodb",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Postgres",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "Github",
      fontAwesomeClassname: "fab fa-github"
    },
    {
      skillName: "Postman",
      fontAwesomeClassname: "fas fa-envelope-open-text"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Birla Vishvakarma Mahavidhyalaya",
      logo: require("./assets/images/bvm.jpg"),
      subHeader: "Bachelor of Technology in Computer Engineering",
      duration: "July 2019 - May 2023",
      desc: "Completed studies with first class distinction",
      descBullets: [
        "Techincal Lead in Techno-Cultural Fest - Udaan'22",
        "Lead the Computer Society of India - BVM Chapter",
        "Worked on Document Management System using Blockchain and Ganache",
        "Made a full fledge Student ERP system as a semester project"
      ]
    }
    // {
    //   schoolName: "Stanford University",
    //   logo: require("./assets/images/stanfordLogo.png"),
    //   subHeader: "Bachelor of Science in Computer Science",
    //   duration: "September 2013 - April 2017",
    //   desc: "Ranked top 10% in the program. Took courses about Software Engineering, Web Security, Operating Systems, ...",
    //   descBullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    // }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "React & Redux - State management and scalable applications" //Insert stack or technology you have experience in
      // progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Java Enterprise Edition - Springboot"
      // progressPercentage: "80%"
    },
    {
      Stack: "Gen AI - RAG"
      // progressPercentage: "90%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Java Full Stack Developer",
      company: "Tata Consultancy Services",
      companylogo: require("./assets/images/tcs.png"),
      date: "August 2023 – Present",
      desc: "Building scalable web communication platform for inhouse product suite",
      descBullets: [
        "Owned the development of a production-grade front-end application using ReactJS & Redux, supporting over 10000 active users across multiple organizations.",
        "Designed & implemented scalable state management architecture,reducing unnecessary componentre-renders & improving overall UIresponsiveness by 30%.",
        "Builtreal-time userinterfaces leveraging Web Sockets driven data flows, enabling seamless live updates and significantly improving user experience.",
        "Optimized application performance through component memoization, lazy loading and efficient API integration,resulting in a 40% increase in user engagement.",
        "Collaborated with UX designers, backend engineers, and QA teams within Agile methodology to deliverintuitive, accessible, and stable userinterfaces aligned with productrequirements and predictable front-end delivery timelines."
      ]
    },
    {
      role: "Jr. Web Developer",
      company: "Aerolex Labs",
      companylogo: require("./assets/images/aerolex.png"),
      date: "January 2023 – June 2023",
      desc: "Developed end to end placement management system for college using MERN stack",
      descBullets: [
        "Built end-to-end placement management system using MERN stack, improving operational efficiency by 60%",
        "Implemented role-based access control with secure user-specific modules",
        "Refined features based on stakeholder feedback in Agile environment",
        "Ensured data integrity and secure authentication across all system modules"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle:
    "Delivering innovative technology solutions for startups and freelance clients",
  projects: [
    {
      image: require("./assets/images/phishing.png"),
      projectName: "Phishing Detection Chrome Extenstion",
      projectDesc:
        "Made a phishing detection chrome extension using the Virus Total API for a U.K. based client.",
      footerLink: [
        {
          name: "See the Post",
          url: "https://www.linkedin.com/posts/jimishravat_freelanceproject-chromeextension-websecurity-activity-7332832502161498112-EPUw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2Jey0BVDxxuvssNOApHcZDljPm3V2KrUM"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/bluesync.jpg"),
      projectName: "Blue Sync Softwares",
      projectDesc:
        "Designed and developed a custom website from scratch for a client, delivering a responsive and visually engaging user experience.",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://bluesyncsoftwares.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/realtime.png"),
      projectName: "Real-Time Network Threat Detection",
      projectDesc:
        "Designed to defend against DDoS and suspicious activity proactively for a U.K. based client",
      footerLink: [
        {
          name: "See the Post",
          url: "https://www.linkedin.com/posts/jimishravat_freelanceproject-chromeextension-websecurity-activity-7332832502161498112-EPUw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2Jey0BVDxxuvssNOApHcZDljPm3V2KrUM"
        }
        //  you can add extra buttons here.
      ]
    }
    // {
    //   image: require("./assets/images/nextuLogo.webp"),
    //   projectName: "Nextu",
    //   projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   footerLink: [
    //     {
    //       name: "Visit Website",
    //       url: "http://nextu.se/"
    //     }
    //   ]
    // }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle: "Achievements & Certifications that I have done !",

  achievementsCards: [
    {
      title: "Microsoft Azure",
      subtitle: "Certified in Azure AI Engineer Associate",
      image: require("./assets/images/microsoft.png"),
      imageAlt: "Microsoft Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://learn.microsoft.com/en-us/users/jimishravat-3470/credentials/d36c4f46b7c1f1c6"
        }
      ]
    },
    {
      title: "Project Management Office Setup",
      subtitle: "Certified in setup of PMO.",
      image: require("./assets/images/udemy.png"),
      imageAlt: "Udemy Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.udemy.com/certificate/UC-16dc1358-99ae-447f-8632-29bde85600c5/"
        }
      ]
    },
    {
      title: "ISO 27001 MERN Stack",
      subtitle: "Developed full-feldge E-Commerce Website using MERN stack.",
      image: require("./assets/images/lco.png"),
      imageAlt: "Learn Code Online",
      footerLink: [
        {
          name: "Certificate",
          url: "https://courses.learncodeonline.in/learn/certificate/4542632-50332"
        }
      ]
    },

    {
      title: "Speak English Professionally: In Person, Online & On the Phone",
      subtitle: "Completed Certifcation from Georgia Institute of Technology",
      image: require("./assets/images/giot.png"),
      imageAlt: "Georgia Institute of Technology Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.coursera.org/account/accomplishments/certificate/K6PLJN2DGS6Z"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Feel free to drop by and say hello.",
  number: "+91-8758885959",
  email_address: "jimishravat2802@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "jimishravat", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
