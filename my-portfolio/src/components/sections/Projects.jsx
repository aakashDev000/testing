import React, { useState } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ServerAnimation from '../ui/ServerAnimation';
import DevOpsAnimation from '../ui/DevOpsAnimation';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const projects = [
    {
      id: 1,
      title: 'Univo Medical Trial Platform',
      category: 'web',
      description: 'Architected HIPAA-compliant medical trial management system using AWS AppSync and GraphQL, reducing data processing time by 40%. Implemented multi-layered security with isolated VPC subnets, NACLs, and security groups.',
      technologies: ['AWS AppSync', 'GraphQL', 'Terraform', 'VPC Security', 'MongoDB', 'HIPAA Compliance'],
      image: 'project-placeholder.jpg',
    },
    {
      id: 2,
      title: 'Adverra Document Processing Platform',
      category: 'web',
      description: 'Engineered AI-powered document extraction solution processing 10,000+ documents daily with 95% accuracy using LangGraph for multi-agent orchestration. Designed secure architecture with containerized services on ECS.',
      technologies: ['AWS ECS', 'LangGraph', 'AI Integration', 'VPC Security', 'CI/CD', 'Microservices'],
      image: 'project-placeholder.jpg',
    },
    {
      id: 3,
      title: 'Platform Architecture Framework',
      category: 'api',
      description: 'Designed centralized architecture framework enabling seamless integration between microservices. Implemented event-driven patterns with SQS/SNS for asynchronous communication and created standardized API gateway with custom authorizers.',
      technologies: ['AWS API Gateway', 'SQS/SNS', 'Event-Driven', 'Serverless', 'Lambda', 'CloudFormation'],
      image: 'project-placeholder.jpg',
    },
    {
      id: 4,
      title: 'Enterprise Resource Planning Platform',
      category: 'web',
      description: 'Developed modular Node.js/Express microservices architecture for scalable ERP system. Deployed AWS Cognito with role-based access control for 500+ users and optimized MongoDB with sharding strategies.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'AWS Cognito', 'Microservices', 'RESTful APIs'],
      image: 'project-placeholder.jpg',
    },
    {
      id: 5,
      title: 'Customer Portal Application',
      category: 'web',
      description: 'Contributed to full-stack development using React/Redux for frontend and Node.js for backend API services. Configured AWS resources including EC2, S3, and CloudFront for application hosting and content delivery.',
      technologies: ['React/Redux', 'Node.js', 'AWS EC2', 'S3', 'CloudFront', 'Security Groups'],
      image: 'project-placeholder.jpg',
    },
    {
      id: 6,
      title: 'Secure API Authorization System',
      category: 'api',
      description: 'Built enterprise-grade API authorization system with multi-tenant support implementing OAuth 2.0 and JWT token validation. Created custom Cognito authorizers with fine-grained permission controls and comprehensive audit logging.',
      technologies: ['AWS Cognito', 'OAuth 2.0', 'JWT', 'Lambda Authorizers', 'IAM', 'CloudTrail'],
      image: 'project-placeholder.jpg',
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Backend & Cloud' },
    { key: 'api', label: 'API & Serverless' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Dynamic Backend & Cloud Architecture Animation Background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.015] dark:opacity-[0.025] pointer-events-none">
        {/* Add advanced server animation */}
        <div className="absolute bottom-0 right-0 w-96 h-64 opacity-50 dark:opacity-70">
          <ServerAnimation width={300} height={200} />
        </div>
        
        {/* Add DevOps animation to top left - more visible but elegant */}
        <div className="absolute top-0 left-0 w-96 h-64 opacity-40 dark:opacity-50">
          <DevOpsAnimation />
        </div>
        <div className="absolute -right-20 top-40 rotate-12 opacity-60 dark:opacity-30">
          <pre className="text-[8px] sm:text-xs text-primary-800 dark:text-primary-400 font-mono">
{`// Cloud infrastructure code
module.exports = {
  deployAwsResources: async () => {
    const resources = await cloudformation.createStack({
      StackName: 'backend-infra',
      TemplateBody: JSON.stringify(template),
      Parameters: [
        { ParameterKey: 'Environment', ParameterValue: 'production' }
      ],
      Capabilities: ['CAPABILITY_IAM']
    }).promise();
    
    console.log('Deployment successful');
    return resources;
  }
};`}
          </pre>
        </div>
        <div className="absolute -left-10 bottom-40 -rotate-12 opacity-60 dark:opacity-30">
          <pre className="text-[8px] sm:text-xs text-secondary-800 dark:text-secondary-400 font-mono">
{`// API Gateway setup
const createApiGateway = () => {
  const apiGateway = new AWS.ApiGatewayV2({
    apiVersion: '2018-11-29',
    region: 'us-east-1'
  });
  
  return apiGateway.createApi({
    Name: 'rest-api',
    ProtocolType: 'HTTP',
    CorsConfiguration: {
      AllowOrigins: ['*'],
      AllowMethods: ['POST', 'GET', 'PUT', 'DELETE']
    }
  }).promise();
};`}
          </pre>
        </div>
      </div>
      <Container>
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my recent projects showcasing my expertise in <span className="text-primary-600 dark:text-primary-400">backend development</span>, 
            <span className="text-secondary-600 dark:text-secondary-400"> cloud architecture</span>, and secure infrastructure design.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl px-4 sm:px-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="project-card-container h-full"
            >
              <motion.div 
                className="project-card card-3d bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:-translate-y-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-primary-500 after:to-secondary-500 after:opacity-0 after:group-hover:opacity-100 after:transition-opacity h-full flex flex-col"
                whileHover={{
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                  z: 20,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                {/* Project Image */}
                <div className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
                  {/* Project visualization with architecture components */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary-500/20 to-secondary-500/20 p-4">
                    {/* Cloud architecture mini-diagram */}
                    <svg className="w-full h-full architecture-diagram" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                      {/* Base grid */}
                      <pattern id={`grid-${project.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-gray-300 dark:text-gray-600" />
                      </pattern>
                      <rect width="200" height="100" fill={`url(#grid-${project.id})`} />
                      
                      {/* Project specific architecture elements with animated data flow */}
                      {project.id === 1 && (
                        <>
                          {/* Medical Trial Platform - HIPAA Compliant */}
                          <rect x="50" y="20" width="100" height="15" rx="3" fill="currentColor" className="text-secondary-500/40 dark:text-secondary-500/30 server-element" />
                          <text x="100" y="30" fontSize="7" textAnchor="middle" className="text-secondary-800 dark:text-secondary-300 font-mono">AWS AppSync / GraphQL</text>
                          
                          <rect x="30" y="45" width="40" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30 server-element" style={{"--server-delay": "0.1s"}} />
                          <text x="50" y="55" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">Lambda</text>
                          
                          <rect x="80" y="45" width="40" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30 server-element" style={{"--server-delay": "0.2s"}} />
                          <text x="100" y="55" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">MongoDB</text>
                          
                          <rect x="130" y="45" width="40" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30 server-element" style={{"--server-delay": "0.3s"}} />
                          <text x="150" y="55" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">S3</text>
                          
                          <rect x="50" y="70" width="100" height="15" rx="3" fill="currentColor" className="text-secondary-500/40 dark:text-secondary-500/30 server-element" style={{"--server-delay": "0.4s"}} />
                          <text x="100" y="80" fontSize="7" textAnchor="middle" className="text-secondary-800 dark:text-secondary-300 font-mono">Terraform Infrastructure</text>
                          
                          {/* Animated data flow paths */}
                          <path d="M 100 35 L 100 45" stroke="currentColor" strokeWidth="0.8" className="text-primary-500 dark:text-primary-400 data-flow-path" />
                          <path d="M 100 60 L 100 70" stroke="currentColor" strokeWidth="0.8" className="text-primary-500 dark:text-primary-400 data-flow-path" />
                          <path d="M 50 52 L 80 52" stroke="currentColor" strokeWidth="0.8" className="text-primary-500 dark:text-primary-400 data-flow-path" />
                          <path d="M 120 52 L 130 52" stroke="currentColor" strokeWidth="0.8" className="text-primary-500 dark:text-primary-400 data-flow-path" />
                          
                          {/* Data flow animation dots */}
                          <circle cx="100" cy="35" className="text-primary-500 dark:text-primary-400 data-flow-dot" style={{"--flow-x": "0", "--flow-y": "10"}} />
                          <circle cx="50" cy="52" className="text-primary-500 dark:text-primary-400 data-flow-dot" style={{"--flow-x": "30", "--flow-y": "0"}} />
                          <circle cx="120" cy="52" className="text-primary-500 dark:text-primary-400 data-flow-dot" style={{"--flow-x": "10", "--flow-y": "0"}} />
                          <circle cx="100" cy="60" className="text-primary-500 dark:text-primary-400 data-flow-dot" style={{"--flow-x": "0", "--flow-y": "10"}} />
                        </>
                      )}
                      
                      {project.id === 2 && (
                        <>
                          {/* Document Processing Platform with cloud architecture animations */}
                          <rect x="50" y="20" width="100" height="15" rx="3" fill="currentColor" className="text-secondary-500/40 dark:text-secondary-500/30 cloud-element" />
                          <text x="100" y="30" fontSize="7" textAnchor="middle" className="text-secondary-800 dark:text-secondary-300 font-mono">ECS Container Services</text>
                          
                          <rect x="20" y="45" width="40" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30 cloud-element" style={{"--cloud-delay": "0.1s"}} />
                          <text x="40" y="55" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">AI Model</text>
                          
                          <rect x="70" y="45" width="60" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30 cloud-element" style={{"--cloud-delay": "0.2s"}} />
                          <text x="100" y="55" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">Document Parser</text>
                          
                          <rect x="140" y="45" width="40" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30 cloud-element" style={{"--cloud-delay": "0.3s"}} />
                          <text x="160" y="55" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">S3 Storage</text>
                          
                          <rect x="50" y="70" width="100" height="15" rx="3" fill="currentColor" className="text-secondary-500/40 dark:text-secondary-500/30 cloud-element" style={{"--cloud-delay": "0.4s"}} />
                          <text x="100" y="80" fontSize="7" textAnchor="middle" className="text-secondary-800 dark:text-secondary-300 font-mono">Secure VPC Network</text>
                          
                          {/* Animated data flow paths */}
                          <path d="M 100 35 L 100 45" stroke="currentColor" strokeWidth="1" className="text-secondary-500 dark:text-secondary-400 data-flow-path" />
                          <path d="M 100 60 L 100 70" stroke="currentColor" strokeWidth="1" className="text-secondary-500 dark:text-secondary-400 data-flow-path" />
                          <path d="M 40 52 L 70 52" stroke="currentColor" strokeWidth="1" className="text-secondary-500 dark:text-secondary-400 data-flow-path" />
                          <path d="M 130 52 L 140 52" stroke="currentColor" strokeWidth="1" className="text-secondary-500 dark:text-secondary-400 data-flow-path" />
                          
                          {/* Document processing animation elements */}
                          <circle cx="40" cy="45" r="3" className="text-secondary-500 dark:text-secondary-400 server-led" style={{"--blink-delay": "0.5s"}} />
                          <circle cx="100" cy="45" r="3" className="text-secondary-500 dark:text-secondary-400 server-led" style={{"--blink-delay": "1.0s"}} />
                          <circle cx="160" cy="45" r="3" className="text-secondary-500 dark:text-secondary-400 server-led" style={{"--blink-delay": "1.5s"}} />
                          
                          {/* Data stream animation */}
                          <path d="M 40 60 C 60 65, 80 55, 100 60 C 120 65, 140 55, 160 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary-500/50 dark:text-secondary-400/50 data-flow" />
                        </>
                      )}
                      
                      {project.id > 2 && (
                        <>
                          {/* Generic cloud architecture diagram for other projects */}
                          <rect x="70" y="10" width="60" height="15" rx="3" fill="currentColor" className="text-secondary-500/40 dark:text-secondary-500/30" />
                          <text x="100" y="20" fontSize="7" textAnchor="middle" className="text-secondary-800 dark:text-secondary-300 font-mono">API Gateway</text>
                          
                          <rect x="40" y="35" width="40" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30" />
                          <text x="60" y="45" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">Lambda</text>
                          
                          <rect x="120" y="35" width="40" height="15" rx="3" fill="currentColor" className="text-primary-500/40 dark:text-primary-500/30" />
                          <text x="140" y="45" fontSize="6" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-mono">DynamoDB</text>
                          
                          <rect x="30" y="75" width="140" height="15" rx="3" fill="currentColor" className="text-secondary-500/40 dark:text-secondary-500/30" />
                          <text x="100" y="85" fontSize="7" textAnchor="middle" className="text-secondary-800 dark:text-secondary-300 font-mono">Cloud Infrastructure</text>
                          
                          <path d="M 50 60 Q 50 50 60 50 H 140 Q 150 50 150 60 Q 150 70 140 70 H 60 Q 50 70 50 60" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gray-500 dark:text-gray-400" />
                          <text x="100" y="63" fontSize="6" textAnchor="middle" className="text-gray-700 dark:text-gray-300 font-mono">VPC Network</text>
                          
                          {/* Connection lines */}
                          <line x1="60" y1="50" x2="60" y2="60" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2" className="text-gray-500 dark:text-gray-400" />
                          <line x1="140" y1="50" x2="140" y2="60" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2" className="text-gray-500 dark:text-gray-400" />
                          <line x1="100" y1="25" x2="60" y2="35" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2" className="text-gray-500 dark:text-gray-400" />
                          <line x1="100" y1="25" x2="140" y2="35" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2" className="text-gray-500 dark:text-gray-400" />
                          <line x1="100" y1="70" x2="100" y2="75" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2" className="text-gray-500 dark:text-gray-400" />
                        </>
                      )}
                      
                      {/* Project Label */}
                      <circle cx="25" cy="85" r="12" fill="currentColor" className="text-primary-500/30 dark:text-primary-600/30" />
                      <text x="25" y="88" fontSize="12" textAnchor="middle" className="text-primary-800 dark:text-primary-300 font-bold">
                        {project.title.substring(0, 1)}
                      </text>
                    </svg>
                  </div>
                  
                  {/* Hover overlay gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 dark:from-primary-900/30 dark:to-primary-800/30 dark:text-primary-400 border border-primary-200 dark:border-primary-800/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
      </Container>
    </section>
  );
};

export default Projects;