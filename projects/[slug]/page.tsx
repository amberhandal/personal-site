import { notFound } from "next/navigation";
import Image from "next/image";
import { projectsData } from "@/lib/data";

/* -----------------------------
   Helper: video embeds
----------------------------- */
function VideoEmbed({ src }: { src: string }) {
  const isEmbed =
    src.includes("youtube.com/embed") || src.includes("player.vimeo.com");

  if (isEmbed) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-black/10">
        <iframe
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Self-hosted video under /public
  return (
    <video
      className="w-full rounded-lg border border-black/10"
      controls
      playsInline
      preload="metadata"
    >
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // ---- Narrow optional fields safely (because projectsData is a union type) ----
  const github =
    "github" in project && typeof project.github === "string"
      ? project.github
      : undefined;

  const demo =
    "demo" in project && typeof project.demo === "string" && project.demo.length
      ? project.demo
      : undefined;

  const longDescription =
    "longDescription" in project && typeof project.longDescription === "string"
      ? project.longDescription
      : undefined;

  const media =
    "media" in project && project.media && typeof project.media === "object"
      ? project.media
      : undefined;

  const videos =
    media && "videos" in media && Array.isArray(media.videos) ? media.videos : [];

  const images =
    media && "images" in media && Array.isArray(media.images) ? media.images : [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      {/* Title */}
      <h1 className="text-4xl font-semibold mb-4">{project.title}</h1>

      {/* Description */}
      <p className="text-lg text-gray-700 dark:text-white/70 mb-6">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex gap-6 mb-10">
        {github && (
          <a href={github} target="_blank" rel="noreferrer" className="underline">
            GitHub
          </a>
        )}

        {demo && (
          <a href={demo} target="_blank" rel="noreferrer" className="underline">
            Demo
          </a>
        )}
      </div>

      {/* Hero Image */}
      {"imageUrl" in project && project.imageUrl && (
        <div className="mb-10">
          <Image
            src={project.imageUrl}
            alt={`${project.title} preview`}
            className="rounded-lg border border-black/10"
          />
        </div>
      )}

      {/* Long Description */}
      {longDescription && (
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-3">Overview</h2>
          <p className="leading-relaxed text-gray-700 dark:text-white/70">
            {longDescription}
          </p>
        </section>
      )}

      {/* Media */}
      {(videos.length > 0 || images.length > 0) && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium">Media</h2>

          {/* Videos */}
          {videos.map((src, i) => (
            <VideoEmbed key={`video-${i}`} src={src} />
          ))}

          {/* Images */}
          {images.map((img, i) => (
            <Image
              key={`img-${i}`}
              src={img}
              alt={`${project.title} media ${i + 1}`}
              className="rounded-lg border border-black/10"
            />
          ))}
        </section>
      )}
    </main>
  );
}
