import CertificationSection from "../../components/public/CertificationSection";
import AboutSection from "../../components/public/AboutSection";
import ContactSection from "../../components/public/ContactSection";
import EducationSection from "../../components/public/EducationSection";
import ExperienceSection from "../../components/public/ExperienceSection";
import PortfolioFooter from "../../components/public/PortfolioFooter";
import PortfolioNavbar from "../../components/public/PortfolioNavbar";
import ProjectsSection from "../../components/public/ProjectsSection";
import ServicesSection from "../../components/public/ServicesSection";
import SkillsSection from "../../components/public/SkillsSection";

export default function PortfolioPage() {
  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      <PortfolioNavbar />
      <main className="mx-auto max-w-7xl divide-y divide-border">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationSection />
        <SkillsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
