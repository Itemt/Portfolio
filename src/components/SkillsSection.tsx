
import React from 'react';
import SkillItem from './SkillItem';
import { Database, Globe, Server, Code, Layout, PenTool, Package, FileCode, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SkillsSection = () => {
  const { language } = useLanguage();
  
  const sectionTitle = {
    en: "Skills & Technologies",
    es: "Habilidades y Tecnologías"
  };
  
  const sectionDescription = {
    en: "These are the main technologies and skills I work with to create modern web applications.",
    es: "Estas son las principales tecnologías y habilidades con las que trabajo para crear aplicaciones web modernas."
  };

  const skills = [
    { name: 'Next.js', icon: <Globe /> },
    { name: 'React', icon: <Code /> },
    { name: 'TypeScript', icon: <FileCode /> },
    { name: 'Docker', icon: <Package /> },
    { name: 'PostgreSQL', icon: <Database /> },
    { name: 'Node.js', icon: <Server /> },
    { name: 'UI/UX', icon: <PenTool /> },
    { name: 'Tailwind CSS', icon: <Layout /> },
    { name: 'Stripe', icon: <CreditCard /> },
  ];

  return (
    <section className="py-20 relative" id="skills">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-mono-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-[#9b87f5]/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">{sectionTitle[language]}</h2>
          <p className="text-mono-text-secondary max-w-2xl mx-auto">{sectionDescription[language]}</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill) => (
            <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
