const planets = {
  mercury: {
    name: "Mercury",
    order: "1st planet from the Sun",
    texture: "images/textures/mercury.jpg",
    glow: "rgba(190, 190, 178, .45)",
    className: "",
    quick: "Small, rocky, cratered world",
    diameter: "3,032 miles",
    day: "59 Earth days",
    year: "88 Earth days",
    atmosphere: "Very thin exosphere",
    highlight: "Mercury has extreme temperatures because it has almost no atmosphere to trap heat.",
    source: "https://science.nasa.gov/mercury/facts/"
  },
  venus: {
    name: "Venus",
    order: "2nd planet from the Sun",
    texture: "images/textures/venus.jpg",
    glow: "rgba(255, 190, 83, .48)",
    className: "",
    quick: "Cloud-covered volcanic planet",
    diameter: "7,521 miles",
    day: "243 Earth days",
    year: "225 Earth days",
    atmosphere: "Thick carbon dioxide clouds",
    highlight: "Venus is the hottest planet in the solar system because its thick atmosphere traps heat.",
    source: "https://science.nasa.gov/venus/facts/"
  },
  earth: {
    name: "Earth",
    order: "3rd planet from the Sun",
    texture: "images/textures/earth.jpg",
    glow: "rgba(82, 170, 255, .55)",
    className: "",
    quick: "Ocean world with life",
    diameter: "7,926 miles",
    day: "24 hours",
    year: "365.25 days",
    atmosphere: "Nitrogen and oxygen",
    highlight: "Earth is the only planet currently known to support life and stable surface liquid water.",
    source: "https://science.nasa.gov/earth/facts/"
  },
  mars: {
    name: "Mars",
    order: "4th planet from the Sun",
    texture: "images/textures/mars.jpg",
    glow: "rgba(255, 111, 45, .52)",
    className: "",
    quick: "The Red Planet",
    diameter: "4,222 miles",
    day: "24.6 hours",
    year: "687 Earth days",
    atmosphere: "Thin carbon dioxide atmosphere",
    highlight: "Mars has evidence of a wetter, warmer past and remains one of the strongest targets for robotic exploration.",
    source: "https://science.nasa.gov/mars/facts/"
  },
  jupiter: {
    name: "Jupiter",
    order: "5th planet from the Sun",
    texture: "images/textures/jupiter.jpg",
    glow: "rgba(240, 188, 118, .55)",
    className: "",
    quick: "Largest planet, storm bands",
    diameter: "86,881 miles",
    day: "About 10 hours",
    year: "11.9 Earth years",
    atmosphere: "Hydrogen and helium",
    highlight: "Jupiter is the largest planet in the solar system and contains the famous Great Red Spot storm.",
    source: "https://science.nasa.gov/jupiter/facts/"
  },
  saturn: {
    name: "Saturn",
    order: "6th planet from the Sun",
    texture: "images/textures/saturn.jpg",
    glow: "rgba(255, 220, 142, .55)",
    className: "saturn",
    quick: "Gas giant with bright rings",
    diameter: "74,897 miles",
    day: "About 10.7 hours",
    year: "29.4 Earth years",
    atmosphere: "Hydrogen and helium",
    highlight: "Saturn is known for its complex ring system made mostly of ice and rock particles.",
    source: "https://science.nasa.gov/saturn/facts/"
  },
  uranus: {
    name: "Uranus",
    order: "7th planet from the Sun",
    texture: "images/textures/uranus.jpg",
    glow: "rgba(113, 239, 255, .48)",
    className: "",
    quick: "Tilted ice giant",
    diameter: "31,518 miles",
    day: "About 17 hours",
    year: "84 Earth years",
    atmosphere: "Hydrogen, helium, methane",
    highlight: "Uranus rotates on its side, giving it one of the strangest axial tilts in the solar system.",
    source: "https://science.nasa.gov/uranus/facts/"
  },
  neptune: {
    name: "Neptune",
    order: "8th planet from the Sun",
    texture: "images/textures/neptune.jpg",
    glow: "rgba(58, 113, 255, .55)",
    className: "",
    quick: "Blue ice giant",
    diameter: "30,599 miles",
    day: "About 16 hours",
    year: "165 Earth years",
    atmosphere: "Hydrogen, helium, methane",
    highlight: "Neptune is the farthest major planet from the Sun and is known for powerful winds and dark storm systems.",
    source: "https://science.nasa.gov/neptune/facts/"
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  $$(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

function setupNav() {
  const toggle = $(".nav-toggle");
  const nav = $(".nav-links");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function planetCSS(planet) {
  return `--planet-glow: ${planet.glow};`;
}

function buildDestinationCards() {
  const grid = $("#destinationGrid");
  if (!grid) return;
  grid.innerHTML = Object.entries(planets).map(([key, planet]) => `
    <button class="planet-card" data-planet="${key}" style="--glow: ${planet.glow};" aria-label="Launch to ${planet.name}">
      <div class="mini-planet ${planet.className}" aria-hidden="true">
        <span class="mini-ring mini-ring-back"></span>
        <div class="mini-sphere">
          <div class="surface-strip">
            <img src="${planet.texture}" alt="">
            <img src="${planet.texture}" alt="">
          </div>
        </div>
        <span class="mini-ring mini-ring-front"></span>
      </div>
      <strong>${planet.name}</strong>
      <span>${planet.order}</span>
      <div class="launch-label">Launch route</div>
    </button>
  `).join("");

  $$(".planet-card").forEach(card => {
    card.addEventListener("click", () => launchTo(card.dataset.planet));
  });
}

function updateDashboard(key) {
  const planet = planets[key] || planets.earth;
  const stage = $("#planetStage");
  const sphere = $("#planetSphere");
  const title = $("#planetTitle");
  const subtitle = $("#planetSubtitle");
  const note = $("#planetNote");
  const source = $("#planetSource");
  const sourceInline = $("#planetSourceInline");
  const status = $("#missionStatus");
  const route = $("#routeStatus");

  if (stage) stage.className = `planet-stage ${planet.className}`;
  if (sphere) {
    sphere.setAttribute("style", planetCSS(planet));
    sphere.setAttribute("aria-label", `Rotating realistic visual of ${planet.name}`);
    const textureA = $("#planetTextureA");
    const textureB = $("#planetTextureB");
    if (textureA) textureA.src = planet.texture;
    if (textureB) textureB.src = planet.texture;
  }
  if (title) title.textContent = planet.name;
  if (subtitle) subtitle.textContent = `${planet.order} • ${planet.quick}`;
  if (note) note.textContent = planet.highlight;
  if (source) {
    source.href = planet.source;
    source.textContent = `NASA fact source for ${planet.name}`;
  }
  if (sourceInline) sourceInline.href = planet.source;
  if (status) status.textContent = `Arrived at ${planet.name}. Planetary dashboard unlocked.`;
  if (route) route.textContent = `${planet.name.toUpperCase()} ROUTE ACTIVE`;

  const fields = {
    diameterValue: planet.diameter,
    dayValue: planet.day,
    yearValue: planet.year,
    atmosphereValue: planet.atmosphere
  };
  Object.entries(fields).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

let warpAnimation = null;
let currentLaunchKey = "earth";

function setupTravel() {
  const randomBtn = $("#randomLaunch");
  const skipBtn = $("#skipArrival");
  if (randomBtn) {
    randomBtn.addEventListener("click", () => {
      const keys = Object.keys(planets);
      const key = keys[Math.floor(Math.random() * keys.length)];
      launchTo(key);
    });
  }
  if (skipBtn) {
    skipBtn.addEventListener("click", finishLaunch);
  }
}

function launchTo(key) {
  currentLaunchKey = key;
  const planet = planets[key] || planets.earth;
  const overlay = $("#travelOverlay");
  const arrivalOrb = $("#arrivalOrb");
  const destination = $("#warpDestination");
  const stage = $("#warpStage");
  const velocity = $("#warpVelocity");
  const signal = $("#warpSignal");
  const progress = $("#warpProgress");

  if (!overlay) {
    updateDashboard(key);
    return;
  }

  overlay.classList.add("active");
  overlay.classList.toggle("saturn-route", planet.className === "saturn");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (arrivalOrb) {
    arrivalOrb.classList.remove("reveal");
    arrivalOrb.setAttribute("style", planetCSS(planet));
    const arrivalA = $("#arrivalTextureA");
    const arrivalB = $("#arrivalTextureB");
    if (arrivalA) arrivalA.src = planet.texture;
    if (arrivalB) arrivalB.src = planet.texture;
  }
  if (destination) destination.textContent = `LOCKED: ${planet.name.toUpperCase()}`;
  if (stage) stage.textContent = "Ignition sequence";
  if (velocity) velocity.textContent = "0 km/s";
  if (signal) signal.textContent = "Searching";
  if (progress) progress.style.width = "0%";

  if (prefersReducedMotion) {
    setTimeout(finishLaunch, 450);
    return;
  }

  runWarpCanvas(key);
}

function finishLaunch() {
  if (warpAnimation) cancelAnimationFrame(warpAnimation);
  warpAnimation = null;
  const overlay = $("#travelOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    overlay.classList.remove("saturn-route");
    overlay.setAttribute("aria-hidden", "true");
  }
  document.body.style.overflow = "";
  updateDashboard(currentLaunchKey);
  const dashboard = $("#arrivalDashboard");
  if (dashboard) dashboard.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}

function runWarpCanvas(key) {
  const canvas = $("#warpCanvas");
  const ctx = canvas.getContext("2d");
  const stage = $("#warpStage");
  const velocity = $("#warpVelocity");
  const signal = $("#warpSignal");
  const progress = $("#warpProgress");
  const arrivalOrb = $("#arrivalOrb");
  const planet = planets[key] || planets.earth;
  const stars = [];
  const starCount = 760;
  let start = performance.now();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function resetStar(star, initial = false) {
    star.x = (Math.random() - .5) * innerWidth * 2.1;
    star.y = (Math.random() - .5) * innerHeight * 2.1;
    star.z = initial ? Math.random() * innerWidth : innerWidth;
    star.pz = star.z;
    star.size = Math.random() * 1.8 + .4;
    star.hue = Math.random() < .72 ? 190 : (Math.random() < .5 ? 260 : 42);
  }

  resize();
  window.addEventListener("resize", resize, { once: true });
  for (let i = 0; i < starCount; i++) {
    const star = {};
    resetStar(star, true);
    stars.push(star);
  }

  function draw(now) {
    const elapsed = now - start;
    const t = Math.min(elapsed / 6200, 1);
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const speed = 9 + Math.pow(t, 1.7) * 95;

    ctx.fillStyle = `rgba(0, 3, 12, ${t < .75 ? .34 : .22})`;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    // luminous tunnel
    const gradient = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, Math.max(innerWidth, innerHeight) * .62);
    gradient.addColorStop(0, `rgba(101,244,255,${.18 + t*.08})`);
    gradient.addColorStop(.25, "rgba(101,244,255,.04)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    for (const star of stars) {
      star.pz = star.z;
      star.z -= speed;
      if (star.z < 1) resetStar(star);

      const sx = centerX + star.x / star.z * innerWidth;
      const sy = centerY + star.y / star.z * innerWidth;
      const px = centerX + star.x / star.pz * innerWidth;
      const py = centerY + star.y / star.pz * innerWidth;
      const alpha = Math.min(1, (1 - star.z / innerWidth) + .2);
      ctx.strokeStyle = `hsla(${star.hue}, 100%, ${72 + t*15}%, ${alpha})`;
      ctx.lineWidth = Math.min(4.5, star.size + t * 2.5);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(sx, sy);
      ctx.stroke();
    }

    const pct = Math.round(t * 100);
    if (progress) progress.style.width = `${pct}%`;
    if (velocity) velocity.textContent = `${Math.round(speed * 320)} km/s`;
    if (signal) signal.textContent = t > .72 ? "Signal acquired" : t > .35 ? "Warp corridor stable" : "Calibrating";
    if (stage) {
      stage.textContent = t < .22 ? "Ignition sequence" :
        t < .55 ? "Entering deep-space corridor" :
        t < .78 ? "Approaching orbital shadow" :
        `Arrival vector: ${planet.name}`;
    }

    if (t > .72 && arrivalOrb && !arrivalOrb.classList.contains("reveal")) {
      arrivalOrb.classList.add("reveal");
    }

    if (t >= 1) {
      setTimeout(finishLaunch, 450);
      return;
    }

    warpAnimation = requestAnimationFrame(draw);
  }

  warpAnimation = requestAnimationFrame(draw);
}

function setupQuiz() {
  const result = $("#quizResult");
  $$(".quiz-options button").forEach(button => {
    button.addEventListener("click", () => {
      const correct = button.dataset.answer === "mars";
      if (result) {
        result.textContent = correct ? "Correct. Mars is known as the Red Planet." : "Not quite. The Red Planet is Mars.";
      }
      $$(".quiz-options button").forEach(b => b.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
    });
  });
}

function setupContactForm() {
  const form = $("#missionForm");
  const message = $("#formMessage");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const planet = String(formData.get("planet") || "").trim();
    const mission = String(formData.get("mission") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    const errors = [];
    if (name.length < 2) errors.push("Enter a real name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid email address.");
    if (!planet) errors.push("Choose a favorite planet.");
    if (!mission) errors.push("Choose a mission type.");
    if (notes.length < 10) errors.push("Write at least 10 characters in the message box.");

    if (errors.length) {
      alert("Mission form errors:\n\n" + errors.join("\n"));
      if (message) {
        message.textContent = "Please fix the form errors and try again.";
        message.classList.add("show");
      }
      return;
    }

    if (message) {
      message.textContent = `Mission request received. ${name}, your ${mission.toLowerCase()} route to ${planet} has been logged.`;
      message.classList.add("show");
    }
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setupNav();
  buildDestinationCards();
  setupTravel();
  setupQuiz();
  setupContactForm();
  updateDashboard("earth");
});
