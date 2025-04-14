
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, ExternalLink } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  className?: string;
  imageUrl?: string;
  stars?: number;
}

const BentoCard = ({
  title,
  description,
  tags,
  link,
  featured = false,
  className,
  imageUrl,
  stars = 0,
}: BentoCardProps) => {
  const { language } = useLanguage();
  
  const viewProjectText = {
    en: "View Project",
    es: "Ver Proyecto"
  };

  return (
    <div
      className={cn(
        'bento-item group animate-fade-in relative overflow-hidden',
        featured && 'featured',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-mono-card/80 via-mono-card/70 to-transparent z-10"></div>
      
      {imageUrl && (
        <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-300">
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full rounded-xl" 
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load - use generic code image
              const target = e.target as HTMLImageElement;
              const fallbackImages = [
                'https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1000&auto=format&fit=crop'
              ];
              const randomIndex = Math.floor(Math.random() * fallbackImages.length);
              target.src = fallbackImages[randomIndex];
            }}
          />
        </div>
      )}
      
      <div className="relative z-20 h-full flex flex-col p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-2 group-hover:text-mono-accent transition-colors">
            {title}
          </h3>
          {stars > 0 && (
            <div className="flex items-center text-yellow-400">
              <Star size={16} className="fill-yellow-400" />
              <span className="ml-1 text-sm">{stars}</span>
            </div>
          )}
        </div>
        
        <p className="text-mono-text-secondary mb-4 flex-grow">{description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-mono-surface/70 backdrop-blur-sm text-mono-text-secondary hover:bg-mono-accent/20 transition-colors"
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
              className="text-mono-accent flex items-center hover:text-mono-text transition-colors group-hover:underline underline-offset-2"
            >
              {viewProjectText[language]} <ExternalLink size={14} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
