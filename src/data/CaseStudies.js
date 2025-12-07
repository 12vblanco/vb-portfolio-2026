// src/data/caseStudies.js
import lokaVideo from "../assets/caseStudies/loka1.mp4";
import lokaImage from "../assets/caseStudies/loka1.png";
import oms from "../assets/caseStudies/oms1.jpg";
import sujinVideo from "../assets/caseStudies/sujik.mp4";
import sujinImage from "../assets/caseStudies/sujin.jpg";

export const caseStudies = [
  {
    id: 1,
    title: "Design and Perspective",
    client: "Sujin Kim",
    description: "A comprehensive design system...",
    image: sujinImage, 
    video: sujinVideo, 
    tags: ["UI/UX Design", "Brand Identity", "Web Design"],
    year: "2024",
    link: "/case-studies/design-perspective",
    color: "#4F46E5"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    client: "Orders Made Simple",
    description: "Streamlined order management system with real-time tracking and analytics dashboard. Reduced processing time by 40% and improved customer satisfaction scores.",
    image: oms,
    tags: ["Product Design", "SaaS", "Dashboard"],
    year: "2023",
    link: "/case-studies/orders-simple",
    color: "#10B981"
  },
  {
    id: 3,
    title: "Healthcare Startup",
    client: "Loka Care",
    description: "Mobile-first healthcare application connecting patients with specialized care providers. Implemented secure messaging and appointment scheduling features.",
    image: lokaImage,
    video: lokaVideo,
    tags: ["Mobile App", "Healthcare", "React Native"],
    year: "2024",
    link: "/case-studies/loka-care",
    color: "#8B5CF6"
  },
  {
    id: 4,
    title: "Project Alpha",
    client: "Tech Corporation",
    description: "Enterprise-level dashboard with advanced data visualization and reporting tools for business intelligence.",
    image: "/images/project-alpha.jpg",
    tags: ["Data Visualization", "Enterprise", "React"],
    year: "2023",
    link: "/case-studies/project-alpha",
    color: "#F59E0B"
  },
  {
    id: 5,
    title: "Urban Planner",
    client: "City Development",
    description: "Interactive urban planning tool with 3D modeling and community engagement features for sustainable city development.",
    image: "/images/urban-planner.jpg",
    tags: ["3D Modeling", "Civic Tech", "WebGL"],
    year: "2024",
    link: "/case-studies/urban-planner",
    color: "#3B82F6"
  }
];