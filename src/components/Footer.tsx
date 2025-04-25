
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();

  const texts = {
    en: {
      contact: "Contact",
      contactDescription: "I am currently available for freelance work and full-time positions. If you have a project that needs creative engineering, I would love to hear more about it.",
      connect: "Connect",
      studentInfo: "2025 - Systems Engineering Student - Research and Development University - UDI"
    },
    es: {
      contact: "Contacto",
      contactDescription: "Actualmente estoy disponible para trabajo freelance y posiciones a tiempo completo. Si tienes un proyecto que necesita ingeniería creativa, me encantaría saber más.",
      connect: "Conectar",
      studentInfo: "2025 - Estudiante de Ingeniería de Sistemas - Universidad de Investigación y Desarrollo - UDI"
    }
  };

  const t = texts[language];

  return (
    <footer className="py-12 border-t border-mono-border mt-24" id="contact">
      <div className="container">
        <div className="flex flex-col items-start justify-around md:flex-row gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.contact}</h2>
            <p className="text-mono-text-secondary mb-4 max-w-xl text-pretty">
              {t.contactDescription}
            </p>
            <a
              href="mailto:crisrague1@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-mono-surface border border-mono-border rounded-lg hover:bg-mono-card transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              crisrague1@gmail.com
            </a>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">{t.connect}</h2>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/itemt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-mono-surface rounded-full hover:bg-mono-card transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/cristian-andrés-ramos-588a40285/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-mono-surface rounded-full hover:bg-mono-card transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="mailto:crisrague1@gmail.com"
                className="p-3 bg-mono-surface rounded-full hover:bg-mono-card transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-mono-border text-center text-mono-text-secondary">
          <p>© {new Date().getFullYear()} - {t.studentInfo}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
