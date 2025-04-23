
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Hero = () => {
  const { language } = useLanguage();

  const texts = {
    en: {
      title: "Developer",
      name: "Cristian Andrés Ramos",
      description: "I build exceptional digital experiences that are fast, accessible, and designed with best practices. My focus is on creating innovative solutions that solve real-world problems.",
      viewProjects: "View Projects",
      contactMe: "Contact Me"
    },
    es: {
      title: "Desarrollador",
      name: "Cristian Andrés Ramos",
      description: "Construyo experiencias digitales excepcionales que son rápidas, accesibles y diseñadas con las mejores prácticas. Mi enfoque está en crear soluciones innovadoras que resuelvan problemas del mundo real.",
      viewProjects: "Ver Proyectos",
      contactMe: "Contactarme"
    }
  };

  const t = texts[language];

  return (
    <section className="py-20 md:py-32 relative">
      {/* Subtle glowing orb in background */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-mono-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-[#9b87f5]/5 rounded-full blur-3xl"></div>
      
      <div className="container relative">
        <div className="flex justify-between items-start max-w-3xl animate-slide-up">
          <div>
            <span className="text-mono-accent text-sm tracking-wider mb-2 inline-block">PORTFOLIO</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 gradient-text">
              {t.title}
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 gradient-text">
              {t.name}
            </h2>
            <p className="text-xl text-mono-text-secondary mb-8 max-w-2xl">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4">
              <a
                href="#projects"
                className="inline-block px-6 py-3 bg-mono-surface/70 backdrop-blur-sm border border-mono-border/50 rounded-lg hover:bg-mono-card hover:border-mono-accent/30 transition-all hover:shadow-lg hover:shadow-mono-accent/5 text-center"
              >
                {t.viewProjects}
              </a>
              <a
                href="#contact"
                className="inline-block px-6 py-3 text-mono-background bg-mono-text rounded-lg hover:bg-mono-accent transition-colors text-center"
              >
                {t.contactMe}
              </a>
            </div>
          </div>
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-mono-accent/30">
            <AvatarImage src="https://avatars.githubusercontent.com/u/83793415?v=4" alt="Cristian Andrés Ramos" />
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] animate-bounce opacity-70 hidden md:block">
          <ChevronDown size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
