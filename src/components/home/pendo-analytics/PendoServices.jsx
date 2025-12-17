// src/components/cases/PendoServices.jsx
import styled from 'styled-components';
import pendoIcon from "../../../assets/pendoCert/pendo-icon.png";

const PendoServices = () => {
  const services = [
    {
      title: 'Pendo Analytics',
      description: 'Comprehensive analytics solutions to track user behavior, measure feature adoption, and gain actionable insights into how customers interact with your product.'
    },
    {
      title: 'Guide Creation',
      description: 'Custom in-app guides and walkthroughs to onboard users, announce new features, and drive product adoption without disrupting the user experience.'
    },
    {
      title: 'Product-Led Growth',
      description: 'Strategic implementation of product-led growth frameworks using Pendo to drive expansion, reduce churn, and increase customer lifetime value through data-driven decisions.'
    }
  ];

  return (
    <ServicesContainer>
      {services.map((service, index) => (
        <ServiceItem key={index}>
          <IconContainer>
            <PendoIcon src={pendoIcon} alt="Pendo Icon" />
          </IconContainer>
          <ServiceContent>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceContent>
        </ServiceItem>
      ))}
    </ServicesContainer>
  );
};

export default PendoServices;

const ServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 680px;
  margin: 0 auto;
  color: var(--blue);
  text-align: left;
`;

const ServiceItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  margin-top: -0.5rem;
`;

const PendoIcon = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const ServiceContent = styled.div`
  flex: 1;
`;

const ServiceTitle = styled.h4`
  margin-bottom: 0.2rem;
  font-weight: 700;
`;

const ServiceDescription = styled.p`
  font-size: 1.2rem;
    max-width: 564px;
`;