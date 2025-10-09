import React from "react";
import { CgCode, CgWorkAlt } from "react-icons/cg";
import { FaChalkboardTeacher, FaReact, FaSwift } from "react-icons/fa";
import { LuBook, LuGraduationCap } from "react-icons/lu";
import sollumGif from "@/public/sollum.gif";
import smmartGif from "@/public/SMMART.gif";
import pen_img from "@/public/pen_temp.png";
import { BsBookFill } from "react-icons/bs";
import { nextImageLoaderRegex } from "next/dist/build/webpack-config";

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

export const experiencesData = [
  {
    title: "Started my education at University of Florida",
    location: "Gainesville, FL",
    description:
      "Began in Biology, then pivoted to Computer & Information Science & Engineering after leading in GatorTech. Built a strong CS foundation while exploring robotics and systems.",
    icon: React.createElement(BsBookFill),
    date: "May 2019 - May 2024",
  },
  {
    title: "CodePath iOS Tech Fellow",
    location: "Gainesville, FL",
    description:
      "Co-led a 14-week course for 25+ students with two fellows. Taught Swift app dev (networking, REST APIs, auth), ran code reviews, and mentored students—sharpening communication and teamwork.",
    icon: React.createElement(FaSwift),
    date: "August 2021 - December 2021",
  },
  {
    title: "SMMARTS Programming Volunteer Research at CSSALT",
    location: "Gainesville, FL",
    description:
      "Developed a C# Unity tool to quantify arterial perforation accuracy in ultrasound-guided simulations. Implemented real-time probe analytics and presented findings with clinicians to iterate on algorithm design.",
    icon: React.createElement(BsBookFill),
    date: "January 2022 - May 2022",
  },
  {
    title: "Software Engineer Intern",
    location: "Infotech | Gainesville, FL",
    description:
      "Worked on a web product (JavaScript/Vue) and led a cohort of interns through an agile cycle. Collaborated across design/engineering to ship features aligned to user needs.",
    icon: React.createElement(CgWorkAlt),
    date: "May 2022 - August 2022",
  },
  {
    title: "Research for Critter Collector",
    location: "Gainesville, FL",
    description:
      "Backend engineer on a PokémonGo-like educational app. Built Node.js/MongoDB services with a 4-engineer team and partnered with researchers/designers; migrated from Unity to Unreal Engine 5 for mobile performance.",
    icon: React.createElement(BsBookFill),
    date: "August 2023 - May 2024",
  },
  {
    title: "Software Engineer",
    location: "Infotech | Gainesville, FL",
    description:
      "Architected an AWS/Python PDF pipeline for state DOT plan documents, then led a 3-engineer team to customize deployments per DOT. Built backends with TypeScript/GraphQL/Prisma, Ruby on Rails, and AWS; served as client liaison to align features with requirements.",
    icon: React.createElement(CgWorkAlt),
    date: "September 2022 - August 2025",
  },
  {
    title: "Began my Master's in Robotics at Northwestern University",
    location: "Evanston, IL",
    description:
      "MS in Robotics with interests in embedded software and computer vision. Projects include RGB-D pen localization and manipulation (PincherX 100 + RealSense), calibration, and control.",
    icon: React.createElement(BsBookFill),
    date: "September 2025 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "Vision-Guided Pen Recognition and Robotic Grasping",
    description:
      "RGB-D pen detection with OpenCV (HSV + contours) and RealSense alignment; hand–eye calibration (Kabsch) to map camera→robot; Interbotix/ROS2 control for closed-loop grasping.",
    tags: ["Python", "OpenCV", "Intel RealSense", "ROS2", "Interbotix"],
    link: "",
    imageUrl: pen_img, // replace with a relevant gif when available
  },
  {
    title: "SMMARTS Programming Volunteering",
    description:
      "C# Unity application to measure arterial perforation accuracy in ultrasound-guided simulations; real-time analytics, performance feedback, and clinician-driven iteration.",
    tags: ["C#", "Unity", "Algorithms", "Signal Processing"],
    link: "https://simulation.health.ufl.edu/technology-development/augmented-reality-mixed-simulation/smmarts/",
    imageUrl: smmartGif, 
  },
  {
    title: "Critter Collector",
    description:
      "Backend services for an educational AR-style mobile game: Node.js/MongoDB APIs, auth/validation, location-based spawns; collaborated with a 25-person research team and migrated to UE5.",
    tags: ["Node.js", "MongoDB", "REST APIs", "Unreal Engine 5"],
    link: "",
    imageUrl: sollumGif, // placeholder
  },
  {
    title: "Sollum",
    description:
      "Systems/gameplay engineering on a 2.5D Lovecraftian climate-themed title with a 25-person cross-functional team; C#/Unity mechanics and optimization.",
    tags: ["C#", "Unity"],
    link: "https://overflow-games.itch.io/sollum",
    imageUrl: sollumGif,
  },
] as const;

export const skillsData = [
  "ROS/ROS2",
  "Python",
  "C/C#/C++",
  "OpenCV",
  "Intel RealSense",
  "Interbotix SDK",
  "Algorithms",
  "SystemVerilog",
  "OCaml",
  "Linux",
  "CAD",
  "AWS",
  "TypeScript",
  "GraphQL",
  "Prisma",
  "Ruby on Rails",
  "Node.js",
  "MongoDB",
  "Git",
  "Swift",
  "SQL",
] as const;
