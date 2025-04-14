
import React, { useEffect, useState } from 'react';
import BentoCard from './BentoCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  readme?: string;
  language?: string;
}

const fetchGithubRepos = async () => {
  const response = await fetch('https://api.github.com/users/Itemt/repos?sort=updated&per_page=8');
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  const repos = await response.json();
  
  // Fetch README for each repository
  const reposWithReadme = await Promise.all(
    repos.map(async (repo: Repository) => {
      try {
        const readmeResponse = await fetch(`https://api.github.com/repos/Itemt/${repo.name}/readme`);
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          const decodedContent = decodeURIComponent(escape(atob(readmeData.content)));
          return { ...repo, readme: decodedContent };
        }
      } catch (error) {
        console.log(`Could not fetch README for ${repo.name}`);
      }
      return repo;
    })
  );
  
  return reposWithReadme;
};

// Get a themed image URL based on repository content with more varied image options
const getRepoImageUrl = (repo: Repository, index: number) => {
  // If no repo information, return a generic coding image
  if (!repo) return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
  
  // Collection of technology-specific images
  const imageCollection = {
    generic: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop'
    ],
    react: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1000&auto=format&fit=crop'
    ],
    python: [
      'https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526379879527-8559ecfd8bf7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop'
    ],
    javascript: [
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop'
    ],
    typescript: [
      'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599507593473-478d9a15064d?q=80&w=1000&auto=format&fit=crop'
    ],
    backend: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1000&auto=format&fit=crop'
    ],
    database: [
      'https://images.unsplash.com/photo-1654277041218-84424c78f0ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop'
    ],
    dotnet: [
      'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555066931-bf19f8fd1085?q=80&w=1000&auto=format&fit=crop'
    ],
    web: [
      'https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581276879432-e80fae0891c0?q=80&w=1000&auto=format&fit=crop'
    ],
    api: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1000&auto=format&fit=crop'
    ],
    mobile: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1000&auto=format&fit=crop'
    ],
    game: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590422749897-47c77ee07a0b?q=80&w=1000&auto=format&fit=crop'
    ],
    ai: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad696?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1676277791406-8cc70af16ab8?q=80&w=1000&auto=format&fit=crop'
    ]
  };
  
  const readme = repo.readme?.toLowerCase() || '';
  const topics = repo.topics?.map(t => t.toLowerCase()) || [];
  const repoName = repo.name.toLowerCase();
  const language = repo.language?.toLowerCase() || '';
  
  // Look for specific project indicators in readme and other metadata
  if (readme.includes('juego') || readme.includes('game') || 
      topics.includes('game') || repoName.includes('game')) {
    return imageCollection.game[index % imageCollection.game.length];
  }
  
  if (readme.includes('móvil') || readme.includes('mobile') || 
      readme.includes('android') || readme.includes('ios') ||
      topics.includes('mobile') || repoName.includes('mobile')) {
    return imageCollection.mobile[index % imageCollection.mobile.length];
  }
  
  if (readme.includes('ai') || readme.includes('artificial intelligence') || 
      readme.includes('machine learning') || readme.includes('inteligencia artificial') ||
      topics.includes('ai') || topics.includes('machine-learning')) {
    return imageCollection.ai[index % imageCollection.ai.length];
  }
  
  // Technology-specific images
  if (readme.includes('react') || topics.includes('react') || repoName.includes('react')) {
    return imageCollection.react[index % imageCollection.react.length];
  } 
  
  if (readme.includes('python') || topics.includes('python') || 
      repoName.includes('python') || language === 'python') {
    return imageCollection.python[index % imageCollection.python.length];
  } 
  
  if (readme.includes('node') || topics.includes('node') || 
      repoName.includes('node') || language === 'javascript') {
    return imageCollection.javascript[index % imageCollection.javascript.length];
  } 
  
  if (readme.includes('typescript') || topics.includes('typescript') || 
      repoName.includes('typescript') || language === 'typescript') {
    return imageCollection.typescript[index % imageCollection.typescript.length];
  } 
  
  if (readme.includes('.net') || topics.includes('.net') || 
      repoName.includes('.net') || language === 'c#') {
    return imageCollection.dotnet[index % imageCollection.dotnet.length];
  }
  
  if (readme.includes('database') || readme.includes('sql') || 
      readme.includes('base de datos') || topics.includes('database') || 
      topics.includes('sql')) {
    return imageCollection.database[index % imageCollection.database.length];
  } 
  
  if (readme.includes('web') || topics.includes('web') || 
      repoName.includes('web') || language === 'html') {
    return imageCollection.web[index % imageCollection.web.length];
  } 
  
  if (readme.includes('api') || topics.includes('api') || repoName.includes('api')) {
    return imageCollection.backend[index % imageCollection.backend.length];
  }
  
  // Default technical/coding image if no specific match
  return imageCollection.generic[index % imageCollection.generic.length];
};

const ProjectsSection = () => {
  const { language } = useLanguage();

  const titles = {
    en: "Featured Projects",
    es: "Proyectos Destacados"
  };
  
  const loadingText = {
    en: "Loading projects...",
    es: "Cargando proyectos..."
  };
  
  const errorText = {
    en: "Error loading projects",
    es: "Error al cargar proyectos"
  };

  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['repos'],
    queryFn: fetchGithubRepos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const sectionTitle = titles[language];

  // Function to extract a short description from README if repository description is empty
  const getDescription = (repo: Repository) => {
    if (repo.description) return repo.description;
    
    if (repo.readme) {
      // Try to extract first paragraph from README that's not a heading
      const lines = repo.readme.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#') && trimmedLine.length > 15) {
          return trimmedLine.length > 150 ? trimmedLine.substring(0, 147) + '...' : trimmedLine;
        }
      }
    }
    
    return language === 'en' ? 'No description available' : 'No hay descripción disponible';
  };

  return (
    <section className="py-20" id="projects">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 gradient-text">{sectionTitle}</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>{loadingText[language]}</span>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            {errorText[language]}
          </div>
        ) : (
          <div className="bento-grid">
            {repos?.map((repo: Repository, index: number) => (
              <BentoCard
                key={repo.name}
                title={repo.name}
                description={getDescription(repo)}
                tags={repo.topics?.length > 0 ? repo.topics : [repo.language || 'Code']}
                featured={index < 2}
                imageUrl={getRepoImageUrl(repo, index)} // Pass index to get varied images
                link={repo.html_url}
                stars={repo.stargazers_count}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
