
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface BentoCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  className?: string;
  imageUrl?: string;
}

const BentoCard = ({
  title,
  description,
  tags,
  link,
  featured = false,
  className,
  imageUrl,
}: BentoCardProps) => {
  const { language } = useLanguage();
  
  const viewProjectText = {
    en: "View Project →",
    es: "Ver Proyecto →"
  };

  return (
    <div
      className={cn(
        'bento-item group animate-fade-in',
        featured && 'featured',
        className
      )}
    >
      {imageUrl && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full rounded-xl" 
          />
        </div>
      )}
      
      <div className="relative z-10 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-mono-text-secondary mb-4 flex-grow">{description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-mono-surface text-mono-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mono-accent underline underline-offset-2 hover:text-mono-text transition-colors"
            >
              {viewProjectText[language]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
