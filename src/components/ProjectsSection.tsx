
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
          const decodedContent = atob(readmeData.content);
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

// Helper function to get a themed image URL based on repository content
const getRepoImageUrl = (repo: Repository) => {
  // Default image if we can't determine a more specific one
  const defaultImage = `https://opengraph.githubassets.com/1/Itemt/${repo.name}`;
  
  // If no readme, return default
  if (!repo.readme) return defaultImage;
  
  const readme = repo.readme.toLowerCase();
  const topics = repo.topics?.map(t => t.toLowerCase()) || [];
  const repoName = repo.name.toLowerCase();
  
  // Check for specific technologies in readme or topics to determine image theme
  if (readme.includes('react') || topics.includes('react') || repoName.includes('react')) {
    return 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1000&auto=format&fit=crop';
  } else if (readme.includes('python') || topics.includes('python') || repoName.includes('python')) {
    return 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop';
  } else if (readme.includes('node') || topics.includes('node') || repoName.includes('node')) {
    return 'https://images.unsplash.com/photo-1539946309076-4daf2ea73899?q=80&w=1000&auto=format&fit=crop';
  } else if (readme.includes('typescript') || topics.includes('typescript') || repoName.includes('typescript')) {
    return 'https://images.unsplash.com/photo-1613490901527-33d1cfbbf0d9?q=80&w=1000&auto=format&fit=crop';
  } else if (readme.includes('docker') || topics.includes('docker') || repoName.includes('docker')) {
    return 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1000&auto=format&fit=crop';
  } else if (readme.includes('database') || readme.includes('sql') || topics.includes('database') || topics.includes('sql')) {
    return 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop';
  } else if (readme.includes('web') || topics.includes('web') || repoName.includes('web')) {
    return 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop';
  } else if (readme.includes('api') || topics.includes('api') || repoName.includes('api')) {
    return 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=1000&auto=format&fit=crop';
  }
  
  // If no specific match found, return the default GitHub image
  return defaultImage;
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
        <h2 className="text-3xl font-bold mb-8">{sectionTitle}</h2>
        
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
                imageUrl={getRepoImageUrl(repo)}
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
