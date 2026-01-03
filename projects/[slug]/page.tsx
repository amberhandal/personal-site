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

/* -----------------------------
   Page component
----------------------------- */
export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

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
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GitHub
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Demo
          </a>
        )}
      </div>

      {/* Hero Image */}
      {project.imageUrl && (
        <div className="mb-10">
          <Image
            src={project.imageUrl}
            alt={`${project.title} preview`}
            className="rounded-lg border border-black/10"
          />
        </div>
      )}

      {/* Long Description */}
      {project.longDescription && (
        <section className="mb-12">
          <h2 className="text-2xl font-medium mb-3">Overview</h2>
          <p className="leading-relaxed text-gray-700 dark:text-white/70">
            {project.longDescription}
          </p>
        </section>
      )}

      {/* Media */}
      {(project.media?.videos?.length ||
        project.media?.images?.length) && (
        <section className="space-y-8">
          <h2 className="text-2xl font-medium">Media</h2>

          {/* Videos */}
          {project.media?.videos?.map((src, i) => (
            <VideoEmbed key={`video-${i}`} src={src} />
          ))}

          {/* Images */}
          {project.media?.images?.map((img, i) => (
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
