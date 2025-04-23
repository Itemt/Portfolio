
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const t = texts[language];
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <header 
        className={cn(
          "py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          mobileMenuOpen 
            ? "bg-black shadow-md" 
            : scrolled 
              ? "backdrop-blur-md bg-mono-background/70 shadow-md" 
              : "bg-transparent"
        )}
      >
        <div className="container">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <span className={cn(
                "transition-colors",
                mobileMenuOpen 
                  ? "text-white" 
                  : scrolled 
                    ? "gradient-text" 
                    : "text-white"
              )}>
                {t.title}
              </span>
            </h1>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white p-1" 
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
      
      {/* Mobile menu overlay - full screen */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black z-40 md:hidden pt-20" 
        >
          <div className="container py-4">
            <nav>
              <ul className="flex flex-col space-y-6 mb-8">
                <li>
                  <a 
                    href="#projects" 
                    className="text-white hover:text-mono-accent transition-colors block py-2 px-2 text-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.projects}
                  </a>
                </li>
                <li>
                  <a 
                    href="#skills" 
                    className="text-white hover:text-mono-accent transition-colors block py-2 px-2 text-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.skills}
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-white hover:text-mono-accent transition-colors block py-2 px-2 text-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.contact}
                  </a>
                </li>
              </ul>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex items-center gap-2 w-full justify-center bg-mono-text text-mono-background hover:bg-mono-accent hover:text-mono-background border-mono-border/50" 
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
              >
                <Globe size={18} />
                {t.switchLanguage}
              </Button>
            </nav>
          </div>
        </div>
      )}
      
      {/* Remove the spacer div since we're using a full overlay approach */}
    </>
  );
};

export default Header;
