// lib/data.ts
import React from "react";
import { BsBookFill } from "react-icons/bs";
import { FaSwift } from "react-icons/fa";
import { CgWorkAlt } from "react-icons/cg";

import sollumGif from "@/public/sollum.gif";
import crittercollectorGif from "@/public/crittercollector.gif";
import smmartGif from "@/public/SMMART.gif";
import coming_soon from "@/public/coming_soon.png";

import penpal_img from "@/public/HotDog.gif";
import penpal_architecture from "@/public/PenPal Architecture.drawio.png";

/**
 * ✅ IMPORTANT:
 * Anything inside /public should be referenced like:
 *   "/rviz.mp4"
 * NOT:
 *   "@/public/rviz.mp4"
 */
export const penpal_video_rviz = "/rviz.mp4";
export const penpal_video_demo = "/Robo-Writer.mp4";
export const penpal_video_hd = "/HotDog.mp4";

/* =============================
   Nav links
============================= */

export const links = [
  { name: "Home", hash: "#home" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

/* =============================
   Timeline / Experience
============================= */

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
  {
    title: "Master's of Robotics at Northwestern University",
    location: "Evanston, IL",
    description:
      "Enrolled in Northwestern’s M.S. in Robotics to deepen my understanding of perception, motion, and control, and to transition from purely digital systems to building robots that interact directly with the real world.",
    icon: React.createElement(BsBookFill),
    date: "Sep 2025 - Present",
  },
] as const;

/* =============================
   Projects
============================= */

export type ProjectContentBlock =
  | {
      type: "text";
      heading?: string;
      body: string;
    }
  | {
      type: "video";
      src: string; // "/videos/..." or "https://www.youtube.com/embed/..."
      caption?: string;
    }
  | {
      type: "image";
      src: any; // StaticImageData | string
      alt: string;
      caption?: string;
    };

export type Project = {
  title: string;
  slug: string;
  description: string;
  tags: readonly string[];
  github?: string;
  demo?: string; // ✅ this can be an external link too
  imageUrl: any;
  media?: {
    videos?: string[];
    images?: any[];
  };
  longDescription?: string;
  content?: ProjectContentBlock[];
};

export const projectsData = [
  {
    title: "PenPal",
    slug: "penpal",
    description:
      "A vision-guided ROS 2 system that reads a real whiteboard and writes short responses back with a 7-DoF Franka arm.",
    tags: [
      "ROS 2",
      "Robotic Manipulation",
      "Computer Vision",
      "AprilTags",
      "RealSense",
      "MoveIt",
      "OpenCV",
    ],
    github: "https://github.com/amberhandal/penpal",
    imageUrl: penpal_img,
    media: {
      videos: [penpal_video_hd, penpal_video_rviz, penpal_video_demo],
      images: [penpal_architecture],
    },
    longDescription:
      "PenPal is my end-to-end perception → language → motion pipeline for whiteboard interaction. I detect and track a board in 6-DoF using AprilTags + RGB-D, calibrate a stable camera→base TF chain, call a VLM for OCR + question answering through a ROS 2 service, then generate Cartesian writing motion with MoveIt using explicit SE(3) transforms and a custom TCP so the pen orientation stays consistent on the board.",

    content: [
      {
        type: "text",
        heading: "What PenPal does",
        body:
          "I wanted a robot that could have a *physical* conversation: you write something on a board, it reads it, decides on a response, and writes back. PenPal is that loop — perception to text to motion — running live in ROS 2 with a Franka arm.",
      },

      {
        type: "video",
        src: penpal_video_hd,
        caption:
          "Writing demo (HD): the arm writes an arbitrary word with the tool frame locked to the board surface.",
      },

      {
        type: "text",
        heading: "Perception + TF calibration",
        body:
          "I built the perception stack around a RealSense RGB-D feed, OpenCV, and AprilTag detections. The board pose is computed in a consistent frame, and I publish a calibrated camera→base TF chain so every downstream step (planning, TCP alignment, and writing) stays frame-correct instead of drifting between ad-hoc transforms.",
      },

      {
        type: "video",
        src: penpal_video_rviz,
        caption:
          "RViz view: board pose / TF frames and motion planning visualization.",
      },

      {
        type: "text",
        heading: "Closed-loop “read → answer → write” architecture",
        body:
          "Instead of baking OCR into the main node, I exposed OCR + question answering as a ROS 2 service. That kept the system modular (easy to swap Gemini/Qwen, add a mock node, or run without the VLM) and made the main control loop simple: wait until the board is reliably visible, trigger OCR/QA, then write the returned text.",
      },

      {
        type: "video",
        src: penpal_video_demo,
        caption:
          "End-to-end loop: board visible → OCR/QA → writing response on the board.",
      },

      {
        type: "image",
        src: penpal_architecture,
        alt: "PenPal system architecture diagram",
        caption:
          "High-level architecture: vision + TF → OCR/QA service → planners/controllers → MoveIt execution.",
      },

      {
        type: "text",
        heading: "Motion planning + TCP alignment",
        body:
          "On the motion side, I made the writing pipeline explicitly SE(3)-driven: poses are computed as transforms (not hand-tuned Euler tweaks), and I set a custom TCP so the pen tip becomes the control point. That way, MoveIt Cartesian plans keep the pen orientation stable relative to the board normal, which is the difference between “touching the board” and actually writing clean strokes.",
      },

      {
        type: "text",
        heading: "Reliability choices I made",
        body:
          "To keep the loop stable, I added visibility gating (time threshold + tag-count threshold) so noisy detections don’t trigger writing. I also kept mock nodes (mock board detector + mock OCR) so I could test the full state machine and motion stack even when the camera/VLM wasn’t running.",
      },
    ],
  },

  {
    title: "Aggrobots",
    slug: "aggrobots",
    description:
      "Swarm robot game with distributed embedded behaviors, ToF sensing, wireless sync, and AprilTag localization.",
    tags: ["C", "Embedded Systems", "Microcontrollers", "AprilTags", "RealSense"],
    github: "https://github.com/Aggrobot-Incorporated/aggrobot",
    imageUrl: coming_soon,
    media: { videos: [], images: [] },
    longDescription:
      "Aggrobots is a multi-robot game system where each robot runs embedded logic for sensing/coordination and shares state wirelessly. Localization uses AprilTags and a RealSense camera pipeline.",

    content: [
      {
        type: "text",
        heading: "Overview",
        body:
          "Multi-robot game platform where each robot runs local sensing/behavior logic and shares state wirelessly for coordination and group dynamics.",
      },
      {
        type: "video",
        src: "/videos/aggrobots-demo.mp4",
        caption: "Swarm behavior demo.",
      },
      {
        type: "text",
        heading: "Embedded + Coordination",
        body:
          "Implements message serialization, role-based addressing, and periodic broadcasts to coordinate distributed pursuit/avoidance behaviors under tight bandwidth and latency constraints.",
      },
    ],
  },

  {
    title: "SMMARTS Programming Volunteering",
    slug: "cssalt-smmarts",
    description:
      "Program to quantify arterial perforation accuracy in ultrasound-guided simulations.",
    tags: ["C#", "Unity"],
    github:
      "https://simulation.health.ufl.edu/technology-development/augmented-reality-mixed-simulation/smmarts/",
    imageUrl: smmartGif,
    media: { videos: [], images: [] },
    longDescription:
      "Built scoring/analytics tooling inside Unity to evaluate simulation performance and support iterative feedback.",

    content: [
      {
        type: "text",
        heading: "Overview",
        body:
          "Built scoring and analytics tooling in Unity to quantify performance during ultrasound-guided simulation training.",
      },
    ],
  },

  {
    title: "Sollum",
    slug: "sollum-game",
    description:
      "A 2.5D Lovecraftian climate-themed game with dialogue and combat systems implemented.",
    tags: ["C#", "Unity"],

    /**
     * ✅ This is the link you want "View Page" to go to.
     * We'll use demo for that.
     */
    demo: "https://overflow-games.itch.io/sollum",

    // keeping this as a separate link (optional)
    github: "https://github.com/aanthonyl/Sollum",

    imageUrl: sollumGif,
    media: { videos: [], images: [] },

    content: [
      {
        type: "text",
        heading: "Overview",
        body:
          "Systems and gameplay engineering contributions on a cross-functional team building a 2.5D climate-themed horror game.",
      },
      {
        type: "image",
        src: sollumGif,
        alt: "Sollum preview",
      },
    ],
  },

  {
    title: "Critter Collector",
    slug: "critter-collector",
    description:
      "A educational Pokémon Go-style mobile game for learning about local fauna.",
    tags: ["Node.js", "MongoDB", "REST APIs", "Unreal Engine 5"],
    github: "https://github.com/cacticouncil/critter-collector-backend",
    imageUrl: crittercollectorGif,
    media: { videos: [], images: [] },

    content: [
      {
        type: "text",
        heading: "Overview",
        body:
          "Backend services supporting an educational location-based mobile game, including REST APIs and persistence with MongoDB.",
      },
    ],
  },
] satisfies readonly Project[];

/* =============================
   Skills
============================= */

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
