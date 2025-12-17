// src/components/cases/PendoCertificates.jsx
import styled from 'styled-components';

// Import the images
import cert1 from "../../../assets/pendoCert/cert1.png";
import cert2 from "../../../assets/pendoCert/cert2.png";
import cert3 from "../../../assets/pendoCert/cert3.png";
import cert4 from "../../../assets/pendoCert/cert4.png";
import cert5 from "../../../assets/pendoCert/cert5.png";
import cert6 from "../../../assets/pendoCert/cert6.png";
import cert7 from "../../../assets/pendoCert/cert7.png";
import cert8 from "../../../assets/pendoCert/cert8.png";

const PendoCertificates = () => {
  // Add dummy links for each certificate
  const certificates = [
    { image: cert1, link: "https://www.credly.com/earner/earned/badge/7fdfd9f4-cc9d-4dd4-a175-dc842fce1667" },
    { image: cert2, link: "https://www.credly.com/earner/earned/badge/463d8f88-cc44-4015-a5ba-cfbaac86a7d7" },
    { image: cert3, link: "https://www.credly.com/earner/earned/badge/83ac0d6a-98f3-48a0-ba55-14409503248f" },
    { image: cert4, link: "https://www.credly.com/earner/earned/badge/9d8c5b39-48e6-47db-b59c-901a1d7fa6d6" },
    { image: cert5, link: "https://www.credly.com/earner/earned/badge/0c9dc6f5-abf8-4625-964a-e84c804bd927" },
    { image: cert6, link: "https://www.credly.com/earner/earned/badge/bfc0197a-872e-4e7a-a911-ad902ac3ea71" },
    { image: cert7, link: "https://www.credly.com/earner/earned/badge/58a794ad-15f9-4e38-9b2c-36b25e2aa616" },
    { image: cert8, link: "https://www.credly.com/earner/earned/badge/85fcff8e-3fae-455c-8143-f5e4ba7d581a" },
  ];
  
  return (
    <GalleryContainer>
      {certificates.map((cert, index) => (
        <CertificateLink 
          key={index}
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CertificateCard>
            <CertificateImage 
              src={cert.image} 
              alt={`Pendo Certification ${index + 1}`}
            />
          </CertificateCard>
        </CertificateLink>
      ))}
    </GalleryContainer>
  );
};

export default PendoCertificates;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
  min-height: 130px;
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
`;

const CertificateLink = styled.a`
  display: block;
  text-decoration: none;
`;

const CertificateCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: ease-in-out .4s all;

  &:hover{
    transform: scale(1.3)
  }

`;

const CertificateImage = styled.img`
  width: 100px;
  height: auto;
`;