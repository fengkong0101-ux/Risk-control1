const canvas = document.querySelector("#particles");
const context = canvas.getContext("2d");
let particles = [];

function resizeParticles() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(38, Math.floor(innerWidth / 32)) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    radius: Math.random() + 0.25,
    speed: Math.random() * 0.05 + 0.02,
    alpha: Math.random() * 0.28 + 0.06
  }));
}

function drawParticles() {
  context.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach((particle) => {
    particle.y -= particle.speed;
    if (particle.y < -3) particle.y = innerHeight + 3;
    context.beginPath();
    context.fillStyle = `rgba(133,167,218,${particle.alpha})`;
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();
  });
  requestAnimationFrame(drawParticles);
}

document.querySelector("#refresh-button").addEventListener("click", () => {
  window.location.reload();
});

resizeParticles();
addEventListener("resize", resizeParticles, { passive: true });
drawParticles();
