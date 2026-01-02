import { projectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function VideoEmbed({ src }: { src: string }) {
  const isEmbed =
    src.includes("youtube.com/embed") || src.includes("player.vimeo.com");

  if (isEmbed) {
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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="mx-auto w-[min(100%,60rem)] px-4 pt-10 pb-20">
      <Link
        href="/#projects"
        className="text-gray-700 hover:underline dark:text-white/70"
      >
        ← Back to projects
      </Link>

      <h1 className="mt-6 text-4xl font-semibold">{project.title}</h1>
      <p className="mt-3 text-gray-700 dark:text-white/70">
        {project.description}
      </p>

      <div className="mt-5 flex gap-4">
        {project.github && (
          <a className="underline" href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {project.demo && (
          <a className="underline" href={project.demo} target="_blank" rel="noreferrer">
            Demo
          </a>
        )}
      </div>

      <div className="mt-8">
        <Image
          src={project.imageUrl}
          alt={`${project.title} hero`}
          className="rounded-xl border border-black/5"
        />
      </div>

      {project.longDescription && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="mt-3 whitespace-pre-line text-gray-800 dark:text-white/80">
            {project.longDescription}
          </p>
        </section>
      )}

      {(project.media?.videos?.length || project.media?.images?.length) ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Media</h2>

          {project.media?.videos?.length ? (
            <div className="mt-4 grid gap-6">
              {project.media.videos.map((v) => (
                <VideoEmbed key={v} src={v} />
              ))}
            </div>
          ) : null}

          {project.media?.images?.length ? (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.media.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${project.title} image ${i + 1}`}
                  className="rounded-xl border border-black/5"
                />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}
