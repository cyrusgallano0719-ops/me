// Galaxy Background Effect - Vanilla JavaScript
(function() {
  let canvas = null;
  let ctx = null;
  let animationId = null;
  let particles = [];
  let isRunning = false;

  const config = {
    particleCount: 100,
    particleSpeed: 0.3,
    lineDistance: 120,
    colors: ['#ffffff', '#8ab4f8', '#c084fc'],
    backgroundColor: 'rgba(11, 15, 26, 1)',
    fps: 60,
    fpsInterval: 1000 / 60
  };

  class Particle {
    constructor(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * config.particleSpeed;
      this.vy = (Math.random() - 0.5) * config.particleSpeed;
      this.size = Math.random() * 4 + 2;
      this.opacity = 1;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.width = width;
      this.height = height;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0) this.x = this.width;
      if (this.x > this.width) this.x = 0;
      if (this.y < 0) this.y = this.height;
      if (this.y > this.height) this.y = 0;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawLines() {
    ctx.strokeStyle = '#8ab4f8';
    ctx.globalAlpha = 0.4;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.lineDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function animate() {
    // TEST: Fill entire canvas with bright red to see if anything renders
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    console.log('[Galaxy] Frame rendered at', new Date().toLocaleTimeString());
    
    animationId = requestAnimationFrame(animate);
  }

  function handleResize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function handleMouseHover(e) {
    if (!isRunning) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const repulsionDistance = 100;

    particles.forEach(p => {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < repulsionDistance) {
        const angle = Math.atan2(dy, dx);
        const force = (repulsionDistance - distance) / repulsionDistance;
        p.vx += Math.cos(angle) * force * 0.5;
        p.vy += Math.sin(angle) * force * 0.5;
      }
    });
  }

  window.GalaxyEffect = {
    enable: function() {
      if (isRunning) return;
      
      console.log('[Galaxy] Enabling...');
      
      // Create canvas
      canvas = document.createElement('canvas');
      canvas.id = 'galaxy-canvas';
      canvas.className = 'galaxy-canvas';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      console.log('[Galaxy] Canvas size:', canvas.width, 'x', canvas.height);
      
      document.body.insertBefore(canvas, document.body.firstChild);
      
      ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('[Galaxy] Failed to get canvas context!');
        return;
      }
      
      console.log('[Galaxy] Canvas context initialized');
      
      // Initialize particles
      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
      
      console.log('[Galaxy] Particles initialized:', particles.length);
      
      // Set up event listeners
      window.addEventListener('resize', handleResize);
      canvas.addEventListener('mousemove', handleMouseHover);
      
      isRunning = true;
      animate();
      console.log('[Galaxy] Enabled successfully');
    },

    disable: function() {
      if (!isRunning) return;
      
      console.log('[Galaxy] Disabling...');
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      if (canvas) {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousemove', handleMouseHover);
        canvas.remove();
      }
      
      particles = [];
      canvas = null;
      ctx = null;
      isRunning = false;
      console.log('[Galaxy] Disabled successfully');
    },

    isActive: function() {
      return isRunning;
    }
  };
})();
