
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();

  const texts = {
    en: {
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      title: "Portfolio",
      switchLanguage: "Español"
    },
    es: {
      projects: "Proyectos",
      skills: "Habilidades",
      contact: "Contacto",
      title: "Portafolio",
      switchLanguage: "English"
    }
  };

  const t = texts[language];

  return (
    <header className="py-6">
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <nav className="flex items-center">
            <ul className="flex space-x-6 mr-4">
              <li>
                <a href="#projects" className="hover:text-mono-accent transition-colors">
                  {t.projects}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-mono-accent transition-colors">
                  {t.skills}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-mono-accent transition-colors">
                  {t.contact}
                </a>
              </li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2" 
              onClick={toggleLanguage}
            >
              <Globe size={16} />
              {t.switchLanguage}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
