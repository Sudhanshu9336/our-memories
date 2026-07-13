import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";

const ParticlesBg = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        particles: {
          color: { value: ["#e11d48", "#f43f5e", "#fb7185"] },
          links: { enable: false },
          move: {
            direction: "none", enable: true, outModes: { default: "bounce" },
            random: true, speed: 1, straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 40 },
          opacity: { value: { min: 0.1, max: 0.5 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default ParticlesBg;
