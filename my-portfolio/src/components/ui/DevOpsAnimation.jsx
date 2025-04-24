import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const DevOpsAnimation = ({ className, style = {} }) => {
  const { theme } = useTheme();

  // Updated colors based on theme with the new professional palette
  const colors = {
    primary: theme === 'dark' ? '#5aa4f8' : '#2d7ff3',
    secondary: theme === 'dark' ? '#859aec' : '#5871e3',
    accent: theme === 'dark' ? '#8d89f7' : '#6366f1',
    text: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 41, 59, 0.7)',
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
  };

  // Code snippets for the background (right side focused)
  const codeSnippets = [
    { id: 'html1', content: '<ServerlessArchitecture>', x: 55, y: 12, color: colors.accent, size: '18px', duration: 4, delay: 0 },
    { id: 'js1', content: 'const aws = require("aws-sdk");', x: 68, y: 18, color: colors.primary, size: '16px', duration: 5, delay: 0.5 },
    { id: 'js2', content: 'const lambda = new aws.Lambda();', x: 75, y: 24, color: colors.text, size: '14px', duration: 4.5, delay: 1 },
    { id: 'cmd1', content: 'terraform apply -auto-approve', x: 65, y: 32, color: colors.secondary, size: '15px', duration: 6, delay: 0.2 },
    { id: 'cmd2', content: 'aws cognito-idp create-user-pool', x: 58, y: 40, color: colors.secondary, size: '15px', duration: 5.5, delay: 1.5 },
    { id: 'cmd3', content: 'aws appsync create-graphql-api', x: 80, y: 48, color: colors.secondary, size: '16px', duration: 4, delay: 0.8 },
    { id: 'js3', content: 'const { GraphQLResolveInfo } = require("graphql");', x: 72, y: 56, color: colors.primary, size: '14px', duration: 3.5, delay: 2 },
    { id: 'html2', content: '</ServerlessArchitecture>', x: 65, y: 64, color: colors.accent, size: '18px', duration: 5, delay: 1.2 },
    { id: 'cmd4', content: 'aws ec2 describe-vpc-endpoints', x: 78, y: 72, color: colors.secondary, size: '15px', duration: 4.5, delay: 0.3 },
    { id: 'js4', content: 'mongoose.connect(process.env.MONGODB_URI);', x: 60, y: 80, color: colors.primary, size: '14px', duration: 5, delay: 1 },
    { id: 'js5', content: 'exports.handler = async (event) => {', x: 70, y: 88, color: colors.primary, size: '16px', duration: 4, delay: 1.8 },
  ];

  // Left side subtle code elements
  const leftCodeElements = [
    { id: 'left1', content: 'async function getSecrets()', x: 5, y: 20, color: colors.primary, size: '14px', duration: 7, delay: 1.5, opacity: 0.2 },
    { id: 'left2', content: 'GraphQLSchema', x: 15, y: 35, color: colors.accent, size: '16px', duration: 6, delay: 3, opacity: 0.2 },
    { id: 'left3', content: 'vpc.createEndpoint()', x: 5, y: 50, color: colors.secondary, size: '14px', duration: 8, delay: 2, opacity: 0.2 },
    { id: 'left4', content: 'cognitoIdentityServiceProvider', x: 20, y: 65, color: colors.primary, size: '16px', duration: 7, delay: 1, opacity: 0.2 },
    { id: 'left5', content: 'setupHipaaCompliance()', x: 8, y: 80, color: colors.accent, size: '14px', duration: 6, delay: 0.5, opacity: 0.2 },
  ];

  // Architecture nodes for the animation (right side focused)
  const architectureNodes = [
    { id: 'server1', type: 'rect', x: 60, y: 25, width: 12, height: 18, color: colors.primary, pulse: true, delay: 0 },
    { id: 'server2', type: 'rect', x: 80, y: 35, width: 12, height: 18, color: colors.secondary, pulse: true, delay: 1 },
    { id: 'db1', type: 'circle', x: 70, y: 65, radius: 8, color: colors.accent, pulse: true, delay: 0.5 },
    { id: 'client1', type: 'circle', x: 55, y: 55, radius: 5, color: colors.secondary, pulse: false, delay: 0 },
    { id: 'client2', type: 'circle', x: 85, y: 75, radius: 5, color: colors.secondary, pulse: false, delay: 0 },
  ];

  // Connection lines for the architecture (right side focused)
  const connections = [
    { id: 'conn1', x1: 55, y1: 55, x2: 60, y2: 25, color: colors.primary, animated: true },
    { id: 'conn2', x1: 72, y1: 25, x2: 80, y2: 35, color: colors.primary, animated: true },
    { id: 'conn3', x1: 60, y1: 43, x2: 70, y2: 65, color: colors.accent, animated: true },
    { id: 'conn4', x1: 85, y1: 75, x2: 70, y2: 65, color: colors.accent, animated: true },
    { id: 'conn5', x1: 80, y1: 53, x2: 70, y2: 65, color: colors.secondary, animated: true },
  ];

  // Moving data points
  const dataPoints = [
    { id: 'data1', path: 'M55,55 L58,45 L60,25', color: colors.primary, duration: 3, delay: 0 },
    { id: 'data2', path: 'M72,25 L76,30 L80,35', color: colors.secondary, duration: 2.5, delay: 1 },
    { id: 'data3', path: 'M60,43 L65,54 L70,65', color: colors.accent, duration: 4, delay: 0.5 },
    { id: 'data4', path: 'M85,75 L77,70 L70,65', color: colors.accent, duration: 3.5, delay: 2 },
    { id: 'data5', path: 'M80,53 L75,59 L70,65', color: colors.secondary, duration: 3, delay: 1.5 },
  ];

  // Larger data flows
  const dataFlows = [
    { 
      id: 'flow1', 
      path: 'M60,25 C65,30 70,35 80,35 C85,45 75,55 70,65 C65,70 60,60 55,55 C57,45 58,35 60,25', 
      color: colors.primary, 
      duration: 10 
    },
    { 
      id: 'flow2', 
      path: 'M80,35 C75,45 72,55 70,65 C75,70 80,72 85,75 C87,65 85,55 80,35', 
      color: colors.secondary, 
      duration: 8 
    },
  ];

  // Binary data animation (0s and 1s columns) - right side focused
  const binaryColumns = Array.from({ length: 8 }, (_, i) => ({
    id: `binary-${i}`,
    x: 45 + i * 8,
    chars: Array.from({ length: 12 }, () => Math.round(Math.random())),
    speed: 1 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.15,
  }));

  // Left side binary columns (more subtle)
  const leftBinaryColumns = Array.from({ length: 3 }, (_, i) => ({
    id: `left-binary-${i}`,
    x: 10 + i * 10,
    chars: Array.from({ length: 8 }, () => Math.round(Math.random())),
    speed: 1.5 + Math.random() * 2,
    opacity: 0.05 + Math.random() * 0.08,
  }));

  // Floating tech keywords - distributed across screen
  const techKeywords = [
    // Right side (more visible)
    { id: 'tech1', content: 'AWS AppSync', x: 75, y: 10, color: colors.accent, size: '20px', duration: 8, delay: 0, opacity: 0.6 },
    { id: 'tech2', content: 'GraphQL', x: 85, y: 25, color: colors.primary, size: '22px', duration: 9, delay: 2, opacity: 0.6 },
    { id: 'tech3', content: 'Serverless', x: 65, y: 45, color: colors.secondary, size: '18px', duration: 7, delay: 1, opacity: 0.6 },
    { id: 'tech4', content: 'Node.js', x: 80, y: 60, color: colors.accent, size: '20px', duration: 7.5, delay: 3, opacity: 0.6 },
    { id: 'tech5', content: 'Terraform', x: 60, y: 75, color: colors.primary, size: '24px', duration: 8.5, delay: 0.5, opacity: 0.6 },
    
    // Left side (subtle)
    { id: 'tech6', content: 'MongoDB', x: 10, y: 15, color: colors.primary, size: '16px', duration: 9, delay: 1, opacity: 0.15 },
    { id: 'tech7', content: 'HIPAA', x: 15, y: 40, color: colors.accent, size: '14px', duration: 8, delay: 2.5, opacity: 0.15 },
    { id: 'tech8', content: 'LangGraph', x: 5, y: 60, color: colors.secondary, size: '16px', duration: 9.5, delay: 0.8, opacity: 0.15 },
    { id: 'tech9', content: 'Cognito', x: 20, y: 80, color: colors.primary, size: '16px', duration: 7.5, delay: 3.5, opacity: 0.15 },
  ];

  // Small moving dots (across entire background)
  const movingDots = Array.from({ length: 30 }, (_, i) => {
    const isRight = i > 15; // Determine if dot should be on right or left side
    return {
      id: `dot-${i}`,
      x: isRight ? 50 + Math.random() * 48 : 2 + Math.random() * 45,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      color: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent,
      duration: 40 + Math.random() * 60,
      delay: Math.random() * 10,
      opacity: isRight ? 0.3 + Math.random() * 0.3 : 0.1 + Math.random() * 0.15,
    };
  });

  return (
    <div 
      className={`devops-animation ${className || ''}`} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        ...style 
      }}
    >
      {/* Base styling for enhanced visuals */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes floatSideways {
            0% { transform: translate(0px, 0px); }
            33% { transform: translate(8px, -5px); }
            66% { transform: translate(-5px, 5px); }
            100% { transform: translate(0px, 0px); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.2; }
            50% { opacity: 0.6; }
            100% { opacity: 0.2; }
          }
          
          @keyframes dash {
            to { stroke-dashoffset: -20; }
          }
          
          @keyframes flowDot {
            0% { 
              offset-distance: 0%;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% { 
              offset-distance: 100%;
              opacity: 0;
            }
          }
          
          @keyframes flowPath {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -20; }
          }
          
          @keyframes fall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(1000%); }
          }
          
          @keyframes glow {
            0% { filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0)); }
            50% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
            100% { filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0)); }
          }
          
          @keyframes fadeInOut {
            0% { opacity: 0.1; }
            50% { opacity: 0.8; }
            100% { opacity: 0.1; }
          }
          
          @keyframes moveDot {
            0% { transform: translate(0, 0); }
            25% { transform: translate(var(--random1), var(--random2)); }
            50% { transform: translate(var(--random3), var(--random4)); }
            75% { transform: translate(var(--random5), var(--random6)); }
            100% { transform: translate(0, 0); }
          }
          
          .code-snippet {
            position: absolute;
            font-family: monospace;
            white-space: nowrap;
            animation: float var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
            text-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
            font-weight: 500;
            z-index: 5;
          }
          
          .tech-keyword {
            position: absolute;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            white-space: nowrap;
            animation: floatSideways var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
            text-shadow: 0 0 10px rgba(var(--shadow-color), 0.5);
            z-index: 10;
          }
          
          .architecture-node {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.1));
          }
          
          .pulse {
            animation: pulse 3s ease-in-out infinite;
            animation-delay: var(--delay);
          }
          
          .glow {
            animation: glow 4s ease-in-out infinite;
          }
          
          .connection-line {
            stroke-dasharray: 5, 5;
            opacity: 0.3;
          }
          
          .animated {
            animation: dash 15s linear infinite;
          }
          
          .binary-char {
            font-family: monospace;
            font-size: 14px;
            opacity: var(--opacity);
            color: ${colors.text};
            animation: fall var(--speed) linear infinite;
            animation-delay: calc(var(--index) * -0.1s);
          }
          
          .data-point {
            offset-path: path(var(--path));
            offset-rotate: 0deg;
            animation: flowDot var(--duration) infinite ease-in-out;
            animation-delay: var(--delay);
            filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
          }
          
          .data-flow {
            animation: pulse 10s infinite ease-in-out;
            stroke-dasharray: 3, 6;
            stroke-width: 1.5;
            fill: none;
            opacity: 0.15;
          }
          
          .dot {
            position: absolute;
            border-radius: 50%;
            animation: moveDot var(--duration) infinite ease-in-out;
            animation-delay: var(--delay);
          }
        `}
      </style>

      {/* Background hexagonal grid */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
        <defs>
          <pattern id="hexGrid" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path d="M25,0 L50,14.3 L50,38.7 L25,50 L0,38.7 L0,14.3 Z" 
                  fill="none" 
                  stroke={colors.primary} 
                  strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>

      {/* Moving dots across the entire background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {movingDots.map((dot) => (
          <div
            key={dot.id}
            className="dot"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              opacity: dot.opacity,
              '--duration': `${dot.duration}s`,
              '--delay': `${dot.delay}s`,
              '--random1': `${-20 + Math.random() * 40}px`,
              '--random2': `${-20 + Math.random() * 40}px`,
              '--random3': `${-20 + Math.random() * 40}px`,
              '--random4': `${-20 + Math.random() * 40}px`,
              '--random5': `${-20 + Math.random() * 40}px`,
              '--random6': `${-20 + Math.random() * 40}px`,
            }}
          />
        ))}
      </div>

      {/* Tech keywords - both sides with different opacity */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {techKeywords.map((keyword) => {
          const shadowColor = keyword.color === colors.primary 
            ? '59, 130, 246' 
            : keyword.color === colors.secondary 
              ? '99, 102, 241' 
              : '236, 72, 153';
          
          return (
            <div
              key={keyword.id}
              className="tech-keyword glow"
              style={{
                left: `${keyword.x}%`,
                top: `${keyword.y}%`,
                color: keyword.color,
                fontSize: keyword.size,
                opacity: keyword.opacity,
                '--duration': `${keyword.duration}s`,
                '--delay': `${keyword.delay}s`,
                '--shadow-color': shadowColor,
              }}
            >
              {keyword.content}
            </div>
          );
        })}
      </div>

      {/* Code snippets - right side */}
      <div className="absolute inset-0 overflow-hidden z-5">
        {codeSnippets.map((snippet) => (
          <div
            key={snippet.id}
            className="code-snippet glow"
            style={{
              left: `${snippet.x}%`,
              top: `${snippet.y}%`,
              color: snippet.color,
              fontSize: snippet.size,
              opacity: 0.6,
              '--duration': `${snippet.duration}s`,
              '--delay': `${snippet.delay}s`,
            }}
          >
            {snippet.content}
          </div>
        ))}
      </div>

      {/* Subtle left side code elements */}
      <div className="absolute inset-0 overflow-hidden z-5">
        {leftCodeElements.map((element) => (
          <div
            key={element.id}
            className="code-snippet"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              color: element.color,
              fontSize: element.size,
              opacity: element.opacity,
              '--duration': `${element.duration}s`,
              '--delay': `${element.delay}s`,
            }}
          >
            {element.content}
          </div>
        ))}
      </div>

      {/* Architecture diagram */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-30 z-15">
        {/* Larger data flows */}
        {dataFlows.map((flow) => (
          <path
            key={flow.id}
            d={flow.path}
            stroke={flow.color}
            className="data-flow"
            style={{ 
              animationDuration: `${flow.duration}s`,
            }}
          />
        ))}
        
        {/* Connection lines */}
        {connections.map((conn) => (
          <line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke={conn.color}
            strokeWidth="1.5"
            className={`connection-line ${conn.animated ? 'animated' : ''}`}
          />
        ))}

        {/* Architecture nodes */}
        {architectureNodes.map((node) => {
          if (node.type === 'rect') {
            return (
              <rect
                key={node.id}
                x={`${node.x}%`}
                y={`${node.y}%`}
                width={`${node.width}%`}
                height={`${node.height}%`}
                rx="3"
                fill="none"
                stroke={node.color}
                strokeWidth="1.5"
                className={`architecture-node ${node.pulse ? 'pulse' : ''}`}
                style={{ '--delay': `${node.delay}s` }}
              />
            );
          } else {
            return (
              <circle
                key={node.id}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={`${node.radius}%`}
                fill="none"
                stroke={node.color}
                strokeWidth="1.5"
                className={`architecture-node ${node.pulse ? 'pulse' : ''}`}
                style={{ '--delay': `${node.delay}s` }}
              />
            );
          }
        })}
        
        {/* Moving data points */}
        {dataPoints.map((point) => (
          <circle
            key={point.id}
            r="4"
            fill={point.color}
            className="data-point"
            style={{
              '--path': point.path,
              '--duration': `${point.duration}s`,
              '--delay': `${point.delay}s`,
            }}
          />
        ))}
      </svg>

      {/* Binary data animation - right side columns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {binaryColumns.map((column) => (
          <div
            key={column.id}
            style={{
              position: 'absolute',
              left: `${column.x}%`,
              top: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {column.chars.map((char, i) => (
              <div
                key={`${column.id}-${i}`}
                className="binary-char"
                style={{
                  '--speed': `${column.speed * 10}s`,
                  '--opacity': column.opacity,
                  '--index': i,
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Left side binary columns (more subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {leftBinaryColumns.map((column) => (
          <div
            key={column.id}
            style={{
              position: 'absolute',
              left: `${column.x}%`,
              top: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {column.chars.map((char, i) => (
              <div
                key={`${column.id}-${i}`}
                className="binary-char"
                style={{
                  '--speed': `${column.speed * 10}s`,
                  '--opacity': column.opacity,
                  '--index': i,
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Cloud symbols */}
      <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none opacity-10 z-0">
        {/* Right side cloud */}
        <path 
          d="M340,30 Q350,20 360,25 Q370,15 380,25 Q390,20 395,30 Q405,30 400,40 Q405,50 395,55 Q390,65 380,60 Q370,70 360,60 Q350,65 345,55 Q335,55 340,45 Q330,40 340,30" 
          fill={colors.primary}
          className="pulse"
        />
          
        <path 
          d="M380,140 Q390,130 400,135 Q410,125 420,135 Q430,130 435,140 Q445,140 440,150 Q445,160 435,165 Q430,175 420,170 Q410,180 400,170 Q390,175 385,165 Q375,165 380,155 Q370,150 380,140" 
          fill={colors.secondary}
          className="pulse"
          style={{ animationDelay: '-1.5s' }}
        />

        {/* Left side smaller cloud */}
        <path 
          d="M100,80 Q105,75 110,77 Q115,72 120,77 Q125,75 127,80 Q132,80 130,85 Q132,90 127,92 Q125,97 120,95 Q115,100 110,95 Q105,97 102,92 Q97,92 100,87 Q95,85 100,80" 
          fill={colors.primary}
          className="pulse"
          style={{ opacity: '0.6', animationDelay: '-1s' }}
        />
      </svg>
      
      {/* Dark mode specific elements for enhanced visibility */}
      {theme === 'dark' && (
        <div className="absolute inset-0 z-10">
          {/* Extra glowing nodes in dark mode */}
          {[...Array(5)].map((_, i) => {
            const x = 15 + Math.random() * 70;
            const y = 10 + Math.random() * 80;
            return (
              <motion.div
                key={`glow-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: 4 + Math.random() * 8,
                  height: 4 + Math.random() * 8,
                  background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0) 70%)',
                  filter: 'blur(2px)'
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.4, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Gradient overlays to enhance text readability while allowing some animation */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-light to-transparent dark:from-dark dark:to-transparent z-20 opacity-70"></div>
    </div>
  );
};

export default DevOpsAnimation;