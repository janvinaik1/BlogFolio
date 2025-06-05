import { useEffect, useState } from "react";
import heroImage from "../../public/herosection.png";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-white text-center px-6 overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-purple-900/30 to-slate-900/50 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x / 20}% ${
              mousePosition.y / 20
            }%, rgba(251, 146, 60, 0.3) 0%, rgba(139, 92, 246, 0.2) 35%, rgba(15, 23, 42, 0.1) 100%)`,
          }}
        />

        <div
          className={`relative z-10 max-w-6xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
              BlogFolio
            </span>
          </h1>

          <p className="text-xl md:text-3xl mb-8 font-light bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            <b>Create. Curate. Connect.</b>
          </p>

          {/* <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to share your{" "}
            <span className="text-orange-400 font-semibold">story</span> with
            the world? Join thousands of creators writing, building, and growing
            their digital presence.
          </p> */}

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/register"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full hover:from-orange-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
              <span className="relative flex items-center">
                Get Started Now
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </a>

            <a
              href="#features"
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black transition-all duration-300 bg-transparent border-2 border-white/30 rounded-full hover:border-orange-400 hover:bg-orange-400/10 hover:scale-105"
            >
             <b> Learn More</b>
              <svg
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-bounce delay-2000"></div>
      </section>

      {/* Combined Features & How It Works Section */}
      <section
        id="features"
        className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-6 text-white overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                Why Choose BlogFolio?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to express yourself, build your digital
              identity, and connect with the world.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                iconColor: "from-orange-500 to-orange-600",
                title: "Powerful Editor",
                desc: "Write and format stunning blog posts with our rich text editor.",
                icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
                step: "01",
              },
              {
                iconColor: "from-emerald-500 to-teal-600",
                title: "Portfolio Control",
                desc: "Build and showcase your work with complete CRUD operations.",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                step: "02",
              },
              {
                iconColor: "from-purple-500 to-indigo-600",
                title: "Community & Growth",
                desc: "Connect with creators and grow your audience in our vibrant community.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                step: "03",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Step Number Background */}
                <div className="absolute -top-4 -left-4 text-6xl font-black text-slate-800/50 group-hover:text-slate-700/50 transition-colors duration-300 z-0">
                  {feature.step}
                </div>

                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 z-10">
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={feature.icon}
                        />
                      </svg>
                    </div>

                    <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works Steps */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-300">
              Get started in{" "}
              <span className="text-orange-400">3 simple steps</span>
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
              {[
                "Sign up & customize your profile",
                "Create your first blog post or portfolio entry",
                "Share with the community & start growing",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-gray-300 text-sm md:text-base">{step}</p>
                  {i < 2 && (
                    <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400 opacity-50"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
