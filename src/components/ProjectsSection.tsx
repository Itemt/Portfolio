
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
  // If no repo information, return a generic coding image
  if (!repo) return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
  
  const defaultImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
  
  // Check repository content to determine the most relevant image
  const readme = repo.readme?.toLowerCase() || '';
  const topics = repo.topics?.map(t => t.toLowerCase()) || [];
  const repoName = repo.name.toLowerCase();
  const language = repo.language?.toLowerCase() || '';
  
  // Technology-specific images
  if (
    readme.includes('react') || 
    topics.includes('react') || 
    repoName.includes('react')
  ) {
    return 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop';
  } 
  
  if (
    readme.includes('python') || 
    topics.includes('python') || 
    repoName.includes('python') || 
    language === 'python'
  ) {
    return 'https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1000&auto=format&fit=crop';
  } 
  
  if (
    readme.includes('node') || 
    topics.includes('node') || 
    repoName.includes('node') ||
    language === 'javascript'
  ) {
    return 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1000&auto=format&fit=crop';
  } 
  
  if (
    readme.includes('typescript') || 
    topics.includes('typescript') || 
    repoName.includes('typescript') ||
    language === 'typescript'
  ) {
    return 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=1000&auto=format&fit=crop';
  } 
  
  if (
    readme.includes('docker') || 
    topics.includes('docker') || 
    repoName.includes('docker')
  ) {
    return 'https://images.unsplash.com/photo-1600267185393-e158a98703de?q=80&w=1000&auto=format&fit=crop';
  } 
  
  if (
    readme.includes('database') || 
    readme.includes('sql') || 
    topics.includes('database') || 
    topics.includes('sql')
  ) {
    return 'https://images.unsplash.com/photo-1654277041218-84424c78f0ae?q=80&w=1000&auto=format&fit=crop';
  } 
  
  if (
    readme.includes('.net') || 
    topics.includes('.net') || 
    repoName.includes('.net') ||
    language === 'c#'
  ) {
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop';
  }
  
  if (
    readme.includes('web') || 
    topics.includes('web') || 
    repoName.includes('web') ||
    language === 'html'
  ) {
    return 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=1000&auto=format&fit=crop';
  } 
  
  if (
    readme.includes('api') || 
    topics.includes('api') || 
    repoName.includes('api')
  ) {
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop';
  }
  
  // Default technical/coding image if no specific match
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
