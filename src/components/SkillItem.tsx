
import React from 'react';

interface SkillItemProps {
  name: string;
  icon: React.ReactNode;
}

const SkillItem = ({ name, icon }: SkillItemProps) => {
  return (
    <div className="skill-icon animate-fade-in">
      <div className="text-2xl">{icon}</div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};

export default SkillItem;
