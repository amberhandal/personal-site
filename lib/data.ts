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
import watchdog_architecture from "@/public/Sytem_High-Level.jpeg";

/**
 * ✅ IMPORTANT:
 * Anything inside /public should be referenced like:
 *   "/rviz.mp4"
 * NOT:
 *   "@/public/rviz.mp4"
 */
export const penpal_video_rviz = "https://www.youtube.com/embed/-VgxG9WaqSw";
export const penpal_video_demo = "https://www.youtube.com/embed/GDnZjJ9GzQA";
export const penpal_video_hd = "https://www.youtube.com/embed/mhn6aP8osoQ";

/* =============================
   Nav links
============================= */

export const links = [
  { name: "Home", hash: "/#home" },
  { name: "Projects", hash: "/#projects" },
  { name: "Skills", hash: "/#skills" },
  { name: "Experience", hash: "/#experience" },
  { name: "Contact", hash: "/#contact" },
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
    title: "Autonomous Building Inspection with Unitree Go2",
    slug: "watchdog",
    description:
      "A quadruped robot that autonomously maps buildings, detects safety equipment, and tracks changes between inspection runs using 3D SLAM, frontier exploration, and vision-language segmentation.",
    tags: [
      "ROS 2",
      "SLAM",
      "Nav2",
      "Computer Vision",
      "SAM 3",
      "C++",
      "Python",
      "RealSense",
    ],
    github: "https://github.com/amberhandal/Go2-Inspector",
    imageUrl: coming_soon,
    media: { videos: [], images: [] },
    longDescription:
      "An end-to-end autonomous building inspection system on a Unitree Go2 quadruped robot. The robot explores unknown indoor environments using frontier-based exploration, builds 2D and 3D maps via RTAB-Map SLAM, and detects safety equipment using SAM 3 vision-language segmentation. On repeat visits, the system compares detections against a baseline to classify objects as new, moved, missing, or unchanged.",

    content: [
      // TODO: add lead video when YouTube URL is available
      // { type: "video", src: "https://www.youtube.com/embed/VIDEO_ID", caption: "..." },

      {
        type: "text",
        heading: "Project Summary",
        body:
          "This system implements end-to-end autonomous building inspection on a Unitree Go2 quadruped robot. The robot explores unknown indoor environments using frontier-based exploration, builds 2D and 3D maps via RTAB-Map SLAM, and detects safety equipment (fire extinguishers, exit signs) using SAM 3 (Segment Anything Model 3) vision-language segmentation. On repeat visits, the system compares detections against a baseline to classify objects as new, moved, missing, or unchanged, producing annotated floor plans, 3D point clouds with markers, and PDF inspection reports.",
      },

      { 
        type: "image", 
        src: watchdog_architecture, 
        alt: "WatchDog system architecture block diagram", 
        caption: "High-level system architecture" 
      },

      {
        type: "text",
        heading: "System Overview",
        body:
          "The system runs on ROS 2 Kilted and is composed of 8 custom C++ nodes, 8 Python scripts, and integrates RTAB-Map (3D SLAM), Nav2 (autonomous navigation), and SAM 3 (vision-language object detection). A single launch file with configurable arguments controls which subsystems are active, supporting workflows from manual teleoperation to fully autonomous inspection with change detection. The entire pipeline is orchestrated by a lifecycle manager script that launches the system, captures all data on shutdown, and produces a self-contained output folder with maps, point clouds, detection logs, and reports.",
      },

      {
        type: "text",
        heading: "Mapping & Localization (RTAB-Map)",
        body:
          "The system supports two RTAB-Map registration strategies: lidar-only ICP scan matching (robust in featureless environments) and visual + lidar mode combining RGB feature matching with ICP for dense, textured 3D point clouds. In mapping mode, the robot builds a new map from scratch for initial building surveys. In localization mode, it loads an existing database and re-localizes within it for repeat inspection runs focused on change detection.",
      },

      {
        type: "text",
        heading: "Point Cloud Processing",
        body:
          "Raw lidar data from the Go2's UTLidar undergoes three-stage filtering before reaching RTAB-Map: height filtering to remove the ground plane and ceiling, voxel grid downsampling at 5cm leaf size to reduce noise, and Euclidean clustering to identify connected obstacle groups and distinguish them from free-space rays.",
      },

      {
        type: "text",
        heading: "Autonomous Navigation (Nav2)",
        body:
          "Nav2 maintains a 4m x 4m rolling local costmap using lidar and depth camera for reactive obstacle avoidance, plus a global costmap from the RTAB-Map occupancy grid for path planning. The robot footprint is a 40cm x 24cm rectangle with a 20cm inflation radius. The DWB local planner generates velocity commands capped at 0.3 m/s linear and 1.0 rad/s angular, converted to Unitree Sport API format by a custom bridge node with timeout safety.",
      },

      {
        type: "text",
        heading: "Frontier Exploration",
        body:
          "An autonomous frontier-based exploration node identifies boundaries between explored and unexplored cells in the occupancy grid using BFS clustering. It selects the nearest viable frontier, sends it as a Nav2 goal, and monitors for completion or timeout before selecting the next target. This enables fully autonomous room mapping without manual waypoints.",
      },

      {
        type: "text",
        heading: "Visual Inspection (SAM 3)",
        body:
          "Every 3 seconds, the inspection node captures synchronized RGB and depth images, sends the RGB frame to a remote SAM 3 server via HTTP, and receives per-object segmentation masks, bounding boxes, confidence scores, and labels for prompted categories. Each 2D detection is projected into 3D using the aligned depth image and camera intrinsics, then transformed into the global map frame via the TF tree, giving each detected object a persistent 3D world position.",
      },

      {
        type: "text",
        heading: "Deduplication & Annotated Overlay",
        body:
          "As the robot revisits areas, a spatial deduplication algorithm merges detections of the same label within a configurable distance threshold (1.5m), maintaining a running average of the map position across sightings. The node publishes an annotated image stream with semi-transparent colored segmentation masks, bounding boxes color-coded by change status, and labels with format: [CHANGE_TYPE] label (confidence%). Colors indicate status: NEW (blue), MOVED (orange), UNCHANGED (green).",
      },

      {
        type: "text",
        heading: "Change Detection",
        body:
          "When a baseline inspection log is provided, the system classifies each new detection in real-time: UNCHANGED if the same label is found within 1.0m of a baseline position, MOVED if within 2.0m but beyond 1.0m, and NEW if no match is found. Baseline objects not revisited are reported in the final log. A separate change detector node can also compare any two inspection logs offline, publishing 3D RViz markers including arrows indicating movement direction for relocated objects.",
      },

      {
        type: "text",
        heading: "Output Pipeline",
        body:
          "On shutdown, the lifecycle manager executes a 7-step export pipeline: save the 2D occupancy grid, shut down all ROS nodes, copy the RTAB-Map database for future localization, export the 3D point cloud to PLY format, inject colored marker spheres at detection positions, generate a 2D building floor plan PNG with labeled markers, and produce a PDF inspection report with change comparison statistics. Everything is collected into a timestamped output folder.",
      },

      {
        type: "text",
        heading: "Hardware & Sensor Integration",
        body:
          "The Unitree Go2 communicates via its Sport API, with custom bridge nodes converting odometry to TF transforms and motor encoder data to joint states for RViz. Multiple restamper nodes fix clock drift between the Go2's internal clock and the host PC for every sensor stream. A specialized camera sync restamper ensures RGB and depth frames share identical timestamps, which is critical for RTAB-Map's visual feature extraction.",
      },

      {
        type: "text",
        heading: "Results",
        body:
          "The system successfully maps indoor environments and produces usable 2D occupancy grids and 3D point clouds. SAM 3 reliably detects prompted object categories with confidence scores typically above 80% for clear views. Spatial deduplication reduces redundant detections into single map-frame positions, and the change detection system correctly identifies unchanged objects on repeat visits. Frontier exploration enables fully autonomous room coverage without manual waypoint placement.",
      },

      {
        type: "text",
        heading: "Challenges & Lessons Learned",
        body:
          "Timestamp synchronization between the Go2 and host PC required dedicated restamper nodes for every sensor stream; without this, SLAM and navigation fail silently. The real robot's UTLidar pitch (2.878 rad) differs from the simulation default, and using the wrong value causes ground-plane points to appear as obstacles, completely blocking navigation. Depth-based 3D positioning has inherent noise (0.5-1.0m variance), requiring generous deduplication and change detection thresholds. ROS 2 process lifecycle management required a custom signal handler with polling, as standard KeyboardInterrupt doesn't reliably propagate through subprocess groups.",
      },

      {
        type: "text",
        heading: "Future Work",
        body:
          "Planned improvements include integrating visual SLAM mode for dense textured 3D building models, tying frontier explorer start/stop to the launch file, expanding detection prompts to additional safety equipment categories, implementing viewpoint-aware change detection that only marks objects as missing if the camera had line-of-sight to the baseline position, and adding a web dashboard for remote inspection monitoring and report viewing.",
      },
    ],
  },

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
          "I wanted a robot that could have a *physical* conversation: you write something on a board, it reads it, decides on a response, and writes back. PenPal is that loop (perception to text to motion) running live in ROS 2 with a Franka arm.",
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
    demo:
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
      {
        type: "video",
        src: "https://www.youtube.com/embed/nFNgHfEuYRw",
        caption: "SMMARTS simulation demo.",
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
