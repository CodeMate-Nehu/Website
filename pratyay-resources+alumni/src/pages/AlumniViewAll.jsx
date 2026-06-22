/*
 * AlumniViewAll.jsx
 * Comprehensive directory of alumni categorized by career pathways.
 * Features: Back navigation button, categorized list grids matching the design,
 * custom card templates (light vs. highlighted orange, text detail layouts), and icon indicators.
 */
import {
  GraduationCap,
  Briefcase,
  Globe,
  Rocket,
  Atom,
  Share2,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";

const AlumniViewAll = ({ onSelectAlumni, onBack }) => {
  // Categorized Alumni Groups matching the reference image categories
  const categories = [
    {
      id: "leaders",
      tag: "OUR PEOPLE",
      title: "the industry leaders",
      type: "leaders", // Custom rendering for leaders (showing images + icons)
      alumni: [
        {
          name: "Abhishek Kumar Rai",
          role: "Founder at Decent",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80&sat=-100",
          highlighted: true, // Orange card style
          domain: "Product Engineering",
          batch: "BTECH IT 2018-22",
          expertise: ["Solidity", "Cryptography", "MVP Design"],
          internships: 2,
          papers: 1,
          openSource: "Web3 Lead",
          bio: "Abhishek is a blockchain developer and startup founder. He started Decent to build cryptographic primitives for decentralized ledgers.",
        },
        {
          name: "Harsh Pandey",
          role: "Co-founder at Decent",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80&sat=-100",
          highlighted: false,
          domain: "Full-Stack Development",
          batch: "BTECH IT 2018-22",
          expertise: ["React", "Node.js", "System Design"],
          internships: 3,
          papers: 0,
          openSource: "Contributor",
          bio: "Harsh leads full stack product engineering at Decent. He previously interned at Amazon and works on systems architecture.",
        },
        {
          name: "Adit Nimavat",
          role: "CTO at Decent",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80&sat=-100",
          highlighted: false,
          domain: "Blockchains & Systems",
          batch: "BTECH CSE 2018-22",
          expertise: ["C++", "Rust", "Distributed Systems"],
          internships: 2,
          papers: 2,
          openSource: "Core Contributor",
          bio: "Adit is the compiler and networks architect of Decent's core blockchain stack. He is a research fellow in systems engineering.",
        },
      ],
    },
    {
      id: "higher-studies",
      tag: "OUR PEOPLE",
      title: "pursuing higher studies",
      icon: <GraduationCap className="h-6 w-6 text-zinc-600" />,
      alumni: [
        {
          name: "Dr. Ali Abdi",
          role: "Postdoc at MIT",
          domain: "Research Science",
          company: "MIT",
          batch: "BTECH CSE 2016-20",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["AI", "Algorithms", "Mathematics"],
          internships: 4,
          papers: 5,
          openSource: "Researcher",
          bio: "Ali is research scientist working on automated neural networks at MIT. Feel free to talk to him about higher education, recommendations, and publishing papers.",
        },
        {
          name: "Dr. Ajit Abhijeet",
          role: "Postdoc at Stanford",
          domain: "Biomedical AI",
          company: "Stanford University",
          batch: "BTECH CSE 2016-20",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Bio-ML", "Python", "Data Science"],
          internships: 3,
          papers: 4,
          openSource: "Open Source Lead",
          bio: "Ajit is a bio-informatics researcher at Stanford. He uses computer vision to analyze medical datasets and build digital healthcare tools.",
        },
        {
          name: "Prof. Gyanendra Shekhar Roy",
          role: "Assistant Professor",
          domain: "Computer Vision",
          company: "Georgia Tech",
          batch: "BTECH CSE 2014-18",
          image:
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Teaching", "Optics", "Robotics"],
          internships: 2,
          papers: 6,
          openSource: "Academic Board",
          bio: "Gyanendra is teaching AI courses and leading computer vision research labs at Georgia Tech. Connect to discuss PhD topics and fellowships.",
        },
      ],
    },
    {
      id: "mba-mgmt",
      tag: "OUR PEOPLE",
      title: "pursuing mba & management",
      icon: <Briefcase className="h-6 w-6 text-zinc-600" />,
      alumni: [
        {
          name: "Abhishek Kumar Rai",
          role: "MBA Candidate at IIM A",
          domain: "Product Management",
          company: "IIM Ahmedabad",
          batch: "BTECH IT 2019-23",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Product Strategy", "Consulting", "Finance"],
          internships: 3,
          papers: 0,
          openSource: "Management Lead",
          bio: "Abhishek is studying at IIM-A to transition into product leadership. He is happy to guide students preparing for CAT or GMAT.",
        },
        {
          name: "Harsh Pandey",
          role: "Consultant at BCG",
          domain: "Strategy Consulting",
          company: "BCG / IIM B",
          batch: "BTECH IT 2019-23",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Business Strategy", "Analysis", "Data Presentation"],
          internships: 2,
          papers: 0,
          openSource: "Alumni Council",
          bio: "Harsh graduated from IIM Bangalore and works in strategy consulting for top tech companies. Reach out for case-interview prep advice.",
        },
        {
          name: "Adit Nimavat",
          role: "Investment Banker at JP",
          domain: "Corporate Finance",
          company: "JPMorgan / IIM C",
          batch: "BTECH CSE 2019-23",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Valuations", "M&A", "Python for Finance"],
          internships: 2,
          papers: 1,
          openSource: "Finance Analyst",
          bio: "Adit is working in corporate valuations and investment banking in Mumbai, following his MBA at IIM Calcutta. Talk to him about fintech roles.",
        },
      ],
    },
    {
      id: "global",
      tag: "OUR PEOPLE",
      title: "exploring global opportunities",
      icon: <Globe className="h-6 w-6 text-zinc-600" />,
      alumni: [
        {
          name: "Abhishek Kumar Rai",
          role: "Software Engineer at Google",
          domain: "Systems Engineering",
          company: "Google SV",
          batch: "BTECH IT 2017-21",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Kubernetes", "Go", "Cloud Platform"],
          internships: 3,
          papers: 1,
          openSource: "Cloud Contributor",
          bio: "Abhishek works on system automation at Google's Silicon Valley campus. Reach out to discuss visa sponsorship or relocation challenges.",
        },
        {
          name: "Harsh Pandey",
          role: "Solutions Architect at AWS",
          domain: "Cloud Infrastructure",
          company: "AWS London",
          batch: "BTECH IT 2017-21",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["AWS Cloud", "Node.js", "Serverless Architecture"],
          internships: 2,
          papers: 0,
          openSource: "AWS Contributor",
          bio: "Harsh is cloud solutions designer based in AWS London, helping European tech companies scale their services.",
        },
        {
          name: "Adit Nimavat",
          role: "ML Engineer at Rakuten",
          domain: "Recommendation Systems",
          company: "Rakuten Tokyo",
          batch: "BTECH CSE 2017-21",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Python", "TensorFlow", "Deep Learning"],
          internships: 3,
          papers: 2,
          openSource: "TF Contributor",
          bio: "Adit designs recommender models and search engine models at Rakuten in Tokyo. Happy to advise on Japanese language learning and tech roles.",
        },
      ],
    },
    {
      id: "entrepreneurs",
      tag: "OUR PEOPLE",
      title: "the entrepreneurs",
      icon: <Rocket className="h-6 w-6 text-black" />,
      type: "entrepreneurs", // Orange background card style
      alumni: [
        {
          name: "Abhishek Kumar Rai",
          role: "Founder at Decent",
          domain: "Venture Builder",
          company: "Decent",
          batch: "BTECH IT 2018-22",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Blockchain", "Seed Pitching", "Team Building"],
          internships: 2,
          papers: 1,
          openSource: "Founder",
          bio: "Abhishek built Decent, a blockchain networks builder. Reach out to discuss pitching pitch decks and prototyping MVPs.",
        },
        {
          name: "Harsh Pandey",
          role: "Co-founder at Decent",
          domain: "Full-stack Scale",
          company: "Decent",
          batch: "BTECH IT 2018-22",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["React", "NoSQL", "User Acquisition"],
          internships: 3,
          papers: 0,
          openSource: "Co-founder",
          bio: "Harsh leads engineering teams at Decent. He previously built product releases at early-stage tech apps.",
        },
        {
          name: "Adit Nimavat",
          role: "Co-founder at Decent",
          domain: "Systems & Security",
          company: "Decent",
          batch: "BTECH CSE 2018-22",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Security auditing", "Distributed ledgers"],
          internships: 2,
          papers: 2,
          openSource: "Web3 Contributor",
          bio: "Adit is co-founder of Decent, leading research and development on cryptography and compiler optimization.",
        },
      ],
    },
    {
      id: "research",
      tag: "OUR PEOPLE",
      title: "research & innovation",
      icon: <Atom className="h-6 w-6 text-zinc-600" />,
      alumni: [
        {
          name: "Abhishek Kumar Rai",
          role: "Research Scientist at OpenAI",
          domain: "Generative AI",
          company: "OpenAI",
          batch: "BTECH IT 2018-22",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["LLMs", "PyTorch", "Reinforcement Learning"],
          internships: 3,
          papers: 3,
          openSource: "OpenAI Core",
          bio: "Abhishek is researcher working on alignment and pretraining at OpenAI in San Francisco.",
        },
        {
          name: "Harsh Pandey",
          role: "Research Fellow at Microsoft",
          domain: "Quantum Algorithms",
          company: "Microsoft Research",
          batch: "BTECH IT 2018-22",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Qubits", "Quantum Cryptography"],
          internships: 2,
          papers: 4,
          openSource: "Q-Sim Contributor",
          bio: "Harsh works on simulator algorithms for quantum architectures at Microsoft's innovation labs.",
        },
        {
          name: "Adit Nimavat",
          role: "PhD at Stanford",
          domain: "Robotics & Controls",
          company: "Stanford Robotics Lab",
          batch: "BTECH CSE 2018-22",
          image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&h=300&q=80&sat=-100",
          expertise: ["Robot Dynamics", "Control Systems"],
          internships: 2,
          papers: 3,
          openSource: "ROS Contributor",
          bio: "Adit is a PhD researcher in Stanford's Robotics Lab, designing autonomy algorithms for multi-agent drone fleets.",
        },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-brand-dark text-zinc-800 font-sans selection:bg-brand-primary selection:text-black">
      {/* Background Radial Glow */}
      <div className="orange-glow-top" aria-hidden="true" />

      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors duration-200 text-sm font-semibold mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Alumni Dashboard
        </button>

        <div className="space-y-2">
          <span className="inline-block font-sans text-xs font-semibold tracking-[0.25em] text-brand-primary uppercase">
            SCET Directory
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 uppercase leading-none">
            Alumni Networks
          </h1>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DIRECTORY CATEGORIES */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-6">
            {/* Category Header */}
            <div className="relative py-8 px-6 overflow-hidden rounded-2xl border border-zinc-200/40 bg-zinc-50/20">
              {cat.id === "leaders" && (
                <GridPattern
                  width={30}
                  height={300000000}
                  squares={[
                    [4, 2],
                    [5, 1],
                    [8, 2],
                    [5, 3],
                    [5, 5],
                    [10, 2],
                  ]}
                  className="[mask-image:radial-gradient(220px_circle_at_center,white,transparent)] opacity-85 inset-y-[-10%]"
                />
              )}
              <div className="relative z-10">
                <span className="inline-block font-sans text-xs font-bold tracking-widest text-brand-primary uppercase">
                  {cat.tag}
                </span>
                <h2 className="font-heading text-4xl font-extrabold text-zinc-900 leading-tight uppercase mt-1">
                  {cat.id === "leaders" ? "the founders" : cat.title}
                </h2>
                {cat.id === "leaders" && (
                  <p className="font-sans text-sm text-zinc-500 mt-2 font-normal">
                    who laid the vision behind the community
                  </p>
                )}
              </div>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.alumni.map((alumnus, idx) => {
                // Leaders card variant (includes share/mail actions and portraits)
                if (cat.type === "leaders") {
                  const isHighlighted = alumnus.highlighted;
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectAlumni(alumnus)}
                      className={`rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-md border ${
                        isHighlighted
                          ? "bg-brand-orange-bg border-brand-primary/20 text-black shadow-brand-primary/10"
                          : "bg-zinc-50 border-zinc-200/80 text-black"
                      }`}
                    >
                      <div
                        className={`relative w-24 h-24 rounded-full overflow-hidden border-2 mb-4 ${
                          isHighlighted ? "border-black" : "border-zinc-300"
                        }`}
                      >
                        <img
                          src={alumnus.image}
                          alt={alumnus.name}
                          className="w-full h-full object-cover filter grayscale"
                        />
                      </div>
                      <h3 className="font-heading text-lg font-bold leading-tight">
                        {alumnus.name}
                      </h3>
                      <p
                        className={`text-xs mt-1 font-semibold ${isHighlighted ? "text-black/80" : "text-zinc-500"}`}
                      >
                        {alumnus.role}
                      </p>

                      {/* Social Actions */}
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`p-2 rounded-full border transition-colors ${
                            isHighlighted
                              ? "border-black/20 hover:bg-black/10 text-black"
                              : "border-zinc-300 hover:bg-zinc-200 text-zinc-700"
                          }`}
                          aria-label="Share"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className={`p-2 rounded-full border transition-colors ${
                            isHighlighted
                              ? "border-black/20 hover:bg-black/10 text-black"
                              : "border-zinc-300 hover:bg-zinc-200 text-zinc-700"
                          }`}
                          aria-label="Email"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                }

                // Entrepreneurs Card Variant (Solid Orange cards with rocket icon)
                if (cat.type === "entrepreneurs") {
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectAlumni(alumnus)}
                      className="rounded-2xl p-6 bg-brand-orange-bg border border-brand-primary/20 text-black flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-md shadow-brand-primary/5"
                    >
                      {/* Avatar Circle Container */}
                      <div className="w-14 h-14 bg-black/5 border border-black/15 rounded-full flex items-center justify-center mb-4 text-black">
                        {cat.icon}
                      </div>
                      <h3 className="font-heading text-lg font-bold leading-tight">
                        {alumnus.name}
                      </h3>
                      <p className="text-xs text-black/80 font-semibold mt-1">
                        {alumnus.role}
                      </p>
                    </div>
                  );
                }

                // Standard Off-White Card Variant for remaining categories (studies, mba, global, research)
                return (
                  <div
                    key={idx}
                    onClick={() => onSelectAlumni(alumnus)}
                    className="rounded-2xl p-6 bg-zinc-50 border border-zinc-200/80 text-black flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  >
                    {/* Avatar Circle Container */}
                    <div className="w-14 h-14 bg-zinc-200/60 border border-zinc-300/40 rounded-full flex items-center justify-center mb-4">
                      {cat.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold leading-tight">
                      {alumnus.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-semibold mt-1">
                      {alumnus.role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default AlumniViewAll;
