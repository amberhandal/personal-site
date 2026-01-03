import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-[min(100%,60rem)] px-4 pt-20 pb-24 text-center">
      <h1 className="text-3xl font-semibold">Project not found</h1>
      <p className="mt-3 text-gray-700 dark:text-white/70">
        That page doesn’t exist (yet).
      </p>
      <Link href="/#projects" className="mt-6 inline-block underline">
        Back to projects
      </Link>
    </main>
  );
}
