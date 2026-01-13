'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';


const founders = [
  {
    id: 'mateus',
    name: 'Mateus Guimarães',
    role: 'Co-fundador',
    turma: 'Makers • Campeão do Onboarding',
    bio: 'Foi aluno do Simplificando em 2022.2, tem seu canal no YouTube com +75k inscritos. Expert em produtividade, inovação e comunicação. Tirou nota máxima na Entrevista da Link e vai te ensinar a realizar cada entrega com autenticidade!',
    image: '/home/mateus-e-jornada/mateus.JPG',
    video: '/home/mateus-e-jornada/mateus.MOV',
    socials: {
      instagram: 'https://instagram.com/mateusguimaraesoficial',
      youtube: 'https://youtube.com/@mateusguimaraes',
      linkedin: 'https://linkedin.com/in/mateusguimaraes',
    },
    color: '#00B0FF',
  },
  {
    id: 'jordana',
    name: 'Jordana Medina',
    role: 'Co-fundadora',
    turma: 'Partners • Aluna nº1',
    bio: 'Responsável pela área operacional e financeira do Simplificando. Hoje trabalha com a UNIVillas, sua Assessoria Imobiliária. Conhecedora de todas as plataformas e métodos de organização, ela é quem faz as aulas ficarem perfeitas!',
    image: '/home/mateus-e-jornada/jordana.JPG',
    video: '/home/mateus-e-jornada/jordana-video.MP4',
    socials: {
      instagram: 'https://instagram.com/jordanamedina',
      youtube: '',
      linkedin: 'https://linkedin.com/in/jordanamedina',
    },
    color: '#E91E63',
  },
];

export default function Founders() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFounder, setActiveFounder] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectedFounder = founders.find(f => f.id === activeFounder);

  // Reset video when changing founder
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeFounder]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <>
      <style jsx global>{`
                .founders-section-new {
                    background: #1e3a5f;
                    position: relative;
                    overflow: hidden;
                }

                /* Header com imagem e gradient */
                .founders-hero {
                    position: relative;
                    min-height: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 80px 2rem;
                }

                .founders-hero-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }

                .founders-hero-bg img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }

                .founders-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(30, 58, 95, 0.7) 0%,
                        rgba(30, 58, 95, 0.85) 50%,
                        #1e3a5f 100%
                    );
                    z-index: 1;
                }

                .founders-hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 800px;
                }

                .founders-intro {
                    font-size: 1.25rem;
                    color: #00B0FF;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                    letter-spacing: 0.05em;
                }

                .founders-title {
                    font-size: clamp(3rem, 7vw, 5rem);
                    font-weight: 800;
                    color: white;
                    line-height: 1.1;
                    margin-bottom: 1rem;
                }

                .founders-title-underline {
                    width: 120px;
                    height: 4px;
                    background: #00B0FF;
                    margin: 0 auto 1.5rem;
                }

                .founders-subtitle {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.6;
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* Grid dos founders */
                .founders-content {
                    padding: 0 2rem 60px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .founders-grid-label {
                    font-size: 1rem;
                    color: #00B0FF;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 2rem;
                    font-weight: 600;
                    text-align: center;
                }

                .founders-grid-new {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    margin-bottom: 2rem;
                }

                /* Cards dos founders - MAIORES E CENTRALIZADOS */
                .founder-card-new {
                    width: 320px;
                    flex-shrink: 0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .founder-card-image {
                    width: 100%;
                    height: 400px;
                    border-radius: 16px;
                    overflow: hidden;
                    position: relative;
                    border: 4px solid transparent;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.1);
                }

                .founder-card-new:hover .founder-card-image,
                .founder-card-new.active .founder-card-image {
                    transform: scale(1.02);
                    border-color: #00B0FF;
                }

                .founder-card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .founder-card-name {
                    color: white;
                    font-size: 1.1rem;
                    margin-top: 1rem;
                    font-weight: 500;
                }

                /* Seção expandida - MAIS LARGA */
                .founder-expanded {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    margin-top: 1.5rem;
                    max-width: 100%;
                }

                .founder-expanded-content {
                    display: grid;
                    grid-template-columns: 280px 1fr 260px;
                    min-height: 380px;
                }

                /* Coluna esquerda - Info */
                .founder-info-column {
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                }

                .founder-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #00B0FF;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .founder-photo-circle {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 1rem;
                }

                .founder-photo-circle img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .founder-name-large {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 0.75rem;
                }

                .founder-bio-text {
                    font-size: 0.9rem;
                    color: #666;
                    line-height: 1.7;
                    flex: 1;
                }

                /* Coluna central - Video */
                .founder-video-column {
                    background: #0a0a0a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .founder-video-column video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .video-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.4);
                    transition: opacity 0.3s ease;
                }

                .video-overlay.hidden {
                    opacity: 0;
                    pointer-events: none;
                }

                .video-play-btn {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: #00B0FF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                }

                .video-play-btn:hover {
                    transform: scale(1.1);
                    background: #00C4FF;
                }

                .video-play-btn svg {
                    width: 28px;
                    height: 28px;
                    fill: white;
                    margin-left: 4px;
                }

                .video-label {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.9);
                }

                /* Coluna direita - Socials */
                .founder-socials-column {
                    padding: 2.5rem;
                    background: #f8f9fa;
                }

                .socials-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #666;
                    font-weight: 600;
                    margin-bottom: 2rem;
                }

                .social-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem;
                    background: white;
                    border-radius: 14px;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                }

                .social-link:hover {
                    transform: translateX(5px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }

                .social-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .social-icon.instagram {
                    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
                    color: white;
                }

                .social-icon.youtube {
                    background: #FF0000;
                    color: white;
                }

                .social-icon.linkedin {
                    background: #0077B5;
                    color: white;
                }

                .social-info h4 {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }

                .social-info p {
                    font-size: 0.85rem;
                    color: #888;
                }

                /* Responsivo */
                @media (max-width: 1024px) {
                    .founder-expanded-content {
                        grid-template-columns: 1fr;
                    }

                    .founder-video-column {
                        min-height: 350px;
                    }
                }

                @media (max-width: 768px) {
                    .founders-hero {
                        min-height: 400px;
                        padding: 60px 1.5rem;
                    }

                    .founders-grid-new {
                        justify-content: center;
                    }

                    .founder-card-new {
                        max-width: 180px;
                    }

                    .founder-info-column,
                    .founder-socials-column {
                        padding: 1.5rem;
                    }
                }
            `}</style>

      <section ref={sectionRef} className="founders-section-new">
        {/* Hero com imagem */}
        <div className="founders-hero">
          <div className="founders-hero-bg">
            <Image
              src="/home/mateus-e-jornada/_MG_2523-HDR_copiar.jpg"
              alt="Mateus e Jordana"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="founders-hero-overlay" />
          <motion.div
            className="founders-hero-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="founders-intro">Olá, somos</p>
            <h2 className="founders-title">Mateus e Jordana</h2>
            <div className="founders-title-underline" />
            <p className="founders-subtitle">
              Somos sócios e cofundadores do Simplificando.
              Também somos alunos da Link School e vamos te ajudar a conquistar sua vaga!
            </p>
          </motion.div>
        </div>

        {/* Conteúdo */}
        <div className="founders-content">
          <p className="founders-grid-label">Conheça os Founders</p>

          {/* Cards dos founders */}
          <div className="founders-grid-new">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.id}
                className={`founder-card-new ${activeFounder === founder.id ? 'active' : ''}`}
                onClick={() => setActiveFounder(activeFounder === founder.id ? null : founder.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="founder-card-image">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="320px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className="founder-card-name">{founder.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Seção expandida */}
          <AnimatePresence>
            {selectedFounder && (
              <motion.div
                className="founder-expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <div className="founder-expanded-content">
                  {/* Coluna esquerda - Info */}
                  <div className="founder-info-column">
                    <p className="founder-label">FOUNDER</p>
                    <div className="founder-photo-circle">
                      <Image
                        src={selectedFounder.image}
                        alt={selectedFounder.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <h3 className="founder-name-large">{selectedFounder.name}</h3>
                    <p className="founder-bio-text">{selectedFounder.bio}</p>
                  </div>

                  {/* Coluna central - Video */}
                  <div className="founder-video-column">
                    {selectedFounder.video && (
                      <video
                        ref={videoRef}
                        src={selectedFounder.video}
                        muted
                        loop
                        playsInline
                      />
                    )}
                    <div className={`video-overlay ${isVideoPlaying ? 'hidden' : ''}`}>
                      <button
                        className="video-play-btn"
                        onClick={handlePlayVideo}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <p className="video-label">Assistir vídeo</p>
                    </div>
                  </div>

                  {/* Coluna direita - Redes sociais */}
                  <div className="founder-socials-column">
                    <p className="socials-label">Redes Sociais</p>

                    {selectedFounder.socials.instagram && (
                      <a
                        href={selectedFounder.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <div className="social-icon instagram">📸</div>
                        <div className="social-info">
                          <h4>Instagram</h4>
                          <p>@{selectedFounder.name.split(' ')[0].toLowerCase()}</p>
                        </div>
                      </a>
                    )}

                    {selectedFounder.socials.youtube && (
                      <a
                        href={selectedFounder.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <div className="social-icon youtube">▶️</div>
                        <div className="social-info">
                          <h4>YouTube</h4>
                          <p>+75k inscritos</p>
                        </div>
                      </a>
                    )}

                    {selectedFounder.socials.linkedin && (
                      <a
                        href={selectedFounder.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <div className="social-icon linkedin">💼</div>
                        <div className="social-info">
                          <h4>LinkedIn</h4>
                          <p>Perfil profissional</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
