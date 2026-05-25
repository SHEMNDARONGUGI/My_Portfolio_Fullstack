import NavigationBar from "./components/navBar";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Main gradient layer */}
        <div className="absolute inset-0 bg-[#030712]" />

        {/* Aurora gradient */}
        <div className="absolute -top-40 left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute top-[20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />

        {/* Floating blur circles */}
        <div className="absolute left-20 top-40 h-6 w-6 animate-pulse rounded-full bg-blue-400/40 blur-sm" />

        <div className="absolute bottom-32 right-40 h-4 w-4 animate-bounce rounded-full bg-cyan-300/50 blur-sm" />

        <div className="absolute left-1/2 top-1/3 h-5 w-5 animate-pulse rounded-full bg-indigo-400/40 blur-sm" />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <NavigationBar />

        {/* Hero Section */}
        <section
          id="home"
          className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="mb-6 text-6xl font-extrabold tracking-tight md:text-7xl">
            Shem Ndaro
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Computer Science Student • MERN Stack Developer • DevOps Enthusiast
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium backdrop-blur-md transition hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* Dummy Sections */}
        <section
          id="about"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-5xl font-bold">About Section</h2>
        </section>

        <section
          id="projects"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-5xl font-bold">Projects Section</h2>
        </section>

        <section
          id="services"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-5xl font-bold">Services Section</h2>
        </section>

        <section
          id="contact"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-5xl font-bold">Contact Section</h2>
        </section>
      </div>
    </div>
  );
}
