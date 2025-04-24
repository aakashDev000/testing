import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

// Fallback SVG animation for browsers with Canvas issues
const ServerAnimationFallback = ({ width = 300, height = 200, theme, className = '' }) => {
  const primaryColor = theme === 'dark' ? '#10b981' : '#059669';
  const secondaryColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
  const bgColor = theme === 'dark' ? '#0f172a' : '#f8fafc';
  const textColor = theme === 'dark' ? '#94a3b8' : '#475569';
  
  return (
    <div 
      className={className}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        opacity: 0.7,
        position: 'relative'
      }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        {/* Server 1 - Database */}
        <rect x="50" y="40" width="40" height="20" rx="2" fill={secondaryColor} fillOpacity="0.5" />
        <text x="70" y="53" fontSize="8" textAnchor="middle" fill={textColor}>DB</text>
        <circle cx="82" cy="45" r="2" fill="#ffffff">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Server 2 - API */}
        <rect x="180" y="60" width="40" height="20" rx="2" fill={primaryColor} fillOpacity="0.5" />
        <text x="200" y="73" fontSize="8" textAnchor="middle" fill={textColor}>API</text>
        <circle cx="212" cy="65" r="2" fill="#ffffff">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
        </circle>
        
        {/* Server 3 - APP */}
        <rect x="90" y="120" width="40" height="20" rx="2" fill={primaryColor} fillOpacity="0.5" />
        <text x="110" y="133" fontSize="8" textAnchor="middle" fill={textColor}>APP</text>
        <circle cx="122" cy="125" r="2" fill="#ffffff">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Server 4 - API */}
        <rect x="200" y="140" width="40" height="20" rx="2" fill={primaryColor} fillOpacity="0.5" />
        <text x="220" y="153" fontSize="8" textAnchor="middle" fill={textColor}>API</text>
        <circle cx="232" cy="145" r="2" fill="#ffffff">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" />
        </circle>
        
        {/* Connection lines */}
        <line x1="70" y1="60" x2="110" y2="120" stroke={secondaryColor} strokeDasharray="3,3" strokeWidth="0.8" className="network-line" />
        <line x1="70" y1="60" x2="200" y2="60" stroke={secondaryColor} strokeDasharray="3,3" strokeWidth="0.8" className="network-line" />
        <line x1="130" y1="120" x2="200" y2="140" stroke={primaryColor} strokeDasharray="3,3" strokeWidth="0.8" className="network-line" />
        <line x1="200" y1="80" x2="220" y2="140" stroke={primaryColor} strokeDasharray="3,3" strokeWidth="0.8" className="network-line" />
        
        {/* Data packets */}
        <circle r="3" fill={secondaryColor}>
          <animateMotion path="M70,60 L110,120" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <circle r="2" fill={primaryColor}>
          <animateMotion path="M70,60 L200,60" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        <circle r="2" fill={secondaryColor}>
          <animateMotion path="M130,120 L200,140" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        
        <circle r="3" fill={primaryColor}>
          <animateMotion path="M200,80 L220,140" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

const ServerAnimation = ({ width = 300, height = 200, className = '' }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const [canvasSupported, setCanvasSupported] = useState(true);
  const [frameId, setFrameId] = useState(null);
  
  // Animation properties
  const serverCount = 6;
  const connectionCount = 8;
  const packetCount = 10;
  
  // Colors based on theme
  const colors = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    server: theme === 'dark' ? '#334155' : '#94a3b8',
    serverHighlight: theme === 'dark' ? '#475569' : '#cbd5e1',
    connection: theme === 'dark' ? '#1e293b' : '#e2e8f0',
    packetPrimary: theme === 'dark' ? '#10b981' : '#059669',
    packetSecondary: theme === 'dark' ? '#3b82f6' : '#2563eb',
    text: theme === 'dark' ? '#94a3b8' : '#475569'
  };
  
  // Draw canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setCanvasSupported(false);
        return;
      }
      
      // Set actual canvas dimensions
      canvas.width = width * (window.devicePixelRatio || 1);
      canvas.height = height * (window.devicePixelRatio || 1);
      
      // Scale context to account for high DPI displays
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      
      // Create servers
      const servers = Array.from({ length: serverCount }, (_, i) => ({
        id: i,
        x: Math.random() * 0.8 * width + width * 0.1,
        y: Math.random() * 0.8 * height + height * 0.1,
        width: 30 + Math.random() * 20,
        height: 15 + Math.random() * 10,
        pulseOffset: Math.random() * Math.PI * 2,
        type: i % 3 === 0 ? 'database' : i % 3 === 1 ? 'app' : 'api'
      }));
      
      // Create connections
      const connections = [];
      for (let i = 0; i < connectionCount; i++) {
        const source = servers[Math.floor(Math.random() * servers.length)];
        let target;
        do {
          target = servers[Math.floor(Math.random() * servers.length)];
        } while (target.id === source.id);
        
        connections.push({
          id: i,
          source,
          target,
          speed: 0.2 + Math.random() * 0.8
        });
      }
      
      // Create packets
      const packets = Array.from({ length: packetCount }, (_, i) => {
        const connection = connections[Math.floor(Math.random() * connections.length)];
        return {
          id: i,
          connection,
          position: Math.random(),
          speed: 0.001 + Math.random() * 0.005,
          size: 2 + Math.random() * 3,
          color: i % 2 === 0 ? colors.packetPrimary : colors.packetSecondary,
          active: Math.random() > 0.3
        };
      });
      
      // Animation functions
      const drawServer = (server, time) => {
        const pulse = (Math.sin(time * 3 + server.pulseOffset) + 1) / 8;
        
        ctx.fillStyle = colors.server;
        ctx.strokeStyle = colors.serverHighlight;
        ctx.lineWidth = 1;
        
        // Draw a simple rectangle for server
        ctx.beginPath();
        ctx.rect(server.x, server.y, server.width, server.height);
        ctx.fill();
        ctx.stroke();
        
        // Status LED
        ctx.fillStyle = server.type === 'database' ? colors.packetSecondary : colors.packetPrimary;
        ctx.beginPath();
        ctx.arc(
          server.x + server.width - 5,
          server.y + 5,
          2 + pulse * 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // Labels
        ctx.fillStyle = colors.text;
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        let label = server.type === 'database' ? 'DB' : 
                 server.type === 'app' ? 'APP' : 'API';
        ctx.fillText(label, server.x + server.width / 2, server.y + server.height / 2 + 3);
      };
      
      const drawConnection = (connection) => {
        ctx.beginPath();
        ctx.moveTo(
          connection.source.x + connection.source.width / 2,
          connection.source.y + connection.source.height / 2
        );
        ctx.lineTo(
          connection.target.x + connection.target.width / 2,
          connection.target.y + connection.target.height / 2
        );
        
        ctx.strokeStyle = colors.connection;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      };
      
      const drawPacket = (packet, time) => {
        if (!packet.active) return;
        
        const srcX = packet.connection.source.x + packet.connection.source.width / 2;
        const srcY = packet.connection.source.y + packet.connection.source.height / 2;
        const tgtX = packet.connection.target.x + packet.connection.target.width / 2;
        const tgtY = packet.connection.target.y + packet.connection.target.height / 2;
        
        // Calculate position along connection line
        packet.position += packet.speed;
        if (packet.position > 1) {
          packet.position = 0;
        }
        
        const x = srcX + (tgtX - srcX) * packet.position;
        const y = srcY + (tgtY - srcY) * packet.position;
        
        // Draw packet
        ctx.beginPath();
        ctx.arc(x, y, packet.size, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.fill();
      };
      
      // Animation loop
      const animate = (time) => {
        try {
          // Clear canvas
          ctx.clearRect(0, 0, width, height);
          
          // Draw elements
          connections.forEach(connection => drawConnection(connection));
          servers.forEach(server => drawServer(server, time / 1000));
          packets.forEach(packet => drawPacket(packet, time / 1000));
          
          // Request next frame
          const id = requestAnimationFrame(animate);
          setFrameId(id);
        } catch (error) {
          console.error("Error in server animation:", error);
          setCanvasSupported(false);
          cancelAnimationFrame(frameId);
        }
      };
      
      // Start animation
      const id = requestAnimationFrame(animate);
      setFrameId(id);
      
      // Cleanup animation on unmount
      return () => {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };
    } catch (error) {
      console.error("Error setting up server animation:", error);
      setCanvasSupported(false);
    }
  }, [width, height, serverCount, connectionCount, packetCount, colors, theme]);
  
  // If canvas isn't supported, render SVG fallback
  if (!canvasSupported) {
    return (
      <ServerAnimationFallback 
        width={width} 
        height={height} 
        theme={theme} 
        className={className} 
      />
    );
  }
  
  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        opacity: 0.7
      }} 
    />
  );
};

export default ServerAnimation;