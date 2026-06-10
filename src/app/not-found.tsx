import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold text-textMain">Page not found</h1>
      <p className="text-sm text-textMuted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="btn-primary"
      >
        Back to home
      </Link>
    </div>
  );
}
