import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion';

// Cloud Architecture Fallback (SVG-based for browsers with Canvas issues)
const ParticleFieldFallback = ({ theme, className, style = {} }) => {
  const primaryColor = theme === 'dark' ? '#3a72ff' : '#2a5cf0';
  const secondaryColor = theme === 'dark' ? '#6366f1' : '#4f46e5';
  const accentColor = theme === 'dark' ? '#e844ff' : '#d42ddd';
  
  // Generate server/cloud nodes
  const createNodes = () => {
    const nodes = [];
    
    // Main cloud servers (larger)
    for (let i = 0; i < 3; i++) {
      nodes.push({
        type: 'server',
        x: 80 + i * 70,
        y: 50,
        size: 16,
        color: primaryColor,
        pulseDelay: i * 0.7
      });
    }
    
    // Secondary server nodes
    for (let i = 0; i < 4; i++) {
      nodes.push({
        type: 'server',
        x: 60 + i * 60,
        y: 120,
        size: 12,
        color: secondaryColor,
        pulseDelay: 0.3 + i * 0.5
      });
    }
    
    // Client/endpoint nodes
    for (let i = 0; i < 10; i++) {
      nodes.push({
        type: 'client',
        x: 20 + i * 30,
        y: 170 - (i % 2) * 15,
        size: 6,
        color: i % 3 === 0 ? accentColor : secondaryColor,
        pulseDelay: i * 0.2
      });
    }
    
    return nodes;
  };
  
  const nodes = createNodes();
  
  // Create connection paths between nodes
  const createConnections = () => {
    const connections = [];
    
    // Connect main cloud servers horizontally
    for (let i = 0; i < 2; i++) {
      connections.push({
        x1: 80 + i * 70,
        y1: 50,
        x2: 80 + (i + 1) * 70,
        y2: 50,
        color: primaryColor,
        animationDelay: i * 0.5
      });
    }
    
    // Connect secondary servers horizontally
    for (let i = 0; i < 3; i++) {
      connections.push({
        x1: 60 + i * 60,
        y1: 120,
        x2: 60 + (i + 1) * 60,
        y2: 120,
        color: secondaryColor,
        animationDelay: 0.2 + i * 0.5
      });
    }
    
    // Connect cloud servers to secondary servers
    for (let i = 0; i < 3; i++) {
      connections.push({
        x1: 80 + i * 70,
        y1: 50,
        x2: 60 + i * 60 + 30,
        y2: 120,
        color: primaryColor,
        animationDelay: 0.3 + i * 0.4
      });
    }
    
    // Connect secondary servers to clients
    for (let i = 0; i < 8; i++) {
      connections.push({
        x1: 60 + (Math.floor(i/2) * 60),
        y1: 120,
        x2: 35 + i * 30,
        y2: 170 - (i % 2) * 15,
        color: i % 3 === 0 ? accentColor : secondaryColor,
        animationDelay: 0.1 + i * 0.2
      });
    }
    
    return connections;
  };
  
  const connections = createConnections();
  
  return (
    <div 
      className={className} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        ...style 
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 300 200">
        {/* Background servers/grid pattern */}
        <pattern id="serverGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" x="2" y="2" rx="2" fill="none" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" />
          <circle cx="20" cy="20" r="1" fill={primaryColor} opacity="0.3" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#serverGrid)" opacity="0.1" />
        
        {/* Connection lines */}
        {connections.map((conn, i) => (
          <g key={`conn-${i}`}>
            <line 
              x1={conn.x1} 
              y1={conn.y1} 
              x2={conn.x2} 
              y2={conn.y2} 
              stroke={conn.color} 
              strokeWidth="0.8" 
              strokeDasharray="3,3" 
              opacity="0.3"
            />
            
            {/* Animated data packet */}
            <circle r="1.5" fill={conn.color}>
              <animateMotion 
                path={`M${conn.x1},${conn.y1} L${conn.x2},${conn.y2}`} 
                dur="2s" 
                begin={`${conn.animationDelay}s`}
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                values="0;0.8;0" 
                dur="2s"
                begin={`${conn.animationDelay}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          </g>
        ))}
        
        {/* Server and client nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {node.type === 'server' ? (
              // Server nodes (rectangles)
              <>
                <rect 
                  x={node.x - node.size/2} 
                  y={node.y - node.size/2} 
                  width={node.size} 
                  height={node.size} 
                  rx="2" 
                  fill={node.color}
                  opacity="0.6"
                >
                  <animate 
                    attributeName="opacity" 
                    values="0.4;0.7;0.4" 
                    dur="3s" 
                    begin={`${node.pulseDelay}s`}
                    repeatCount="indefinite" 
                  />
                </rect>
                {/* Server status light */}
                <circle 
                  cx={node.x + node.size/4} 
                  cy={node.y - node.size/4} 
                  r="1" 
                  fill="#50C878"
                >
                  <animate 
                    attributeName="opacity" 
                    values="0.5;1;0.5" 
                    dur="1s" 
                    begin={`${node.pulseDelay}s`}
                    repeatCount="indefinite" 
                  />
                </circle>
              </>
            ) : (
              // Client/endpoint nodes (circles)
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={node.size / 2} 
                fill={node.color}
                opacity="0.6"
              >
                <animate 
                  attributeName="opacity" 
                  values="0.4;0.7;0.4" 
                  dur="2s" 
                  begin={`${node.pulseDelay}s`}
                  repeatCount="indefinite" 
                />
              </circle>
            )}
          </g>
        ))}
        
        {/* Cloud icons in background */}
        <g opacity="0.15">
          <path d="M40,30 Q50,20 60,25 Q70,15 80,25 Q90,20 95,30 Q105,30 100,40 Q105,50 95,55 Q90,65 80,60 Q70,70 60,60 Q50,65 45,55 Q35,55 40,45 Q30,40 40,30" 
                fill={primaryColor} />
          
          <path d="M180,40 Q190,30 200,35 Q210,25 220,35 Q230,30 235,40 Q245,40 240,50 Q245,60 235,65 Q230,75 220,70 Q210,80 200,70 Q190,75 185,65 Q175,65 180,55 Q170,50 180,40" 
                fill={secondaryColor} opacity="0.8">
            <animateTransform 
              attributeName="transform"
              type="translate"
              values="0,0; 5,0; 0,0"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
        </g>
        
        {/* Data center icon */}
        <g transform="translate(150, 20) scale(0.6)" opacity="0.2">
          <rect x="0" y="0" width="40" height="50" rx="2" fill={primaryColor} />
          <rect x="5" y="5" width="30" height="5" rx="1" fill={secondaryColor} />
          <rect x="5" y="15" width="30" height="5" rx="1" fill={secondaryColor} />
          <rect x="5" y="25" width="30" height="5" rx="1" fill={secondaryColor} />
          <rect x="5" y="35" width="30" height="5" rx="1" fill={secondaryColor} />
          <animate 
            attributeName="opacity" 
            values="0.1;0.3;0.1" 
            dur="5s" 
            repeatCount="indefinite" 
          />
        </g>
      </svg>
    </div>
  );
};

const ParticleField = ({ className, style = {}, nodeCount = 80, particleSize = 2 }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const [canvasSupported, setCanvasSupported] = useState(true);
  const [frameId, setFrameId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedParticle, setDraggedParticle] = useState(null);
  const particlesRef = useRef([]);
  
  // Reset dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    // Initial sizing
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Add mouse interaction with click and drag
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      setMousePosition({
        x: mouseX,
        y: mouseY
      });
      
      // If dragging, move the dragged particle directly to mouse position
      if (isDragging && draggedParticle !== null && particlesRef.current.length > 0) {
        const particle = particlesRef.current[draggedParticle];
        if (particle) {
          // Directly set position to mouse position
          particle.x = mouseX;
          particle.y = mouseY;
          // Reset velocity when dragging
          particle.vx = 0;
          particle.vy = 0;
        }
      }
    };
    
    const handleMouseDown = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Find the closest particle to click
      let closestDistance = Infinity;
      let closestIndex = -1;
      
      particlesRef.current.forEach((particle, index) => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < closestDistance && distance < 20) { // 20px click radius
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      if (closestIndex !== -1) {
        setIsDragging(true);
        setDraggedParticle(closestIndex);
        
        // Immediately move particle to cursor
        const particle = particlesRef.current[closestIndex];
        particle.x = mouseX;
        particle.y = mouseY;
        particle.radius = particle.originalRadius * 2; // Make it bigger while dragging
      }
    };
    
    const handleMouseUp = (e) => {
      if (isDragging) {
        // Calculate velocity based on mouse movement
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Capture last mouse position
        const lastMouseX = mousePosition.x;
        const lastMouseY = mousePosition.y;
        
        setIsDragging(false);
        
        // If we were dragging a particle, give it momentum based on release velocity
        if (draggedParticle !== null && particlesRef.current[draggedParticle]) {
          const particle = particlesRef.current[draggedParticle];
          
          // Calculate velocity from recent mouse movement
          const releaseVelocityX = (mouseX - lastMouseX) * 0.3; // Scale for good visual effect
          const releaseVelocityY = (mouseY - lastMouseY) * 0.3;
          
          // Apply the release velocity plus some randomness
          particle.vx = releaseVelocityX + (Math.random() - 0.5) * 2;
          particle.vy = releaseVelocityY + (Math.random() - 0.5) * 2;
          
          // Set a new random direction
          particle.direction = Math.atan2(particle.vy, particle.vx);
          
          // Reset particle properties
          particle.radius = particle.originalRadius; // Reset size
        }
        
        setDraggedParticle(null);
      }
    };
    
    const handleMouseEnter = () => {
      setIsInteracting(true);
    };
    
    const handleMouseLeave = () => {
      setIsInteracting(false);
      setIsDragging(false);
      setDraggedParticle(null);
      
      // Reset mouse position after a delay
      setTimeout(() => {
        setMousePosition({ x: null, y: null });
      }, 300);
    };
    
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;
        
        setMousePosition({
          x: touchX,
          y: touchY
        });
        
        // Find closest particle
        let closestDistance = Infinity;
        let closestIndex = -1;
        
        particlesRef.current.forEach((particle, index) => {
          const dx = particle.x - touchX;
          const dy = particle.y - touchY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < closestDistance && distance < 30) { // Larger touch area
            closestDistance = distance;
            closestIndex = index;
          }
        });
        
        if (closestIndex !== -1) {
          setIsDragging(true);
          setDraggedParticle(closestIndex);
          setIsInteracting(true);
          
          // Move particle to touch point
          const particle = particlesRef.current[closestIndex];
          particle.x = touchX;
          particle.y = touchY;
          particle.radius = particle.originalRadius * 2; // Bigger while dragging
        }
      }
    };
    
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;
        
        setMousePosition({
          x: touchX,
          y: touchY
        });
        
        // If dragging, move the particle
        if (isDragging && draggedParticle !== null) {
          const particle = particlesRef.current[draggedParticle];
          if (particle) {
            particle.x = touchX;
            particle.y = touchY;
          }
        }
        
        setIsInteracting(true);
      }
    };
    
    const handleTouchEnd = (e) => {
      if (isDragging) {
        // For touch events, we can't easily calculate release velocity
        // but we can use the last known velocity
        if (draggedParticle !== null && particlesRef.current[draggedParticle]) {
          const particle = particlesRef.current[draggedParticle];
          
          // Give a stronger kick for touch to compensate for no velocity data
          particle.vx = (Math.random() - 0.5) * 4; // Stronger random velocity
          particle.vy = (Math.random() - 0.5) * 4;
          
          // Set a new random direction
          particle.direction = Math.atan2(particle.vy, particle.vx);
          
          // Reset size
          particle.radius = particle.originalRadius;
        }
      }
      
      setIsDragging(false);
      setDraggedParticle(null);
      setIsInteracting(false);
      
      setTimeout(() => {
        setMousePosition({ x: null, y: null });
      }, 300);
    };
    
    const container = containerRef.current;
    
    // Mouse events
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Touch events
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      // Clean up all event listeners
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, draggedParticle]);
  
  // Canvas animation
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setCanvasSupported(false);
        return;
      }
      
      // Set up high-DPI canvas
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = dimensions.width * devicePixelRatio;
      canvas.height = dimensions.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      
      // Colors based on theme
      const primaryColor = theme === 'dark' ? '#3a72ff' : '#2a5cf0';
      const secondaryColor = theme === 'dark' ? '#6366f1' : '#4f46e5';
      const accentColor = theme === 'dark' ? '#e844ff' : '#d42ddd';
      
      // Create particles
      const particles = [];
      for (let i = 0; i < nodeCount; i++) {
        // Determine color randomly between the three colors
        let color;
        const colorRand = Math.random();
        if (colorRand < 0.4) {
          color = primaryColor;
        } else if (colorRand < 0.8) {
          color = secondaryColor;
        } else {
          color = accentColor;
        }
        
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 1.5, // Reduced speed
          vy: (Math.random() - 0.5) * 1.5, // Reduced speed
          radius: (particleSize * 0.8) + Math.random() * particleSize * 0.6, // Smaller particles
          color: color,
          isBackend: Math.random() > 0.5,
          mass: Math.random() * 1.5 + 0.5, // Slightly heavier for slower movement
          originalRadius: (particleSize * 0.8) + Math.random() * particleSize * 0.6, // Store original radius
          isDragged: false, // Track if this particle is being dragged
          direction: Math.random() * Math.PI * 2 // Random direction for constant motion
        });
      }
      
      // Store particles in ref so event handlers can access them
      particlesRef.current = particles;
      
      // Connection distance
      const maxDistance = dimensions.width * 0.15;
      
      // Draw function
      const draw = () => {
        try {
          // Clear canvas
          ctx.clearRect(0, 0, dimensions.width, dimensions.height);

          // Handle mouse interaction
          const interactionRadius = 150; // Larger mouse interaction radius for easier interaction
          
          // Update particle positions
          particles.forEach((particle, index) => {
            // Update dragged state based on current dragged particle index
            particle.isDragged = (draggedParticle === index);
            
            // Only update position with physics if not being dragged
            if (!particle.isDragged) {
              // Apply mouse attraction for non-dragged particles
              if (mousePosition.x !== null && mousePosition.y !== null && !isDragging) {
                const dx = mousePosition.x - particle.x;
                const dy = mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < interactionRadius) {
                  // Calculate force based on distance - stronger effect
                  const force = (interactionRadius - distance) / interactionRadius;
                  
                  // Attract particles to mouse with stronger force
                  particle.vx += dx * force * 0.03 / particle.mass;
                  particle.vy += dy * force * 0.03 / particle.mass;
                  
                  // Make size increase more noticeable
                  particle.radius = particle.originalRadius * (1 + force * 1.2);
                  
                  // Also change color intensity based on proximity
                  particle.colorIntensity = 1 + force;
                } else {
                  // Gradually return to original size when outside interaction radius
                  if (particle.radius > particle.originalRadius) {
                    particle.radius = Math.max(
                      particle.originalRadius,
                      particle.radius - 0.2
                    );
                  }
                  particle.colorIntensity = 1;
                }
              }
              
              // Add constant motion in random direction for more lively appearance
              const constantSpeed = 0.4; // Lower base speed for gentler motion
              
              // Update direction occasionally for more natural movement
              if (Math.random() < 0.01) { // 1% chance to change direction each frame (less frequent changes)
                particle.direction += (Math.random() - 0.5) * 0.5; // Smaller direction change
              }
              
              // Apply reduced constant motion in current direction
              particle.vx += Math.cos(particle.direction) * constantSpeed * 0.04;
              particle.vy += Math.sin(particle.direction) * constantSpeed * 0.04;
              
              // Apply velocity for non-dragged particles
              particle.x += particle.vx;
              particle.y += particle.vy;
              
              // Increased dampening to slow particles down
              particle.vx *= 0.98;
              particle.vy *= 0.98;
              
              // Bounce off edges
              if (particle.x < 0 || particle.x > dimensions.width) {
                particle.vx = -particle.vx;
                particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
              }
              
              if (particle.y < 0 || particle.y > dimensions.height) {
                particle.vy = -particle.vy;
                particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
              }
            } else {
              // For dragged particles, set special visual properties
              particle.radius = particle.originalRadius * 2.5; // Much larger when dragged
              particle.colorIntensity = 2; // Much brighter when dragged
            }
            
            // Draw particle with enhanced glow effect
            // Outer glow - larger and more visible when interacting
            const glowSize = particle.colorIntensity ? (particle.radius + 3 * (particle.colorIntensity || 1)) : particle.radius + 2;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
            
            // Extract color components to create matching glow
            let glowColor;
            let glowOpacity = particle.colorIntensity ? (0.2 * particle.colorIntensity) : 0.2;
            glowOpacity = Math.min(0.6, glowOpacity); // Cap opacity
            
            if (particle.color === primaryColor) {
              glowColor = theme === 'dark' 
                ? `rgba(58, 114, 255, ${glowOpacity})` 
                : `rgba(42, 92, 240, ${glowOpacity})`;
            } else if (particle.color === secondaryColor) {
              glowColor = theme === 'dark' 
                ? `rgba(99, 102, 241, ${glowOpacity})` 
                : `rgba(79, 70, 229, ${glowOpacity})`;
            } else {
              glowColor = theme === 'dark' 
                ? `rgba(232, 68, 255, ${glowOpacity * 0.75})` 
                : `rgba(212, 45, 221, ${glowOpacity * 0.75})`;
            }
            
            ctx.fillStyle = glowColor;
            ctx.fill();
            
            // Inner particle - brighter when interacting
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            // Make color brighter when interacting
            if (particle.colorIntensity && particle.colorIntensity > 1) {
              // Create a brighter version of the color
              ctx.fillStyle = particle.color; // Base color
              ctx.globalAlpha = 1.2; // Slightly brighter
            } else {
              ctx.fillStyle = particle.color;
              ctx.globalAlpha = 1;
            }
            
            ctx.fill();
            ctx.globalAlpha = 1; // Reset global alpha
            
            // Draw connections
            particles.forEach(other => {
              if (particle === other) return;
              
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // Dramatically increase connection radius when near mouse
              let currentMaxDistance = maxDistance;
              let connectionMultiplier = 1;
              let isNearMouse = false;
              
              if (mousePosition.x !== null) {
                // Check if either particle is near the mouse
                const mouseToParticle1 = Math.sqrt(
                  Math.pow(mousePosition.x - particle.x, 2) + 
                  Math.pow(mousePosition.y - particle.y, 2)
                );
                
                const mouseToParticle2 = Math.sqrt(
                  Math.pow(mousePosition.x - other.x, 2) + 
                  Math.pow(mousePosition.y - other.y, 2)
                );
                
                if (mouseToParticle1 < interactionRadius || mouseToParticle2 < interactionRadius) {
                  // Much greater increase in connection distance
                  connectionMultiplier = 2;
                  isNearMouse = true;
                  currentMaxDistance *= connectionMultiplier;
                }
              }
              
              if (distance < currentMaxDistance) {
                // Calculate opacity based on distance - more visible when near mouse
                let opacity = (1 - distance / currentMaxDistance) * 0.35;
                
                // Increase opacity for connections near mouse
                if (isNearMouse) {
                  opacity = Math.min(0.8, opacity * 2); // Much more visible
                }
                
                // Draw path with gradient for better visibility
                const gradient = ctx.createLinearGradient(
                  particle.x, particle.y, other.x, other.y
                );
                
                if (theme === 'dark') {
                  gradient.addColorStop(0, `rgba(58, 114, 255, ${opacity})`); // primary
                  if (Math.random() > 0.7) {
                    gradient.addColorStop(1, `rgba(99, 102, 241, ${opacity})`); // secondary
                  } else {
                    gradient.addColorStop(1, `rgba(232, 68, 255, ${opacity * 0.8})`); // accent
                  }
                } else {
                  gradient.addColorStop(0, `rgba(42, 92, 240, ${opacity})`); // primary
                  if (Math.random() > 0.7) {
                    gradient.addColorStop(1, `rgba(79, 70, 229, ${opacity})`); // secondary
                  } else {
                    gradient.addColorStop(1, `rgba(212, 45, 221, ${opacity * 0.8})`); // accent
                  }
                }
                
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = gradient;
                
                // Thinner lines for smaller particles, but brighter when interacting
                ctx.lineWidth = isNearMouse ? 1.2 : 0.8;
                
                ctx.stroke();
              }
            });
          });
        } catch (error) {
          console.error("Error in particle animation:", error);
          setCanvasSupported(false);
          if (frameId) {
            cancelAnimationFrame(frameId);
          }
        }
      };
      
      // Animation loop
      const animate = () => {
        draw();
        const id = requestAnimationFrame(animate);
        setFrameId(id);
      };
      
      animate();
      
      // Cleanup
      return () => {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };
    } catch (error) {
      console.error("Error setting up particle animation:", error);
      setCanvasSupported(false);
    }
  }, [dimensions, theme, nodeCount, particleSize, mousePosition, isInteracting]);
  
  if (!canvasSupported) {
    return <ParticleFieldFallback theme={theme} className={className} style={style} />;
  }
  
  return (
    <div 
      ref={containerRef}
      className={className} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab', // Show grab cursor to indicate draggable particles
        ...style 
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.95
        }}
      />
    </div>
  );
};

export default ParticleField;