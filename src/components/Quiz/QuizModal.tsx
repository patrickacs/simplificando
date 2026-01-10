'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Step = 'intro' | 'p1' | 'p3' | 'p4' | 'result';

interface QuizState {
    p1: string;
    p3: string;
    p4: string;
}

const questions = {
    p1: {
        question: 'Em qual momento da sua vida acadêmica você está?',
        options: [
            'Ainda não estou no 3º ano do EM',
            'Estou no 3º ano do Ensino Médio',
            'Já terminei o Ensino Médio',
        ],
    },
    p3: {
        question: 'Qual é a sua disponibilidade para estudar?',
        options: [
            'Quero o máximo de suporte possível',
            'Minha rotina é bem apertada',
            'Tenho tempo ao longo de alguns meses',
        ],
    },
    p4: {
        question: 'O que você prioriza na sua preparação?',
        options: [
            'Experiência completa e imersiva',
            'Custo-benefício',
        ],
    },
};

const results: Record<string, { title: string; description: string; href: string; color: string }> = {
    blocked: {
        title: 'Ainda não é o momento',
        description: 'O Simplificando é ideal para alunos do 3º ano do EM ou que já terminaram. Continue acompanhando nosso conteúdo e volte quando estiver mais perto da Jornada!',
        href: '/',
        color: 'var(--color-text-muted)',
    },
    '360': {
        title: 'Simplificando 360',
        description: 'O curso perfeito para você que está no 3º ano! Preparação completa durante todo o ano com 100% de aprovação.',
        href: '/360',
        color: 'var(--color-360)',
    },
    pacote: {
        title: 'Pacote Simplificando',
        description: 'Você quer o máximo! O Pacote inclui Extensivo + Intensivo + Imersão para a preparação mais completa possível.',
        href: '/#pacote',
        color: 'var(--color-primary)',
    },
    'extensivo-intensivo': {
        title: 'Extensivo + Intensivo',
        description: 'Combinação ideal para quem tem rotina apertada mas quer uma experiência completa.',
        href: '/extensivo',
        color: 'var(--color-extensivo)',
    },
    intensivo: {
        title: 'Intensivo',
        description: 'Preparação intensa e eficiente em 3 semanas. Perfeito para quem busca custo-benefício com rotina apertada.',
        href: '/intensivo',
        color: 'var(--color-intensivo)',
    },
    'extensivo-imersao': {
        title: 'Extensivo + Imersão',
        description: 'Preparação completa de 3 meses + experiência presencial. Ideal para quem tem tempo e busca imersão total.',
        href: '/extensivo',
        color: 'var(--color-extensivo)',
    },
    extensivo: {
        title: 'Extensivo',
        description: 'Preparação completa e detalhada em 3 meses. Perfeito para quem tem tempo e busca custo-benefício.',
        href: '/extensivo',
        color: 'var(--color-extensivo)',
    },
};

function getResult(state: QuizState): string {
    // REGRA 1 - Bloqueio
    if (state.p1 === 'Ainda não estou no 3º ano do EM') {
        return 'blocked';
    }

    // REGRA 2 - 360
    if (state.p1 === 'Estou no 3º ano do Ensino Médio') {
        return '360';
    }

    // REGRA 3 - Pacote (prioridade máxima)
    if (state.p1 === 'Já terminei o Ensino Médio' && state.p3 === 'Quero o máximo de suporte possível') {
        return 'pacote';
    }

    // REGRA 4 - Rotina apertada + Experiência
    if (state.p1 === 'Já terminei o Ensino Médio' && state.p3 === 'Minha rotina é bem apertada' && state.p4 === 'Experiência completa e imersiva') {
        return 'extensivo-intensivo';
    }

    // REGRA 5 - Rotina apertada + Custo-benefício
    if (state.p1 === 'Já terminei o Ensino Médio' && state.p3 === 'Minha rotina é bem apertada' && state.p4 === 'Custo-benefício') {
        return 'intensivo';
    }

    // REGRA 6 - Tenho tempo + Experiência
    if (state.p1 === 'Já terminei o Ensino Médio' && state.p3 === 'Tenho tempo ao longo de alguns meses' && state.p4 === 'Experiência completa e imersiva') {
        return 'extensivo-imersao';
    }

    // REGRA 7 - Tenho tempo + Custo-benefício (fallback)
    if (state.p1 === 'Já terminei o Ensino Médio' && state.p3 === 'Tenho tempo ao longo de alguns meses' && state.p4 === 'Custo-benefício') {
        return 'extensivo';
    }

    // Default
    return 'extensivo';
}

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
    const router = useRouter();
    const [step, setStep] = useState<Step>('intro');
    const [state, setState] = useState<QuizState>({ p1: '', p3: '', p4: '' });
    const [resultKey, setResultKey] = useState<string>('');

    const handleSelect = (questionKey: 'p1' | 'p3' | 'p4', value: string) => {
        const newState = { ...state, [questionKey]: value };
        setState(newState);

        // Determine next step
        if (questionKey === 'p1') {
            if (value === 'Ainda não estou no 3º ano do EM') {
                setResultKey('blocked');
                setStep('result');
            } else if (value === 'Estou no 3º ano do Ensino Médio') {
                setResultKey('360');
                setStep('result');
            } else {
                setStep('p3');
            }
        } else if (questionKey === 'p3') {
            if (value === 'Quero o máximo de suporte possível') {
                setResultKey('pacote');
                setStep('result');
            } else {
                setStep('p4');
            }
        } else if (questionKey === 'p4') {
            const result = getResult(newState);
            setResultKey(result);
            setStep('result');
        }
    };

    const handleReset = () => {
        setStep('intro');
        setState({ p1: '', p3: '', p4: '' });
        setResultKey('');
    };

    const handleGoToResult = () => {
        const result = results[resultKey];
        if (result) {
            router.push(result.href);
            onClose();
            handleReset();
        }
    };

    const result = results[resultKey];

    if (!isOpen) return null;

    return (
        <>
            <style jsx global>{`
        .quiz-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 400;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .quiz-modal {
          background: white;
          border-radius: var(--radius-xl);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        
        .quiz-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-background-alt);
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        
        .quiz-close:hover {
          background: var(--color-background-dark);
          color: white;
        }
        
        .quiz-content {
          padding: 2.5rem 2rem;
          text-align: center;
        }
        
        .quiz-title {
          font-size: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .quiz-description {
          color: var(--color-text-light);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .quiz-option {
          padding: 1rem 1.25rem;
          border: 2px solid var(--color-background-alt);
          border-radius: var(--radius-lg);
          background: white;
          cursor: pointer;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .quiz-option:hover {
          border-color: var(--color-primary);
          background: rgba(121, 153, 217, 0.05);
        }
        
        .quiz-result-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .quiz-result-title {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }
        
        .quiz-result-description {
          color: var(--color-text-light);
          margin-bottom: 2rem;
          line-height: 1.7;
        }
        
        .quiz-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        @media (max-width: 480px) {
          .quiz-content {
            padding: 2rem 1.5rem;
          }
          
          .quiz-title {
            font-size: 1.25rem;
          }
          
          .quiz-option {
            padding: 0.875rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

            <AnimatePresence>
                <motion.div
                    className="quiz-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="quiz-modal"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="quiz-close" onClick={onClose}>×</button>

                        <div className="quiz-content">
                            <AnimatePresence mode="wait">
                                {step === 'intro' && (
                                    <motion.div
                                        key="intro"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="quiz-result-icon">🎯</div>
                                        <h3 className="quiz-title">Qual curso é ideal para você?</h3>
                                        <p className="quiz-description">
                                            Responda 2-3 perguntas rápidas e descubra a melhor preparação para sua Jornada Link!
                                        </p>
                                        <motion.button
                                            className="btn btn-primary btn-large"
                                            style={{ width: '100%' }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setStep('p1')}
                                        >
                                            Começar
                                        </motion.button>
                                    </motion.div>
                                )}

                                {step === 'p1' && (
                                    <motion.div
                                        key="p1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="quiz-title">{questions.p1.question}</h3>
                                        <div className="quiz-options">
                                            {questions.p1.options.map((option) => (
                                                <button
                                                    key={option}
                                                    className="quiz-option"
                                                    onClick={() => handleSelect('p1', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'p3' && (
                                    <motion.div
                                        key="p3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="quiz-title">{questions.p3.question}</h3>
                                        <div className="quiz-options">
                                            {questions.p3.options.map((option) => (
                                                <button
                                                    key={option}
                                                    className="quiz-option"
                                                    onClick={() => handleSelect('p3', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'p4' && (
                                    <motion.div
                                        key="p4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="quiz-title">{questions.p4.question}</h3>
                                        <div className="quiz-options">
                                            {questions.p4.options.map((option) => (
                                                <button
                                                    key={option}
                                                    className="quiz-option"
                                                    onClick={() => handleSelect('p4', option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'result' && result && (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="quiz-result-icon">
                                            {resultKey === 'blocked' ? '⏳' : '🎉'}
                                        </div>
                                        <h3 className="quiz-result-title" style={{ color: result.color }}>
                                            {result.title}
                                        </h3>
                                        <p className="quiz-result-description">{result.description}</p>
                                        <div className="quiz-actions">
                                            {resultKey !== 'blocked' && (
                                                <motion.button
                                                    className="btn btn-primary btn-large"
                                                    style={{ width: '100%', background: result.color }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleGoToResult}
                                                >
                                                    Ver detalhes do curso
                                                </motion.button>
                                            )}
                                            <motion.button
                                                className="btn btn-secondary"
                                                style={{ width: '100%' }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleReset}
                                            >
                                                Refazer quiz
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
