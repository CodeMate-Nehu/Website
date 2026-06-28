/*
 * AlumniDetailed.jsx
 * Detailed view of an individual alumnus.
 * Features: Stat indicators, split card layout (orange left, off-white right),
 * detailed metadata, achievements/metrics grid, and "Back to Alumni" navigation.
 */
import { useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Building2,
  Code2,
  Mail,
  Share2,
  Award,
  FileText,
  Star,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const AlumniDetailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alumni = location.state?.alumni;

  if (!alumni) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-zinc-900">
        <p className="text-lg font-bold mb-4 text-white">No alumnus selected.</p>
        <button
          onClick={() => navigate("/Alumni")}
          className="bg-brand-primary text-black font-bold px-6 py-2.5 rounded-full cursor-pointer"
        >
          Go to Alumni Portal
        </button>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-brand-dark text-zinc-800 font-sans selection:bg-brand-primary selection:text-black">
      {/* Background Radial Glow */}
      <div className="orange-glow-top" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* 1. HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors duration-200 text-sm font-semibold mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Alumni
        </button>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          {/* Title and Badge */}
          <div className="space-y-4">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] text-brand-primary uppercase">
              Our People
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 uppercase leading-none">
              The Industry <br /> Leaders
            </h1>
          </div>

          {/* Stats Boxes */}
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {[
              { value: "150+", label: "alumni" },
              { value: "250+", label: "companies" },
              { value: "10+", label: "cities" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center items-start p-5 rounded-2xl bg-zinc-100 border border-zinc-200/60 w-32 "
              >
                <span className="font-heading text-2xl font-extrabold text-brand-primary">
                  {stat.value}
                </span>
                <span className="font-sans text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SPLIT PROFILE CARD CONTAINER */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl bg-white">
          {/* Left Column: Orange Panel */}
          <div className="lg:col-span-4 bg-brand-orange-bg p-8 sm:p-10 flex flex-col items-center text-center text-black">
            {/* Profile Photo */}
            <div className="relative w-44 h-44 rounded-2xl border-4 border-white overflow-hidden shadow-lg mb-6">
              <img
                src={alumni.image}
                alt={`${alumni.name} profile portrait`}
                className="w-full h-full object-cover filter grayscale"
              />
            </div>

            {/* Name & Role Badge */}
            <h2 className="font-heading text-3xl font-extrabold tracking-tight mb-2">
              {alumni.name}
            </h2>
            <div className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              {alumni.role} @ {alumni.company}
            </div>
            <p className="font-sans text-xs font-semibold tracking-wide text-black/75 mb-6">
              {alumni.batch}
            </p>

            {/* Action buttons (Share & Mail) */}
            <div className="flex gap-4 mb-8">
              <button
                className="bg-transparent hover:bg-black/10 border border-black/20 text-black p-3 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
                aria-label="Share profile"
              >
                <Share2 className="h-4 w-4 stroke-[2]" />
              </button>
              <button
                className="bg-transparent hover:bg-black/10 border border-black/20 text-black p-3 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer"
                aria-label="Send email"
              >
                <Mail className="h-4 w-4 stroke-[2]" />
              </button>
            </div>

            {/* Expertise grid */}
            <div className="w-full text-left">
              <div className="flex items-center gap-2 font-heading text-[10px] font-extrabold tracking-widest uppercase mb-4">
                <div className="h-[2px] w-5 bg-black" />
                Expertise
              </div>
              <div className="flex flex-wrap gap-2">
                {alumni.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-black font-semibold text-xs px-3.5 py-1.5 rounded-lg border border-black/5 hover:bg-zinc-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Dropdown availability */}
            <button className="bg-white text-black text-xs font-extrabold px-5 py-3.5 rounded-xl border border-black/10 w-full mt-8 flex justify-between items-center hover:bg-zinc-50 shadow-sm cursor-pointer group">
              <span>AVAILABLE FOR MENTORSHIP</span>
              <ChevronDown className="h-4 w-4 stroke-[2] text-black group-hover:translate-y-[1px] transition-transform" />
            </button>
          </div>

          {/* Right Column: Light Grey Panel */}
          <div className="lg:col-span-8 bg-zinc-50 p-8 sm:p-12 text-black flex flex-col justify-between gap-10">
            {/* Top metadata grid */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-8 border-b border-zinc-200">
                {/* Metadatum 1 - Role */}
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 bg-transparent border border-zinc-350 rounded-lg flex items-center justify-center text-zinc-700">
                    <Briefcase className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Current Role
                    </p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">
                      {alumni.role}
                    </p>
                  </div>
                </div>

                {/* Metadatum 2 - Company */}
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 bg-transparent border border-zinc-350 rounded-lg flex items-center justify-center text-zinc-700">
                    <Building2 className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Company
                    </p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">
                      {alumni.company}
                    </p>
                  </div>
                </div>

                {/* Metadatum 3 - Domain */}
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 bg-transparent border border-zinc-350 rounded-lg flex items-center justify-center text-zinc-700">
                    <Code2 className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Domain
                    </p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">
                      {alumni.domain}
                    </p>
                  </div>
                </div>
              </div>

              {/* ABOUT Section */}
              <div className="mt-8">
                <h3 className="font-heading text-2xl font-extrabold tracking-tight text-zinc-900 mb-4">
                  ABOUT
                </h3>
                <p className="font-sans text-sm sm:text-base text-zinc-700 leading-relaxed">
                  {alumni.bio}
                </p>
              </div>
            </div>

            {/* Metrics cards & footer */}
            <div className="space-y-8">
              {/* Metrics cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1 - Internships */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm text-left flex flex-col justify-between h-28 border-b-4 border-b-brand-orange-bg">
                  <Award className="h-5 w-5 text-brand-orange-bg stroke-[1.5]" />
                  <div>
                    <p className="text-2xl font-heading font-extrabold text-zinc-950">
                      {alumni.internships}
                    </p>
                    <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                      Internships
                    </p>
                  </div>
                </div>

                {/* Metric 2 - Research Papers */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm text-left flex flex-col justify-between h-28 border-b-4 border-b-black">
                  <FileText className="h-5 w-5 text-black stroke-[1.5]" />
                  <div>
                    <p className="text-2xl font-heading font-extrabold text-zinc-950">
                      {alumni.papers}
                    </p>
                    <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                      Research Papers
                    </p>
                  </div>
                </div>

                {/* Metric 3 - Open Source */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm text-left flex flex-col justify-between h-28 border-b-4 border-b-brand-orange-bg">
                  <Star className="h-5 w-5 text-brand-orange-bg stroke-[1.5] fill-brand-orange-bg/10" />
                  <div>
                    <p className="text-sm font-heading font-extrabold text-zinc-950 leading-tight">
                      Open Source
                    </p>
                    <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                      Contributor
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Projects link */}
              <div className="flex justify-end pt-4 border-t border-zinc-200">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-zinc-900 hover:text-brand-primary transition-colors"
                >
                  VIEW ALL PROJECTS
                  <ArrowRight className="h-4 w-4 mt-[1px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AlumniDetailed;
