import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

// Updated theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2b6777',
    },
    secondary: {
      main: '#52ab98',
    },
    background: {
      default: '#c5e8e0',
      paper: '#ffffff',
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
      color: '#2b6777',
    },
    h5: {
      fontWeight: 600,
      color: '#2b6777',
    },
    h6: {
      fontWeight: 500,
      color: '#2b6777',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

// Dummy data
const salaryData = [
  { month: 'Current', salary: 75000 },
  { month: '3 Months', salary: 85000 },
  { month: '6 Months', salary: 95000 },
  { month: '1 Year', salary: 120000 },
  { month: '2 Years', salary: 150000 },
];

const industryDemand = [
  { name: 'Tech', current: 85, future: 95 },
  { name: 'Finance', current: 75, future: 88 },
  { name: 'Healthcare', current: 70, future: 90 },
  { name: 'E-commerce', current: 80, future: 92 },
  { name: 'Education', current: 65, future: 85 },
];

const remoteWorkData = [
  { year: '2024', percentage: 65 },
  { year: '2025', percentage: 75 },
  { year: '2026', percentage: 85 },
  { year: '2027', percentage: 90 },
];

export default function App() {
  const [selectedSkills, setSelectedSkills] = useState(['AI', 'Cloud']);
  const [timeframe, setTimeframe] = useState('6');

  const futureRoles = [
    {
      title: 'AI Solutions Architect',
      salary: '$150,000 - $180,000',
      skills: ['AI/ML', 'Cloud Architecture', 'System Design'],
      companies: ['Google', 'Amazon', 'Microsoft'],
    },
    {
      title: 'Cloud AI Engineer',
      salary: '$140,000 - $170,000',
      skills: ['Cloud Platforms', 'ML Operations', 'DevOps'],
      companies: ['IBM', 'Oracle', 'Salesforce'],
    },
    {
      title: 'ML Engineering Lead',
      salary: '$160,000 - $190,000',
      skills: ['Machine Learning', 'Team Leadership', 'Product Strategy'],
      companies: ['Meta', 'Apple', 'Netflix'],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Paper
            sx={{
              p: 4,
              mb: 4,
              background: '#2b6777',
              color: 'white',
              textAlign: 'center',
              borderRadius: '16px',
            }}
          >
            <Typography variant="h3" gutterBottom>
              AI Career Simulator
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Discover your future career path with AI-powered predictions
            </Typography>
          </Paper>

          {/* Skills Selection and Future Roles */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Select Your Learning Path
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  {['AI', 'Cloud', 'DevOps', 'Blockchain'].map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      color={selectedSkills.includes(skill) ? 'primary' : 'default'}
                      onClick={() => {
                        setSelectedSkills((prev) =>
                          prev.includes(skill)
                            ? prev.filter((s) => s !== skill)
                            : [...prev, skill]
                        );
                      }}
                      sx={{ px: 2 }}
                    />
                  ))}
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Timeframe</InputLabel>
                  <Select
                    value={timeframe}
                    label="Timeframe"
                    onChange={(e) => setTimeframe(e.target.value)}
                  >
                    <MenuItem value="3">3 Months</MenuItem>
                    <MenuItem value="6">6 Months</MenuItem>
                    <MenuItem value="12">1 Year</MenuItem>
                    <MenuItem value="24">2 Years</MenuItem>
                  </Select>
                </FormControl>
              </Paper>

              {/* Salary Growth Projection */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Salary Growth Projection
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="salary"
                        stroke="#2b6777"
                        fill="#2b6777"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Potential Future Roles
              </Typography>
              {futureRoles.map((role, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {role.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {role.salary}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      {role.skills.map((skill, i) => (
                        <Chip
                          key={i}
                          label={skill}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Top Companies: {role.companies.join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>

          {/* Industry Demand and Remote Work */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Industry Demand
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={industryDemand}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#2b6777"
                        name="Current Demand"
                      />
                      <Line
                        type="monotone"
                        dataKey="future"
                        stroke="#52ab98"
                        name="Future Demand"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Remote Work Potential
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={remoteWorkData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="percentage"
                        stroke="#2b6777"
                        fill="#2b6777"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}