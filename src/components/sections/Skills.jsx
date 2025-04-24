import React, { useEffect, useRef } from 'react';
import Container from '../ui/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sectionVariants, itemLeftVariants, itemRightVariants, create3DTiltEffect } from '../../utils/animations';

const Skills = () => {
  const cardsRef = useRef([]);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.15,
    rootMargin: "-50px 0px",
  });
  
  // Apply 3D tilt effect to skill cards
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach(card => {
        if (card) {
          create3DTiltEffect(card, {
            max: 5,
            scale: 1.02,
            speed: 400
          });
        }
      });
    }
  }, []);

  const variants = sectionVariants;
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };

  const frontendSkills = [
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'Node.js', level: 95 },
    { name: 'MongoDB/NoSQL', level: 88 },
    { name: 'React.js/Redux', level: 85 },
    { name: 'GraphQL', level: 80 },
  ];

  const backendSkills = [
    { name: 'AWS Cloud Services', level: 92 },
    { name: 'Serverless Architecture', level: 90 },
    { name: 'Infrastructure as Code', level: 85 },
    { name: 'CI/CD Pipelines', level: 88 },
    { name: 'System Design & Architecture', level: 86 },
    { name: 'Cloud Security Implementation', level: 89 },
    { name: 'VPC Configuration & Security', level: 87 },
  ];

  const tools = [
    { name: 'AWS AppSync', level: 85 },
    { name: 'Lambda Functions', level: 90 },
    { name: 'AWS Cognito', level: 88 },
    { name: 'Terraform/CloudFormation', level: 86 },
    { name: 'Express.js', level: 92 },
    { name: 'RESTful API Design', level: 90 },
    { name: 'Microservices Architecture', level: 84 },
  ];

  const renderSkill = (skill, index) => (
    <motion.div 
      key={skill.name} 
      variants={itemVariants}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
        <span className="text-primary-600 dark:text-primary-400 font-medium">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Animated code background for backend & cloud role */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        {/* Backend server animation elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary-500 rounded-full server-pulse" style={{ "--blink-delay": "0.2s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary-500 rounded-full server-pulse" style={{ "--blink-delay": "0.5s" }}></div>
        <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-primary-500 rounded-full server-pulse" style={{ "--blink-delay": "0.8s" }}></div>
        
        {/* Cloud connection points */}
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-secondary-500 rounded-full server-pulse" style={{ "--blink-delay": "0.3s" }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-secondary-500 rounded-full server-pulse" style={{ "--blink-delay": "0.6s" }}></div>
        <div className="absolute bottom-1/4 right-20 w-2 h-2 bg-secondary-500 rounded-full server-pulse" style={{ "--blink-delay": "0.9s" }}></div>
        
        {/* Connection lines with data flow animation */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <line x1="12%" y1="25%" x2="88%" y2="25%" className="data-flow" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
          <line x1="25%" y1="50%" x2="75%" y2="50%" className="data-flow" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
          <line x1="20%" y1="75%" x2="80%" y2="75%" className="data-flow" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
        </svg>
        
        {/* Server rack visualization */}
        <div className="absolute bottom-10 left-10 opacity-10 dark:opacity-20 server-rack">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <rect x="20" y="10" width="60" height="80" rx="2" fill="currentColor" className="text-primary-800 dark:text-primary-400" />
            <rect x="25" y="15" width="50" height="10" rx="1" fill="currentColor" className="text-gray-700 dark:text-gray-300" />
            <circle cx="30" cy="20" r="2" className="text-primary-500 server-led" style={{ "--blink-delay": "0.2s" }} />
            
            <rect x="25" y="30" width="50" height="10" rx="1" fill="currentColor" className="text-gray-700 dark:text-gray-300" />
            <circle cx="30" cy="35" r="2" className="text-primary-500 server-led" style={{ "--blink-delay": "0.5s" }} />
            
            <rect x="25" y="45" width="50" height="10" rx="1" fill="currentColor" className="text-gray-700 dark:text-gray-300" />
            <circle cx="30" cy="50" r="2" className="text-primary-500 server-led" style={{ "--blink-delay": "0.8s" }} />
            
            <rect x="25" y="60" width="50" height="10" rx="1" fill="currentColor" className="text-gray-700 dark:text-gray-300" />
            <circle cx="30" cy="65" r="2" className="text-primary-500 server-led" style={{ "--blink-delay": "1.1s" }} />
            
            <rect x="25" y="75" width="50" height="10" rx="1" fill="currentColor" className="text-gray-700 dark:text-gray-300" />
            <circle cx="30" cy="80" r="2" className="text-primary-500 server-led" style={{ "--blink-delay": "1.4s" }} />
          </svg>
        </div>
        
        {/* Cloud architecture visualization */}
        <div className="absolute top-10 right-10 opacity-10 dark:opacity-20 cloud-float">
          <svg width="120" height="100" viewBox="0 0 120 100">
            <path d="M 30 50 C 30 40, 40 30, 50 30 C 55 20, 70 20, 75 30 C 85 25, 100 35, 95 50 C 105 55, 100 75, 90 75 C 90 80, 80 85, 75 80 C 70 85, 55 85, 50 80 C 45 85, 30 80, 30 70 C 20 65, 20 55, 30 50" 
                  fill="currentColor" className="text-secondary-500/40 dark:text-secondary-400/40" />
            <circle cx="50" cy="50" r="3" className="text-secondary-600 database-pulse" />
            <circle cx="70" cy="45" r="3" className="text-secondary-600 database-pulse" style={{ "animationDelay": "0.5s" }} />
            <circle cx="60" cy="60" r="3" className="text-secondary-600 database-pulse" style={{ "animationDelay": "1s" }} />
          </svg>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
          <pre className="text-xs md:text-sm text-primary-800 dark:text-primary-400 font-mono typing-animation">
{`// Backend API setup with Node.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive'] }
});

// Middleware
app.use(express.json());
app.use(helmet());

// Routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
          </pre>
          <pre className="text-xs md:text-sm text-secondary-800 dark:text-secondary-400 font-mono typing-animation">
{`# Terraform AWS Infrastructure
provider "aws" {
  region = "us-east-1"
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
  }
}

# Subnet Configuration
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  
  tags = {
    Name = "private-subnet"
  }
}

# Security Group
resource "aws_security_group" "api_sg" {
  name        = "api-sg"
  description = "Security group for API"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Lambda Function
resource "aws_lambda_function" "api" {
  function_name = "api-handler"
  handler       = "index.handler"
  runtime       = "nodejs16.x"
  role          = aws_iam_role.lambda_role.arn
  
  environment {
    variables = {
      MONGODB_URI = var.mongodb_uri
    }
  }
}`}
          </pre>
        </div>
      </div>
      <Container>
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            My <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I've acquired specialized skills throughout my journey as a <span className="text-primary-600 dark:text-primary-400">Backend Developer</span> and 
            <span className="text-secondary-600 dark:text-secondary-400"> Cloud Architect</span>. Here's my technical expertise in building scalable, secure systems.
          </motion.p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 stagger-on-scroll px-4 sm:px-6"
        >
          {/* Core Technical Skills with Apple-style animations */}
          <div 
            ref={el => cardsRef.current[0] = el}
            className="card card-3d hover:border-primary-500 dark:hover:border-primary-400 transition-colors relative overflow-hidden parallax-slow scroll-animate-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-primary-100 to-transparent dark:from-primary-900/10 dark:to-transparent rounded-full -mr-16 -mt-16 opacity-70"></div>
            <div className="flex items-center mb-6 space-x-3 relative z-10">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-600 dark:text-primary-400 shadow-sm server-element">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Core Technical Skills</h3>
            </div>
            <div className="space-y-4 staggered-container">
              {frontendSkills.map((skill, index) => (
                <div key={skill.name} className="stagger-item">
                  {renderSkill(skill, index)}
                </div>
              ))}
            </div>
          </div>

          {/* Cloud & Architecture Skills with Apple-style animations */}
          <div 
            ref={el => cardsRef.current[1] = el}
            className="card card-3d hover:border-secondary-500 dark:hover:border-secondary-400 transition-colors relative overflow-hidden stagger-on-scroll"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-secondary-100 to-transparent dark:from-secondary-900/10 dark:to-transparent rounded-full -mr-16 -mt-16 opacity-70 cloud-element"></div>
            <div className="flex items-center mb-6 space-x-3 relative z-10">
              <div className="p-2 rounded-lg bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/30 dark:to-secondary-800/30 text-secondary-600 dark:text-secondary-400 shadow-sm cloud-element">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cloud & Architecture</h3>
            </div>
            <div className="space-y-4 staggered-container">
              {backendSkills.map((skill, index) => (
                <div key={skill.name} className="stagger-item">
                  {renderSkill(skill, index)}
                </div>
              ))}
            </div>
            
            {/* Cloud architecture mini diagram */}
            <div className="absolute bottom-2 right-2 opacity-20 h-20 w-20 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M 30 50 C 30 40, 40 30, 50 30 C 55 20, 70 20, 75 30 C 85 25, 100 35, 95 50 C 105 55, 100 75, 90 75 C 90 80, 80 85, 75 80 C 70 85, 55 85, 50 80 C 45 85, 30 80, 30 70 C 20 65, 20 55, 30 50" 
                      fill="currentColor" className="text-secondary-500/40 dark:text-secondary-400/40" />
              </svg>
            </div>
          </div>

          {/* AWS & Framework Tools with Apple-style animations */}
          <div 
            ref={el => cardsRef.current[2] = el}
            className="card card-3d hover:border-primary-500 dark:hover:border-primary-400 transition-colors relative overflow-hidden parallax-medium scroll-animate-right"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-primary-100 to-transparent dark:from-primary-900/10 dark:to-transparent rounded-full -mr-16 -mt-16 opacity-70"></div>
            <div className="flex items-center mb-6 space-x-3 relative z-10">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-600 dark:text-primary-400 shadow-sm server-element">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">AWS & Framework Tools</h3>
            </div>
            <div className="space-y-4 staggered-container">
              {tools.map((skill, index) => (
                <div key={skill.name} className="stagger-item">
                  {renderSkill(skill, index)}
                </div>
              ))}
            </div>
            
            {/* Server rack mini visualization */}
            <div className="absolute bottom-2 right-2 opacity-20 h-20 w-20 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="30" y="20" width="40" height="60" rx="2" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-600 dark:text-primary-500" />
                <rect x="35" y="25" width="30" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-600 dark:text-primary-500" />
                <rect x="35" y="38" width="30" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-600 dark:text-primary-500" />
                <rect x="35" y="51" width="30" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-600 dark:text-primary-500" />
                <rect x="35" y="64" width="30" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-600 dark:text-primary-500" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Skills;