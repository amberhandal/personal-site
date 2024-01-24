import React from "react";
import { CgCode, CgWorkAlt } from "react-icons/cg";
import { FaChalkboardTeacher, FaReact, FaSwift } from "react-icons/fa";
import { LuBook, LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import sollumGif from "@/public/sollum.gif";
import wordanalyticsImg from "@/public/wordanalytics.png";
import { BsBookFill } from "react-icons/bs";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Started my education at University of Florida",
    location: "Gainesville, FL",
    description:
      "I started as a Biology major, planning on a minor in Computer Science. After joining a club called Gatortech and becoming an officer, I decided to make the switch to Computer and Information Science and Engineering.",
    icon: React.createElement(BsBookFill),
    date: "May 2019",
  },
  {
    title: "CodePath iOS Tech Fellow",
    location: "Gainesville, FL",
    description:
      "Instructed a 14-week course of 25+ students for designing and developing functional apps for iOS devices. Topics taught in this course included networking, RESTful API implementation, and user authentication.",
    icon: React.createElement(FaSwift),
    date: "August 2021 - December 2021",
  },
  {
    title: "Software Engineer Intern",
    location: "Infotech | Gainesville, FL",
    description:
      "Worked mostly on the frontend of a web app utiizing JavaScript and Vue to meet the company's needs. Lead a cohort of interns throughout the product development cycle using agile methodology to optimize workflow.",
    icon: React.createElement(CgWorkAlt),
    date: "May 2022 - August 2022",
  },
  {
    title: "Associate Software Engineer",
    location: "Infotech | Gainesville, FL",
    description:
      "Used TypeScript, GraphQL, and Prisma to contribute to a comprehensive web-based bidding platform for contractors, centralizing bidding tools to boost efficiency and reduce costs. Currently, I use Ruby on Rails and AWS to contribute to the backend for a web-based platform aiding contractors and subcontractors in the transportation industry.",
    icon: React.createElement(CgWorkAlt),
    date: "September 2022 - present",
  },
  {
    title: "Fullstack Software Engineer",
    location: "Artsea | Remote",
    description:
      "Pioneering fullstack solutions for a networking web application using the T3 Stack. Designing and implementing the UI/UX with Tailwind CSS and Next.js, focusing on responsive, user-friendly interfaces. Creating robust backend functionalities, including routers and endpoints, with TypeScript and tRPC, for efficient data handling.",
    icon: React.createElement(CgCode),
    date: "December 2023 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Sollum",
    description:
      "I worked as a systems and gameplay engineer in this project over the course of 4 months on a xfn team of 25 students.",
    tags: ["C#", "Unity"],
    imageUrl: sollumGif,
  },
  {
    title: "Hagglr",
    description:
      "Creating a web app similar to eBay but for reverse-auctioning.",
    tags: ["Ruby on Rails", "JavaScript", "SQL", "Bootstrap"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Ruby",
  "Ruby on Rails",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "GraphQL",
  "Primsa",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Framer Motion",
] as const;