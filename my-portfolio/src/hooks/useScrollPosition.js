import React, { useState, useEffect, useCallback } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Primary scroll handler with Apple-style smooth tracking
  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    const direction = position > prevScrollPosition ? 'down' : 'up';
    
    setScrollDirection(direction);
    setPrevScrollPosition(position);
    setScrollPosition(position);
    
    // Calculate scroll percentage for animations
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = Math.min(position / scrollHeight, 1);
    setScrollPercentage(percentage);
    
    // Calculate parallax offset for Apple-style effects with improved easing
    const maxParallax = 50; // increased max pixels of parallax movement for more dramatic effect
    const newParallaxOffset = percentage * maxParallax;
    setParallaxOffset(newParallaxOffset);
    
    // Update viewport dimensions for animations
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
    
    // Apply parallax offset as CSS variable for use in animations
    document.documentElement.style.setProperty('--parallax-offset', `${newParallaxOffset}px`);
    document.documentElement.style.setProperty('--scroll-percentage', percentage);
    
    // Apply scroll speed for velocity-based animations (Apple style)
    const scrollSpeed = Math.abs(position - prevScrollPosition);
    document.documentElement.style.setProperty('--scroll-speed', scrollSpeed);
    
    // Apply scroll direction for direction-aware animations
    document.documentElement.style.setProperty('--scroll-direction', direction === 'down' ? '1' : '-1');
  }, [prevScrollPosition]);

  // Enhanced Apple-style scroll animations for elements
  const handleScrollAnimations = useCallback(() => {
    // Determine viewport height for calculations
    const viewportHeight = window.innerHeight;
    
    // Animate elements when they enter viewport with advanced timing
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const elementVisible = 100;
      
      // Calculate how far into the viewport the element is
      const distanceFromBottom = viewportHeight - elementTop;
      const percentVisible = Math.min(Math.max(distanceFromBottom / (viewportHeight + elementHeight), 0), 1);
      
      // Apply more sophisticated animation timing based on Apple's style
      if (percentVisible > 0) {
        element.classList.add('visible');
        element.style.setProperty('--element-progress', percentVisible.toFixed(3));
      }
    });
    
    // Slide-in animations for left/right entrances
    document.querySelectorAll('.slide-in-left, .slide-in-right').forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < viewportHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
    
    // Handle staggered animations for role-specific elements
    const staggeredContainers = document.querySelectorAll('.staggered-container');
    staggeredContainers.forEach(container => {
      const containerTop = container.getBoundingClientRect().top;
      const containerHeight = container.getBoundingClientRect().height;
      
      // Calculate container's position relative to viewport
      const distanceFromBottom = viewportHeight - containerTop;
      const percentVisible = Math.min(Math.max(distanceFromBottom / (viewportHeight + containerHeight), 0), 1);
      
      if (percentVisible > 0.1) {
        container.classList.add('visible');
        
        // Add enhanced Apple-style staggered delays
        const staggerItems = container.querySelectorAll('.stagger-item');
        staggerItems.forEach((item, index) => {
          // Cubic bezier easing simulation
          const staggerDelay = 0.15 + (index * 0.08);
          item.style.transitionDelay = `${staggerDelay}s`;
        });
      }
    });
    
    // Backend-specific visualizations with enhanced animations
    const serverElements = document.querySelectorAll('.server-element');
    serverElements.forEach((server, index) => {
      const serverTop = server.getBoundingClientRect().top;
      const serverProgress = 1 - (serverTop / viewportHeight);
      
      if (serverProgress > 0.2) {
        server.classList.add('server-active');
        // Add cascading activation for server rack elements
        server.style.setProperty('--server-progress', Math.min(serverProgress, 1).toFixed(2));
        server.style.setProperty('--server-delay', `${index * 0.15}s`);
      }
    });
    
    // Cloud architecture animations with improved timing
    const cloudElements = document.querySelectorAll('.cloud-element');
    cloudElements.forEach((cloud, index) => {
      const cloudTop = cloud.getBoundingClientRect().top;
      const cloudProgress = 1 - (cloudTop / viewportHeight);
      
      if (cloudProgress > 0.15) {
        cloud.classList.add('cloud-active');
        // Apply custom animation properties
        cloud.style.setProperty('--cloud-progress', Math.min(cloudProgress, 1).toFixed(2));
        cloud.style.setProperty('--cloud-delay', `${index * 0.2}s`);
      }
    });
    
    // Backend data flow animations
    const dataFlowPaths = document.querySelectorAll('.data-flow-path');
    dataFlowPaths.forEach(path => {
      const pathTop = path.getBoundingClientRect().top;
      if (pathTop < viewportHeight * 0.8) {
        path.classList.add('active-flow');
      }
    });
    
    // Animate project cards with 3D perspective
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const cardHeight = card.getBoundingClientRect().height;
      const cardProgress = 1 - (cardTop / viewportHeight);
      
      if (cardProgress > 0.1 && cardProgress < 1.2) {
        card.classList.add('in-view');
        
        // Calculate 3D rotation based on scroll position (Apple style)
        const rotateX = Math.min(Math.max((0.5 - cardProgress) * 15, -7.5), 7.5);
        card.style.setProperty('--card-rotate-x', `${rotateX}deg`);
      } else {
        card.classList.remove('in-view');
      }
    });
  }, []);
  
  // Handle 3D hover effect for cards
  const apply3DHoverEffect = useCallback((e) => {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      
      // Check if mouse is over this card
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        // Calculate rotation based on mouse position within card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Max rotation is 5 degrees
        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = ((centerY - y) / centerY) * 5;
        
        // Apply rotation via CSS variables
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
        
        // Add highlight effect
        card.classList.add('card-hovering');
      } else {
        // Reset card rotation when mouse is not over it
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
        card.classList.remove('card-hovering');
      }
    });
  }, []);

  useEffect(() => {
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    window.addEventListener('mousemove', apply3DHoverEffect);
    
    // Initial calls
    handleScroll();
    handleScrollAnimations();
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollAnimations);
      window.removeEventListener('mousemove', apply3DHoverEffect);
    };
  }, [handleScroll, handleScrollAnimations, apply3DHoverEffect]);

  return { 
    scrollPosition, 
    scrollDirection, 
    parallaxOffset,
    scrollPercentage 
  };
};