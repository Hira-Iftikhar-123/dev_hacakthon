"use client"

import { useState, useEffect } from "react"
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
  LinearProgress,
  Checkbox,
  FormControlLabel,
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
  Add,
  Launch,
  ArrowForwardIos,
  LocationOn,
  AccessTime,
  CheckCircle,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

// Theme object aligned with job application page
const theme = {
  primary: "#2b6777",
  primaryLight: "#52ab98",
  primaryDark: "#1a3c48",
  secondary: "#c8d8e4",
  secondaryLight: "#f0f5f9",
  accent: "#f2a154",
  accentDark: "#e67e22",
  tertiary: "#7e57c2",
  tertiaryLight: "#b085f5",
  background: "#c5e8e0",
  white: "#ffffff",
  success: "#4caf50",
  warning: "#ff9800",
  error: "#f44336",
  text: "#2b6777",
  textLight: "#52ab98",
  textDark: "#1a3c48",
}

// Global styles with gradient background matching job application page
const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, ${(props) => props.theme.background} 0%, #d8f3eb 100%);
    color: ${(props) => props.theme.text};
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
`

// Styled Components with enhanced styling
const PageContainer = styled(motion.div)`
  padding: 3rem 0;
  max-width: 1200px;
  margin: 0 auto;
`

const DashboardHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(43, 103, 119, 0.2);
  color: ${(props) => props.theme.white};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    transform: rotate(30deg);
  }
`

const SectionTitle = styled(Typography)`
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.white};
  margin: 0;
`

const SectionContainer = styled(motion(Paper))`
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(43, 103, 119, 0.1);
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(43, 103, 119, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(43, 103, 119, 0.15);
    transform: translateY(-5px);
  }
`

const SectionHeader = styled.div`
  background: linear-gradient(90deg, ${(props) => props.theme.primary} 0%, ${(props) => props.theme.primaryDark} 100%);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const SectionContent = styled.div`
  padding: 2rem;
`

const SkillChip = styled(motion(Chip))`
  margin: 0.5rem;
  padding: 0.5rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.level === "advanced"
      ? "rgba(82, 171, 152, 0.15)"
      : props.level === "intermediate"
        ? "rgba(242, 161, 84, 0.15)"
        : "rgba(126, 87, 194, 0.15)"};
  border: 1px solid ${(props) =>
    props.level === "advanced"
      ? props.theme.primaryLight
      : props.level === "intermediate"
        ? props.theme.accent
        : props.theme.tertiary};
  color: ${(props) =>
    props.level === "advanced"
      ? props.theme.primaryDark
      : props.level === "intermediate"
        ? props.theme.accentDark
        : props.theme.tertiary};
  
  &:hover {
    background-color: ${(props) =>
      props.level === "advanced"
        ? "rgba(82, 171, 152, 0.25)"
        : props.level === "intermediate"
          ? "rgba(242, 161, 84, 0.25)"
          : "rgba(126, 87, 194, 0.25)"};
  }
`

const CourseCard = styled(motion(Card))`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  border: ${(props) => (props.enrolled ? `2px solid ${props.theme.success}` : "1px solid rgba(43, 103, 119, 0.2)")};
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  ${(props) =>
    props.enrolled &&
    `
    &:before {
      content: 'Enrolled';
      position: absolute;
      top: 12px;
      right: 12px;
      background: ${props.theme.success};
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
  `}
`

const JobCard = styled(motion(Card))`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(43, 103, 119, 0.1);
  border: 1px solid rgba(43, 103, 119, 0.2);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`

const JobDomain = styled(Chip)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: rgba(43, 103, 119, 0.1);
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  border: 1px solid rgba(43, 103, 119, 0.2);
`

const ViewMoreButton = styled(Button)`
  margin-top: 1rem;
  background: ${(props) => props.theme.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(43, 103, 119, 0.2);
  
  &:hover {
    background: ${(props) => props.theme.primaryDark};
    box-shadow: 0 6px 20px rgba(43, 103, 119, 0.3);
  }
`

const ActionButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  color: ${(props) => (props.primary ? "white" : props.theme.primary)};
  background: ${(props) => (props.primary ? props.theme.primary : "transparent")};
  border: ${(props) => (props.primary ? "none" : `1px solid ${props.theme.primary}`)};
  box-shadow: ${(props) => (props.primary ? "0 4px 15px rgba(43, 103, 119, 0.2)" : "none")};
  
  &:hover {
    background: ${(props) => (props.primary ? props.theme.primaryDark : "rgba(43, 103, 119, 0.1)")};
    box-shadow: ${(props) => (props.primary ? "0 6px 20px rgba(43, 103, 119, 0.3)" : "0 4px 10px rgba(43, 103, 119, 0.1)")};
  }
`

const SearchBar = styled(Box)`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 300px;
  backdrop-filter: blur(5px);
  
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

const SkillsContainer = styled(Box)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(43, 103, 119, 0.1);
  box-shadow: 0 4px 16px rgba(43, 103, 119, 0.05);
`

const AddSkillButton = styled(Button)`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border-radius: 8px;
  text-transform: none;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(43, 103, 119, 0.2);
  
  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    box-shadow: 0 6px 15px rgba(43, 103, 119, 0.3);
  }
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
    boxShadow: "0 15px 30px rgba(43, 103, 119, 0.15)",
    transition: { type: "spring", stiffness: 300 },
  },
}

const chipVariants = {
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
}

// Mock Data
const hardSkillsData = [
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

const softSkillsData = [
  { id: 11, name: "Communication", level: "advanced" },
  { id: 12, name: "Teamwork", level: "advanced" },
  { id: 13, name: "Problem Solving", level: "intermediate" },
  { id: 14, name: "Time Management", level: "intermediate" },
  { id: 15, name: "Leadership", level: "beginner" },
]

// New skills data that can be added
const newSkillsData = [
  { id: 101, name: "Python", level: "beginner" },
  { id: 102, name: "Docker", level: "beginner" },
  { id: 103, name: "AWS", level: "beginner" },
  { id: 104, name: "Vue.js", level: "beginner" },
  { id: 105, name: "Angular", level: "beginner" },
  { id: 106, name: "Kubernetes", level: "beginner" },
]

// New soft skills data that can be added
const newSoftSkillsData = [
  { id: 111, name: "Creativity", level: "intermediate" },
  { id: 112, name: "Critical Thinking", level: "beginner" },
  { id: 113, name: "Adaptability", level: "intermediate" },
  { id: 114, name: "Emotional Intelligence", level: "beginner" },
]

// Update the coursesData to mark one as enrolled
const coursesData = [
  {
    id: 1,
    title: "Advanced React Patterns",
    provider: "Frontend Masters",
    description: "Learn advanced React patterns and techniques to build scalable applications.",
    image: "/placeholder.svg?height=140&width=350&text=React+Patterns",
    duration: "8 hours",
    level: "Advanced",
    rating: 4.8,
    enrolled: true,
    progress: 35,
    skills: ["React", "JavaScript"],
  },
  {
    id: 2,
    title: "GraphQL Fundamentals",
    provider: "Apollo",
    description: "Master GraphQL queries, mutations, and integrations with React.",
    image: "/placeholder.svg?height=140&width=350&text=GraphQL",
    duration: "6 hours",
    level: "Intermediate",
    rating: 4.5,
    enrolled: false,
    skills: ["GraphQL", "React", "JavaScript"],
  },
  {
    id: 3,
    title: "TypeScript for React Developers",
    provider: "Udemy",
    description: "Learn how to use TypeScript effectively with React applications.",
    image: "/placeholder.svg?height=140&width=350&text=TypeScript",
    duration: "10 hours",
    level: "Intermediate",
    rating: 4.7,
    enrolled: false,
    skills: ["TypeScript", "React"],
  },
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
    externalLink: "https://www.indeed.com/viewjob?jk=12995168dad66931&from=shareddesktop_copy",
    requiredSkills: ["React", "TypeScript", "Redux", "JavaScript", "HTML", "CSS"],
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
    externalLink: "https://example.com/jobs/fullstack-engineer",
    requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript", "HTML", "CSS"],
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
    externalLink: "https://example.com/jobs/ui-ux-developer",
    requiredSkills: ["React", "CSS", "HTML", "JavaScript", "Figma"],
  },
]

function Dashboard() {
  const navigate = useNavigate()
  const [savedJobs, setSavedJobs] = useState([])
  const [savedCourses, setSavedCourses] = useState([])
  const [userSkills, setUserSkills] = useState([...hardSkillsData.map((skill) => skill.name)])
  const [userSoftSkills, setUserSoftSkills] = useState([...softSkillsData.map((skill) => skill.name)])
  const [availableSkills, setAvailableSkills] = useState([...newSkillsData])
  const [availableSoftSkills, setAvailableSoftSkills] = useState([...newSoftSkillsData])
  const [jobProgress, setJobProgress] = useState({})

  // Calculate job match percentages on component mount
  useEffect(() => {
    updateJobMatches()
  }, [])

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

  const handleEnrollClick = (courseId) => {
    // For enrolled courses, just add a green border outline
    if (coursesData.find((course) => course.id === courseId)?.enrolled) {
      return
    }

    // For non-enrolled courses, would typically handle enrollment logic
    // For this UI demo, we're just showing what would happen
  }

  // Function to add a skill to user skills
  const addSkill = (skill) => {
    setUserSkills([...userSkills, skill.name])
    setAvailableSkills(availableSkills.filter((s) => s.id !== skill.id))

    // Recalculate job matches after adding a skill
    updateJobMatches()
  }

  // Function to add a soft skill
  const addSoftSkill = (skill) => {
    setUserSoftSkills([...userSoftSkills, skill.name])
    setAvailableSoftSkills(availableSoftSkills.filter((s) => s.id !== skill.id))
  }

  // Function to calculate job match percentage
  function calculateJobMatch(job) {
    const matchedSkills = job.requiredSkills.filter((skill) => userSkills.includes(skill))
    return Math.round((matchedSkills.length / job.requiredSkills.length) * 100)
  }

  // Function to update all job matches
  const updateJobMatches = () => {
    const newJobProgress = {}
    jobsData.forEach((job) => {
      newJobProgress[job.id] = calculateJobMatch(job)
    })
    setJobProgress(newJobProgress)
  }

  // Get color based on match percentage
  const getMatchColor = (match) => {
    if (match >= 80) return theme.success
    if (match >= 60) return theme.warning
    return theme.error
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer initial="hidden" animate="visible" variants={containerVariants}>
        {/* Dashboard Header */}
        <DashboardHeader variants={itemVariants}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "white",
                color: theme.primary,
                width: 60,
                height: 60,
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              JD
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "white" }}>
                Welcome back, John!
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                You have 3 new job recommendations based on your skills
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <SearchBar>
              <Search sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
              <input placeholder="Search..." />
            </SearchBar>
            <IconButton
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                },
              }}
            >
              <FilterList />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                },
              }}
            >
              <Notifications />
            </IconButton>
          </Box>
        </DashboardHeader>

        {/* Skills Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <Code sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">My Skills</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Grid container spacing={4}>
              {/* Hard Skills Column */}
              <Grid item xs={12} md={6}>
                <SkillsContainer>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.primary }}>
                    Technical Skills
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {hardSkillsData
                      .filter((skill) => userSkills.includes(skill.name))
                      .map((skill) => (
                        <SkillChip
                          key={skill.id}
                          label={skill.name}
                          level={skill.level}
                          variants={chipVariants}
                          whileHover="hover"
                        />
                      ))}
                  </Box>
                </SkillsContainer>
              </Grid>

              {/* Soft Skills Column */}
              <Grid item xs={12} md={6}>
                <SkillsContainer>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.primary }}>
                      Soft Skills
                    </Typography>
                    <AddSkillButton startIcon={<Add />} onClick={() => navigate("/add-skills")}>
                      Add Skill
                    </AddSkillButton>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {softSkillsData
                      .filter((skill) => userSoftSkills.includes(skill.name))
                      .map((skill) => (
                        <SkillChip
                          key={skill.id}
                          label={skill.name}
                          level={skill.level}
                          variants={chipVariants}
                          whileHover="hover"
                        />
                      ))}
                  </Box>
                </SkillsContainer>
              </Grid>
            </Grid>

            {/* New Skills to Add */}
            <SkillsContainer sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.primary }}>
                Recommended Skills to Learn
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {availableSkills.map((skill) => (
                  <FormControlLabel
                    key={skill.id}
                    control={
                      <Checkbox
                        onChange={() => addSkill(skill)}
                        sx={{
                          color: theme.primary,
                          "&.Mui-checked": {
                            color: theme.primary,
                          },
                        }}
                      />
                    }
                    label={
                      <SkillChip label={skill.name} level={skill.level} variants={chipVariants} whileHover="hover" />
                    }
                  />
                ))}
              </Box>
            </SkillsContainer>
          </SectionContent>
        </SectionContainer>

        {/* Courses Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <School sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Recommended Courses</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Grid container spacing={3}>
              {coursesData.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <CourseCard variants={cardVariants} whileHover="hover" enrolled={course.enrolled}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.image || `/placeholder.svg?height=140&width=350&text=${course.title}`}
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 600, fontSize: "1rem", color: theme.primary }}
                        >
                          {course.title}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => toggleSaveCourse(course.id)}
                          sx={{ color: savedCourses.includes(course.id) ? theme.accent : theme.textLight }}
                        >
                          {savedCourses.includes(course.id) ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", color: theme.textLight }}>
                          <AccessTime sx={{ fontSize: "0.9rem", mr: 0.5 }} />
                          <Typography variant="body2" sx={{ color: theme.textLight }}>
                            {course.duration}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                          <Star sx={{ color: "#FFD700", fontSize: "0.9rem" }} />
                          <Typography variant="body2" sx={{ ml: 0.5, color: theme.text }}>
                            {course.rating}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={course.level}
                        size="small"
                        sx={{
                          mb: 1,
                          backgroundColor: "rgba(43, 103, 119, 0.1)",
                          color: theme.primary,
                          fontWeight: 500,
                          border: "1px solid rgba(43, 103, 119, 0.2)",
                        }}
                      />
                      <Typography variant="body2" sx={{ mt: 1, color: theme.text }}>
                        {course.description}
                      </Typography>

                      {course.enrolled && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              mb: 0.5,
                              fontWeight: 500,
                              color: theme.success,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={course.progress}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              backgroundColor: "rgba(43, 103, 119, 0.1)",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: theme.success,
                                borderRadius: 5,
                              },
                            }}
                          />
                        </Box>
                      )}
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {course.enrolled ? (
                        <ActionButton size="small" primary onClick={() => handleEnrollClick(course.id)}>
                          Continue Learning
                        </ActionButton>
                      ) : (
                        <ActionButton size="small" primary onClick={() => handleEnrollClick(course.id)}>
                          Enroll Now
                        </ActionButton>
                      )}
                      <ActionButton
                        size="small"
                        onClick={() => navigate(`/hardskills`)}
                        endIcon={<ArrowForwardIos />}
                      >
                        Preview
                      </ActionButton>
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
                onClick={() => navigate("/courses")}
              >
                View More Courses
              </ViewMoreButton>
            </Box>
          </SectionContent>
        </SectionContainer>

        {/* Job Board Section */}
        <SectionContainer variants={itemVariants} initial="hidden" animate="visible">
          <SectionHeader>
            <Work sx={{ color: "white", fontSize: 28 }} />
            <SectionTitle variant="h5">Job Recommendations</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <Grid container spacing={3}>
              {jobsData.map((job) => (
                <Grid item xs={12} md={4} key={job.id}>
                  <JobCard variants={cardVariants} whileHover="hover">
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", p: 2, pb: 0 }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          variant="rounded"
                          src={job.logo}
                          alt={job.company}
                          sx={{ width: 50, height: 50, mr: 1.5 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.primary }}>
                            {job.company}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.textLight }}>
                            Posted {job.posted}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        onClick={() => toggleSaveJob(job.id)}
                        sx={{
                          color: savedJobs.includes(job.id) ? theme.accent : theme.textLight,
                        }}
                      >
                        {savedJobs.includes(job.id) ? <Bookmark /> : <BookmarkBorder />}
                      </IconButton>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 600, color: theme.primary }}
                      >
                        {job.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationOn sx={{ fontSize: "0.9rem", color: theme.textLight, mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: theme.textLight }}>
                          {job.location}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.accent,
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
                      <Divider sx={{ my: 1.5, backgroundColor: "rgba(43, 103, 119, 0.1)" }} />
                      <Typography variant="body2" sx={{ color: theme.text }}>
                        {job.description}
                      </Typography>

                      {/* Job Match Progress Bar */}
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ mb: 0.5, fontWeight: 500, display: "flex", justifyContent: "space-between" }}
                        >
                          <span>Skills Match</span>
                          <span style={{ color: getMatchColor(jobProgress[job.id]) }}>
                            {jobProgress[job.id]}%
                            {jobProgress[job.id] >= 80 && (
                              <CheckCircle fontSize="small" sx={{ ml: 0.5, verticalAlign: "middle" }} />
                            )}
                          </span>
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={jobProgress[job.id]}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            backgroundColor: "rgba(43, 103, 119, 0.1)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: getMatchColor(jobProgress[job.id]),
                              borderRadius: 5,
                            },
                          }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <ActionButton
                        size="small"
                        primary
                        component="a"
                        href={job.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<Launch />}
                      >
                        Apply Now
                      </ActionButton>
                      <ActionButton
                        size="small"
                        onClick={() => navigate(`/job`)}
                        endIcon={<ArrowForwardIos />}
                      >
                        View Details
                      </ActionButton>
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
                onClick={() => navigate("/jobs")}
              >
                View More Jobs
              </ViewMoreButton>
            </Box>
          </SectionContent>
        </SectionContainer>
      </PageContainer>
    </ThemeProvider>
  )
}

export default Dashboard
