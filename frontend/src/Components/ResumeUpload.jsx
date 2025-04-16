"use client"

import { useState, useRef } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
  CssBaseline,
} from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, ArrowLeft, File, Plus, Trash2, Edit } from "lucide-react"

// Create a custom theme with the requested color
const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
    },
    secondary: {
      main: "#c8d8e4",
    },
    background: {
      default: "#f2f2f2",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
  },
})

// Styled components
const OptionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "250px",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}))

const OptionIcon = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: theme.palette.secondary.main,
}))

const UploadArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: `2px dashed ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.default,
  cursor: "pointer",
  minHeight: "300px",
}))

const HiddenInput = styled("input")({
  display: "none",
})

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))

// OptionSelection Component
function OptionSelection({ onOptionSelect }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
        <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 2, // padding x-axis for small screens
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Resume Parser
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
        Choose how you want to enter your resume information
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          mt: 6,
        }}
      >
        <motion.div variants={itemVariants}>
          <OptionCard elevation={3} onClick={() => onOptionSelect("upload")}>
            <OptionIcon>
              <Upload size={30} />
            </OptionIcon>
            <Typography variant="h6" component="h2" gutterBottom>
              Upload Resume
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Upload your existing resume and we'll extract the information automatically
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => onOptionSelect("upload")}>
              Upload
            </Button>
          </OptionCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <OptionCard elevation={3} onClick={() => onOptionSelect("manual")}>
            <OptionIcon>
              <Edit size={30} />
            </OptionIcon>
            <Typography variant="h6" component="h2" gutterBottom>
              Manually Enter Details
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Enter your information manually through our guided form
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => onOptionSelect("manual")}>
              Enter Manually
            </Button>
          </OptionCard>
        </motion.div>
      </Box>
      </Box>
    </motion.div>
  )
}

// ResumeUpload Component
function ResumeUpload({ onSubmit, onBack }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = () => {
    if (file) {
      onSubmit(file)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" component="h1">
          Upload Your Resume
        </Typography>
      </Box>

      <UploadArea
        elevation={isDragging ? 3 : 1}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        sx={{
          backgroundColor: isDragging ? "rgba(43, 103, 119, 0.1)" : "background.default",
          transition: "all 0.3s ease",
        }}
      >
        <HiddenInput type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} ref={fileInputRef} />

        {!file ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "secondary.main",
                margin: "0 auto 16px",
              }}
            >
              <Upload size={40} color="#2b6777" />
            </Box>
            <Typography variant="h6" gutterBottom>
              Drag & Drop your resume here
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              or click to browse files (PDF, DOC, DOCX)
            </Typography>
          </motion.div>
        ) : (
          <Box sx={{ position: "relative", width: "100%", textAlign: "center" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                backgroundColor: "rgba(255,255,255,0.8)",
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
              }}
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveFile()
              }}
            >
              <X size={20} />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <File size={48} color="#2b6777" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {file.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
          </Box>
        )}
      </UploadArea>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={!file}
          onClick={handleSubmit}
          sx={{ minWidth: "200px" }}
        >
          Analyze Resume
        </Button>
      </Box>
    </motion.div>
  )
}

// ManualEntryForm Component
function ManualEntryForm({ onSubmit, onBack }) {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    experiences: [{ id: "exp-1", company: "", jobTitle: "", description: "" }],
    projects: [{ id: "proj-1", name: "", description: "" }],
    skills: "",
    leadership: "",
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExperienceChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const handleProjectChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }

  const addExperience = () => {
    const newId = `exp-${formData.experiences.length + 1}`
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { id: newId, company: "", jobTitle: "", description: "" }],
    }))
  }

  const removeExperience = (id) => {
    if (formData.experiences.length > 1) {
      setFormData((prev) => ({
        ...prev,
        experiences: prev.experiences.filter((exp) => exp.id !== id),
      }))
    }
  }

  const addProject = () => {
    const newId = `proj-${formData.projects.length + 1}`
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { id: newId, name: "", description: "" }],
    }))
  }

  const removeProject = (id) => {
    if (formData.projects.length > 1) {
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.filter((proj) => proj.id !== id),
      }))
    }
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const steps = [
    {
      label: "Basic Information",
      content: (
        <FormSection>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Professional Summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
        </FormSection>
      ),
    },
    {
      label: "Experience",
      content: (
        <FormSection>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Work Experience</Typography>
            <Button startIcon={<Plus size={16} />} onClick={addExperience} variant="outlined" size="small">
              Add Experience
            </Button>
          </Box>

          <AnimatePresence>
            {formData.experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ mb: 3, position: "relative" }}>
                  <CardContent>
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton
                        size="small"
                        onClick={() => removeExperience(exp.id)}
                        disabled={formData.experiences.length <= 1}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>

                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Experience {index + 1}
                    </Typography>

                    <TextField
                      fullWidth
                      label="Company Name"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) => handleExperienceChange(exp.id, "jobTitle", e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                      margin="normal"
                      multiline
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </FormSection>
      ),
    },
    {
      label: "Projects",
      content: (
        <FormSection>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Projects</Typography>
            <Button startIcon={<Plus size={16} />} onClick={addProject} variant="outlined" size="small">
              Add Project
            </Button>
          </Box>

          <AnimatePresence>
            {formData.projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ mb: 3, position: "relative" }}>
                  <CardContent>
                    <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton
                        size="small"
                        onClick={() => removeProject(proj.id)}
                        disabled={formData.projects.length <= 1}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>

                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Project {index + 1}
                    </Typography>

                    <TextField
                      fullWidth
                      label="Project Name"
                      value={proj.name}
                      onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      value={proj.description}
                      onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                      margin="normal"
                      multiline
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </FormSection>
      ),
    },
    {
      label: "Skills & Leadership",
      content: (
        <FormSection>
          <TextField
            fullWidth
            label="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            placeholder="List your skills, separated by commas"
            required
          />
          <TextField
            fullWidth
            label="Leadership & Activities"
            name="leadership"
            value={formData.leadership}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            placeholder="Describe your leadership roles and extracurricular activities"
          />
        </FormSection>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" component="h1">
          Enter Resume Details
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                {step.content}
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Submit" : "Continue"}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </motion.div>
  )
}

// LoadingAnalyzing Component
function LoadingAnalyzing() {
  const loadingTexts = [
    "Analyzing your information...",
    "Extracting key details...",
    "Processing experience data...",
    "Identifying skills...",
    "Almost there...",
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <CircularProgress size={80} thickness={4} sx={{ color: "#2b6777", mb: 4 }} />
        </motion.div>

        <Typography variant="h5" gutterBottom>
          Analyzing Your Resume
        </Typography>

        <Box sx={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {loadingTexts.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  animation: `fadeInOut 10s infinite`,
                  animationDelay: `${index * 2}s`,
                  opacity: 0,
                }}
              >
                {text}
              </Typography>
            </motion.div>
          ))}
        </Box>

        <Box
          component="style"
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes fadeInOut {
                0%, 100% { opacity: 0; }
                20%, 80% { opacity: 1; }
              }
            `,
          }}
        />
      </Paper>
    </motion.div>
  )
}

// Main Component
function HomePage() {
    const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("options")
  const [formData, setFormData] = useState(null)

  const handleOptionSelect = (option) => {
    setCurrentView(option)
  }

  const handleUploadSubmit = (file) => {
    // In a real app, you would process the file here
    console.log("File uploaded:", file)
    setCurrentView("loading")

    // Simulate processing time
    setTimeout(() => {
      // After processing, you would typically navigate to a results page
      console.log("Processing complete")
      // For demo purposes, we'll just go back to options
      navigate('/dashboard');
    }, 3000)
  }

  const handleManualSubmit = (data) => {
    setFormData(data)
    setCurrentView("loading")

    // Simulate processing time
    setTimeout(() => {
      // After processing, you would typically navigate to a results page
      console.log("Processing complete", data)
      // For demo purposes, we'll just go back to options
      navigate("/dashboard")
    }, 3000)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-8"
      >
        {currentView === "options" && <OptionSelection onOptionSelect={handleOptionSelect} />}

        {currentView === "upload" && (
          <ResumeUpload onSubmit={handleUploadSubmit} onBack={() => setCurrentView("options")} />
        )}

        {currentView === "manual" && (
          <ManualEntryForm onSubmit={handleManualSubmit} onBack={() => setCurrentView("options")} />
        )}

        {currentView === "loading" && <LoadingAnalyzing />}
      </motion.div>
    </ThemeProvider>
  )
}

// Export the main component
export default HomePage
