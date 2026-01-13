import type { Variants } from 'framer-motion';

// Animações para Page Transition com Curva SVG
// Inspirado no portfolio Denis Snellenberg

// Animação slide
export const slide: Variants = {
    initial: {
        y: '100%',
    },
    enter: {
        y: '100%',
    },
    exit: {
        y: '0%',
        transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1]
        }
    }
};

// Animação opacity
export const opacity: Variants = {
    initial: {
        opacity: 0.5,
    },
    enter: {
        opacity: 1,
    },
    exit: {
        opacity: 0.5,
    }
};

// Animação perspective
export const perspective: Variants = {
    initial: {
        y: 0,
        scale: 1,
        opacity: 1,
    },
    enter: {
        y: 0,
        scale: 1,
        opacity: 1,
    },
    exit: {
        y: -100,
        scale: 0.9,
        opacity: 0.5,
        transition: {
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1]
        }
    }
};

// Animação do texto da rota
export const routeText: Variants = {
    initial: {
        opacity: 1,
        top: '40%',
    },
    enter: {
        opacity: 0,
        top: -100,
        transition: {
            duration: 0.75,
            delay: 0.35,
            ease: [0.76, 0, 0.24, 1]
        },
        transitionEnd: { top: '47.5%' }
    },
    exit: {
        opacity: 1,
        top: '40%',
        transition: {
            duration: 0.5,
            delay: 0.4,
            ease: [0.33, 1, 0.68, 1]
        }
    }
};

// Animação do SVG (translate)
export const svgTranslate: Variants = {
    initial: {
        top: '-300px',
    },
    enter: {
        top: '-100vh',
        transition: {
            duration: 0.75,
            delay: 0.35,
            ease: [0.76, 0, 0.24, 1]
        },
        transitionEnd: { top: '100vh' }
    },
    exit: {
        top: '-300px',
        transition: {
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1]
        }
    }
};

// Animação do path da curva (gerada dinamicamente)
export const curvePath = (initialPath: string, targetPath: string): Variants => {
    return {
        initial: {
            d: initialPath,
        },
        enter: {
            d: targetPath,
            transition: {
                duration: 0.75,
                delay: 0.35,
                ease: [0.76, 0, 0.24, 1]
            }
        },
        exit: {
            d: initialPath,
            transition: {
                duration: 0.75,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };
};

// Animação de fade do conteúdo
export const contentFade: Variants = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.5,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
        }
    }
};

// Helper para aplicar variants
export const anim = (variants: Variants) => {
    return {
        initial: 'initial',
        animate: 'enter',
        exit: 'exit',
        variants
    };
};
