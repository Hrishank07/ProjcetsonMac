import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  projectUrl: string;
  githubUrl: string;
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  technologies,
  projectUrl,
  githubUrl,
}: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <Link
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            Live Demo →
          </Link>
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            GitHub →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 