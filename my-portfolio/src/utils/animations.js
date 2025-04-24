// animations.js - Utility functions for animations

/**
 * Helper function to add scroll animation classes based on intersection observer
 * @param {Element} element - The DOM element to observe
 * @param {Object} options - Intersection Observer options
 */
export const setupScrollAnimation = () => {
  const animateElements = document.querySelectorAll(
    '.scroll-animate-left, .scroll-animate-right, .stagger-on-scroll'
  );
  
  if (animateElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });
  
  animateElements.forEach((element) => {
    observer.observe(element);
  });
};

// Framer Motion variants for consistent animations
export const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.6
    }
  }
};

export const itemLeftVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 18,
      mass: 0.8,
      duration: 0.4
    }
  }
};

export const itemRightVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 18,
      mass: 0.8,
      duration: 0.4
    }
  }
};

export const fadeUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 18,
      mass: 0.8,
      duration: 0.4
    }
  }
};

// Scroll-driven timeline effect configuration
export const timelineScrollConfig = {
  offset: ["start end", "end start"],
  smooth: true
};

// Card hover effects
export const cardHoverAnimation = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};

// Service card smooth 3D tilt effect
export const create3DTiltEffect = (element, options = {}) => {
  const defaults = {
    max: 10, // max rotation in degrees
    perspective: 1000, // perspective value
    scale: 1.03, // scale on hover
    speed: 500 // speed of the transition
  };
  
  const config = { ...defaults, ...options };
  
  if (!element) return;
  
  element.addEventListener('mousemove', e => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = config.max * mouseX / (rect.width / 2);
    const rotateX = -config.max * mouseY / (rect.height / 2);
    
    // Apply transformation
    element.style.transform = `perspective(${config.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${config.scale}, ${config.scale}, ${config.scale})`;
    element.style.transition = `transform ${config.speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
  });
  
  element.addEventListener('mouseleave', () => {
    // Reset transformation when mouse leaves
    element.style.transform = `perspective(${config.perspective}px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    element.style.transition = `transform ${config.speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
  });
};