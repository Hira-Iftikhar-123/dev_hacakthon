"use client"

import { useEffect, useRef, useState } from "react"
import { Container, Typography, Paper, Grid, Box, Button } from "@mui/material"
import styled from "styled-components"
import { jsPDF } from "jspdf"

// Styled components
const PageContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`

const JobDescriptionPaper = styled(Paper)`
  padding: 2rem;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
`

const SectionPaper = styled(Paper)`
  padding: 1.5rem;
  height: 100%;
  overflow: auto;
`


const SectionHeader = styled.div`
  background-color: ${(props) => (props.$inverted ? "rgba(255, 255, 255, 0.1)" : props.theme.primary + "10")};
  margin: -1.5rem -2rem 1.5rem -2rem;
  padding: 1.5rem 2rem;
  border-bottom: ${(props) => (props.$inverted ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)")};
`

const PDFContainer = styled(Box)`
  width: 100%;
  height: 600px;
  overflow: auto;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

const CoverLetterContainer = styled(Box)`
  white-space: pre-line;
  line-height: 1.6;
`

const PDFControls = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  gap: 0.5rem;
`

// Dummy data
const dummyJobDescription = {
  title: "Senior Frontend Developer",
  company: "Tech Innovations Inc.",
  location: "San Francisco, CA (Remote Available)",
  salary: "$120,000 - $150,000",
  description: `We are seeking a talented Senior Frontend Developer to join our growing team. The ideal candidate will have extensive experience with React, TypeScript, and modern frontend frameworks.

Key Responsibilities: 
• Develop and maintain responsive web applications using React and TypeScript
• Collaborate with designers to implement UI/UX designs
• Work with backend developers to integrate frontend with APIs
• Optimize applications for maximum speed and scalability
• Stay up-to-date with emerging trends and technologies

Requirements:
• 5+ years of experience in frontend development
• Strong proficiency in React, TypeScript, and state management libraries
• Experience with responsive design and cross-browser compatibility
• Knowledge of modern frontend build pipelines and tools
• Excellent problem-solving skills and attention to detail`,
}
const dummyResumeText = `
JOHN DOE  
New York, USA | john.doe@example.com | WhatsApp: +1-555-123-4567 | LinkedIn | GitHub

EDUCATION  
Tech Valley University, California, USA  
B.Sc. in Computer Science   Sep 2021 - May 2025  
Concentrations: Data Science and Cloud Computing  
Related Coursework: Operating Systems, Computer Networks

EXPERIENCE  

CloudCore Labs | San Francisco, USA  
Software Intern  |  Jan 2024 - Apr 2024  
Worked on microservices using Node.js and MongoDB.  
Automated deployment pipelines for faster integration.

DeepVision AI | Remote  
AI Fellow  |  Jun 2023 - Aug 2023  
Worked on vision-based ML models using Python and OpenCV.  
Collaborated on LLM integration into web apps.

HealthSync Analytics | Boston, USA  
Data Analyst Intern  |  Mar 2023 - May 2023  
Performed data preprocessing and model training for health datasets.  
Created dashboards for real-time metric visualization.

ByteSpace Ltd. | Chicago, USA  
Backend Developer Intern  |  Jul 2022 - Sep 2022  
Developed APIs using Spring Boot.  
Assisted in bug fixing and version control tasks.

PROJECTS  

Smart Campus App  
Built a full-stack solution using React, Node.js, and Firebase for student services.

SkillTracker  
Developed a portal for tracking learning goals and progress using AI suggestions.

Crop Disease Classifier  
Created a CNN model in TensorFlow to detect plant diseases with 90% accuracy.

ResumeBoost  
A tool using GPT-4 API to generate resumes and job summaries.

StudyMate  
An AI-based platform to manage notes and create quizzes from text uploads.

HealthHero  
Built a MERN app for personalized fitness and diet planning.

SportsIQ  
Applied XGBoost and ensemble models to predict sports outcomes.

ACTIVITIES AND LEADERSHIP  

AI & Robotics Club | California, USA  
Vice President  |  Jan 2023 - Present  
Organized 3 campus-wide hackathons and weekly coding meetups.

SKILLS  
Programming: Python, Java, JavaScript, SQL, C++, React, Node.js, Flask, TensorFlow  
Tools: Git, VS Code, Postman, Docker, JIRA, MySQL, MongoDB, Figma, Linux  
`;

const dummyCoverLetter = `Dear Hiring Manager,

I am writing to express my interest in the Senior Frontend Developer position at Tech Innovations Inc. With over 6 years of experience in frontend development, I believe my skills and background make me an excellent candidate for this role.

Throughout my career, I have focused on creating responsive, user-friendly web applications using React, TypeScript, and other modern frontend technologies. In my current role at Digital Solutions Inc., I've led the development of our flagship SaaS product, implementing state management solutions and optimizing performance to reduce load times by 40%.

I'm particularly drawn to Tech Innovations because of your commitment to pushing the boundaries of web technology and your collaborative approach to development. Your recent project implementing AI-driven user interfaces aligns perfectly with my interest in combining cutting-edge technology with exceptional user experiences.

My experience includes:
• Building and maintaining large-scale React applications
• Implementing responsive designs that work across all devices
• Optimizing applications for maximum speed and scalability
• Collaborating closely with designers and backend developers
• Mentoring junior developers and conducting code reviews

I am excited about the possibility of bringing my technical expertise and passion for frontend development to your team. I would welcome the opportunity to discuss how my background, skills, and experiences would benefit Tech Innovations Inc.

Thank you for considering my application. I look forward to the possibility of working with your team.

Sincerely,
John Doe`

export default function JobApplicationPage() {
  const [pdfUrl, setPdfUrl] = useState("")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Generate PDF from resume text
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  
    doc.setFont("helvetica", "normal");
    let y = 20;
  
    const lines = dummyResumeText.split("\n");
  
    lines.forEach((line, index) => {
      const trimmed = line.trim();
  
      // Name
      if (index === 0) {
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text(trimmed, 20, y);
        y += 10;
      }
      // Contact info
      else if (index === 1) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(trimmed, 20, y);
        y += 8;
      }
      // Section Headers
      else if (
        ["EDUCATION", "EXPERIENCE", "PROJECTS", "ACTIVITIES AND LEADERSHIP", "SKILLS"].includes(trimmed)
      ) {
        y += 5;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(trimmed, 20, y);
        y += 5;
      }
      // Subheadings (like job titles, degrees)
      else if (/^\w.*\s–\s.*$/.test(trimmed) || /^[A-Z][A-Za-z\s]+(Intern|Fellow)/.test(trimmed)) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(trimmed, 20, y);
        y += 6;
      }
      // Bullet points
      else if (trimmed.startsWith("")) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(trimmed, 25, y);
        y += 5;
      }
      // General content
      else if (trimmed !== "") {
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(trimmed, 20, y);
        y += 5;
      }
      // Blank line
      else {
        y += 3;
      }
  
      // Avoid overflowing the page
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
  
    return doc;
  };
  
  

  // Generate PDF on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const doc = generatePDF();
      const pdfBlob = doc.output("blob");
  
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(blobUrl);
  
      // Clean up the blob URL to avoid memory leaks
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, []);
  

  // Handle print resume
  const handlePrintResume = () => {
    if (!iframeRef.current) {
      console.warn("Iframe not ready yet");
      return;
    }
  
    const iframeWindow = iframeRef.current.contentWindow;
  
    if (iframeWindow) {
      iframeWindow.focus();
      iframeWindow.print();
    } else {
      console.warn("Iframe window not available");
    }
  };
  

  // Handle download resume
  const handleDownloadResume = () => {
    const doc = generatePDF();
    doc.save("john_doe_resume.pdf");
  };
  

  return (
    <PageContainer maxWidth="lg">
      {/* Job Description Section */}
      <JobDescriptionPaper elevation={3}>
      <SectionHeader>
      <Typography variant="h5" component="h2" gutterBottom>
        Job Description
      </Typography>
    </SectionHeader>
        <Typography variant="h4" component="h1" gutterBottom>
          {dummyJobDescription.title}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {dummyJobDescription.company}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {dummyJobDescription.location} | {dummyJobDescription.salary}
        </Typography>
        <Typography variant="body1">
        {dummyJobDescription.description.split("\n").map((item, index) => (
            <span key={index}>{item}<br /></span>
        ))}
        </Typography>
      </JobDescriptionPaper>

      {/* Resume and Cover Letter Section */}
      <Grid container spacing={3}>
        {/* Resume Section */}
        <Grid item xs={12} md={6} sx={{minWidth:"550px"}}>
          <SectionPaper elevation={2}>
          <SectionHeader>
              <Typography variant="h5" component="h2" gutterBottom>
                Resume
              </Typography>
            </SectionHeader>
            <PDFControls>
              <Button variant="outlined" color="primary" size="small" onClick={handlePrintResume}>
                Print
              </Button>
              <Button variant="contained" color="primary" size="small" onClick={handleDownloadResume}>
                Download PDF
              </Button>
            </PDFControls>
            <PDFContainer>
            {pdfUrl ? (
            <iframe 
            // ref={iframeRef} 
            src={pdfUrl} title="Resume PDF" />
            ) : (
            <Typography>Loading PDF...</Typography>
            )}

            </PDFContainer>

          </SectionPaper>
        </Grid>

        {/* Cover Letter Section */}
        <Grid item xs={12} md={6} sx={{maxWidth: "550px"}}>
          <SectionPaper elevation={2}>
            
          <SectionHeader>
              <Typography variant="h5" component="h2" gutterBottom>
                Cover Letter
              </Typography>
            </SectionHeader>

            <CoverLetterContainer>
              <Typography variant="body1">{dummyCoverLetter}</Typography>
            </CoverLetterContainer>
          </SectionPaper>
        </Grid>
      </Grid>
    </PageContainer>
  )
}
