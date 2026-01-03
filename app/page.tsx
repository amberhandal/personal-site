import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}

function VideoEmbed({ src }: { src: string }) {
  const isYouTube = src.includes("youtube.com/embed") || src.includes("player.vimeo.com");

  if (isYouTube) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-black/5">
        <iframe
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Assume it's a self-hosted video under /public
  return (
    <video
      className="w-full rounded-lg border border-black/5"
      controls
      playsInline
      preload="metadata"
    >
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
}
