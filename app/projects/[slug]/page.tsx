import { notFound } from "next/navigation";
import Image from "next/image";
import { projectsData } from "@/lib/data";

/* -----------------------------
   Helper: video embeds
----------------------------- */
/**
 * Supports:
 * - YouTube/Vimeo iframe embed URLs
 * - Self-hosted files under /public (e.g. "/videos/demo.mp4")
 */
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

/* -----------------------------
   Helper: captions
----------------------------- */
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 text-sm text-gray-600 dark:text-white/60">{children}</p>
  );
}

/* -----------------------------
   Renderer: interleaved blocks
----------------------------- */
/**
 * Renders a narrative page made of typed blocks.
 * This is the core thing that enables text with media embedded between sections.
 */
function ProjectContent({
  blocks,
  title,
}: {
  blocks: any[];
  title: string;
}) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="space-y-10">
      {blocks.map((b, i) => {
        // ---- text ----
        if (b.type === "text") {
          return (
            <div key={`text-${i}`} className="space-y-3">
              {b.heading && (
                <h2 className="text-2xl font-medium">{b.heading}</h2>
              )}
              <p className="leading-relaxed text-gray-700 dark:text-white/70">
                {b.body}
              </p>
            </div>
          );
        }

        // ---- video ----
        if (b.type === "video") {
          return (
            <div key={`video-${i}`}>
              <VideoEmbed src={b.src} />
              {b.caption && <Caption>{b.caption}</Caption>}
            </div>
          );
        }

        // ---- image ----
        if (b.type === "image") {
          return (
            <div key={`image-${i}`}>
              <Image
                src={b.src}
                alt={b.alt ?? `${title} image ${i + 1}`}
                className="rounded-lg border border-black/10"
              />
              {b.caption && <Caption>{b.caption}</Caption>}
            </div>
          );
        }

        // ---- gallery ----
        if (b.type === "gallery") {
          return (
            <div key={`gallery-${i}`} className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {b.images?.map((img: any, j: number) => (
                  <Image
                    key={`gallery-${i}-${j}`}
                    src={img.src}
                    alt={img.alt ?? `${title} gallery ${j + 1}`}
                    className="rounded-lg border border-black/10"
                  />
                ))}
              </div>
              {b.caption && <Caption>{b.caption}</Caption>}
            </div>
          );
        }

        // Unknown block type: ignore safely
        return null;
      })}
    </section>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const github =
    "github" in project && typeof project.github === "string"
      ? project.github
      : undefined;

  const demo =
    "demo" in project && typeof project.demo === "string" && project.demo.length
      ? project.demo
      : undefined;

  const content =
    "content" in project && Array.isArray((project as any).content)
      ? (project as any).content
      : [];
  const media =
    "media" in project && project.media && typeof project.media === "object"
      ? project.media
      : undefined;

  const videos = media?.videos ?? [];
  const images = media?.images ?? [];


  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-semibold mb-4">{project.title}</h1>

      <p className="text-lg text-gray-700 dark:text-white/70 mb-6">
        {project.description}
      </p>

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

      {"imageUrl" in project && project.imageUrl && (
        <div className="mb-12">
          <Image
            src={project.imageUrl}
            alt={`${project.title} preview`}
            className="rounded-lg border border-black/10"
          />
        </div>
      )}

      {/* New: interleaved narrative content */}
      <ProjectContent blocks={content} title={project.title} />
      {/* Fallback: if no narrative blocks exist, show media gallery */}
      {content.length === 0 && (videos.length > 0 || images.length > 0) && (
        <section className="space-y-8 mt-12">
          <h2 className="text-2xl font-medium">Media</h2>

          {videos.map((src, i) => (
            <VideoEmbed key={`video-${i}`} src={src} />
          ))}

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
