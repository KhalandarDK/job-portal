import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/ui/SearchBar";
import Link from "next/link";
import { Briefcase, Building2, Users, Star, ArrowRight } from "lucide-react";
import { mockJobs } from "@/lib/mockData";
import { JobCard } from "@/components/job/JobCard";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="gold" className="mb-6">🌙 Trusted by 200+ Institutions</Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Meaningful Careers<br />
                <span className="text-gold">in the Ummah</span>
              </h1>

              <p className="mt-6 text-xl text-slate-300 max-w-lg">
                Connecting Masjids, Madrasas, and organizations with dedicated Imams, Teachers, and Support Staff.
              </p>

              <div className="mt-10">
                <SearchBar 
                  placeholder="Search Imam, Muazzin, Arabic Teacher..." 
                  showButton 
                  size="lg" 
                  className="max-w-xl" 
                />
              </div>

              <div className="flex gap-4 mt-8">
                <Link href="/jobs">
                  <Button size="lg" variant="gold">Browse Jobs</Button>
                </Link>
                <Link href="/auth/register?role=provider">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -right-10 top-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 w-[420px]">
                <div className="text-center">
                  <div className="text-7xl mb-6"></div>
                  <h3 className="text-2xl font-semibold">500+ Opportunities</h3>
                  <p className="text-slate-300 mt-3">Verified roles from trusted institutions across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Active Jobs", icon: Briefcase },
            { value: "200+", label: "Institutions", icon: Building2 },
            { value: "2,000+", label: "Job Seekers", icon: Users },
            { value: "4.9★", label: "Community Rating", icon: Star },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-textSecondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-bold">Latest Opportunities</h2>
              <p className="text-textSecondary mt-2">Fresh openings from verified institutions</p>
            </div>
            <Link href="/jobs">
              <Button variant="outline" rightIcon={<ArrowRight />}>View All Jobs</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 3).map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}