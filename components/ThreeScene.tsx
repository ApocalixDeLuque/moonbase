"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, OrbitControls, Html } from "@react-three/drei"
import { Color } from "three"

// Componente personalizado de Html para evitar el cuadrado negro
function CustomHtml({ position, children }: { position: [number, number, number], children: React.ReactNode }) {
  return (
    <Html
      position={position}
      transform
      occlude
      distanceFactor={10}
      style={{
        backgroundColor: 'transparent',
        padding: '4px 8px',
        borderRadius: '4px',
        pointerEvents: 'none'
      }}
    >
      {children}
    </Html>
  );
}

// Componente para las estrellas con efecto de brillo
function StarField() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={0.5}
      fade
      speed={1}
    />
  )
}

// Componente para las constelaciones
function Constellations() {
  const constellationsData = [
    {
      name: "Osa Mayor",
      stars: [
        [0.2, 0.3, -10],
        [0.25, 0.28, -12],
        [0.3, 0.25, -11],
        [0.33, 0.2, -13],
        [0.35, 0.25, -11],
        [0.38, 0.3, -10],
        [0.32, 0.32, -12],
      ],
      connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 1],
      ],
    },
    {
      name: "Orión",
      stars: [
        [0.7, 0.6, -8],
        [0.73, 0.55, -9],
        [0.75, 0.5, -10],
        [0.72, 0.45, -11],
        [0.68, 0.45, -9],
        [0.65, 0.5, -8],
        [0.67, 0.55, -10],
        [0.7, 0.52, -9],
      ],
      connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 0],
        [7, 2],
        [7, 5],
      ],
    },
    {
      name: "Casiopea",
      stars: [
        [0.5, 0.2, -5],
        [0.55, 0.18, -6],
        [0.6, 0.2, -7],
        [0.65, 0.18, -6],
        [0.7, 0.2, -5],
      ],
      connections: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ],
    },
  ]

  const { viewport } = useThree()
  const [hoveredConstellation, setHoveredConstellation] = useState<number | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = -Math.PI / 6
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Ligero movimiento de la escena
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {constellationsData.map((constellation, constellationIndex) => {
        const isHovered = hoveredConstellation === constellationIndex
        const scale = isHovered ? 1.2 : 1
        const brightness = isHovered ? 1.0 : 0.6
        
        return (
          <group 
            key={constellation.name}
            onPointerOver={() => setHoveredConstellation(constellationIndex)}
            onPointerOut={() => setHoveredConstellation(null)}
          >
            {/* Connections */}
            {constellation.connections.map(([i, j], idx) => {
              const start = constellation.stars[i]
              const end = constellation.stars[j]
              return (
                <line key={`${constellation.name}-line-${idx}`}>
                  <bufferGeometry attach="geometry">
                    <float32BufferAttribute 
                      attach="attributes-position" 
                      args={[new Float32Array([
                        (start[0] - 0.5) * viewport.width,
                        (start[1] - 0.5) * viewport.height,
                        start[2],
                        (end[0] - 0.5) * viewport.width,
                        (end[1] - 0.5) * viewport.height,
                        end[2]
                      ]), 3]} 
                    />
                  </bufferGeometry>
                  <lineBasicMaterial 
                    attach="material" 
                    color="#B5C7FF" 
                    opacity={brightness * 0.7}
                    transparent 
                    linewidth={1}
                  />
                </line>
              )
            })}
            
            {/* Stars */}
            {constellation.stars.map((pos, idx) => (
              <group key={`${constellation.name}-star-${idx}`}>
                {/* Glow */}
                <sprite
                  position={[
                    (pos[0] - 0.5) * viewport.width,
                    (pos[1] - 0.5) * viewport.height,
                    pos[2]
                  ]}
                  scale={[scale * 4, scale * 4, scale * 4]}
                >
                  <spriteMaterial
                    attach="material"
                    map={(() => {
                      // Crear una textura procedural para el glow
                      const size = 128;
                      const canvas = document.createElement('canvas');
                      canvas.width = size;
                      canvas.height = size;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        // Crear un gradiente radial
                        const gradient = ctx.createRadialGradient(
                          size / 2, size / 2, 0, 
                          size / 2, size / 2, size / 2
                        );
                        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                        gradient.addColorStop(0.5, 'rgba(200, 220, 255, 0.5)');
                        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, size, size);
                      }
                      
                      const texture = new THREE.CanvasTexture(canvas);
                      return texture;
                    })()}
                    color="#B5C7FF"
                    opacity={brightness * 0.7}
                    transparent
                  />
                </sprite>
                
                {/* Star */}
                <mesh
                  position={[
                    (pos[0] - 0.5) * viewport.width,
                    (pos[1] - 0.5) * viewport.height,
                    pos[2]
                  ]}
                  scale={scale}
                >
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshBasicMaterial
                    color="#FFFFFF"
                    opacity={brightness}
                    transparent
                  />
                </mesh>
              </group>
            ))}
            
            {/* Constellation name */}
            {isHovered && (
              <CustomHtml
                position={[
                  (constellation.stars.reduce((sum, s) => sum + s[0], 0) / constellation.stars.length - 0.5) * viewport.width,
                  (constellation.stars.reduce((sum, s) => sum + s[1], 0) / constellation.stars.length - 0.5) * viewport.height + 2,
                  constellation.stars[0][2]
                ]}
              >
                <div className="font-bold text-xl text-white bg-black/30 px-3 py-1 rounded-lg">
                  {constellation.name}
                </div>
              </CustomHtml>
            )}
          </group>
        )
      })}
    </group>
  )
}

// Mejorar la iluminación de la luna y su posición
function Moon() {
  const moonRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
  // Calcular una posición más adecuada para la luna
  const moonPosition = useMemo(() => {
    return [viewport.width * 0.35, viewport.height * 0.25, -15] as [number, number, number];
  }, [viewport.width, viewport.height]);
  
  // Crear una textura procedural para la luna
  const moonTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base color - gradiente radial para efecto 3D
      const gradient = ctx.createRadialGradient(
        size * 0.5, size * 0.45, size * 0.1,
        size * 0.5, size * 0.5, size * 0.5
      );
      gradient.addColorStop(0, '#FFFFFF');  // Centro más brillante
      gradient.addColorStop(0.3, '#F1F2FF'); 
      gradient.addColorStop(0.6, '#DADFFE'); // Tono principal
      gradient.addColorStop(0.8, '#B5C7FF'); // Bordes más oscuros
      gradient.addColorStop(1, '#9C96D0');   // Borde exterior con tinte morado
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      // Añadir cráteres
      const craterCount = 35;
      for (let i = 0; i < craterCount; i++) {
        const craterSize = Math.random() * 60 + 10;
        const x = Math.random() * size;
        const y = Math.random() * size;
        
        // Gradiente para el cráter
        const craterGradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, craterSize
        );
        
        // Ajuste de color para cráteres - usar color primario (morado)
        const alpha = Math.random() * 0.3 + 0.1; // Transparencia variada
        craterGradient.addColorStop(0, `rgba(125, 86, 131, ${alpha})`); // Color morado de primary
        craterGradient.addColorStop(0.6, `rgba(125, 86, 131, ${alpha * 0.7})`);
        craterGradient.addColorStop(1, 'rgba(125, 86, 131, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, craterSize, 0, Math.PI * 2);
        ctx.fillStyle = craterGradient;
        ctx.fill();
        
        // Borde sutil para algunos cráteres
        if (Math.random() > 0.7) {
          ctx.beginPath();
          ctx.arc(x, y, craterSize - 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Añadir detalles de superficie - pequeñas variaciones de textura
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const detailSize = Math.random() * 2 + 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, detailSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
        ctx.fill();
      }
      
      // Añadir un tinte morado sutil en toda la superficie
      ctx.fillStyle = 'rgba(125, 86, 131, 0.1)';
      ctx.fillRect(0, 0, size, size);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);
  
  // Crear textura para el desplazamiento (bump map)
  const bumpTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, size, size);
      
      // Crear cráteres para el mapa de desplazamiento
      const craterCount = 50;
      for (let i = 0; i < craterCount; i++) {
        const craterSize = Math.random() * 80 + 20;
        const x = Math.random() * size;
        const y = Math.random() * size;
        
        const craterGradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, craterSize
        );
        
        if (Math.random() > 0.5) {
          // Cráter hundido
          craterGradient.addColorStop(0, 'black');
          craterGradient.addColorStop(0.7, 'gray');
          craterGradient.addColorStop(1, 'white');
        } else {
          // Cráter con borde elevado
          craterGradient.addColorStop(0, 'black');
          craterGradient.addColorStop(0.4, 'gray');
          craterGradient.addColorStop(0.7, 'white');
          craterGradient.addColorStop(0.9, 'gray');
          craterGradient.addColorStop(1, 'black');
        }
        
        ctx.beginPath();
        ctx.arc(x, y, craterSize, 0, Math.PI * 2);
        ctx.fillStyle = craterGradient;
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);
  
  useFrame((state) => {
    if (moonRef.current) {
      // Rotación lenta y suave
      moonRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      // Ligero movimiento oscilante para dar más vida
      moonRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
    }
  });

  return (
    <group position={moonPosition}>
      {/* Luz ambiental para la luna - colocarla antes para que afecte a la luna */}
      <pointLight
        position={[5, 5, 10]}
        color="#B5C7FF"
        intensity={1.2}
        distance={30}
      />
      
      {/* Luna */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          map={moonTexture}
          bumpMap={bumpTexture}
          bumpScale={0.15}
          color="#FFFFFF"
          emissive="#7D5683"
          emissiveIntensity={0.15}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Brillo ambiental alrededor de la luna */}
      <sprite position={[0, 0, -0.5]} scale={[12, 12, 1]}>
        <spriteMaterial
          attach="material"
          map={(() => {
            const size = 256;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const gradient = ctx.createRadialGradient(
                size / 2, size / 2, size * 0.1,
                size / 2, size / 2, size * 0.5
              );
              gradient.addColorStop(0, 'rgba(181, 199, 255, 0.3)');
              gradient.addColorStop(0.3, 'rgba(181, 199, 255, 0.2)');
              gradient.addColorStop(0.6, 'rgba(125, 86, 131, 0.1)');
              gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
              
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, size, size);
            }
            return new THREE.CanvasTexture(canvas);
          })()}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

// Efecto de partículas flotantes
function FloatingParticles() {
  const particles = useRef<THREE.Points>(null)
  const count = 200
  
  // Crear posiciones aleatorias
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 50
      positions[i3 + 1] = (Math.random() - 0.5) * 50
      positions[i3 + 2] = (Math.random() - 0.5) * 50
      
      // Color entre primario y secundario
      const color = new Color("#7D5683").lerp(new Color("#B5C7FF"), Math.random())
      color.toArray(colors, i3)
      
      sizes[i] = Math.random() * 0.5 + 0.1
    }
  }, [])
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.getElapsedTime() * 0.02
      particles.current.rotation.y = state.clock.getElapsedTime() * 0.01
    }
  })
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          args={[colors, 3]}
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          args={[sizes, 1]}
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeScene({ scrollY = 0, heroHeight = 0 }: { scrollY?: number, heroHeight?: number }) {
  // Calculate opacity and background transition based on scroll position
  const transitionPoint = heroHeight * 0.3 // Start transition at 30% of scroll through hero
  const transitionLength = heroHeight * 0.3 // Complete transition over 30% of hero height
  
  // Calculate scene opacity (fade out as scroll increases)
  const sceneOpacity = Math.max(0, 1 - Math.max(0, (scrollY - transitionPoint) / transitionLength))
  
  // Get theme variables
  const getThemeColor = () => {
    const root = document.documentElement
    const theme = root.getAttribute('data-theme') || 'starlit'
    
    // Get background color based on current theme
    if (theme === 'starlit') {
      return '#140E36' // --background from starlit theme
    } else {
      return '#0A0A0D' // --background from midnight theme
    }
  }
  
  // Calculate background color transition
  const currentThemeColor = typeof window !== 'undefined' ? getThemeColor() : '#140E36'
  
  return (
    <div 
      className="absolute inset-0 z-0"
      style={{ 
        opacity: sceneOpacity,
        transition: 'opacity 0.2s ease-out',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        style={{
          background: `linear-gradient(to bottom, #0D0923, #140E36, #271E40)`,
          mixBlendMode: 'normal',
        }}
        shadows
      >
        <fog attach="fog" args={['#0D0923', 30, 60]} />
        <ambientLight intensity={0.2} />
        
        <StarField />
        <Constellations />
        <Moon />
        <FloatingParticles />
        
        {/* Controles orbitales, con configuración mejorada */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.3}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 3}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
