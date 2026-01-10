'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StackingSections({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let ctx: gsap.Context | undefined;

        const initAnimations = () => {
            // Seleção robusta: Apenas filhos diretos que são SECTION ou FOOTER
            // Isso evita duplicatas e garante a ordem correta do DOM
            // Usamos querySelectorAll para garantir que pegamos os elementos certos e filtramos pelo pai
            const allCandidates = Array.from(container.children) as HTMLElement[];
            const sectionElements = allCandidates.filter(el => {
                const tag = el.tagName.toUpperCase();
                return (tag === 'SECTION' || tag === 'FOOTER');
            });

            if (sectionElements.length === 0) {
                console.warn('StackingSections: No sections found');
                return;
            }

            console.log(`StackingSections: Found ${sectionElements.length} valid stacking elements`);

            const totalSections = sectionElements.length;

            // 1. Configuração Inicial (Z-Index e Atributos)
            sectionElements.forEach((section, i) => {
                section.setAttribute('data-section-index', String(i));
                // Z-index decrescente de 100 para baixo para garantir que S0 cubra S1, etc.
                section.style.zIndex = String(100 - i);
                // Forçar posicionamento sticky e opacidade via JS para garantir
                section.style.position = 'sticky';
                section.style.top = '0';
                section.style.opacity = '1';
                section.style.visibility = 'visible';
            });

            // 2. Definir Altura do Container
            // Altura = (N-1 animações * 100vh) + 100vh final
            // Ex: 8 seções -> 7 scrolls de transição + 1 tela final = 800vh
            const scrollHeight = (totalSections - 1) * 100;
            container.style.height = `${scrollHeight + 100}vh`;

            // 3. Criar ScrollTriggers
            ctx = gsap.context(() => {
                sectionElements.forEach((section, i) => {
                    // Não animamos a última seção (Footer/Última) porque ela não tem quem revelar
                    if (i < totalSections - 1) {

                        // O gatilho é o scroll global do container
                        // S0 anima de 0vh a 100vh
                        // S1 anima de 100vh a 200vh
                        const startScroll = i * window.innerHeight;
                        const endScroll = (i + 1) * window.innerHeight;

                        // Timeline Principal de saída da seção
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: container,
                                start: () => `top+=${i * window.innerHeight} top`,
                                end: () => `top+=${(i + 1) * window.innerHeight} top`,
                                scrub: true,
                                invalidateOnRefresh: true,
                            },
                        }).to(section, {
                            yPercent: -100, // Sobe 100%
                            ease: 'none',
                            borderRadius: '0 0 40px 40px', // Efeito arredondado ao sair
                        });

                        // Parallax da Próxima Seção (opcional, mas adiciona polimento)
                        const nextSection = sectionElements[i + 1];
                        if (nextSection) {
                            let parallaxTarget = nextSection.querySelector('.parallax-content') ||
                                nextSection.querySelector('.container') ||
                                nextSection;

                            if (parallaxTarget) {
                                gsap.fromTo(parallaxTarget,
                                    { y: 100 }, // Começa levemente descido
                                    {
                                        y: 0,
                                        ease: 'none',
                                        scrollTrigger: {
                                            trigger: container,
                                            start: () => `top+=${i * window.innerHeight} top`,
                                            end: () => `top+=${(i + 1) * window.innerHeight} top`,
                                            scrub: true,
                                            invalidateOnRefresh: true,
                                        }
                                    }
                                );
                            }
                        }
                    }
                });

                ScrollTrigger.refresh();
            }, container);
        };

        // Delay aumentado para garantir que o React hidratou e renderizou todos os fragmentos
        const timeoutId = setTimeout(() => {
            initAnimations();
        }, 300);

        const handleResize = () => {
            // Força recálculo completo em resize
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
            ctx?.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="stacking-container">
            {children}
        </div>
    );
}