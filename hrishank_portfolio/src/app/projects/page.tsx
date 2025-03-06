import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: 'Project 1',
    description: 'A full-stack web application built with React and Node.js.',
    imageUrl: '/project1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    projectUrl: 'https://project1.com',
    githubUrl: 'https://github.com/yourusername/project1',
  },
  {
    title: 'Project 2',
    description: 'A responsive e-commerce platform with modern UI/UX.',
    imageUrl: '/project2.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    projectUrl: 'https://project2.com',
    githubUrl: 'https://github.com/yourusername/project2',
  },
  // Add more projects here
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 animate-fade-in">
          Projects
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                {/* Add image here once available */}
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.projectUrl}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
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
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 