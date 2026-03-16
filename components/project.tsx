"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { projectsData } from "@/lib/data";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  slug,
  github,
  demo,
  imageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const detailsHref = demo ?? `/projects/${slug}`;
  const isExternal = detailsHref.startsWith("http");

  const CardWrapper = isExternal ? "a" : Link;
  const cardProps = isExternal
    ? { href: detailsHref, target: "_blank", rel: "noreferrer" }
    : { href: detailsHref };

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgess, opacity: opacityProgess }}
      className="group"
    >
      <CardWrapper
        {...(cardProps as any)}
        className="flex flex-col h-full bg-gray-100 border border-black/5 rounded-lg overflow-hidden hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer"
      >
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${title} preview`}
            fill
            quality={95}
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col flex-1 p-4">
          <h3 className="text-lg font-semibold">{title}</h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>

          {github && (
            <div className="mt-3">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-800 dark:text-white/70 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            </div>
          )}

          <ul className="flex flex-wrap mt-auto pt-4 gap-1.5">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </CardWrapper>
    </motion.div>
  );
}
