import { notFound } from "next/navigation";
import { type StaticImageData } from "next/image";
import dynamic from "next/dynamic";
import { projectsData } from "@/lib/data";
import ImageLightbox from "@/components/image-lightbox";

const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="h-40 flex items-center justify-center text-sm text-gray-500">
      Loading report...
    </div>
  ),
});

type ImageSrc = string | StaticImageData;

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
function ProjectContent({ blocks, title }: { blocks: any[]; title: string }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <section className="space-y-10">
      {blocks.map((b, i) => {
        // ---- text ----
        if (b.type === "text") {
          const Heading = b.headingLevel === "h3" ? "h3" : "h2";
          return (
            <div key={`text-${i}`} className="space-y-3">
              {b.heading && (
                <Heading className={b.headingLevel === "h3" ? "text-lg font-semibold" : "text-2xl font-medium"}>
                  {b.heading}
                </Heading>
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
          const src: ImageSrc = b.src;

          return (
            <div key={`image-${i}`} className="space-y-2">
              <div
                className="relative w-full overflow-hidden rounded-lg border border-black/10"
                style={{ aspectRatio: "16 / 9" }}
              >
                <ImageLightbox
                  src={src}
                  alt={b.alt ?? `${title} image ${i + 1}`}
                  className="object-contain"
                />
              </div>
              {b.caption && <Caption>{b.caption}</Caption>}
            </div>
          );
        }

        // ---- pdf ----
        if (b.type === "pdf") {
          return (
            <div key={`pdf-${i}`} className="w-full flex justify-center">
              <PdfViewer src={b.src} caption={b.caption} />
            </div>
          );
        }

        // ---- gallery ----
        if (b.type === "gallery") {
          return (
            <div key={`gallery-${i}`} className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {b.images?.map((img: any, j: number) => {
                  const src: ImageSrc = img.src;

                  return (
                    <div key={`gallery-${i}-${j}`} className="space-y-1">
                      <div
                        className="relative w-full overflow-hidden rounded-lg border border-black/10"
                        style={{ aspectRatio: "16 / 9" }}
                      >
                        <ImageLightbox
                          src={src}
                          alt={img.alt ?? `${title} gallery ${j + 1}`}
                          className={`object-contain${img.rotate ? " rotate-90" : ""}`}
                        />
                      </div>
                      {img.caption && <Caption>{img.caption}</Caption>}
                    </div>
                  );
                })}
              </div>
              {b.caption && <Caption>{b.caption}</Caption>}
            </div>
          );
        }

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
  const images: ImageSrc[] = media?.images ?? [];


  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="mb-4 text-4xl font-semibold">{project.title}</h1>

      <p className="mb-4 text-lg text-gray-700 dark:text-white/70">
        {project.description}
      </p>

      <ul className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag, i) => (
          <li
            key={i}
            className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
          >
            {tag}
          </li>
        ))}
      </ul>

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

      <ProjectContent blocks={content} title={project.title} />

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
              <ImageLightbox
                src={src}
                alt={`${project.title} media ${i + 1}`}
                className="object-contain"
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
