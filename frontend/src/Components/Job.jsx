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
Eraj Tanweer
Karachi, Pakistan | erajtanweer2@gmail.com | WhatsApp: 0333-2162005 | LinkedIn | GitHub

EDUCATION
NED University of Engineering and Technology Karachi, Pakistan
B.E. in Software Engineering   May 2022 - Jun 2026
• Concentrations: Artificial Intelligence and Web Development
• Related Coursework: Data Structures & Algorithms, Object-Oriented Programming, Web Engineering, DBMS, Software Construction and Development, Software Design and Architecture

EXPERIENCE

Quality Enhancement Cell (QEC) – NED | Karachi, Pakistan
Intern  |  Feb 2024 – Jun 2024
● Worked with the team on QEC portal project using NodeJS and ExpressJS.
● Created automated workflow to eliminate old manual process to enhance accuracy and efficiency.

Headstarter AI | New York, USA
Software Engineering Fellow  |  Jul 2024 – Sep 2024
● Worked on projects using ReactJS, NextJS, Ollama AI, ChatGPT API, and machine learning.
● Participated in sessions with engineers from Google, Y Combinator, Stanford, Amazon, and startups.

Jinnah Lincoln Foundation | New York, USA
Machine Learning Intern  |  Sep 2023 – Dec 2023
● Gained practical experience in machine learning and data science through hands-on tasks.
● Assisted in data analysis, model development, and project implementation.

EvantageSoft Private Limited | Karachi, Pakistan
Java Springboot Intern  |  Aug 2023 – Sep 2023
● Developed REST APIs using Spring Boot.
● Understood full software development lifecycle and backend API design principles.

PROJECTS

Quality Management System
● Developed a web app using Node.js, Express.js, React.js, and MySQL, used by 100+ faculty members.

Deliberatives – Leaderboards to foster learning
● Created a platform for users to log learning applications and rank via leaderboards.

Disease Detection System
● Built a CNN-based model in Python achieving 92% accuracy in pneumonia and tuberculosis detection.

TealHQ – AI-Powered Resume & Cover Letter Generator
● Developed a resume/job-matching Next.js app that also generates cover letters.

LearnFlow – Collaborative AI Learning Platform
● Built a platform to organize study resources and auto-generate 100+ flashcards using AI.

Velora – Complete Health Platform
● Developed a JS web app with exercise planner, meal planner, and recipe generator.

NFL Big Data Bowl
● Built ML models to analyze NFL data, improving tackling metric prediction by 15%.

ACTIVITIES AND LEADERSHIP

Software Innovators Club | Karachi, Pakistan
President  |  Oct 2023 – Present
● Led 50+ member club, organized departmental events, managed sponsorship outreach, and directed exec board.

SKILLS
Programming: Java, Python, JavaScript, HTML/CSS, SQL, Node.js, React.js, C++, AI/ML/DL in Python
Tools: Visual Studio, IntelliJ, PyCharm, Azure, Jupyter Notebooks, Git, Bootstrap, Spring Boot, Agile
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
      else if (trimmed.startsWith("●")) {
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
