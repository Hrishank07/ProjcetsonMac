'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Create a simple placeholder component for SSR
const TunnelEffectPlaceholder = () => (
  <div className="fixed top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-gray-900 to-black opacity-80" />
);

// Create a component that will only render on the client side
const TunnelEffectClient = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import Three.js and GSAP only on the client side
    const initTunnel = async () => {
      try {
        if (!containerRef.current) return;
        
        const THREE = await import('three');
        const { gsap } = await import('gsap');

        // Scene, Camera, and Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 0;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x141414);
        containerRef.current.appendChild(renderer.domElement);

        // Shader Uniforms
        const uniforms = {
          uSmoothness: { value: 1.0 },
          uGridDensity: { value: 26.0 },
          uNoiseScale: { value: 10.0 },
          uNoiseSpeed: { value: 0.5 },
          uNoiseStrength: { value: 0.15 },
          uEnableDisplacement: { value: true },
          uTime: { value: 0.0 },
          uWireColor: { value: new THREE.Color(0xB1DD8C) },
          uBaseColor: { value: new THREE.Color(0x141414) }
        };

        // Wireframe Shader Material
        const wireframeMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uSmoothness;
            uniform float uGridDensity;
            uniform float uNoiseScale;
            uniform float uNoiseSpeed;
            uniform float uNoiseStrength;
            uniform bool uEnableDisplacement;
            uniform float uTime;
            uniform vec3 uWireColor;
            uniform vec3 uBaseColor;

            varying vec2 vUv;

            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }

            float noise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);

                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));

                vec2 u = f * f * (3.0 - 2.0 * f);

                return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            void main() {
                vec2 grid = abs(fract(vUv * uGridDensity - 0.5) - 0.5);
                vec2 gridWidth = fwidth(vUv * uGridDensity);
                float lineX = smoothstep(0.0, gridWidth.x * uSmoothness, grid.x);
                float lineY = smoothstep(0.0, gridWidth.y * uSmoothness, grid.y);
                float line = 1.0 - min(lineX, lineY);

                float noiseValue = 0.0;
                if (uEnableDisplacement) {
                    noiseValue = noise(vUv * uNoiseScale + uTime * uNoiseSpeed) * uNoiseStrength;
                }

                vec3 finalColor = mix(uBaseColor, uWireColor, line);
                finalColor += noiseValue;

                gl_FragColor = vec4(finalColor, 1.0);
            }
          `,
          side: THREE.BackSide
        });

        // Tunnel Path and Tube
        const path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, -10),
          new THREE.Vector3(3, 2, -20),
          new THREE.Vector3(-3, -2, -30),
          new THREE.Vector3(0, 0, -40),
          new THREE.Vector3(2, 1, -50),
          new THREE.Vector3(-2, -1, -60),
          new THREE.Vector3(0, 0, -70),
        ]);

        const geometry = new THREE.TubeGeometry(path, 300, 2, 32, false);
        const tube = new THREE.Mesh(geometry, wireframeMaterial);
        scene.add(tube);

        // Mouse Movement
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e: MouseEvent) => {
          mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Camera Animation
        let percentage = { value: 0 };
        const animation = gsap.to(percentage, {
          value: 1,
          duration: 10,
          ease: "linear",
          repeat: -1,
          onUpdate: () => {
            const p1 = path.getPointAt(percentage.value);
            const p2 = path.getPointAt((percentage.value + 0.01) % 1);
            const shakeX = mouse.x * 0.3;
            const shakeY = mouse.y * 0.3;
            camera.position.set(p1.x + shakeX, p1.y + shakeY, p1.z);
            camera.lookAt(p2);
          }
        });

        // Add lights
        const blueLight = new THREE.PointLight(0x4169E1, 1, 50);
        blueLight.position.set(5, 5, -30);
        scene.add(blueLight);

        const yellowLight = new THREE.PointLight(0xFFD700, 1, 50);
        yellowLight.position.set(-5, -5, -50);
        scene.add(yellowLight);

        // Animation Loop
        const render = () => {
          uniforms.uTime.value += 0.01;
          renderer.render(scene, camera);
        };
        gsap.ticker.add(render);

        // Window Resize Handling
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Clean up
        return () => {
          if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement);
          }
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("mousemove", handleMouseMove);
          gsap.ticker.remove(render);
          animation.kill();
          geometry.dispose();
          wireframeMaterial.dispose();
          renderer.dispose();
        };
      } catch (error) {
        console.error("Error initializing tunnel effect:", error);
        // Return a fallback cleanup function
        return () => {};
      }
    };

    initTunnel();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

// Use dynamic import with ssr: false to ensure this component only renders on client
const TunnelEffect = dynamic(() => Promise.resolve(TunnelEffectClient), {
  ssr: false,
  loading: () => <TunnelEffectPlaceholder />
});

export default TunnelEffect; 