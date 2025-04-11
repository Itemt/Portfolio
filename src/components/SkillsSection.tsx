
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
    <section className="py-20" id="skills">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">{sectionTitle[language]}</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill) => (
            <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
