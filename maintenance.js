const CONFIG = window.MAINTENANCE_CONFIG;

const $ = (selector) => document.querySelector(selector);
const actionButton = $("#action-button");
const maintenanceStart = Date.parse(CONFIG.start);
const maintenanceEnd = Date.parse(CONFIG.end);

function updateMaintenance(now = Date.now()) {
  const isActive =
    CONFIG.enabled &&
    now >= maintenanceStart &&
    now < maintenanceEnd;

  if (!isActive) {
    window.location.replace(CONFIG.dashboardUrl);
  }
}

actionButton.addEventListener("click", () => {
  actionButton.classList.add("refreshing");
  actionButton.disabled = true;
  setTimeout(() => window.location.reload(), 450);
});

function initParticles() {
  const canvas = $("#particles");
  const context = canvas.getContext("2d");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let particles = [];

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: Math.min(38, Math.floor(innerWidth / 32)) }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      radius: Math.random() + .25,
      speed: Math.random() * .05 + .02,
      alpha: Math.random() * .28 + .06
    }));
  }

  function draw() {
    context.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach((particle) => {
      particle.y -= particle.speed;
      if (particle.y < -3) particle.y = innerHeight + 3;
      context.beginPath();
      context.fillStyle = `rgba(133,167,218,${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });
    if (!reducedMotion) requestAnimationFrame(draw);
  }

  resize();
  addEventListener("resize", resize, { passive: true });
  draw();
}

updateMaintenance();
setInterval(updateMaintenance, 1000);
initParticles();
