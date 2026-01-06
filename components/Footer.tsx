import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 bg-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          {/* Left */}
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} MyFriend. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex gap-6 text-sm font-medium text-gray-700">
            <Link href="/privacy" className="hover:text-red-600 transition">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-red-600 transition">
              Terms
            </Link>

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/2348064520832"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
