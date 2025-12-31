// src/components/cases/CaseStudyCard.jsx
import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const CaseStudyCard = ({ study, onExpand, isExpanded, isClosing, onClose }) => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Handle image source
  const getImageSrc = () => {
    if (typeof study.image === 'string') return study.image;
    return study.image?.default || study.image?.src || study.image;
  };

  // Handle video source
  const getVideoSrc = () => {
    if (study.video) {
      if (typeof study.video === 'string') return study.video;
      return study.video?.default || study.video?.src || study.video;
    }
    return null;
  };

  const imageSrc = getImageSrc();
  const videoSrc = getVideoSrc();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setShowVideo(true);
      
      video.play().catch(err => {
        console.error('Play failed:', err);
        setVideoError(true);
        setShowVideo(false);
      });
    };

    const handleError = (e) => {
      console.error('Video error:', e, video.error);
      setVideoError(true);
      setShowVideo(false);
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [videoSrc]);

  const handleCardClick = (e) => {
    if (!isExpanded && onExpand) {
      e.stopPropagation();
      onExpand();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    if (!isExpanded) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded, onClose]);

  return (
    <CardContainer 
      onClick={handleCardClick} 
      $isExpanded={isExpanded}
      $isClosing={isClosing}
    >
      <FlipCardInner $isExpanded={isExpanded} $isClosing={isClosing}>
        {/* Front of card */}
        <CardFront>
          <MediaContainer>
            <CardImage 
              $image={imageSrc}
              alt={`${study.title} - ${study.client}`}
              $show={!showVideo}
            />
            
            {videoSrc && (
              <VideoElement
                ref={videoRef}
                muted
                loop
                playsInline
                preload="auto"
                $show={showVideo && !videoError}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoElement>
            )}
            
            {videoSrc && !videoError && !showVideo && (
              <LoadingOverlay>
                <LoadingSpinner />
                <div>Loading video...</div>
              </LoadingOverlay>
            )}

            {videoError && (
              <ErrorOverlay>
                ✗ Video failed to load
              </ErrorOverlay>
            )}
          </MediaContainer>
          
          <CardBody>
            <CardContent>
              <CardHeader>
                <ClientName>{study.client}</ClientName>
                <CardTitle>{study.title}</CardTitle>
              </CardHeader>
              <Tags>
                React.js | 
                Animations |
                Figma |
                GitHub
              </Tags>
            </CardContent>
          </CardBody>
        </CardFront>

        {/* Back of card */}
        <CardBack>
          {isExpanded && (
            <CloseButton onClick={handleCloseClick} aria-label="Close modal">
              ✕
            </CloseButton>
          )}
          <BackContent>
            <BackTitle>{study.client}</BackTitle>
            <BackSubtitle>{study.title}</BackSubtitle>
            <BackDescription>{study.description}</BackDescription>
            <BackTags>
              {study.tags?.join(' | ') || 'React.js | Animations | Figma | GitHub'}
            </BackTags>
          </BackContent>
        </CardBack>
      </FlipCardInner>
    </CardContainer>
  );
};

export default CaseStudyCard;

// Keyframe animations
const expandCard = keyframes`
  0% {
    width: 450px;
    height: 520px;
    position: relative;
    z-index: 1;
  }
  100% {
    width: 80vw;
    height: 80vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
`;

const shrinkCard = keyframes`
  0% {
    width: 80vw;
    height: 80vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
  100% {
    width: 450px;
    height: 520px;
    position: relative;
    z-index: 1;
  }
`;

const flipExpand = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const flipShrink = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const CardContainer = styled.div`
  background: #FCFDFF;
  border-radius: 6px;
  overflow: visible;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25);
  transition: ${props => props.$isExpanded ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'};
  height: 520px;
  width: 450px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
  padding: 0.625rem;
  position: relative;
  cursor: ${props => props.$isExpanded ? 'default' : 'pointer'};
  perspective: 2000px;

  ${props => props.$isExpanded && !props.$isClosing && css`
    animation: ${expandCard} 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vh;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  `}

  ${props => props.$isClosing && css`
    animation: ${shrinkCard} 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  `}

  &:hover {
    transform: ${props => props.$isExpanded ? 'translate(-50%, -50%)' : 'translateY(-12px) scale(1.01)'};
    height: ${props => props.$isExpanded ? '80vh' : '570px'};
    width: ${props => props.$isExpanded ? '80vw' : '480px'};
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
    z-index: ${props => props.$isExpanded ? '9999' : '222'};
  }
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: ${props => props.$isExpanded ? 'none' : 'transform 0.6s'};

  ${props => props.$isExpanded && !props.$isClosing && css`
    animation: ${flipExpand} 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  `}

  ${props => props.$isClosing && css`
    animation: ${flipShrink} 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  `}
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 6px;
  overflow: hidden;
`;

const CardFront = styled(CardSide)`
  display: flex;
  flex-direction: column;
  transform: rotateY(0deg);
`;

const CardBack = styled(CardSide)`
  background: white;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  height: 440px;
  overflow: hidden;
  border-radius: 6px;
  background: #000;
  flex-shrink: 0;
`;

const CardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  transition: opacity 0.6s ease;
  background-image: ${props => `url(${props.$image})`};
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  z-index: 1;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  transition: opacity 0.6s ease;
  opacity: ${props => props.$show ? 1 : 0};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  z-index: 2;
  background: #000;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: white;
  font-size: 14px;
  z-index: 3;
  border-radius: 6px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(220, 38, 38, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  z-index: 3;
  border-radius: 6px;
`;

const CardBody = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  text-align: left;
`;

const ClientName = styled.h3`
  font-size: 24px;
  text-align: left;
  letter-spacing: 0.5px;
`;

const Tags = styled.div`
  font-size: 12px;
  color: var(--blue);
  margin-top: 5px;
  font-family: monospace;
  opacity: .5;
`;

const BackContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #333;
  z-index: 10;
  font-weight: 300;
  line-height: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(1.1) rotate(90deg);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`;

const BackTitle = styled.h2`
  font-size: 56px;
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-weight: 700;
`;

const BackSubtitle = styled.h3`
  font-size: 36px;
  margin-bottom: 2rem;
  color: #555;
  font-weight: 400;
`;

const BackDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
`;

const BackTags = styled.div`
  font-size: 16px;
  color: #999;
  font-family: monospace;
  letter-spacing: 1px;
`;