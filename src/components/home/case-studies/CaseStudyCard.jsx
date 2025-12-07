// src/components/cases/CaseStudyCard.jsx
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CaseStudyCard = ({ study }) => {
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
      console.log('Video can play');
      setVideoLoaded(true);
      setShowVideo(true);
      
      // Try to play
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
      console.log('Video loaded data');
      setVideoLoaded(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    // Force load
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [videoSrc]);

  return (
    <CardContainer>
      <MediaContainer>
        {/* Image - always present as fallback */}
        <CardImage 
          $image={imageSrc}
          alt={`${study.title} - ${study.client}`}
          $show={!showVideo}
        />
        
        {/* Video element - always rendered if video exists */}
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
        
        {/* Loading indicator */}
        {videoSrc && !videoError && !showVideo && (
          <LoadingOverlay>
            <LoadingSpinner />
            <div>Loading video...</div>
          </LoadingOverlay>
        )}

        {/* Error state */}
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
          {/* Debug info */}
          <DebugInfo>
            Video URL: {videoSrc ? '✓' : '✗'} | 
            Loaded: {videoLoaded ? '✓' : '✗'} |
            Showing: {showVideo ? '✓' : '✗'} |
            Error: {videoError ? '✗' : '✓'}
          </DebugInfo>
        </CardContent>
      </CardBody>
    </CardContainer>
  );
};

export default CaseStudyCard;

const CardContainer = styled.div`
  background: #FCFDFF;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 520px;
  width: 450px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0.625rem;
  margin: 0 6rem;
  position: relative;

  &:hover {
    transform: translateY(-12px) scale(1.01);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  height: 440px;
  overflow: hidden;
  border-radius: 6px;
  background: #000;
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

const DebugInfo = styled.div`
  font-size: 10px;
  color: #999;
  margin-top: 5px;
  font-family: monospace;
`;