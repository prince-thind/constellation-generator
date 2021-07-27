(() => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });

  const particlesArray = [];

  const state = {
    mouseX: undefined,
    mouseY: undefined,
    hue: 0,
  };

  function generateParticles(event) {
    state.mouseX = event.x;
    state.mouseY = event.y;
    for (let i = 0; i < 5; i++) {
      particlesArray.push(new Particle(i));
    }
  }
  canvas.addEventListener('mousemove', generateParticles);
  canvas.addEventListener('click', generateParticles);

  class Particle {
    constructor() {
      this.x = state.mouseX;
      this.y = state.mouseY;
      this.size = Math.random() * 10 + 1;
      this.speedX = Math.random() * 4 - 2;
      this.speedy = Math.random() * 4 - 2;
      this.color = 'hsl(' + state.hue + ',100%,50%)';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedy;
      if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
    }
  }

  function handleParticles() {
    state.hue++;
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].draw();
      particlesArray[i].update();

      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < 80 && distance > 50) {
          ctx.beginPath();
          ctx.strokeStyle = particlesArray[i].color;
          ctx.lineWidth = 1;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }

      if (particlesArray[i].size <= 0.2) {
        particlesArray.splice(i, 1);
        i--;
      }
    }
  }
  function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
  }

  animate();
})();
