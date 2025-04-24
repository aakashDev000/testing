import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import DevOpsAnimation from '../ui/DevOpsAnimation';
import profileImage from '../../assets/images/profile.jpeg';
import { useTheme } from '../../hooks/useTheme';

const Hero = () => {
  const { theme } = useTheme();
  // Performance optimized state management
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [clickPoints, setClickPoints] = useState([]);
  const [particles, setParticles] = useState([]);
  const [interactionMode, setInteractionMode] = useState('glow'); // 'glow' is most performant
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Use refs for values that don't need to trigger re-renders
  const mouseSpeedRef = React.useRef(0);
  const lastPositionRef = React.useRef({ x: 0, y: 0, timestamp: 0 });
  const frameRef = React.useRef();
  
  // Detect if on mobile for performance
  const isMobile = window.innerWidth < 768;
  
  // Limit particles based on theme and device
  const particlesLimitRef = React.useRef(
    isMobile 
      ? (theme === 'dark' ? 5 : 3)  // Mobile - fewer particles
      : (theme === 'dark' ? 15 : 10) // Desktop - more particles
  );

  // Add resize listener to adjust for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      particlesLimitRef.current = isMobileView 
        ? (theme === 'dark' ? 5 : 3) 
        : (theme === 'dark' ? 15 : 10);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);
  
  // Simplified mouse tracking - only for particle creation, no mouse glow
  useEffect(() => {
    // Simplified mouse move handler - only track for particle mode
    const handleMouseMove = (e) => {
      // Only track if in particle mode to reduce calculations
      if (interactionMode !== 'particles') return;
      
      const currentX = e.clientX;
      const currentY = e.clientY - window.scrollY;
      
      // Only track for particle creation
      const now = performance.now();
      const last = lastPositionRef.current;
      
      if (last.timestamp) {
        const dx = currentX - last.x;
        const dy = currentY - last.y;
        const timeDiff = now - last.timestamp;
        
        // Only on significant movement
        if (timeDiff > 20 && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
          const speed = Math.sqrt(dx*dx + dy*dy) / timeDiff;
          
          // Create particles less frequently
          if (speed > 0.6 && 
              particles.length < particlesLimitRef.current/2 &&
              Math.random() > 0.8) {
            // Very limited particle creation
            createMovementParticle(currentX, currentY, dx, dy);
          }
        }
      }
      
      // Store position for movement calculation
      lastPositionRef.current = { 
        x: currentX, 
        y: currentY, 
        timestamp: now 
      };
    };
    
    // Optimized click handler
    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY - window.scrollY;
      
      // Lightweight click handling - reduce number of effects in each mode
      switch(interactionMode) {
        case 'glow':
          // Simple pulse - reduced max count
          if (clickPoints.length < 3) {
            setClickPoints(prev => [...prev, { 
              x, y, 
              color: getRandomThemeColor(),
              size: 5
            }]);
          }
          break;
        
        case 'particles':
          // Adaptive particle burst based on device
          const particleCount = isMobile
            ? (theme === 'dark' ? 5 : 3)  // Mobile - fewer particles
            : (theme === 'dark' ? 10 : 8); // Desktop - more particles
          requestAnimationFrame(() => {
            createParticleBurst(x, y, particleCount);
          });
          break;
          
        case 'ripple':
          // Single ripple at a time for better performance
          setClickPoints(prev => {
            const filtered = prev.filter(p => p.type !== 'ripple');
            return [...filtered, { 
              x, y, 
              color: getRandomThemeColor(0.4),
              size: 2,
              type: 'ripple'
            }];
          });
          break;
          
        default:
          setClickPoints(prev => prev.length < 3 ? [...prev, { x, y }] : prev);
      }
      
      // Less frequent mode changes
      if (Math.random() > 0.9) {
        cycleInteractionMode();
      }
    };
    
    // Optimized event handlers
    const handleHover = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);
    
    // Debounced mode change
    let modeChangeTimeout;
    const handleKeyPress = (e) => {
      if (e.key === 'm' && !modeChangeTimeout) {
        cycleInteractionMode();
        // Prevent rapid mode changes
        modeChangeTimeout = setTimeout(() => {
          modeChangeTimeout = null;
        }, 300);
      }
    };

    // Performance trick - passive listeners improve scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);
    
    // Home element hover detection
    const homeElement = document.getElementById('home');
    if (homeElement) {
      homeElement.addEventListener('mouseenter', handleHover, { passive: true });
      homeElement.addEventListener('mouseleave', handleHoverEnd, { passive: true });
    }

    // Time tracking for throttling updates
    let timeSinceLast = 0;
    let lastUpdateTime = 0;

    return () => {
      // Clean up all listeners and cancel any pending animation frames
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyPress);
      
      if (homeElement) {
        homeElement.removeEventListener('mouseenter', handleHover);
        homeElement.removeEventListener('mouseleave', handleHoverEnd);
      }
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (modeChangeTimeout) {
        clearTimeout(modeChangeTimeout);
      }
    };
  }, [theme, clickPoints, particles.length, interactionMode]);
  
  // Clean up particles after they expire
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles(prev => prev.filter(p => !p.expired));
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [particles]);
  
  // Helper functions
  
  // Get a random color from the theme palette
  const getRandomThemeColor = (opacity = 0.8) => {
    const colors = [
      `rgba(45, 127, 243, ${opacity})`, // primary
      `rgba(88, 113, 227, ${opacity})`, // secondary
      `rgba(99, 102, 241, ${opacity})` // accent
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Cycle through interaction modes
  const cycleInteractionMode = () => {
    const modes = ['glow', 'particles', 'ripple'];
    const currentIndex = modes.indexOf(interactionMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setInteractionMode(modes[nextIndex]);
  };
  
  // Optimized particle burst function - reduced complexity
  const createParticleBurst = (x, y, count) => {
    // Bail early if we have too many particles
    if (particles.length > particlesLimitRef.current * 2) {
      return;
    }
    
    const timestamp = Date.now();
    const newParticles = [];
    
    // Use a single color for all particles in a burst for better performance
    const burstColor = getRandomThemeColor();
    
    // Create a limited number of particles
    for (let i = 0; i < count; i++) {
      // Pre-calculate values for performance
      const angle = Math.random() * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      
      // Simplified particle properties
      const speed = 1 + Math.random() * 2; // Reduced speed range
      const size = 2 + Math.random() * 3;  // Smaller particles
      const lifetime = 500 + Math.random() * 500; // Shorter lifetimes
      
      newParticles.push({
        id: timestamp + "_" + i,
        x, 
        y,
        vx: cos * speed,
        vy: sin * speed,
        size,
        color: burstColor, // Same color for all particles in a burst
        lifetime,
        createdAt: timestamp,
        expired: false
      });
    }
    
    // Batch update particles state
    setParticles(prev => {
      // If we have too many, replace oldest
      if (prev.length + newParticles.length > particlesLimitRef.current * 2) {
        return [...prev.slice(-(particlesLimitRef.current)), ...newParticles];
      }
      return [...prev, ...newParticles];
    });
    
    // Use a single timeout to expire all particles in this burst
    setTimeout(() => {
      // Mark all particles from this burst as expired
      newParticles.forEach(p => p.expired = true);
    }, 1000); // Fixed expiration time for better performance
  };
  
  // Super optimized movement particle function
  const createMovementParticle = (x, y, dx, dy) => {
    // Simplified particle creation with minimal calculations
    if (particles.length >= particlesLimitRef.current) {
      return; // Don't create more particles if we're at the limit
    }
    
    // Simplified angle calculation
    const angle = Math.atan2(dy, dx);
    const vx = Math.cos(angle) * -0.2; // Fixed multiplier instead of dynamic
    const vy = Math.sin(angle) * -0.2;
    
    const newParticle = {
      id: Date.now() + "_m",
      x, 
      y,
      vx,
      vy,
      size: theme === 'dark' ? 3 : 2, // Fixed size based on theme
      color: theme === 'dark' ? 'rgba(88, 113, 227, 0.5)' : 'rgba(45, 127, 243, 0.4)', // Fixed color
      lifetime: 500, // Fixed lifetime for better performance
      createdAt: Date.now(),
      expired: false
    };
    
    // Efficient state update
    setParticles(prev => [...prev.slice(-particlesLimitRef.current + 1), newParticle]);
    
    // Single timeout for expiration
    setTimeout(() => {
      newParticle.expired = true;
    }, 500);
  };
  
  // Removed checkActiveAreas function - we don't need it for performance
  
  // Clean up function to run on component unmount
  useEffect(() => {
    return () => {
      // Clear any lingering timeouts or animations
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-light via-primary-50/5 to-secondary-50/10 dark:from-dark dark:via-primary-900/10 dark:to-secondary-900/15 cursor-default"
    >
      {/* Enhanced interactive background with advanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Advanced development/DevOps representation */}
        <div className="absolute inset-0 z-0">
          <DevOpsAnimation />
        </div>
        
        {/* Interactive grid background */}
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <motion.path 
                  d="M 20 0 L 0 0 0 20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5" 
                  className="text-primary-300/10 dark:text-primary-400/15" 
                />
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)" />
                <motion.path 
                  d="M 100 0 L 0 0 0 100" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  className="text-primary-400/10 dark:text-primary-400/15" 
                  strokeDasharray="4,4"
                  animate={{ strokeDashoffset: [0, 16] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="opacity-30 dark:opacity-40" />
          </svg>
        </div>
        
        {/* Reduced number of parallax floating elements for better performance */}
        <div className="absolute inset-0 z-0">
          {[...Array(theme === 'dark' ? 12 : 6)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${15 + (i % 6) * 15}%`, // More evenly distributed
                top: `${10 + Math.floor(i / 6) * 30 + (i % 3) * 10}%`,
                width: 3,
                height: 3,
                backgroundColor: i % 3 === 0 ? 
                  'rgba(45, 127, 243, 0.3)' : 
                  i % 3 === 1 ? 
                  'rgba(88, 113, 227, 0.3)' : 
                  'rgba(99, 102, 241, 0.3)',
                opacity: theme === 'dark' ? 0.4 : 0.15,
                // Using CSS for blur is more performant than filter
                boxShadow: '0 0 2px rgba(45, 127, 243, 0.3)'
              }}
              animate={{
                y: [0, -15, 0],
                opacity: theme === 'dark' ? [0.4, 0.6, 0.4] : [0.15, 0.25, 0.15]
              }}
              transition={{
                y: {
                  duration: 2 + i % 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          ))}
        </div>
        
        {/* Enhanced radial gradient with animation */}
        <motion.div 
          className="absolute inset-0 opacity-90"
          style={{ 
            background: theme === 'dark' 
              ? 'radial-gradient(circle at 30% 30%, rgba(45, 127, 243, 0.05), transparent 60%), radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.05), transparent 70%)' 
              : 'radial-gradient(circle at 30% 30%, rgba(45, 127, 243, 0.03), transparent 50%), radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.03), transparent 60%)'
          }}
          animate={{
            opacity: theme === 'dark' ? [0.9, 0.7, 0.9] : [0.8, 0.6, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Optimized interactive particles container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {/* Performance optimized dynamic particles */}
          {particles.slice(0, particlesLimitRef.current).map(particle => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                // Reduced shadow for better performance
                boxShadow: `0 0 ${particle.size}px ${particle.color}`,
              }}
              animate={{
                // Simplified animation with just 2 keyframes instead of arrays
                x: particle.vx * particle.lifetime/1000 * 60,
                y: particle.vy * particle.lifetime/1000 * 60,
                opacity: 0
              }}
              initial={{ opacity: 1 }}
              transition={{
                duration: particle.lifetime / 1000,
                ease: "linear" // Linear is more performant than easeOut
              }}
            />
          ))}
          
          {/* Simplified mode indicator - hidden on mobile */}
          <div 
            className="absolute bottom-8 right-8 font-mono text-xs uppercase tracking-wider bg-black/20 dark:bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 hidden md:block"
            style={{
              color: 'rgba(45, 127, 243, 0.9)',
              borderColor: 'rgba(45, 127, 243, 0.3)',
              borderWidth: '1px',
              opacity: 0.7
            }}
          >
            {interactionMode} mode • press m
          </div>
        </div>

        {/* Interactive pulse effects on click */}
        {clickPoints.map((point, i) => {
          // Regular pulse effect
          if (!point.type || point.type === 'pulse') {
            return (
              <motion.div
                key={`click-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: point.x,
                  top: point.y,
                  width: point.size || 5,
                  height: point.size || 5,
                  backgroundColor: point.color || (theme === 'dark' ? 'rgba(99, 102, 241, 0.8)' : 'rgba(45, 127, 243, 0.8)'),
                  zIndex: 5
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 12, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                onAnimationComplete={() => {
                  setClickPoints(prev => prev.filter((_, idx) => idx !== i));
                }}
              />
            );
          }
          
          // Ripple effect
          if (point.type === 'ripple') {
            return (
              <motion.div
                key={`ripple-${i}`}
                className="absolute rounded-full pointer-events-none z-5"
                style={{
                  left: point.x,
                  top: point.y,
                  backgroundColor: 'transparent',
                  border: `2px solid ${point.color || 'rgba(99, 102, 241, 0.5)'}`,
                  width: 10,
                  height: 10,
                }}
                initial={{ opacity: 1 }}
                animate={{ 
                  width: ['10px', '300px'],
                  height: ['10px', '300px'],
                  x: ['-5px', '-150px'],
                  y: ['-5px', '-150px'],
                  opacity: [1, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  ease: "easeOut",
                  opacity: { duration: 2.5, times: [0, 0.8, 1] } 
                }}
                onAnimationComplete={() => {
                  setClickPoints(prev => prev.filter((_, idx) => idx !== i));
                }}
              />
            );
          }
          
          return null;
        })}
        
        {/* Removed active area highlights for better performance */}
      </div>

      <Container className="flex flex-col lg:flex-row items-center justify-between gap-12 py-10">
        {/* Text Content - Professional and Clean */}
        <motion.div 
          className="flex-1 text-center lg:text-left relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Availability Badge */}
          <motion.div 
            className="inline-block px-4 py-1 rounded-md bg-gradient-to-r from-accent-500/10 to-accent-600/10 dark:from-accent-600/10 dark:to-accent-500/20 text-accent-600 dark:text-accent-400 text-sm font-medium mb-6 border border-accent-200 dark:border-accent-800/30 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-accent-500 mr-2 animate-pulse"></span>
              Available for new projects
            </span>
          </motion.div>

          {/* Name - Modern and Attractive */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-neutral-900 dark:text-neutral-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hello, I'm <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-600 dark:from-primary-400 dark:via-secondary-400 dark:to-accent-500 bg-clip-text text-transparent">Aakash</span>
          </motion.h1>

          {/* Role with Typewriter - Clean styling */}
          <motion.div 
            className="flex flex-col md:flex-row items-center md:items-baseline justify-center lg:justify-start mb-6 text-2xl md:text-3xl text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="mr-2 font-medium">I am a</span>
            <span className="font-bold text-primary-600 dark:text-primary-400">
              <Typewriter
                options={{
                  strings: [
                    'Backend Developer',
                    'Cloud Architect',
                    'AWS Specialist',
                    'Node.js Developer'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 60,
                  deleteSpeed: 40,
                  wrapperClassName: 'typewriter-text'
                }}
              />
            </span>
          </motion.div>

          {/* Description - Clear and Professional */}
          <motion.p 
            className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Backend Developer & Cloud Solutions Architect</span> specializing in AWS serverless architecture and GraphQL APIs. Currently working at Ariveguru Technology Solution, where I architect HIPAA-compliant systems and implement secure infrastructure with Terraform.
          </motion.p>

          {/* Call-to-action buttons - Clean Design */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-10 px-4 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 border border-primary-400/20"
            >
              <span className="flex items-center justify-center">
                <span>Hire Me</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Aakash_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-neutral-800/50 border border-accent-300 dark:border-accent-700/30 text-accent-600 dark:text-accent-400 font-medium rounded-md hover:bg-accent-50/50 dark:hover:bg-accent-900/20 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                <span>Download CV</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </Button>
          </motion.div>

          {/* Social links - Simple and Professional */}
          <motion.div 
            className="flex items-center justify-center lg:justify-start space-x-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="https://www.linkedin.com/in/aakash000" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </a>
            <a href="https://github.com/aakashDev000" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Professional Developer Profile Card */}
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Enhanced multi-layered card shadow with advanced animation */}
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-r from-primary-300/50 via-accent-300/30 to-secondary-300/50 dark:from-primary-700/40 dark:via-accent-700/20 dark:to-secondary-700/40 rounded-lg blur-md"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.03, 1],
                rotate: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            ></motion.div>
            
            {/* Secondary outer glow */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-lg blur-sm"
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [0.98, 1.01, 0.98],
                rotate: [0, -0.3, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
            ></motion.div>
            
            {/* Shimmering border effect */}
            <div className="absolute inset-0 rounded-lg overflow-hidden z-0">
              <motion.div 
                className="absolute -inset-[1px] rounded-lg"
                style={{
                  background: `linear-gradient(90deg, transparent, transparent, rgba(99, 102, 241, 0.1), transparent, transparent)`,
                  backgroundSize: "200% 100%"
                }}
                animate={{ 
                  backgroundPosition: ["100% 0%", "0% 0%", "100% 0%"]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              ></motion.div>
            </div>
            
            {/* Professional card - bigger size */}
            <div className="relative overflow-hidden rounded-lg bg-white dark:bg-neutral-800 shadow-xl border border-neutral-200/80 dark:border-neutral-700/80 max-w-md">
              {/* Enhanced code-themed header with beautiful animated elements */}
              <div className="relative h-40 overflow-hidden">
                {/* Professional modern gradient background */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: 'linear-gradient(to right, #2d7ff3, #5871e3, #6366f1, #5871e3, #2d7ff3)',
                    backgroundSize: '200% 100%'
                  }}
                />
                
                {/* Subtle gradient overlay for depth */}
                <div 
                  className="absolute inset-0 opacity-60 dark:opacity-40"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15), transparent 70%), radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 60%)'
                  }}
                />
                
                {/* Animated particles */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute bg-white rounded-full opacity-60"
                      style={{
                        width: 1 + Math.random() * 2,
                        height: 1 + Math.random() * 2,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Animated code grid */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="codeBg" width="40" height="40" patternUnits="userSpaceOnUse">
                        <motion.path 
                          d="M10,0 L10,40 M0,10 L40,10 M20,0 L20,40 M0,20 L40,20 M30,0 L30,40 M0,30 L40,30" 
                          stroke="white" 
                          strokeWidth="0.5" 
                          fill="none"
                          animate={{
                            strokeDasharray: ['0,20', '20,0'],
                            strokeDashoffset: [0, 20]
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#codeBg)" />
                  </svg>
                </div>
                
                {/* Animated code blocks */}
                <div className="absolute inset-0">
                  {[
                    { content: "const deploy = async () => {", x: 5, y: 20 },
                    { content: "  await buildApp();", x: 10, y: 35 },
                    { content: "  return aws.lambda(config);", x: 10, y: 50 },
                    { content: "};", x: 5, y: 65 },
                    { content: "export default deploy;", x: 5, y: 85 }
                  ].map((line, i) => (
                    <motion.div
                      key={`code-${i}`}
                      className="absolute text-white font-mono text-xs opacity-0 whitespace-nowrap"
                      style={{
                        left: `${line.x}%`,
                        top: `${line.y}%`,
                        textShadow: '0 0 3px rgba(0,0,0,0.5)'
                      }}
                      animate={{
                        opacity: [0, 0.9, 0.9, 0],
                        x: ["-10px", "0px", "0px", "10px"]
                      }}
                      transition={{
                        duration: 4,
                        times: [0, 0.1, 0.9, 1],
                        repeat: Infinity,
                        repeatDelay: 8,
                        delay: i * 0.2
                      }}
                    >
                      {line.content}
                    </motion.div>
                  ))}
                </div>
                
                {/* Animated connection network */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  {/* Network nodes */}
                  {[...Array(8)].map((_, i) => {
                    const x = 10 + (i % 4) * 25;
                    const y = 20 + Math.floor(i / 4) * 50;
                    return (
                      <motion.circle
                        key={`node-${i}`}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="3"
                        fill="white"
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                          r: [2, 3, 2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    );
                  })}
                  
                  {/* Connection lines */}
                  {[
                    { x1: "10%", y1: "20%", x2: "35%", y2: "20%" },
                    { x1: "35%", y1: "20%", x2: "60%", y2: "20%" },
                    { x1: "60%", y1: "20%", x2: "85%", y2: "20%" },
                    { x1: "10%", y1: "70%", x2: "35%", y2: "70%" },
                    { x1: "35%", y1: "70%", x2: "60%", y2: "70%" },
                    { x1: "60%", y1: "70%", x2: "85%", y2: "70%" },
                    { x1: "10%", y1: "20%", x2: "10%", y2: "70%" },
                    { x1: "35%", y1: "20%", x2: "35%", y2: "70%" },
                    { x1: "60%", y1: "20%", x2: "60%", y2: "70%" },
                    { x1: "85%", y1: "20%", x2: "85%", y2: "70%" }
                  ].map((line, i) => (
                    <motion.line
                      key={`line-${i}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="white"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      animate={{
                        strokeDashoffset: [0, 10]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.2
                      }}
                    />
                  ))}
                  
                  {/* Moving data packets */}
                  {[
                    { path: "M10%,20% L85%,20%", delay: 0 },
                    { path: "M85%,20% L85%,70%", delay: 1.5 },
                    { path: "M85%,70% L10%,70%", delay: 3 },
                    { path: "M10%,70% L10%,20%", delay: 4.5 },
                    { path: "M35%,20% L60%,70%", delay: 2 },
                    { path: "M60%,20% L35%,70%", delay: 3.5 }
                  ].map((packet, i) => (
                    <motion.circle
                      key={`packet-${i}`}
                      r="2"
                      fill="white"
                      style={{
                        offsetPath: `path('${packet.path}')`,
                        offsetRotate: "0deg"
                      }}
                      animate={{
                        offsetDistance: ["0%", "100%"],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1.2, 1.2, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        times: [0, 0.2, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 5,
                        delay: packet.delay,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </svg>
                
                {/* Animated code symbols */}
                <div className="absolute inset-0">
                  {[
                    { symbol: "</>", x: 75, y: 30, size: 24 },
                    { symbol: "{}", x: 68, y: 70, size: 22 },
                    { symbol: "$", x: 25, y: 80, size: 20 },
                    { symbol: "[]", x: 40, y: 30, size: 18 }
                  ].map((symbol, i) => (
                    <motion.div
                      key={`symbol-${i}`}
                      className="absolute text-white font-mono opacity-0"
                      style={{
                        fontSize: symbol.size,
                        left: `${symbol.x}%`,
                        top: `${symbol.y}%`,
                        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
                      }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1.2, 0.8],
                        rotate: [-5, 5, -5]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "easeInOut"
                      }}
                    >
                      {symbol.symbol}
                    </motion.div>
                  ))}
                </div>
                
                {/* Horizontal scanning line */}
                <motion.div
                  className="absolute left-0 w-full h-0.5 bg-white/30"
                  style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }}
                  animate={{
                    top: ["0%", "100%", "0%"]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Profile image - Clean and elegant with subtle animation */}
              <div className="relative flex justify-center">
                {/* Outer glow ring - subtle and not distracting */}
                <motion.div 
                  className="absolute -top-20 rounded-full h-48 w-48 bg-gradient-to-r from-primary-300/30 via-accent-300/30 to-secondary-300/30 dark:from-primary-500/20 dark:via-accent-500/20 dark:to-secondary-500/20 blur-md"
                  animate={{ 
                    scale: [0.97, 1.03, 0.97],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Main profile image container */}
                <div className="absolute -top-16 rounded-full h-40 w-40 overflow-hidden border-4 border-white dark:border-neutral-800 shadow-lg z-10">
                  {/* Animated gradient border */}
                  <motion.div 
                    className="absolute -inset-0.5 rounded-full z-0"
                    style={{
                      background: 'linear-gradient(90deg, #3b82f6, #6366f1, #ec4899, #6366f1, #3b82f6)',
                      backgroundSize: '400% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% center', '100% center', '0% center'],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Image container */}
                  <div className="absolute inset-0.5 rounded-full overflow-hidden z-10">
                    <img 
                      src={profileImage} 
                      alt="Aakash" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Animated shine effect */}
                  <motion.div 
                    className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    animate={{
                      left: ["-100%", "100%"],
                      opacity: [0, 0.25, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  />
                  
                  {/* Interactive hover effect - adds a subtle glow on hover */}
                  <motion.div 
                    className="absolute inset-0 z-30 bg-gradient-to-r from-primary-400/0 to-secondary-400/0 rounded-full"
                    whileHover={{
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                      scale: 1.05,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  />
                </div>
              </div>
              
              {/* Content area - Clean and Professional */}
              <div className="pt-24 px-6 pb-6">
                {/* Name and title */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">Aakash</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    <span className="text-primary-600 dark:text-primary-400 font-medium">Backend Developer</span> & 
                    <span className="text-primary-600 dark:text-primary-400 font-medium"> Cloud Architect</span>
                  </p>
                </div>
                
                {/* Professional badge with code animation */}
                <div className="bg-primary-50/50 dark:bg-primary-900/10 rounded-md p-4 mb-2 border border-primary-100/50 dark:border-primary-800/10 relative overflow-hidden">
                  {/* Code pattern background */}
                  <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="miniCode" width="40" height="20" patternUnits="userSpaceOnUse">
                          <path d="M0,5 L5,0 L10,5 L15,0 L20,5 L25,0 L30,5 L35,0 L40,5" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary-500 dark:text-primary-400" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#miniCode)" />
                    </svg>
                  </div>
                  
                  {/* Animated code line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-400/40 to-secondary-400/40 dark:from-primary-500/30 dark:to-secondary-500/30"
                    style={{ width: '100%' }}
                    animate={{
                      left: ['-100%', '0%'],
                      opacity: [0, 0.7, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 2
                    }}
                  />
                  
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 3
                      }}
                    >
                      <svg className="w-6 h-6 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <div>
                      <div className="text-base font-semibold text-neutral-800 dark:text-neutral-200">3+ Years Experience</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">Enterprise Solutions</div>
                    </div>
                  </div>
                </div>
                
                {/* Advanced Animated Tech Tags with beautiful effects */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-2">
                  {[
                    { name: "Node.js", color: "#2d7ff3", icon: "⬢" },
                    { name: "AWS", color: "#5871e3", icon: "☁️" },
                    { name: "GraphQL", color: "#6366f1", icon: "⬡" },
                    { name: "MongoDB", color: "#4253c2", icon: "🍃" },
                    { name: "Terraform", color: "#1c63d4", icon: "▦" },
                    { name: "TypeScript", color: "#3643a0", icon: "TS" }
                  ].map((tech, index) => (
                    <motion.div 
                      key={tech.name}
                      className="relative group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                    >
                      {/* Animated background glow on hover */}
                      <motion.div 
                        className="absolute -inset-1 rounded-lg opacity-0 blur-sm transition-all duration-300 group-hover:opacity-100"
                        style={{ 
                          background: `linear-gradient(90deg, ${tech.color}30, ${tech.color}60, ${tech.color}30)`,
                          backgroundSize: "200% 100%"
                        }}
                        animate={{
                          backgroundPosition: ["0% center", "100% center", "0% center"]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <motion.span 
                        className="px-3 py-1.5 text-sm font-medium bg-white/90 dark:bg-neutral-800/90 rounded-md border border-secondary-200 dark:border-secondary-700/50 relative overflow-hidden flex items-center gap-1.5"
                        style={{ 
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                          color: tech.color
                        }}
                        whileHover={{ 
                          y: -5,
                          scale: 1.08,
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }}
                      >
                        {/* Tech icon */}
                        <span className="text-xs">{tech.icon}</span>
                        
                        {/* Enhanced scan line animation */}
                        <motion.div 
                          className="absolute inset-y-0 w-3 bg-gradient-to-b"
                          style={{
                            background: `linear-gradient(to bottom, ${tech.color}00, ${tech.color}40, ${tech.color}00)`
                          }}
                          animate={{
                            left: ["-10%", "110%"],
                            opacity: [0, 0.7, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 3 + index * 0.4
                          }}
                        />
                        
                        {/* Tech name */}
                        <span className="relative z-10 transition-all duration-300 group-hover:font-semibold">{tech.name}</span>
                        
                        {/* Subtle bottom border animation */}
                        <motion.div 
                          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                          style={{ background: tech.color }}
                        />
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Interactive decorative elements */}
                <div className="mt-4 relative">
                  {/* Animated code line */}
                  <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700/50">
                    <motion.div 
                      className="absolute h-full bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400"
                      style={{ width: '30%' }}
                      animate={{
                        x: ["-100%", "233%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Simple Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center hidden sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Scroll to explore</span>
        <motion.div 
          className="w-5 h-10 border-2 border-primary-300/50 dark:border-primary-700/50 rounded-full flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;