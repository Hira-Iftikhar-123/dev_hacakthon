"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import {
  Work,
  School,
  Code,
  ArrowForward,
  BookmarkBorder,
  Bookmark,
  Star,
  Search,
  FilterList,
  Notifications,
} from "@mui/icons-material"
import { motion } from "framer-motion"

// Create a theme with our primary color
const theme = {
  primary: "#2b6777",
  primaryLight: "#52ab98",
  primaryDark: "#1a3c48",
  secondary: "#c8d8e4",
  background: "#f2f2f2",
  cardBg: "#ffffff",
  text: "#333333",
  textLight: "#666666",
  white: "#ffffff",
}

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Poppins', sans-serif;
  }
`

// Styled Components with Motion
const MotionContainer = styled(motion.div)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const DashboardHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.white};
`

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => (props.$inverted ? props.theme.white : props.theme.primary)};
`

const SectionContainer = styled(motion(Paper))`
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background-color: ${(props) => (props.$inverted ? props.theme.primary : props.theme.cardBg)};
  color: ${(props) => (props.$inverted ? props.theme.white : props.theme.text)};
  border-top: ${(props) => (props.$inverted ? "none" : `4px solid ${props.theme.primary}`)};
`

const SkillChip = styled(motion(Chip))`
  margin: 0.5rem;
  padding: 0.75rem 0.5rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.$inverted
      ? "rgba(255, 255, 255, 0.15)"
      : props.level === "advanced"
        ? props.theme.primaryLight + "33"
        : props.level === "intermediate"
          ? props.theme.secondary + "99"
          : "#f0f8ff"};
  border: 1px solid ${(props) =>
    props.$inverted
      ? "rgba(255, 255, 255, 0.3)"
      : props.level === "advanced"
        ? props.theme.primaryLight
        : props.level === "intermediate"
          ? props.theme.secondary
          : "#d0e0f0"};
  color: ${(props) =>
    props.$inverted
      ? props.theme.white
      : props.level === "advanced"
        ? props.theme.primaryDark
        : props.level === "intermediate"
          ? props.theme.textLight
          : props.theme.textLight};
  &:hover {
    background-color: ${(props) =>
      props.$inverted
        ? "rgba(255, 255, 255, 0.25)"
        : props.level === "advanced"
          ? props.theme.primaryLight + "66"
          : props.level === "intermediate"
            ? props.theme.secondary
            : "#e0e8ef"};
  }
`

const CourseCard = styled(motion(Card))`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: ${(props) => props.theme.cardBg};
`

const JobCard = styled(motion(Card))`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: ${(props) => props.theme.cardBg};
`

const CompanyLogo = styled(CardMedia)`
  height: 60px;
  background-size: contain;
  margin: 1rem;
`

const JobDomain = styled(Chip)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.primaryDark};
  font-weight: 500;
`

const ViewMoreButton = styled(Button)`
  margin-top: 1rem;
  align-self: flex-end;
  background-color: ${(props) => (props.$inverted ? props.theme.white : props.theme.primary)};
  color: ${(props) => (props.$inverted ? props.theme.primary : props.theme.white)};
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  &:hover {
    background-color: ${(props) => (props.$inverted ? "rgba(255, 255, 255, 0.9)" : props.theme.primaryDark)};
  }
`

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  border-radius: 8px;
  padding: 0.4rem 1rem;
  color: ${(props) => (props.primary ? "white" : props.theme.primary)};
  background-color: ${(props) => (props.primary ? props.theme.primary : "transparent")};
  border: ${(props) => (props.primary ? "none" : `1px solid ${props.theme.primary}`)};
  &:hover {
    background-color: ${(props) => (props.primary ? props.theme.primaryDark : props.theme.secondary + "50")};
    border: ${(props) => (props.primary ? "none" : `1px solid ${props.theme.primaryDark}`)};
  }
`

const SearchBar = styled(Box)`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 300px;
  
  & input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    background: transparent;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`

const SectionHeader = styled.div`
  background-color: ${(props) => (props.$inverted ? "rgba(255, 255, 255, 0.1)" : props.theme.primary + "10")};
  margin: -1.5rem -2rem 1.5rem -2rem;
  padding: 1.5rem 2rem;
  border-bottom: ${(props) => (props.$inverted ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)")};
`

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
  hover: {
    y: -10,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
    transition: { type: "spring", stiffness: 300 },
  },
}

const chipVariants = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
}

// Mock Data
const skillsData = [
  { id: 1, name: "React", level: "advanced" },
  { id: 2, name: "JavaScript", level: "advanced" },
  { id: 3, name: "TypeScript", level: "intermediate" },
  { id: 4, name: "Node.js", level: "intermediate" },
  { id: 5, name: "CSS", level: "advanced" },
  { id: 6, name: "HTML", level: "advanced" },
  { id: 7, name: "Redux", level: "intermediate" },
  { id: 8, name: "GraphQL", level: "beginner" },
  { id: 9, name: "MongoDB", level: "intermediate" },
  { id: 10, name: "SQL", level: "beginner" },
]

const coursesData = [
  {
    id: 1,
    title: "Advanced React Patterns",
    provider: "Frontend Masters",
    description: "Learn advanced React patterns and techniques to build scalable applications.",
    image: "data:image/png;base64,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",
    duration: "8 hours",
    level: "Advanced",
    rating: 4.8,
  },
  {
    id: 2,
    title: "GraphQL Fundamentals",
    provider: "Apollo",
    description: "Master GraphQL queries, mutations, and integrations with React.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq3YComPX9TvrEWz8blolTSw8z1_-8uJp9JA&s",
    duration: "6 hours",
    level: "Intermediate",
    rating: 4.5,
  },
  {
    id: 3,
    title: "TypeScript for React Developers",
    provider: "Udemy",
    description: "Learn how to use TypeScript effectively with React applications.",
    image: "data:image/png;base64,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",
    duration: "10 hours",
    level: "Intermediate",
    rating: 4.7,
  }
]

const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=60&width=120",
    location: "San Francisco, CA (Remote)",
    domain: ["React", "TypeScript", "Redux"],
    description:
      "We are looking for a Senior Frontend Developer to join our team and help build our next-generation web applications.",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "InnovateTech",
    logo: "/placeholder.svg?height=60&width=120",
    location: "New York, NY (Hybrid)",
    domain: ["React", "Node.js", "MongoDB"],
    description: "Join our dynamic team to develop full-stack applications using modern JavaScript frameworks.",
    salary: "$110,000 - $140,000",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "UI/UX Developer",
    company: "DesignHub",
    logo: "/placeholder.svg?height=60&width=120",
    location: "Austin, TX (On-site)",
    domain: ["React", "CSS", "Figma"],
    description:
      "Looking for a talented UI/UX Developer to create beautiful and intuitive user interfaces for our products.",
    salary: "$100,000 - $130,000",
    posted: "3 days ago",
  },
]

// Dashboard Component
const Dashboard = () => {
  const [savedJobs, setSavedJobs] = useState([])
  const [savedCourses, setSavedCourses] = useState([])

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const toggleSaveCourse = (courseId) => {
    if (savedCourses.includes(courseId)) {
      setSavedCourses(savedCourses.filter((id) => id !== courseId))
    } else {
      setSavedCourses([...savedCourses, courseId])
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MotionContainer initial="hidden" animate="visible" variants={containerVariants}>
        <DashboardHeader variants={itemVariants}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "white", color: theme.primary, width: 48, height: 48, fontWeight: "bold" }}>
              JD
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
                Welcome back, John!
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                You have 3 new job recommendations
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <SearchBar>
              <Search sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              <input placeholder="Search..." />
            </SearchBar>
            <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 0.15)", color: "white" }}>
              <FilterList />
            </IconButton>
            <IconButton sx={{ bgcolor: "rgba(255, 255, 255, 0.15)", color: "white" }}>
              <Notifications />
            </IconButton>
          </Box>
        </DashboardHeader>

        {/* Skills Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <SectionTitle variant="h5">
              <Code sx={{ color: theme.primary }} /> My Skills
            </SectionTitle>
          </SectionHeader>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skillsData.map((skill) => (
              <SkillChip
                key={skill.id}
                label={skill.name}
                level={skill.level}
                variants={chipVariants}
                whileHover="hover"
              />
            ))}
          </Box>
        </SectionContainer>

        {/* Learn Skills Section - With inverted colors */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible" >
        <SectionHeader>
            <SectionTitle variant="h5">
              <Code sx={{ color: theme.primary }} /> Learn New Skills
            </SectionTitle>
          </SectionHeader>
          <Grid container spacing={3}>
            {coursesData.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard variants={cardVariants} whileHover="hover" sx={{maxWidth:"350px"}}>
                  <CardMedia component="img" height="140" image={course.image} alt={course.title} />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                        {course.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => toggleSaveCourse(course.id)}
                        sx={{ color: theme.primary }}
                      >
                        {savedCourses.includes(course.id) ? <Bookmark /> : <BookmarkBorder />}
                      </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {course.provider} • {course.duration}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                        <Star sx={{ color: "#FFD700", fontSize: "0.9rem" }} />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {course.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={course.level}
                      size="small"
                      sx={{
                        mb: 1,
                        backgroundColor:
                          course.level === "Advanced"
                            ? theme.primaryLight + "33"
                            : course.level === "Intermediate"
                              ? theme.secondary + "99"
                              : "#f0f8ff",
                        color: course.level === "Advanced" ? theme.primaryDark : theme.textLight,
                        fontWeight: 500,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {course.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <ActionButton size="small" primary>
                      Enroll Now
                    </ActionButton>
                    <ActionButton size="small">Preview</ActionButton>
                  </CardActions>
                </CourseCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <ViewMoreButton
              endIcon={<ArrowForward />}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              $inverted
            >
              View More Courses
            </ViewMoreButton>
          </Box>
        </SectionContainer>

        {/* Job Board Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <SectionTitle variant="h5">
              <Work sx={{ color: theme.primary }} /> Job Board
            </SectionTitle>
          </SectionHeader>
          <Grid container spacing={3}>
            {jobsData.map((job) => (
              <Grid item xs={12} md={4} key={job.id}>
                <JobCard variants={cardVariants} whileHover="hover" sx={{maxWidth: "350px"}}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", p: 2, pb: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        variant="rounded"
                        src={job.logo}
                        alt={job.company}
                        sx={{ width: 50, height: 50, mr: 1.5 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {job.company}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Posted {job.posted}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton onClick={() => toggleSaveJob(job.id)} sx={{ color: theme.primary }}>
                      {savedJobs.includes(job.id) ? <Bookmark /> : <BookmarkBorder />}
                    </IconButton>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {job.location}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.primary,
                        fontWeight: 600,
                        mb: 1.5,
                      }}
                    >
                      {job.salary}
                    </Typography>
                    <Box sx={{ my: 1.5 }}>
                      {job.domain.map((domain, index) => (
                        <JobDomain key={index} label={domain} size="small" />
                      ))}
                    </Box>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {job.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <ActionButton size="small" primary>
                      Apply Now
                    </ActionButton>
                    <ActionButton size="small">View Details</ActionButton>
                  </CardActions>
                </JobCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <ViewMoreButton
              endIcon={<ArrowForward />}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More Jobs
            </ViewMoreButton>
          </Box>
        </SectionContainer>
      </MotionContainer>
    </ThemeProvider>
  )
}

export default Dashboard


