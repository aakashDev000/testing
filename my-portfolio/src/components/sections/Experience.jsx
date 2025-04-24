import React, { useRef, useEffect } from "react";
import Container from "../ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import {
  sectionVariants,
  itemLeftVariants,
  itemRightVariants,
  fadeUpVariants,
  timelineScrollConfig,
} from "../../utils/animations";

const Experience = () => {
  // For parallax scroll effects
  const sectionRef = useRef(null);
  const { scrollPercentage } = useScrollPosition();

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.15,
    rootMargin: "-50px 0px",
  });

  // Premium scroll animations for timeline
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    ...timelineScrollConfig,
  });

  // Transform values for Apple-like animations
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Set up scroll-driven animations with optimized performance - faster animations
  useEffect(() => {
    if (!timelineRef.current) return;

    // Use requestAnimationFrame for better performance
    let rafId = null;

    // Calculate and set section heights for timelines
    const updateSectionHeights = () => {
      if (!timelineRef.current) return;

      const timelineEl = timelineRef.current;

      // Find the main dividers between sections
      const workSection = timelineEl.querySelector(".work-timeline-section");
      const educationSection = timelineEl.querySelector(
        ".education-timeline-section"
      );

      if (workSection && educationSection) {
        const workHeight = workSection.offsetHeight;
        const educationHeight = educationSection.offsetHeight;

        // Set css variables for section heights
        timelineEl.style.setProperty(
          "--work-section-height",
          `${workHeight}px`
        );
        timelineEl.style.setProperty(
          "--education-section-height",
          `${educationHeight}px`
        );
      }
    };

    const updateTimelineProgress = () => {
      if (!timelineRef.current) return;

      const timelineEl = timelineRef.current;
      const timelineDots = timelineEl.querySelectorAll(".timeline-dot");
      const timelineCards = timelineEl.querySelectorAll(".timeline-card");

      // Calculate how much of the timeline is in view - more sensitive calculation
      const rect = timelineEl.getBoundingClientRect();

      // Enhanced formula that makes the timeline progress faster as you scroll
      // Using a more aggressive calculation that reaches 100% earlier
      const viewportHeight = window.innerHeight;
      const timelineHeight = rect.height;
      const timelineTop = rect.top;

      // Smoother timeline progression with easing function
      let rawProgress =
        (viewportHeight - timelineTop) /
        (viewportHeight + timelineHeight * 0.6);

      // Apply easing function for smoother progression
      const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      // This makes the timeline fill up much faster but with smooth acceleration/deceleration
      const percentInView = Math.max(
        0,
        Math.min(1, 1.8 * easeInOut(rawProgress))
      );

      // Apply timeline progress as a custom property
      timelineEl.style.setProperty("--timeline-progress", percentInView);

      // Activate timeline dots and cards based on scroll - activate sooner
      // Distribute activations more evenly along scroll progress
      timelineDots.forEach((dot, index) => {
        // More sensitive threshold calculation
        const dotThreshold = index / (timelineDots.length * 1.2);

        if (percentInView > dotThreshold) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });

      timelineCards.forEach((card, index) => {
        // Earlier activation for cards
        const cardThreshold = index / (timelineCards.length * 1.2);

        if (percentInView > cardThreshold) {
          card.classList.add("active");
        }
      });
    };

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        updateTimelineProgress();
        rafId = null;
      });
    };

    // Calculate section heights on load and resize
    updateSectionHeights();
    window.addEventListener("resize", updateSectionHeights);

    window.addEventListener("scroll", onScroll, { passive: true });
    updateTimelineProgress(); // Initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSectionHeights);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Use predefined animation variants from utils/animations.js
  const containerVariants = sectionVariants;
  const itemVariants = fadeUpVariants;

  const experiences = [
    {
      company: "Ariveguru Technology Solution Private Limited",
      position: "Backend Developer & Cloud Solutions Architect",
      period: "May 2024 - Present",
      description:
        "Working on architecting HIPAA-compliant medical trial platform and AI-powered document processing solutions. Designing secure infrastructure with VPC configurations, optimizing MongoDB databases, and implementing CI/CD pipelines with AWS services.",
      technologies: [
        "Node.js",
        "AWS AppSync",
        "GraphQL",
        "Terraform",
        "CloudFormation",
        "MongoDB",
      ],
    },
    {
      company: "GAE Projects Private Limited",
      position: "Backend Developer",
      period: "Aug 2022 - April 2024",
      description:
        "Developed modular Node.js/Express microservices for enterprise ERP system. Implemented secure user authentication with AWS Cognito supporting 500+ users. Engineered RESTful APIs with validation and optimized MongoDB database architecture with sharding strategies.",
      technologies: [
        "Node.js",
        "Express",
        "AWS Cognito",
        "MongoDB",
        "RESTful APIs",
        "React/Redux",
      ],
    },
  ];

  const education = [
    {
      company: "Shreenivasa Engineering College",
      position: "B.E Electronics And Communication Engineering",
      period: "2018 - 2022",
      description:
        "Completed my undergraduate studies with a strong focus on engineering principles and problem-solving. Developed strong foundational knowledge in electronics systems design and programming concepts.",
      technologies: ["CGPA: 7.9"],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 bg-white dark:bg-dark relative overflow-hidden"
    >
      {/* Background code lines animation - specific to Backend role */}
      <div className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
        <div className="code-lines w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-primary-500 dark:bg-primary-400"
              style={{
                top: `${i * 5 + 2}%`,
                opacity: i % 2 === 0 ? 0.4 : 0.6,
                transform: `scaleX(${Math.random() * 0.3 + 0.7})`,
                left: `${Math.random() * 10}%`,
              }}
            />
          ))}

          {/* Server nodes - backend developer representation */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-primary-500/30 dark:bg-primary-500/20 server-pulse"
              style={{
                top: `${i * 15 + 10}%`,
                left: `${i % 2 === 0 ? 15 : 85}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}

          {/* Cloud platform connections - cloud architect representation */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q50,0 100,50 Q150,100 200,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-secondary-500/20 dark:text-secondary-400/20 data-flow"
              />
              <path
                d="M0,150 Q50,100 100,150 Q150,200 200,150"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-secondary-500/20 dark:text-secondary-400/20 data-flow"
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Premium Apple-style container with parallax effects */}
      <Container className="staggered-container">
        {/* Premium header with Apple-style animations */}
        <motion.div className="text-center mb-16" style={{ opacity, y: y2 }}>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white inline-block relative stagger-item">
            Professional <span className="gradient-text">Journey</span>
            <motion.span
              className="absolute -bottom-2 left-0 h-1 w-0 bg-secondary-500 dark:bg-secondary-400"
              animate={{ width: inView ? "100%" : "0%" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.h2>

          <motion.p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto stagger-item">
            My professional journey as a{" "}
            <span className="text-primary-600 dark:text-primary-400 relative group">
              Backend Developer
              <span className="absolute -bottom-1 left-0 w-full h-px bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>{" "}
            and
            <span className="text-secondary-600 dark:text-secondary-400 relative group">
              Cloud Architect
              <span className="absolute -bottom-1 left-0 w-full h-px bg-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>
            , highlighting my expertise in building secure and scalable systems.
          </motion.p>
        </motion.div>

        {/* Premium animated timeline with interactive elements */}
        <div
          ref={timelineRef}
          className="relative animate-on-scroll"
          style={{
            "--timeline-progress": 0, // Custom property for timeline progression
          }}
        >
          {/* Timeline Lines with separate segments for work and education with gap */}

          {/* Work Experience Section Timeline Line */}
          <div
            className="work-timeline absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-[1px] overflow-hidden"
            style={{
              zIndex: 5,
              top: "70px",
              height: "calc(var(--work-section-height, 400px) - 70px)",
            }}
          >
            <div
              className="h-full w-full bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300 origin-top rounded-full shadow-sm"
              style={{
                transform: "scaleY(var(--timeline-progress, 0))",
                transition: "transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
                boxShadow: "0 0 2px rgba(58, 114, 255, 0.5)",
              }}
            />
          </div>

          {/* Education Section Timeline Line - separate from work section */}
          <div
            className="education-timeline absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-[1px] overflow-hidden"
            style={{
              zIndex: 5,
              top: "calc(var(--work-section-height, 400px) + 70px)",
              height: "calc(var(--education-section-height, 200px) - 30px)",
            }}
          >
            <div
              className="h-full w-full bg-gradient-to-b from-secondary-400 to-secondary-300 origin-top rounded-full shadow-sm"
              style={{
                transform: "scaleY(var(--timeline-progress, 0))",
                transition: "transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
                boxShadow: "0 0 2px rgba(138, 92, 246, 0.5)",
              }}
            />
          </div>

          {/* Work Experience Section with section div for height calculation */}
          <div className="work-timeline-section">
            <div className="relative w-full flex items-center justify-center mb-8">
              <div className="absolute left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-800"></div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-dark px-6 z-10 relative">
                <span className="text-primary-600 dark:text-primary-400">
                  Work Experience
                </span>
              </h3>
            </div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`mb-12 md:mb-0 relative flex flex-col md:grid grid-cols-2 gap-4 md:gap-10 ${
                  index !== experiences.length - 1 ? "pb-12" : "pb-16"
                }`}
              >
                {/* Smaller, perfectly centered timeline dot */}
                <div
                  className={`timeline-dot absolute left-[15px] md:left-1/2 md:-ml-[2px] w-[5px] h-[5px] rounded-full z-20 transition-all duration-300 flex items-center justify-center border border-gray-300 dark:border-gray-600`}
                  style={{
                    background: `radial-gradient(circle, var(--tw-gradient-from) 30%, var(--tw-gradient-to) 100%)`,
                    opacity: 0.9,
                    transform: "scale(1)",
                    boxShadow:
                      "0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 3px 1px rgba(58, 114, 255, 0.3)",
                    top: "0",
                  }}
                >
                  <span className="w-[1px] h-[1px] rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 transform scale-0 transition-all duration-300 ease-out" />

                  {/* Removed connector lines for perfect centered dot appearance */}
                </div>

                {/* Card with backend/cloud architecture theme - faster animation */}
                <div className={`md:contents`}>
                  <div
                    className={`timeline-card card-3d bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 relative md:col-span-1 transform opacity-0 transition-all duration-500 ease-out service-hover ${
                      index % 2 === 0
                        ? "md:col-start-1 md:pr-14 md:mr-6 translate-x-4 md:translate-x-0 scroll-animate-left"
                        : "md:col-start-2 md:ml-6 -translate-x-4 md:translate-x-0 scroll-animate-right"
                    }`}
                  >
                    {/* Backend/Cloud role-specific visual elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <svg
                        viewBox="0 0 80 80"
                        className="w-full h-full opacity-5"
                      >
                        {index === 0 ? (
                          // Cloud architecture icon for latest role
                          <>
                            <path
                              d="M20,30 Q10,30 10,40 Q0,40 0,50 Q0,60 10,60 H50 Q60,60 60,50 Q60,40 50,40 Q50,30 40,30"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-secondary-500 dark:text-secondary-400"
                            />
                            <rect
                              x="20"
                              y="40"
                              width="10"
                              height="8"
                              rx="1"
                              fill="currentColor"
                              className="text-secondary-500 dark:text-secondary-400"
                            />
                            <rect
                              x="35"
                              y="40"
                              width="10"
                              height="8"
                              rx="1"
                              fill="currentColor"
                              className="text-secondary-500 dark:text-secondary-400"
                            />
                          </>
                        ) : index === 1 ? (
                          // Backend dev icon for previous role
                          <>
                            <rect
                              x="15"
                              y="20"
                              width="50"
                              height="10"
                              rx="2"
                              fill="currentColor"
                              className="text-primary-500 dark:text-primary-400"
                            />
                            <rect
                              x="15"
                              y="35"
                              width="50"
                              height="10"
                              rx="2"
                              fill="currentColor"
                              className="text-primary-500 dark:text-primary-400"
                            />
                            <rect
                              x="15"
                              y="50"
                              width="50"
                              height="10"
                              rx="2"
                              fill="currentColor"
                              className="text-primary-500 dark:text-primary-400"
                            />
                            <line
                              x1="25"
                              y1="20"
                              x2="25"
                              y2="60"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeDasharray="2,2"
                              className="text-primary-500 dark:text-primary-400"
                            />
                            <line
                              x1="55"
                              y1="20"
                              x2="55"
                              y2="60"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeDasharray="2,2"
                              className="text-primary-500 dark:text-primary-400"
                            />
                          </>
                        ) : (
                          // Education icon
                          <path
                            d="M15,25 L40,15 L65,25 L40,35 L15,25 Z M40,35 L40,55 M15,25 L15,45 L40,55 L65,45 L65,25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gray-500 dark:text-gray-400"
                          />
                        )}
                      </svg>
                    </div>

                    {/* Card content with Apple-style typography */}
                    <div className="relative z-10">
                      <div className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {exp.period}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.position}
                      </h3>
                      <div className="font-medium text-primary-600 dark:text-primary-400 mb-4">
                        {exp.company}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {exp.description}
                      </p>

                      {/* Tech tags with backend/cloud styles */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="inline-block px-3 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 dark:from-primary-900/20 dark:to-secondary-900/20 dark:text-primary-400 border border-primary-200 dark:border-primary-800/30 transform transition-transform hover:scale-105"
                            style={{ transitionDelay: `${techIndex * 0.05}s` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty div for layout in timeline */}
                  <div
                    className={`md:col-span-1 ${
                      index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Education Section with border separator */}
          <div className="education-timeline-section">
            <div className="relative w-full flex items-center justify-center mt-16 mb-8">
              <div className="absolute left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-800"></div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-dark px-6 z-10 relative">
                <span className="text-secondary-600 dark:text-secondary-400">
                  Education
                </span>
              </h3>
            </div>

            {education.map((edu, index) => (
              <div
                key={`edu-${index}`}
                className="mb-12 md:mb-0 relative flex flex-col md:grid grid-cols-2 gap-4 md:gap-10 pb-12"
              >
                {/* Education timeline dot */}
                <div
                  className="timeline-dot absolute left-[15px] md:left-1/2 md:-ml-[2px] w-[6px] h-[6px] rounded-full z-20 transition-all duration-300 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, #8b5cf6 30%, #6366f1 100%)`,
                    opacity: 0.9,
                    transform: "scale(1)",
                    boxShadow:
                      "0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 3px 1px rgba(138, 92, 246, 0.5)",
                    top: "0",
                  }}
                >
                  <span className="w-[2px] h-[2px] rounded-full bg-white opacity-80" />
                </div>

                {/* Education card */}
                <div className="md:contents">
                  <div className="timeline-card card-3d bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 relative md:col-span-1 transform opacity-0 transition-all duration-500 ease-out service-hover md:col-start-2 md:ml-6 -translate-x-4 md:translate-x-0 scroll-animate-right">
                    {/* Education icon */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <svg
                        viewBox="0 0 80 80"
                        className="w-full h-full opacity-5"
                      >
                        <path
                          d="M15,25 L40,15 L65,25 L40,35 L15,25 Z M40,35 L40,55 M15,25 L15,45 L40,55 L65,45 L65,25"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </svg>
                    </div>

                    {/* Card content */}
                    <div className="relative z-10">
                      <div className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {edu.period}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {edu.position}
                      </h3>
                      <div className="font-medium text-secondary-600 dark:text-secondary-400 mb-4">
                        {edu.company}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {edu.description}
                      </p>

                      {/* Tech tags for education */}
                      <div className="flex flex-wrap gap-2">
                        {edu.technologies.map((tech, techIndex) => (
                          <span
                            key={tech}
                            className="inline-block px-3 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700 dark:from-secondary-900/20 dark:to-secondary-800/20 dark:text-secondary-400 border border-secondary-200 dark:border-secondary-800/30 transform transition-transform hover:scale-105"
                            style={{ transitionDelay: `${techIndex * 0.05}s` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty div for layout */}
                  <div className="md:col-span-1 md:col-start-1"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Apple-style scroll instruction */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full text-center opacity-70 italic text-xs text-gray-500 dark:text-gray-400 animate-pulse">
            Scroll to explore my journey
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Experience;
