import Link from "next/link";
import { intentClusters } from "@/lib/intentMap";

type Props = {
  currentSlug: string;
};

export default function IntentInternalLinks({ currentSlug }: Props) {
  // Find which cluster the page belongs to
  const cluster = Object.values(intentClusters).find((items) =>
    items.some((item) => item.slug === currentSlug)
  );

  if (!cluster) return null;

  const related = cluster.filter((item) => item.slug !== currentSlug);

  if (related.length === 0) return null;

  return (
    <nav aria-label="Related intents" className="mt-16">
      <h2 className="text-lg font-semibold mb-4">
        Related Connections
      </h2>

      <ul className="flex flex-wrap gap-3">
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/intent/${item.slug}`}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 transition"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
