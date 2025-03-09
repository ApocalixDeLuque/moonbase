"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Server, Cloud, Brain, GitBranch, Search, X} from "lucide-react"

export default function Technologies() {
    const technologies = {
        frontend: ["React", "Next.js", "Three.js", "TailwindCSS"],
        backend: ["Node.js", "Python", "SpringBoot"],
        cloud: ["AWS", "Google Cloud", "Azure"],
        ai: ["TensorFlow", "OpenAI"],
        devOps: ["Docker", "Kubernetes", "CI/CD"],
    }

    // Estado compartido entre visualizaciones
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [activeTech, setActiveTech] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Referencias para el mapa mental
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

    // Actualizar tamaño del contenedor del mapa mental
    useEffect(() => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            })
        }

        const handleResize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                })
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Funciones de utilidad para iconos y colores
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "frontend":
                return <Code2 className="h-5 w-5" />
            case "backend":
                return <Server className="h-5 w-5" />
            case "cloud":
                return <Cloud className="h-5 w-5" />
            case "ai":
                return <Brain className="h-5 w-5" />
            case "devOps":
                return <GitBranch className="h-5 w-5" />
            default:
                return null
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "frontend":
                return "bg-blue-500 text-white"
            case "backend":
                return "bg-green-500 text-white"
            case "cloud":
                return "bg-purple-500 text-white"
            case "ai":
                return "bg-red-500 text-white"
            case "devOps":
                return "bg-amber-500 text-white"
            default:
                return "bg-slate-500 text-white"
        }
    }

    const getCategoryBgColor = (category: string) => {
        switch (category) {
            case "frontend":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            case "backend":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
            case "cloud":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            case "ai":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
            case "devOps":
                return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
            default:
                return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
        }
    }

    const getCardBorderColor = (category: string) => {
        switch (category) {
            case "frontend":
                return "border-blue-500/30"
            case "backend":
                return "border-green-500/30"
            case "cloud":
                return "border-purple-500/30"
            case "ai":
                return "border-red-500/30"
            case "devOps":
                return "border-amber-500/30"
            default:
                return "border-border"
        }
    }

    // Funciones para el mapa mental
    const getCategoryPosition = (category: string, index: number) => {
        const totalCategories = Object.keys(technologies).length;
        
        // Ajuste: iniciar el ángulo desde arriba (π/2) y distribuir uniformemente
        // Multiplicar por -1 para ir en sentido horario
        const angle = -1 * (Math.PI / 2 - (index / totalCategories) * 2 * Math.PI);
        
        // Aumentar ligeramente el radio para dar más espacio
        const radius = Math.min(containerSize.width, containerSize.height) * 0.3;

        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    };

    const getTechPosition = (category: string, techIndex: number, categoryIndex: number) => {
        const techsInCategory = technologies[category as keyof typeof technologies].length;
        const categoryPos = getCategoryPosition(category, categoryIndex);
        
        // Obtener el ángulo de la categoría desde el centro
        const categoryAngle = -1 * (Math.PI / 2 - (categoryIndex / Object.keys(technologies).length) * 2 * Math.PI);
        
        // Distribuir las tecnologías en un arco más amplio (90 grados) hacia afuera desde la categoría
        const arcAngle = Math.PI / 2; // 90 grados
        
        // Calcular el ángulo para esta tecnología específica
        // Si solo hay una tecnología, colocarla directamente en línea con la categoría
        let techAngle;
        if (techsInCategory === 1) {
            techAngle = categoryAngle;
        } else {
            techAngle = categoryAngle - arcAngle/2 + (techIndex / (techsInCategory - 1)) * arcAngle;
        }
        
        // Ajustar la distancia basada en el número de tecnologías (más tecnologías = más lejos para evitar superposiciones)
        // Aumentamos gradualmente el radio a medida que aumenta el índice para crear un efecto de "capas"
        const baseRadius = Math.min(containerSize.width, containerSize.height) * 0.15;
        // Añadir un pequeño offset que incrementa ligeramente con el índice
        const radiusOffset = (techIndex % 2) * (baseRadius * 0.15); 
        const radius = baseRadius + radiusOffset;

        return {
            x: categoryPos.x + Math.cos(techAngle) * radius,
            y: categoryPos.y + Math.sin(techAngle) * radius,
        };
    };

    // Descripción de tecnologías
    const getDescription = (tech: string) => {
        const descriptions: Record<string, string> = {
            // Frontend
            React: "Biblioteca JavaScript para construir interfaces de usuario interactivas.",
            "Next.js": "Framework de React para aplicaciones web con renderizado del lado del servidor.",
            "Three.js": "Biblioteca JavaScript para crear y mostrar gráficos 3D animados en un navegador web.",
            TailwindCSS: "Framework CSS de utilidad para crear diseños personalizados sin salir de tu HTML.",

            // Backend
            "Node.js": "Entorno de ejecución para JavaScript construido con el motor V8 de Chrome.",
            Python: "Lenguaje de programación interpretado, de alto nivel y propósito general.",
            SpringBoot: "Framework para crear aplicaciones Java basadas en Spring con configuración mínima.",

            // Cloud
            AWS: "Plataforma de servicios de nube que ofrece potencia computacional, almacenamiento y más.",
            "Google Cloud":
                "Suite de servicios de computación en la nube que se ejecuta en la misma infraestructura que Google.",
            Azure:
                "Servicio de computación en la nube creado por Microsoft para construir, probar e implementar aplicaciones.",

            // AI
            TensorFlow: "Biblioteca de software libre para aprendizaje automático desarrollada por Google.",
            OpenAI: "Laboratorio de investigación de IA que desarrolla tecnologías de IA avanzadas como GPT.",

            // DevOps
            Docker: "Plataforma de contenedores que permite a los desarrolladores empaquetar aplicaciones.",
            Kubernetes:
                "Sistema de orquestación de contenedores para automatizar el despliegue y la gestión de aplicaciones.",
            "CI/CD": "Prácticas de integración continua y entrega continua para automatizar el ciclo de vida del desarrollo.",
        }

        return descriptions[tech] || "Tecnología avanzada utilizada en nuestros proyectos."
    }

    // Filtrar tecnologías para el grid
    const filteredTechnologies = Object.entries(technologies).reduce(
        (acc, [category, techs]) => {
            if (activeCategory && activeCategory !== category) return acc

            const filteredTechs = techs.filter((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

            if (filteredTechs.length > 0) {
                acc[category] = filteredTechs
            }

            return acc
        },
        {} as Record<string, string[]>,
    )

    const allTechnologies = Object.entries(filteredTechnologies).flatMap(([category, techs]) =>
        techs.map((tech) => ({ tech, category })),
    )

    // Manejadores de eventos compartidos
    const handleCategoryClick = (category: string) => {
        setActiveCategory(activeCategory === category ? null : category)
        setActiveTech(null)
    }

    const handleTechClick = (tech: string, category: string) => {
        setActiveTech(activeTech === tech ? null : tech)
        if (activeTech !== tech) {
            setActiveCategory(category)
        }
    }

    const handleClearFilters = () => {
        setActiveCategory(null)
        setActiveTech(null)
        setSearchQuery("")
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans mt-28">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-center flex-1 text-foreground-secondary">
                        ¿Qué Tecnologías manejamos?
                    </h1>
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="bg-[#1A1A1A]/30 rounded-xl shadow-md p-4 mb-6 border border-border">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-foreground-secondary/60" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background-overlay text-foreground placeholder-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent"
                                    placeholder="Buscar tecnología..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        <X className="h-4 w-4 text-foreground-secondary/60 hover:text-foreground-secondary" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(activeCategory || activeTech || searchQuery) && (
                                <button
                                    onClick={handleClearFilters}
                                    className="px-3 py-2 rounded-md text-sm font-medium bg-background-overlay text-foreground-secondary hover:bg-accent/20 transition-colors flex items-center"
                                >
                                    <X className="mr-1 h-4 w-4" />
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenedor principal para ambas visualizaciones */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mapa Mental */}
                    <div
                        className={`bg-[#1A1A1A]/30 rounded-xl shadow-xl p-4 border border-border relative`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-foreground">Mapa Mental</h2>
                        </div>

                        <div ref={containerRef} className="relative w-full h-[500px] overflow-hidden">
                            {/* Centro del mapa mental */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent to-accent-secondary flex items-center justify-center shadow-lg">
                                    <span className="text-accent-foreground font-bold text-lg">TECH</span>
                                </div>
                            </motion.div>

                            {/* Categorías */}
                            {containerSize.width > 0 &&
                                Object.keys(technologies).map((category, categoryIndex) => {
                                    const position = getCategoryPosition(category, categoryIndex)
                                    const isActive = activeCategory === category
                                    const shouldShowTechs = isActive || !activeCategory

                                    return (
                                        <div key={category}>
                                            {/* Línea desde el centro a la categoría */}
                                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                                <motion.line
                                                    initial={{ pathLength: 0, opacity: 0 }}
                                                    animate={{
                                                        pathLength: 1,
                                                        opacity: isActive ? 0.6 : activeCategory ? 0.2 : 0.3,
                                                    }}
                                                    transition={{ duration: 0.8, delay: 0.2 + categoryIndex * 0.1 }}
                                                    x1="50%"
                                                    y1="50%"
                                                    x2={`${((position.x + containerSize.width / 2) / containerSize.width) * 100}%`}
                                                    y2={`${((position.y + containerSize.height / 2) / containerSize.height) * 100}%`}
                                                    stroke={isActive ? "#DADFFE" : "#7D5683"}
                                                    strokeWidth={isActive ? "2" : "1.5"}
                                                    strokeDasharray={isActive ? "" : "5,5"}
                                                />
                                            </svg>

                                            {/* Nodo de categoría */}
                                            <motion.div
                                                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20 ${
                                                    isActive ? "ring-4 ring-accent/30" : ""
                                                }`}
                                                style={{
                                                    left: `${((position.x + containerSize.width / 2) / containerSize.width) * 100}%`,
                                                    top: `${((position.y + containerSize.height / 2) / containerSize.height) * 100}%`,
                                                }}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{
                                                    scale: isActive ? 1.1 : activeCategory && !isActive ? 0.8 : 1,
                                                    opacity: activeCategory && !isActive ? 0.7 : 1,
                                                }}
                                                transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                                                onClick={() => handleCategoryClick(category)}
                                            >
                                                <div
                                                    className={`w-12 h-12 rounded-full ${getCategoryColor(category)} flex items-center justify-center shadow-md`}
                                                >
                                                    {getCategoryIcon(category)}
                                                </div>
                                                <div 
                                                    className="absolute whitespace-nowrap text-foreground font-medium text-sm"
                                                    style={{
                                                        top: position.y > 0 ? '100%' : undefined,
                                                        bottom: position.y <= 0 ? '100%' : undefined,
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        marginTop: position.y > 0 ? '4px' : '0',
                                                        marginBottom: position.y <= 0 ? '4px' : '0'
                                                    }}
                                                >
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </div>
                                            </motion.div>

                                            {/* Tecnologías de la categoría */}
                                            {shouldShowTechs &&
                                                technologies[category as keyof typeof technologies]
                                                    .filter((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
                                                    .map((tech, techIndex) => {
                                                        const techPosition = getTechPosition(category, techIndex, categoryIndex)
                                                        const isTechActive = activeTech === tech
                                                        const shouldShow = !activeTech || isTechActive

                                                        return (
                                                            <div key={tech} style={{ opacity: shouldShow ? 1 : 0.3 }}>
                                                                {/* Línea desde la categoría a la tecnología */}
                                                                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                                                    <motion.line
                                                                        initial={{ pathLength: 0, opacity: 0 }}
                                                                        animate={{
                                                                            pathLength: 1,
                                                                            opacity: isTechActive ? 0.8 : 0.5,
                                                                        }}
                                                                        transition={{ duration: 0.5 }}
                                                                        x1={`${((position.x + containerSize.width / 2) / containerSize.width) * 100}%`}
                                                                        y1={`${((position.y + containerSize.height / 2) / containerSize.height) * 100}%`}
                                                                        x2={`${((techPosition.x + containerSize.width / 2) / containerSize.width) * 100}%`}
                                                                        y2={`${((techPosition.y + containerSize.height / 2) / containerSize.height) * 100}%`}
                                                                        stroke={isTechActive ? "#DADFFE" : "#7D5683"}
                                                                        strokeWidth={isTechActive ? "1.5" : "1"}
                                                                    />
                                                                </svg>

                                                                {/* Nodo de tecnología */}
                                                                <motion.div
                                                                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20 ${
                                                                        isTechActive ? "ring-2 ring-accent/30" : ""
                                                                    }`}
                                                                    style={{
                                                                        left: `${((techPosition.x + containerSize.width / 2) / containerSize.width) * 100}%`,
                                                                        top: `${((techPosition.y + containerSize.height / 2) / containerSize.height) * 100}%`,
                                                                    }}
                                                                    initial={{ scale: 0, opacity: 0 }}
                                                                    animate={{
                                                                        scale: isTechActive ? 1.1 : 1,
                                                                        opacity: 1,
                                                                    }}
                                                                    transition={{ duration: 0.3, delay: 0.1 * techIndex }}
                                                                    onClick={() => handleTechClick(tech, category)}
                                                                >
                                                                    <div
                                                                        className={`w-8 h-8 rounded-full bg-background-overlay border-2 ${
                                                                            isTechActive ? "border-accent" : "border-border"
                                                                        } flex items-center justify-center shadow-sm`}
                                                                    >
                                                                        <span className="text-xs font-medium text-foreground">{tech.split(".")[0]}</span>
                                                                    </div>
                                                                </motion.div>
                                                            </div>
                                                        )
                                                    })}
                                        </div>
                                    )
                                })}
                        </div>
                    </div>

                    {/* Grid de Tarjetas */}
                    <div
                        className="bg-[#1A1A1A]/30 rounded-xl shadow-xl p-4 border border-border relative"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-foreground">Grid de Tecnologías</h2>
                        </div>

                        {/* Filtros por categoría */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                    activeCategory === null
                                        ? "bg-accent text-accent-foreground"
                                        : "bg-background-overlay text-foreground-secondary hover:bg-accent/20"
                                }`}
                            >
                                Todas
                            </button>
                            {Object.keys(technologies).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center ${
                                        activeCategory === category
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-background-overlay text-foreground-secondary hover:bg-accent/20"
                                    }`}
                                >
                                    {getCategoryIcon(category)}
                                    <span className="ml-1.5">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                </button>
                            ))}
                        </div>

                        {/* Grid de tecnologías */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[350px] pr-1">
                            <AnimatePresence>
                                {allTechnologies.map(({ tech, category }) => (
                                    <motion.div
                                        key={`${category}-${tech}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: activeTech && activeTech !== tech ? 0.7 : 1,
                                            scale: activeTech === tech ? 1.02 : 1,
                                        }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className={`bg-background-secondary rounded-lg shadow-sm overflow-hidden border ${
                                            activeTech === tech ? "ring-2 ring-accent" : getCardBorderColor(category)
                                        } hover:shadow-md transition-shadow cursor-pointer`}
                                        onClick={() => handleTechClick(tech, category)}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center mb-3">
                                                <div
                                                    className={`w-8 h-8 rounded-full ${getCategoryColor(category)} flex items-center justify-center mr-3`}
                                                >
                                                    {getCategoryIcon(category)}
                                                </div>
                                                <h3 className="text-base font-bold text-foreground">{tech}</h3>
                                            </div>

                                            <div
                                                className={`text-xs ${getCategoryBgColor(category)} inline-flex items-center px-2 py-0.5 rounded-full mb-2`}
                                            >
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </div>

                                            <AnimatePresence>
                                                {activeTech === tech && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="mt-2 text-sm text-foreground-secondary overflow-hidden"
                                                    >
                                                        <p>{getDescription(tech)}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {allTechnologies.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-foreground-secondary">
                                    No se encontraron tecnologías que coincidan con tu búsqueda.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Panel de información */}
                {activeTech && (
                    <motion.div
                        className="mt-6 bg-background-overlay rounded-lg p-4 shadow-inner"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-xl font-bold mb-2 text-foreground">{activeTech}</h3>
                        <p className="text-foreground-secondary">{getDescription(activeTech)}</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

