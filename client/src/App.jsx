import NavigationBar from "./components/navBar";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black transition-colors duration-500 dark:bg-[#030712] dark:text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* LIGHT MODE BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:hidden" />

        {/* DARK MODE BACKGROUND */}
        <div className="hidden dark:block absolute inset-0 bg-[#030712]" />

        {/* DARK AURORA */}
        <div className="hidden dark:block absolute -top-40 left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="hidden dark:block absolute top-[20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="hidden dark:block absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />

        {/* LIGHT MODE GLOWS */}
        <div className="dark:hidden absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="dark:hidden absolute bottom-10 right-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />

        {/* Floating elements (shared but softer in light mode) */}
        <div className="absolute left-20 top-40 h-6 w-6 animate-pulse rounded-full bg-blue-400/40 blur-sm" />

        <div className="absolute bottom-32 right-40 h-4 w-4 animate-bounce rounded-full bg-cyan-300/50 blur-sm" />

        <div className="absolute left-1/2 top-1/3 h-5 w-5 animate-pulse rounded-full bg-indigo-400/40 blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <NavigationBar />

        {/* Hero */}
        <section
          id="home"
          className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="mb-6 text-6xl font-extrabold tracking-tight md:text-7xl">
            Shem Ndaro
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
            Computer Science Student • MERN Stack Developer • DevOps Enthusiast
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* Sections */}
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
