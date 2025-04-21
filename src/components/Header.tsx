
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = texts[language];
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <header className={cn(
        "py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-md bg-mono-background/70 shadow-md" : ""
      )}>
        <div className="container">
          {/* Desktop header content */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <span className={cn(
                "transition-colors",
                scrolled ? "gradient-text" : ""
              )}>
                {t.title}
              </span>
            </h1>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-mono-text p-1" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center">
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
                className="flex items-center gap-2 bg-mono-text text-mono-background hover:bg-mono-accent hover:text-mono-background border-mono-border/50" 
                onClick={toggleLanguage}
              >
                <Globe size={16} />
                {t.switchLanguage}
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile menu - now outside the header */}
      <div 
        className={cn(
          "fixed top-[72px] left-0 right-0 bg-mono-background/95 backdrop-blur-md border-t border-mono-border/20 md:hidden transition-transform duration-300 z-40",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="container py-4">
          <nav>
            <ul className="flex flex-col space-y-4 mb-4">
              <li>
                <a 
                  href="#projects" 
                  className="hover:text-mono-accent transition-colors block py-1 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.projects}
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className="hover:text-mono-accent transition-colors block py-1 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.skills}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="hover:text-mono-accent transition-colors block py-1 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.contact}
                </a>
              </li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 w-full justify-center bg-mono-text text-mono-background hover:bg-mono-accent hover:text-mono-background border-mono-border/50" 
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
            >
              <Globe size={16} />
              {t.switchLanguage}
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Spacer div to push content down when menu is open */}
      <div 
        className={cn(
          "md:hidden transition-all duration-300",
          mobileMenuOpen ? "h-[220px]" : "h-0"
        )} 
      />
    </>
  );
};

export default Header;
