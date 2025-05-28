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
        className="relative min-h-screen flex flex-col justify-center items-center text-white text-center px-6 overflow-hidden "
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-purple-900/30 to-slate-900/50 transition-all duration-1000 z-1"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x / 20}% ${
              mousePosition.y / 20
            }%, rgba(251, 146, 60, 0.2) 0%, rgba(139, 92, 246, 0.15) 35%, rgba(15, 23, 42, 0.4) 100%)`,
          }}
        />
        <div
          className={`relative z-10 max-w-4xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
              BlogFolio
            </span>
          </h1>

          <p className="text-2xl md:text-4xl mb-12 font-light bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Create. Curate. Connect.
          </p>

          <a
            href="#features"
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full hover:from-orange-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
            <span className="relative flex items-center">
              Discover Features
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
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-bounce delay-2000"></div>
      </section>

      {/* Features Section */}
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
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                What Makes BlogFolio Stand Out?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Express yourself, build your digital identity, and connect with
              the world—all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                iconColor: "from-orange-500 to-orange-600",
                title: "Powerful Blog Editor",
                desc: "Write, edit, and manage stunning blog posts with our rich text editor. Format beautifully, add media, and bring your ideas to life.",
                icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
              },
              {
                iconColor: "from-emerald-500 to-teal-600",
                title: "Complete Portfolio Control",
                desc: "Build and showcase your personal portfolio. Create, update, and manage entries with full CRUD operations to highlight your journey.",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
              },
              {
                iconColor: "from-purple-500 to-indigo-600",
                title: "Engage & Grow",
                desc: "Connect with other creators, share your work, receive feedback, and become part of a vibrant blogging community.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    <svg
                      className="w-10 h-10 text-white"
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

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-6 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get started in just three simple steps and begin your creative
              journey today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {[
              {
                step: "01",
                title: "Sign Up & Customize",
                desc: "Create your account in seconds and set up your personalized profile to reflect your unique style.",
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                color: "from-orange-500 to-orange-600",
              },
              {
                step: "02",
                title: "Create & Build",
                desc: "Start writing compelling blog posts and building your portfolio with our intuitive tools and rich editor.",
                icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                color: "from-emerald-500 to-teal-600",
              },
              {
                step: "03",
                title: "Share & Connect",
                desc: "Publish your content, connect with other creators, and grow your audience in our vibrant community.",
                icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z",
                color: "from-purple-500 to-indigo-600",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`group relative text-center transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 300}ms` }}
              >
                {/* Step Number */}
                <div className="relative mb-8">
                  <div className="text-8xl font-black text-slate-800 group-hover:text-slate-700 transition-colors duration-300">
                    {step.step}
                  </div>
                  <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={step.icon}
                      />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold group-hover:text-orange-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed text-lg max-w-sm mx-auto">
                    {step.desc}
                  </p>
                </div>

                {/* Connecting Line (except for last item) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-full w-12 h-0.5 bg-gradient-to-r from-slate-600 to-slate-700 transform translate-x-0 group-hover:from-orange-400 group-hover:to-purple-400 transition-all duration-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-orange-100 to-pink-50 py-24 px-6 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.3)_1px,_transparent_0)] bg-[size:20px_20px]"></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-200/30 rounded-full blur-xl animate-float delay-1000"></div>

        <div
          className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            Ready to share your{" "}
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              story
            </span>{" "}
            with the world?
          </h2>

          <p className="text-xl text-slate-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators who are writing, building, and growing
            their digital presence with BlogApp.
          </p>

          <a
            href="/register"
            className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full hover:from-orange-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></span>
            <span className="relative flex items-center">
              Get Started Now
              <svg
                className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1"
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
