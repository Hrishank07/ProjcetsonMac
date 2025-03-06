const education = [
  {
    school: 'University of Southern California',
    degree: 'Master of Science in Engineering Management',
    minor: 'Minor in Business Analytics from USC Marshall School of Business',
    location: 'Los Angeles, CA',
    date: 'Dec 2025',
    gpa: 'GPA 3.85',
    details: 'Relevant Subjects: Statistics for Engineering Managers, Applied Time Series Analysis for Forecasting, Data Warehousing Business Intelligence and Data Mining, Designing Spreadsheet-Based Business Models, Driving Business Transformation with GenAI and ML'
  },
  {
    school: 'MIT World Peace University',
    degree: 'B. Tech in Electrical and Electronic Engineering',
    location: 'Pune, India',
    date: 'Aug 2023',
    details: 'Relevant Subjects: Intro to Python, Optimization Techniques, Machine Learning Techniques, DBMS, Intro to Cloud Computing'
  }
];

const skills = [
  {
    category: 'Technical Skills',
    items: ['Python', 'SQL', 'R', 'Java', 'Excel', 'PowerBI', 'Tableau', 'ETL Pipelines (Hadoop, Spark)', 'Automation Anywhere 360 (AA360)', 'MS Azure Cognitive Services', 'Machine Learning (TensorFlow, PyTorch)', 'GPT-3.5', 'NumPy', 'Scikit-learn', 'Flask', 'Git/GitHub', 'REST API', 'Postman'],
  },
  {
    category: 'Soft Skills',
    items: ['Problem-Solving', 'Strategic Decision-Making', 'Cross-Functional Collaboration', 'Process Optimization', 'Leadership'],
  }
];

const workExperience = [
  {
    company: '10x15 Revenue Solutions',
    role: 'Data Science Intern - Business Process Analyst',
    location: 'India',
    date: 'Jan 2023-Aug 2023',
    achievements: [
      'Collaborated with cross-functional U.S. teams to develop data-driven pricing models for 3-star hotels, leveraging A/B testing, Python, SQL, and Scikit-learn, leading to a 20% improvement in pricing accuracy and enhanced strategic decision-making for revenue optimization.',
      'Designed and implemented a data analytics framework using ETL pipelines with Hadoop and Spark, restructuring data flow and improving processing efficiency across departments by automating regression analysis and data comparison processes with Python, Postman API, TensorFlow, and PyTorch, which reduced manual intervention by 40% and significantly enhanced operational efficiency.',
      'Developed dynamic dashboards in Tableau and Excel, integrating predictive analytics and data modeling techniques with NumPy to improve forecast accuracy by 25%. Streamlined reporting processes, reducing the planning cycle time by 20%, and contributed to $80K in revenue growth by delivering real-time insights to senior leadership.'
    ]
  },
  {
    company: 'RWTH International Academy',
    role: 'Data Analyst Intern - Research and Predictive Analytics',
    location: 'India',
    date: 'Sep 2022-Dec 2022',
    achievements: [
      'Analyzed sensor and telematic data from logistics trucks using Python, SQL, and Scikit-learn for data extraction and processing, applying statistical testing to identify trends and outliers, which improved predictive analytics and reduced delivery time variance by 15%.',
      'Built predictive time series models using techniques (NAIVE and SMAIVE), optimizing delivery routes by factoring in traffic patterns, fuel efficiency, and driver relaxation schedules. Utilized TensorFlow to refine route selection, leading to more efficient logistics operations and a 10% improvement in delivery reliability.',
      'Automated and developed custom real-time dashboards in Tableau, integrating key metrics like fuel consumption, traffic congestion, and driver compliance, which provided leadership with actionable insights and resulted in a 20% improvement in fleet management and overall supply chain efficiency.'
    ]
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 animate-fade-in">About Me</h1>
          
          <div className="prose prose-lg text-gray-600 dark:text-gray-300 mb-12 animate-fade-in">
            <p>
              Data Analyst Intern (USC MEM '25) with 1 year of hands-on experience in data management, process optimization, and cross-functional collaboration. Proficient in SQL (stored procedures, query optimization), Python, and data visualization tools (Power BI, Tableau) to develop data-driven solutions that enhance business performance. Adept at gathering and translating business requirements into scalable dashboards, QA validation plans, and ETL frameworks to ensure data accuracy and system reliability. Strong communicator with a proven track record of partnering with technical and non-technical stakeholders to drive process improvements and support decision-making.
            </p>
          </div>

          {/* Education Section */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">Education</h2>
          <div className="space-y-6 mb-12">
            {education.map((edu, index) => (
              <div 
                key={edu.school}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.school}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{edu.degree}</p>
                    {edu.minor && <p className="text-gray-600 dark:text-gray-400">{edu.minor}</p>}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{edu.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-400">{edu.location}</p>
                    <p className="text-gray-600 dark:text-gray-400">{edu.date}</p>
                    {edu.gpa && <p className="text-gray-600 dark:text-gray-400">{edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Work Experience Section */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">Work Experience</h2>
          <div className="space-y-6 mb-12">
            {workExperience.map((work, index) => (
              <div 
                key={work.company}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{work.company}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{work.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-400">{work.location}</p>
                    <p className="text-gray-600 dark:text-gray-400">{work.date}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {work.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm">{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillSet, index) => (
              <div 
                key={skillSet.category}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {skillSet.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillSet.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 