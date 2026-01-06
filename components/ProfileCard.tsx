import Link from "next/link";

export default function ProfileCard({ user, me }: { user: any; me?: any }) {
  const isProfileComplete =
    !!me?.bio &&
    !!me?.profilePhoto &&
    !!me?.relationshipIntent &&
    !!me?.religion &&
    Array.isArray(me?.preferredTribes) &&
    me.preferredTribes.length > 0;

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl transition">
      
      {/* IMAGE */}
      <Link href={`/profile/${user.id}`}>
        <div className="relative h-[360px] w-full">
          <img
            src={user.profilePhoto || "/avatar-placeholder.png"}
            alt={user.username}
            className="h-full w-full object-cover"
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* NAME + AGE */}
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold">
              {user.username}
              {user.age ? `, ${user.age}` : ""}
            </h3>
            <p className="text-sm opacity-90">
              {user.location}
              {typeof user.distanceKm === "number" && (
                <> • {Math.round(user.distanceKm)} km away</>
              )}
            </p>
          </div>

          {/* INTENT BADGE */}
          {user.relationshipIntent && (
            <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
              {user.relationshipIntent.replaceAll("_", " ")}
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4">
        {user.bio && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            {user.bio}
          </p>
        )}

        {/* ACTION */}
        {user.matchId ? (
          isProfileComplete ? (
            <Link
              href={`/chat/${user.matchId}`}
              className="block w-full rounded-xl bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Start Chat
            </Link>
          ) : (
            <Link
              href="/profile/edit"
              className="block w-full rounded-xl bg-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-700"
            >
              Complete profile to chat
            </Link>
          )
        ) : (
          <Link
            href={`/profile/${user.id}`}
            className="block w-full rounded-xl border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
          >
            View Profile
          </Link>
        )}
      </div>
    </div>
  );
}
