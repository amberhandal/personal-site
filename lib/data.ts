import React from "react";
import { BsBookFill } from "react-icons/bs";
import { FaSwift } from "react-icons/fa";
import { CgWorkAlt } from "react-icons/cg";

import sollumGif from "@/public/sollum.gif";
import crittercollectorGif from "@/public/crittercollector.gif";
import smmartGif from "@/public/SMMART.gif";
import pen_img from "@/public/pen_temp.png";
import coming_soon from "@/public/coming_soon.png";

export const links = [
  { name: "Home", hash: "#home" },
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
      "Co-led a 14-week course for 25+ students with two fellows. Taught Swift app dev, ran code reviews, and mentored students.",
    icon: React.createElement(FaSwift),
    date: "August 2021 - December 2021",
  },
  {
    title: "Software Engineer",
    location: "Infotech | Gainesville, FL",
    description:
      "Architected an AWS/Python PDF pipeline for DOT plan documents; led a 3-engineer team to customize deployments per DOT.",
    icon: React.createElement(CgWorkAlt),
    date: "September 2022 - August 2025",
  },
] as const;

export type Project = {
  title: string;
  slug: string;
  description: string;
  tags: readonly string[];
  github?: string;
  demo?: string; // optional link or embed url
  imageUrl: any;
  media?: {
    videos?: string[]; // "/videos/..." or "https://www.youtube.com/embed/..."
    images?: any[];    // imported images
  };
  longDescription?: string;
};

export const projectsData = [
  {
    title: "Aggro-bots",
    slug: "aggrobots",
    description:
      "Swarm robots with distributed embedded behaviors, ToF sensing, wireless sync, and AprilTag localization.",
    tags: ["C", "Embedded Systems", "Microcontrollers", "AprilTags", "RealSense"],
    github: "https://github.com/Aggrobot-Incorporated/aggrobot",
    imageUrl: coming_soon,
    media: { videos: [], images: [] },
    longDescription:
      "Aggro-bots is a multi-robot game system where each robot runs embedded logic for sensing/coordination and shares state wirelessly. Localization uses AprilTags and a RealSense camera pipeline.",
  },
  {
    title: "Vision-Guided Pen Recognition and Robotic Grasping",
    slug: "msr-pen-grabber",
    description:
      "RGB-D pen localization with RealSense + OpenCV, then ROS 2 grasp planning and closed-loop manipulation.",
    tags: ["Python", "ROS 2", "OpenCV", "Intel RealSense", "Interbotix"],
    github: "https://github.com/amberhandal/Arm-Demo",
    imageUrl: pen_img,
    media: { videos: [], images: [] },
    longDescription:
      "Detects a pen in RGB-D, estimates its 3D pose, transforms into the robot frame, and executes grasping in ROS 2.",
  },
  {
    title: "SMMARTS Programming Volunteering",
    slug: "cssalt-smmarts",
    description:
      "C# Unity tool to quantify arterial perforation accuracy in ultrasound-guided simulations.",
    tags: ["C#", "Unity"],
    github:
      "https://simulation.health.ufl.edu/technology-development/augmented-reality-mixed-simulation/smmarts/",
    imageUrl: smmartGif,
    media: { videos: [], images: [] },
    longDescription:
      "Built scoring/analytics tooling inside Unity to evaluate simulation performance and support iterative feedback.",
  },
  {
    title: "Sollum",
    slug: "sollum-game",
    description:
      "Systems/gameplay engineering on a 2.5D Lovecraftian climate-themed game.",
    tags: ["C#", "Unity"],
    github: "https://overflow-games.itch.io/sollum",
    imageUrl: sollumGif,
    media: { videos: [], images: [] },
  },
  {
    title: "Critter Collector",
    slug: "critter-collector",
    description: "Backend services for an educational Pokémon Go-style mobile game.",
    tags: ["Node.js", "MongoDB", "REST APIs", "Unreal Engine 5"],
    github: "https://github.com/cacticouncil/critter-collector-backend",
    imageUrl: crittercollectorGif,
    media: { videos: [], images: [] },
  },
] satisfies readonly Project[];

export const skillsData = [
  "ROS/ROS 2",
  "Python",
  "C",
  "C++",
  "OpenCV",
  "RealSense",
  "Linux",
  "Docker",
  "Git",
  "AWS",
  "Motion Planning",
  "Computer Vision",
  "Embedded Systems",
  "Kinematics",
  "PCB Design",
] as const;
