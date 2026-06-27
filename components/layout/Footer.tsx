import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand — full width on smallest screens */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
                JP
              </div>
              <span className="font-bold text-lg">Jobs</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Connecting institutions with dedicated professionals across the community.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-3 sm:mb-4 text-white">For Seekers</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {["Browse Jobs", "Create Profile", "Upload Resume", "Track Applications"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Institutions */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-3 sm:mb-4 text-white">Institutions</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {["Post a Job", "Browse Candidates", "Masjid Dashboard", "Madrasa Dashboard"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs sm:text-sm mb-3 sm:mb-4 text-white">Company</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 sm:mt-10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-white/50">© 2025 Jobs. All rights reserved.</p>
          <p className="text-xs sm:text-sm text-white/50">Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
}