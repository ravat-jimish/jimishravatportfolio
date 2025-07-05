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
    "A passionate Full Stack Software Developer having experience in building SaaS applications with ReactJS, Redux, Javascript, NodeJS, MongoDB, Redis and many other tools and libraries."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1Jk0I3a-89QlCm-HMzutYjuB0MiQoxhIO/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/ravat-jimish",
  linkedin: "https://www.linkedin.com/in/jimishravat/",
  gmail: "ravat.jimish@gmail.com",
  // gitlab: "https://gitlab.com/saadpasta",
  // facebook: "https://www.facebook.com/saad.pasta7",
  medium: "https://medium.com/@ravatjimish",
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
    emoji("⚡ Software-As-A-Service (SaaS) applications from ground to production"),
    emoji(
      "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications"
    ),
    emoji(
      "⚡ Integration of third party services such as Twillo / OpenAPI / Cloudinary"
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
    },
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
        "Made a full fledge Student ERP system as a semester project",
      ]
    },
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
      Stack: "React/Redux", //Insert stack or technology you have experience in
      // progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend - NodeJS",
      // progressPercentage: "80%"
    },
    {
      Stack: "UI Design",
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
      role: "Software Developer",
      company: "Tata Consultancy Services",
      companylogo: require("./assets/images/tcs.png"),
      date: "August 2023 – Present",
      desc: "Working on Messaging Solution SaaS product for TCS iON.",
      descBullets: [
        "Built a real-time Livechat platform capable of supporting over 100,000 requests per hour and 10,000 concurrent users using WebSockets",
        "Utilized MySQL with ACID compliance for secure and fault-tolerant data handling in high-traffic environments",
        "Enhanced system performance by optimizing infrastructure, resulting in a 20% reduction in response times and a 15% increase in throughput",
        "Collaborated with cross-functional teams in Agile/Scrum environments to drive rapid delivery cycles and continuous integration",
        "Mentored and trained three junior developers, guiding them in ReactJS, NodeJS, and best coding practices to ensure consistent code quality and team productivity"
      ]
    },
    {
      role: "Jr. Web Developer",
      company: "Aerolex Labs",
      companylogo: require("./assets/images/aerolex.png"),
      date: "January 2023 – June 2023",
      desc: "Worked on Training & Placement Management System",
      descBullets: [
        "Spearheaded full development lifecycle of Training and Placement Cell Management System, enhancing operational efficiency by 60% through automation",
        "Developed user-specific modules with hierarchical access control for secure, role-based data access",
        "Collaborated with cross-functional teams to refine features based on stakeholder feedback in an Agile environment",
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
  subtitle: "SOME STARTUPS AND FREELANCE CLIENTS THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/phishing.png"),
      projectName: "Phishing Detection Chrome Extenstion",
      projectDesc: "Made a phishing detection chrome extension using the Virus Total API for a U.K. based client.",
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
      projectDesc: "Designed and developed a custom website from scratch for a client, delivering a responsive and visually engaging user experience.",
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
      projectDesc: "Designed to defend against DDoS and suspicious activity proactively for a U.K. based client",
      footerLink: [
        {
          name: "See the Post",
          url: "https://www.linkedin.com/posts/jimishravat_freelanceproject-chromeextension-websecurity-activity-7332832502161498112-EPUw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC2Jey0BVDxxuvssNOApHcZDljPm3V2KrUM"
        }
        //  you can add extra buttons here.
      ]
    },
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
  subtitle:
    "Achievements & Certifications that I have done !",

  achievementsCards: [
    {
      title: "Microsoft Azure",
      subtitle:
        "Certified in Azure AI Engineer Associate",
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
      subtitle:
        "Certified in setup of PMO.",
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
      subtitle:
        "Developed full-feldge E-Commerce Website using MERN stack.",
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
        { name: "Certification", url: "https://www.coursera.org/account/accomplishments/certificate/K6PLJN2DGS6Z" },

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
  display: false // Set false to hide this section, defaults to true
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
  subtitle: "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+91-8758885959",
  email_address: "ravat.jimish@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
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
