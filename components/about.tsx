"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I began my journey at the 
        <span className="font-medium"> University of Florida</span> in 2019 majoring in Biology. 
        I decided this wasn't the path for me and in 2020, I began studying {" "}
        <span className="font-medium">Computer and Information Science Engineering</span>. 2 years on this path, and I began my career at{" "}
        <span className="font-medium">Infotech</span>, first as an intern primarily focusing on frontend development using 
        <span className="font-medium"> JavaScript and Vue</span>, but eventually was hired as a part-time
        <span className="font-medium"> Associate Software Engineer</span> while I continued my education. During most of my time as a part-time employee, I worked on the backend a project that utilized 
        <span className="font-medium"> TypeScript, GraphQL, and Prisma</span>. As of the beginning of 2024, I am a full-time employee, now working as a 
        <span className="font-medium"> backend developer</span> using <span className="font-medium">Ruby on Rails and AWS</span>.{" "}
        My favorite part of programming is the problem-solving aspect.
      </p>

      <p>
        <span className="italic">Aside from work and school</span>, I love cooking, going to the movies, bouldering, playing wallyball and boardgames with my friends, playing
        video games (particularly from the <span className="italic">Soulsborne</span> series!), and volunteering at the local dog shelter. I also enjoy{" "}
        playing the drums and jamming with friends! I'm currently learning how to play the guitar as well.
      </p>
    </motion.section>
  );
}