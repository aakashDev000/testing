import React, { useEffect, useRef } from 'react';
import Container from '../ui/Container';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sectionVariants, itemLeftVariants, itemRightVariants, create3DTiltEffect } from '../../utils/animations';

const About = () => {
  const imageDivRef = useRef(null);
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.15,
    rootMargin: "-50px 0px",
  });
  
  // Apply subtle 3D tilt to the image
  useEffect(() => {
    if (imageDivRef.current) {
      create3DTiltEffect(imageDivRef.current, {
        max: 3,  // subtle tilt
        perspective: 1200,
        scale: 1.01,
        speed: 700
      });
    }
  }, []);

  const variants = sectionVariants;
  
  // Use improved, optimized animations from our utils
  const leftItemVariants = itemLeftVariants;
  const rightItemVariants = itemRightVariants;

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark">
      <Container>
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mx-auto max-w-7xl px-4 sm:px-6"
        >
          {/* Image Side */}
          <div className="relative scroll-animate-left">
            <div ref={imageDivRef} className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 transform rotate-3"></div>
              <div className="absolute inset-0 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transform -rotate-3"></div>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-card p-4">
                {/* Cloud architecture diagram showing your role */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* SVG Cloud Architecture Diagram */}
                  <svg viewBox="0 0 400 400" className="w-full h-full p-4">
                    {/* Background grid */}
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-800" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Cloud outline */}
                    <path d="M 80 120 Q 50 120 50 150 Q 20 150 20 180 Q 20 210 50 210 L 350 210 Q 380 210 380 180 Q 380 150 350 150 Q 350 120 320 120 L 80 120" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary-500 dark:text-secondary-400" />
                    
                    {/* AWS Icons */}
                    {/* Lambda */}
                    <rect x="70" y="150" width="50" height="40" rx="4" fill="currentColor" className="text-secondary-200 dark:text-secondary-900" />
                    <text x="95" y="175" textAnchor="middle" className="text-[10px] font-mono text-secondary-800 dark:text-secondary-300">λ</text>
                    <text x="95" y="195" textAnchor="middle" className="text-[8px] font-mono text-gray-700 dark:text-gray-300">Lambda</text>
                    
                    {/* DynamoDB */}
                    <rect x="150" y="150" width="50" height="40" rx="4" fill="currentColor" className="text-secondary-200 dark:text-secondary-900" />
                    <text x="175" y="175" textAnchor="middle" className="text-[10px] font-mono text-secondary-800 dark:text-secondary-300">DB</text>
                    <text x="175" y="195" textAnchor="middle" className="text-[8px] font-mono text-gray-700 dark:text-gray-300">DynamoDB</text>
                    
                    {/* S3 */}
                    <rect x="230" y="150" width="50" height="40" rx="4" fill="currentColor" className="text-secondary-200 dark:text-secondary-900" />
                    <text x="255" y="175" textAnchor="middle" className="text-[10px] font-mono text-secondary-800 dark:text-secondary-300">S3</text>
                    <text x="255" y="195" textAnchor="middle" className="text-[8px] font-mono text-gray-700 dark:text-gray-300">Storage</text>
                    
                    {/* CloudWatch */}
                    <rect x="310" y="150" width="50" height="40" rx="4" fill="currentColor" className="text-secondary-200 dark:text-secondary-900" />
                    <text x="335" y="175" textAnchor="middle" className="text-[10px] font-mono text-secondary-800 dark:text-secondary-300">CW</text>
                    <text x="335" y="195" textAnchor="middle" className="text-[8px] font-mono text-gray-700 dark:text-gray-300">Logging</text>
                    
                    {/* API Gateway */}
                    <rect x="200" y="80" width="80" height="30" rx="4" fill="currentColor" className="text-primary-200 dark:text-primary-900" />
                    <text x="240" y="100" textAnchor="middle" className="text-[10px] font-mono text-primary-800 dark:text-primary-300">API Gateway</text>
                    
                    {/* VPC */}
                    <rect x="100" y="240" width="200" height="30" rx="4" fill="currentColor" className="text-primary-200 dark:text-primary-900" />
                    <text x="200" y="260" textAnchor="middle" className="text-[10px] font-mono text-primary-800 dark:text-primary-300">Virtual Private Cloud (VPC)</text>
                    
                    {/* EC2 */}
                    <rect x="150" y="290" width="100" height="30" rx="4" fill="currentColor" className="text-primary-200 dark:text-primary-900" />
                    <text x="200" y="310" textAnchor="middle" className="text-[10px] font-mono text-primary-800 dark:text-primary-300">Node.js Backend</text>
                    
                    {/* Connection lines */}
                    <line x1="240" y1="110" x2="240" y2="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-gray-500 dark:text-gray-400" />
                    <line x1="200" y1="240" x2="200" y2="290" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-gray-500 dark:text-gray-400" />
                    <line x1="95" y1="190" x2="95" y2="240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-gray-500 dark:text-gray-400" />
                    <line x1="175" y1="190" x2="175" y2="240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-gray-500 dark:text-gray-400" />
                    <line x1="255" y1="190" x2="255" y2="240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-gray-500 dark:text-gray-400" />
                    <line x1="335" y1="190" x2="335" y2="240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-gray-500 dark:text-gray-400" />
                    
                    {/* Client */}
                    <rect x="140" y="20" width="120" height="30" rx="15" fill="currentColor" className="text-gray-200 dark:text-gray-800" />
                    <text x="200" y="40" textAnchor="middle" className="text-[10px] font-mono text-gray-700 dark:text-gray-300">Client Applications</text>
                    <line x1="200" y1="50" x2="200" y2="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4" className="text-gray-500 dark:text-gray-400" />
                    
                    {/* Developer icon - you */}
                    <circle cx="50" cy="285" r="20" fill="currentColor" className="text-primary-500 dark:text-primary-700" />
                    <text x="50" y="290" textAnchor="middle" className="text-[14px] font-mono font-bold text-white">A</text>
                    <text x="50" y="320" textAnchor="middle" className="text-[8px] font-mono text-gray-700 dark:text-gray-300">Backend Developer</text>
                    <text x="50" y="330" textAnchor="middle" className="text-[8px] font-mono text-gray-700 dark:text-gray-300">& Cloud Architect</text>
                    
                    <line x1="70" y1="285" x2="140" y2="285" stroke="currentColor" strokeWidth="1.5" className="text-primary-500 dark:text-primary-400" />
                    <line x1="70" y1="285" x2="100" y2="255" stroke="currentColor" strokeWidth="1.5" className="text-primary-500 dark:text-primary-400" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Experience badge */}
            <div className="absolute top-4 right-4 md:-right-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-800 stagger-on-scroll">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years of Experience</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="scroll-animate-right px-4 md:px-6">
            <h2 className="section-heading mb-8">
              About Me
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
              <span className="gradient-text">Backend Developer & Cloud Architect</span> Engineer
            </h3>
            <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p className="mb-6">
                Hello! I'm Aakash, a <strong className="text-primary-600 dark:text-primary-400">Backend Developer</strong> and <strong className="text-secondary-600 dark:text-secondary-400">Cloud Solutions Architect</strong> with 3 years of hands-on experience in enterprise systems and cloud infrastructure. I specialize in Node.js backend development and AWS cloud architecture with expertise in serverless solutions.
              </p>
              <p className="mb-6">
                My technical expertise includes implementing secure cloud systems using <span className="text-secondary-600 dark:text-secondary-400">Terraform</span> and <span className="text-secondary-600 dark:text-secondary-400">CloudFormation</span>, configuring VPCs with private subnets and security groups, and designing scalable <span className="text-primary-600 dark:text-primary-400">MongoDB</span> database architectures. I excel at building robust backend services that power modern applications.
              </p>
              <p className="mb-6">
                With an Electronics and Communication Engineering background from Shreenivasa Engineering College, I bring a systematic approach to software development that prioritizes security and performance. I'm passionate about delivering high-performance, secure cloud solutions aligned with business objectives.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 stagger-on-scroll">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-center items-center h-24">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-center items-center h-24">
                <div className="text-3xl font-bold gradient-text">7.9</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">CGPA</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-center items-center h-24">
                <div className="text-3xl font-bold gradient-text">3+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-center items-center h-24">
                <div className="text-3xl font-bold gradient-text">99%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;