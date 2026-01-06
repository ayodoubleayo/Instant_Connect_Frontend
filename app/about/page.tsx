export default function AboutPage() {
  return (
    <div
      className="min-h-screen px-4 py-12
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div className="mx-auto max-w-5xl space-y-12">

        {/* HERO */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About InstantConnect
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A respectful, intentional space built for genuine, value-driven
            human connections — without pressure, fear, or compromise.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-white/60 p-8 md:p-12 space-y-14">

          {/* INTRO */}
          <section className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              InstantConnect was created in response to a growing concern:
              many online platforms prioritize speed, appearance, and
              engagement metrics over dignity, safety, and shared values.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe meaningful connections should be built on honesty,
              clarity of intention, and mutual respect — not pressure,
              manipulation, or discomfort.
            </p>
          </section>

          {/* MISSION */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎯</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide a platform where people can meet and
              interact in ways that feel safe, respectful, and aligned with
              their personal values and life goals.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We aim to reduce emotional harm, misunderstanding, and
              uncomfortable interactions by encouraging transparency,
              consent, and intentional engagement from the very beginning.
            </p>
          </section>

          {/* VALUES */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌱</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Core Values
              </h2>
            </div>

            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>Respect:</strong> Every user deserves dignity,
                regardless of background, belief, or intention.
              </li>
              <li>
                <strong>Consent:</strong> Interactions should always be
                voluntary, welcomed, and clearly understood.
              </li>
              <li>
                <strong>Clarity:</strong> Honest intentions help prevent
                emotional confusion and misplaced expectations.
              </li>
              <li>
                <strong>Safety:</strong> Emotional, psychological, and
                personal safety come before engagement or growth metrics.
              </li>
            </ul>
          </section>

          {/* FAITH */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🕊️</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Faith & Personal Beliefs
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              InstantConnect is inclusive by design. We welcome people of all
              religious backgrounds — Christianity, Islam, traditional
              beliefs, and those with no religious affiliation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Faith and belief systems are deeply personal. No user is forced
              into conversations, matches, or interactions that conflict with
              their convictions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our tools are designed to help users set boundaries clearly and
              interact only in ways that align with their beliefs and comfort.
            </p>
          </section>

          {/* RELATIONSHIPS */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">❤️</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Relationship Intentions
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              People seek connection for many different reasons. Some are
              looking for marriage, others for long-term relationships,
              companionship, or meaningful conversation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              InstantConnect allows users to express their intentions clearly,
              helping reduce pressure, mismatched expectations, and emotional
              strain.
            </p>
          </section>

          {/* SAFETY */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🛡️</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Comfort, Safety & Control
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We prioritize user comfort at every stage. You decide what
              information to share, who can contact you, and when an
              interaction should end.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Tools such as blocking, reporting, and moderation exist to
              protect users — not to punish, but to preserve a healthy
              community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Harassment, coercion, and disrespectful behavior are not aligned
              with our values and are actively addressed.
            </p>
          </section>

          {/* COMMUNITY */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🤝</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Our Community Commitment
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              InstantConnect is more than a platform — it is a shared space.
              Every user contributes to the experience of others.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By joining, users agree to uphold principles of honesty,
              kindness, and responsibility toward fellow members.
            </p>
          </section>

          {/* FOOTER NOTE */}
          <div className="border-t pt-8 text-center">
            <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed">
              Whether guided by faith, personal values, or life goals,
              InstantConnect exists to help people connect in ways that feel
              natural, safe, intentional, and true to who they are.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
