import { notFound } from "next/navigation";
import Image from "next/image";
import { projectsData } from "@/lib/data";

/* -----------------------------
   Helper: video embeds
----------------------------- */
/**
 * Supports:
 * - YouTube/Vimeo iframe embed URLs
 * - Self-hosted files under /public (e.g. "/rviz.mp4" or "/videos/demo.mp4")
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
          title="Embedded video"
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
      {/* If you also use webm, add another <source /> line */}
      <source src={src} type="video/mp4" />
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
 * Enables text with media embedded between sections.
 */
function ProjectContent({ blocks, title }: { blocks: any[]; title: string }) {
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
            <div key={`image-${i}`} className="space-y-2">
              {/* Next/Image needs dimensions unless you use `fill` */}
              <div
                className="relative w-full overflow-hidden rounded-lg border border-black/10"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={b.src}
                  alt={b.alt ?? `${title} image ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
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
                  <div
                    key={`gallery-${i}-${j}`}
                    className="relative w-full overflow-hidden rounded-lg border border-black/10"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? `${title} gallery ${j + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 384px"
                    />
                  </div>
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
      ? (project as any).media
      : undefined;

  const videos: string[] = media?.videos ?? [];
  const images: string[] = media?.images ?? [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="mb-4 text-4xl font-semibold">{project.title}</h1>

      <p className="mb-6 text-lg text-gray-700 dark:text-white/70">
        {project.description}
      </p>

      <div className="mb-10 flex gap-6">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Demo
          </a>
        )}
      </div>

      {"imageUrl" in project && project.imageUrl && (
        <div className="mb-12">
          <div
            className="relative w-full overflow-hidden rounded-lg border border-black/10"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src={project.imageUrl as string}
              alt={`${project.title} preview`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      )}

      {/* Interleaved narrative content */}
      <ProjectContent blocks={content} title={project.title} />

      {/* Fallback: if no narrative blocks exist, show media gallery */}
      {content.length === 0 && (videos.length > 0 || images.length > 0) && (
        <section className="mt-12 space-y-8">
          <h2 className="text-2xl font-medium">Media</h2>

          {videos.map((src, i) => (
            <VideoEmbed key={`video-${i}`} src={src} />
          ))}

          {images.map((src, i) => (
            <div
              key={`img-${i}`}
              className="relative w-full overflow-hidden rounded-lg border border-black/10"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src={src}
                alt={`${project.title} media ${i + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
