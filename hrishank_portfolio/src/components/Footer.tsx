import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/yourusername' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', href: 'https://twitter.com/yourusername' },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <span className="sr-only">{item.name}</span>
                {item.name}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hrishank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 