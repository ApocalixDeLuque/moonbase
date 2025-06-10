"use client"

import Spline from '@splinetool/react-spline'
import { useState, useEffect } from 'react'

// Definimos tipos para Spline
interface SplineObject {
  findObjectByName: (name: string) => any;
}

// Este componente utiliza directamente la biblioteca oficial de Spline
// para renderizar el modelo 3D con la luna
const MoonSplineScene = ({ scrollY = 0, heroHeight = 0 }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculamos la opacidad basada en el scroll
  const transitionPoint = heroHeight * 0.3;
  const transitionLength = heroHeight * 0.3;
  const sceneOpacity = transitionLength > 0 
    ? Math.max(0, 1 - Math.max(0, (scrollY - transitionPoint) / transitionLength))
    : 1;
  
  // Función que se ejecuta cuando el modelo está cargado
  const handleLoad = (spline: SplineObject) => {
    setIsLoading(false);
    
    // Asegurar que la luna sea visible destacándola
    if (spline) {
      const moon = spline.findObjectByName('MOON');
      if (moon) {
        moon.visible = true;
        // Podemos ajustar otras propiedades para destacar la luna si es necesario
      }
    }
  };
  
  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ 
        opacity: isLoading ? 0 : sceneOpacity,
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      {/* Contenedor con recorte estratégico para ocultar la marca de agua */}
      <div className="absolute inset-0 overflow-hidden" style={{ height: 'calc(100% + 30px)' }}>
        {/* Posicionamos el componente de manera que la parte inferior derecha quede fuera del área visible */}
        <div className="absolute inset-0" style={{ marginBottom: '-250px' }}>
          {/* Componente Spline con el modelo 3D */}
          <Spline
            scene="https://prod.spline.design/tl3xShxRq-DfK6sh/scene.splinecode"
            onLoad={handleLoad}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
      
      {/* Capa adicional para bloquear cualquier interacción con la marca de agua */}
      <div className="absolute bottom-0 right-0 w-32 h-16 bg-transparent z-20"></div>
    </div>
  );
};

export default MoonSplineScene;
