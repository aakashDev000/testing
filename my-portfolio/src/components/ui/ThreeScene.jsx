import React, { useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

const BackendArchitectureAnimation = ({ className, style = {} }) => {
  const svgRef = useRef(null);
  const { theme } = useTheme();
  
  // Clean, professional color palette
  const colors = {
    primary: theme === 'dark' ? '#0ea5e9' : '#0284c7', // Sky blue
    secondary: theme === 'dark' ? '#22c55e' : '#16a34a', // Green
    accent: theme === 'dark' ? '#f59e0b' : '#d97706', // Amber
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#e2e8f0' : '#334155',
    grid: theme === 'dark' ? '#1e293b' : '#e2e8f0',
    highlight: theme === 'dark' ? '#60a5fa' : '#3b82f6', // Blue highlight
  };
  
  return (
    <div 
      className={`cloud-architecture-animation ${className}`}
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Subtle gradient background */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.05" />
          </linearGradient>
          
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke={colors.grid} strokeWidth="0.5" opacity="0.2" />
          </pattern>
          
          {/* Subtle glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background with subtle gradient */}
        <rect width="400" height="400" fill="url(#bgGradient)" />
        <rect width="400" height="400" fill="url(#grid)" opacity="0.5" />
        
        {/* Clean, Elegant Architecture Diagram */}
        
        {/* Central Cloud Platform */}
        <g className="cloud-platform">
          <circle cx="200" cy="120" r="40" fill="none" stroke={colors.primary} strokeWidth="1" opacity="0.8" />
          <circle cx="200" cy="120" r="30" fill="none" stroke={colors.primary} strokeDasharray="3,3" strokeWidth="1" opacity="0.5" />
          <text x="200" y="125" fontSize="12" textAnchor="middle" fill={colors.text} fontWeight="bold">Cloud Services</text>
        </g>
        
        {/* Backend Services */}
        <g className="backend-nodes">
          {/* Service Nodes - Clean circles with subtle indicators */}
          {[
            { x: 140, y: 220, label: "API", color: colors.primary },
            { x: 200, y: 220, label: "Auth", color: colors.secondary },
            { x: 260, y: 220, label: "Storage", color: colors.highlight }
          ].map((node, i) => (
            <g key={i} className="service-node">
              <circle cx={node.x} cy={node.y} r="25" fill="none" stroke={node.color} strokeWidth="1" opacity="0.8" />
              <text x={node.x} y={node.y + 5} fontSize="10" textAnchor="middle" fill={colors.text}>{node.label}</text>
              
              {/* Very subtle status indicator - barely noticeable */}
              <circle cx={node.x} cy={node.y - 12} r="2" fill={node.color} opacity="0.6">
                <animate 
                  attributeName="opacity" 
                  values="0.4;0.7;0.4" 
                  dur={`${15 + i * 5}s`} 
                  repeatCount="indefinite" 
                  calcMode="spline"
                  keyTimes="0; 0.5; 1"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              </circle>
            </g>
          ))}
        </g>
        
        {/* Clean Connection Lines */}
        <g className="connections">
          {/* Cloud to Services - very smooth paths */}
          <path 
            d="M200,160 C200,170 140,190 140,220" 
            stroke={colors.primary} 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="4 4" 
            opacity="0.6"
          />
          
          <path 
            d="M200,160 C200,180 200,200 200,220" 
            stroke={colors.secondary} 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="4 4" 
            opacity="0.6"
          />
          
          <path 
            d="M200,160 C200,170 260,190 260,220" 
            stroke={colors.highlight} 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="4 4" 
            opacity="0.6"
          />
          
          {/* Service interconnections - elegant curved paths */}
          <path 
            d="M140,220 C140,240 180,240 200,220" 
            stroke={colors.primary} 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="4 4" 
            opacity="0.4"
          />
          
          <path 
            d="M200,220 C200,240 240,240 260,220" 
            stroke={colors.secondary} 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="4 4" 
            opacity="0.4"
          />
          
          <path 
            d="M140,220 C140,260 220,280 260,220" 
            stroke={colors.accent} 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="4 4" 
            opacity="0.3"
          />
        </g>
        
        {/* Data Flow Particles - slow, extremely gentle motion */}
        <g className="data-flow">
          {/* Cloud to API */}
          <circle r="2" fill={colors.primary} opacity="0">
            <animateMotion 
              path="M200,160 C200,170 140,190 140,220" 
              dur="8s" 
              repeatCount="indefinite" 
              rotate="auto"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.6;0" 
              dur="8s" 
              repeatCount="indefinite" 
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
          
          {/* Cloud to Auth */}
          <circle r="2" fill={colors.secondary} opacity="0">
            <animateMotion 
              path="M200,160 C200,180 200,200 200,220" 
              dur="10s" 
              repeatCount="indefinite" 
              rotate="auto"
              begin="2s"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.6;0" 
              dur="10s" 
              repeatCount="indefinite" 
              begin="2s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
          
          {/* Cloud to Storage */}
          <circle r="2" fill={colors.highlight} opacity="0">
            <animateMotion 
              path="M200,160 C200,170 260,190 260,220" 
              dur="9s" 
              repeatCount="indefinite"
              begin="4s"
              rotate="auto"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.6;0" 
              dur="9s" 
              repeatCount="indefinite" 
              begin="4s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
          
          {/* API to Auth - extremely gentle */}
          <circle r="1.5" fill={colors.primary} opacity="0">
            <animateMotion 
              path="M140,220 C140,240 180,240 200,220" 
              dur="15s" 
              repeatCount="indefinite" 
              begin="5s"
              rotate="auto"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.5;0" 
              dur="15s" 
              repeatCount="indefinite" 
              begin="5s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
          
          {/* Auth to Storage - extremely gentle */}
          <circle r="1.5" fill={colors.secondary} opacity="0">
            <animateMotion 
              path="M200,220 C200,240 240,240 260,220" 
              dur="12s" 
              repeatCount="indefinite" 
              begin="8s"
              rotate="auto"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.5;0" 
              dur="12s" 
              repeatCount="indefinite" 
              begin="8s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
          
          {/* Full circle connection */}
          <circle r="1.5" fill={colors.accent} opacity="0">
            <animateMotion 
              path="M140,220 C140,260 220,280 260,220" 
              dur="18s" 
              repeatCount="indefinite" 
              begin="3s"
              rotate="auto"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0;0.4;0" 
              dur="18s" 
              repeatCount="indefinite" 
              begin="3s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
        </g>
        
        {/* Cloud Platform Waves - extremely subtle */}
        <g className="cloud-waves">
          <circle cx="200" cy="120" r="50" fill="none" stroke={colors.primary} strokeWidth="0.5" opacity="0.05">
            <animate 
              attributeName="r" 
              values="45;55;45" 
              dur="20s" 
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0.05;0.1;0.05" 
              dur="20s" 
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
          
          <circle cx="200" cy="120" r="60" fill="none" stroke={colors.secondary} strokeWidth="0.5" opacity="0.05">
            <animate 
              attributeName="r" 
              values="55;65;55" 
              dur="25s" 
              repeatCount="indefinite"
              begin="5s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
            <animate 
              attributeName="opacity" 
              values="0.05;0.08;0.05" 
              dur="25s" 
              repeatCount="indefinite"
              begin="5s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
        </g>
        
        {/* Cloud Service Icons */}
        <g className="cloud-services" transform="translate(180, 100)">
          <rect width="10" height="10" rx="2" fill={colors.primary} opacity="0.7" />
          <rect x="20" width="10" height="10" rx="2" fill={colors.secondary} opacity="0.7" />
          <rect x="10" y="15" width="10" height="10" rx="2" fill={colors.highlight} opacity="0.7" />
        </g>
        
        {/* Decorative elements */}
        <g className="decorative-elements">
          <path 
            d="M340,80 C320,60 300,70 290,90 C280,110 270,90 260,80" 
            fill="none" 
            stroke={colors.primary} 
            strokeWidth="1" 
            opacity="0.2"
          />
          
          <path 
            d="M60,100 C80,80 100,90 110,110 C120,130 130,110 140,100" 
            fill="none" 
            stroke={colors.secondary} 
            strokeWidth="1" 
            opacity="0.2"
          />
          
          <path 
            d="M320,300 C300,320 280,310 270,290 C260,270 250,290 240,300" 
            fill="none" 
            stroke={colors.highlight} 
            strokeWidth="1" 
            opacity="0.2"
          />
        </g>
      </svg>
    </div>
  );
};

export default BackendArchitectureAnimation;