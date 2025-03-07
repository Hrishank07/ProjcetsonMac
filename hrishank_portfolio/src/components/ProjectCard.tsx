import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  projectUrl: string;
  imageUrl?: string;
}

export default function ProjectCard({ title, description, technologies, projectUrl, imageUrl }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
        {/* Project image or placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-primary/30 to-primary/10 dark:from-primary/20 dark:to-primary/5 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary/70 dark:text-primary/50">{title.substring(0, 2).toUpperCase()}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-[#2A2A2A] text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={projectUrl}
          className="inline-flex items-center text-primary hover:text-primary/80 dark:hover:text-primary/90"
        >
          View Project
          <svg
            className="ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
} 