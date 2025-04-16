import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const Container = styled.div`
  background-color: #2b6777;
  min-height: 100vh;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionCard = styled(Paper)`
  width: 80%;
  padding: 2rem;
  margin: 1rem 0;
  background-color: #ffffff;
`;

const ResultCard = styled(Paper)`
  width: 80%;
  padding: 2rem;
  margin: 1rem 0;
  background-color: #ffffff;
`;

const questions = [
  { id: 1, question: 'How do you handle conflict in a team?', options: ['Ignore it', 'Address it directly', 'Wait for others to act', 'Talk to a manager'] },
  { id: 2, question: 'What’s your communication style?', options: ['Assertive', 'Passive', 'Aggressive', 'Passive-Aggressive'] },
  { id: 3, question: 'How do you prioritize tasks?', options: ['By deadline', 'By importance', 'Randomly', 'Based on mood'] },
  { id: 4, question: 'How do you handle feedback?', options: ['Ignore it', 'Accept and reflect', 'Argue back', 'Take it personally'] },
  { id: 5, question: 'What motivates you?', options: ['Recognition', 'Money', 'Challenge', 'Learning'] },
  { id: 6, question: 'How do you manage time?', options: ['To-do list', 'Calendar', 'Improvise', 'Ask others'] },
  { id: 7, question: 'How do you work in a team?', options: ['Leader', 'Follower', 'Observer', 'Solo player'] },
  { id: 8, question: 'What’s your decision-making style?', options: ['Quick', 'Analytical', 'Impulsive', 'Emotional'] },
  { id: 9, question: 'How do you handle stress?', options: ['Exercise', 'Avoid work', 'Talk it out', 'Sleep'] },
  { id: 10, question: 'What’s your adaptability level?', options: ['Very adaptable', 'Somewhat adaptable', 'Rarely adaptable', 'Not adaptable'] },
];

export default function SoftSkillsForm() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  return (
    <Container>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" gutterBottom>Soft Skills Questionnaire</Typography>
      </motion.div>
      {
        submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ResultCard elevation={3}>
              <Typography variant="h5">Your Responses</Typography>
              {questions.map((q) => (
                <div key={q.id} style={{ marginTop: '1rem' }}>
                  <Typography variant="subtitle1"><strong>{q.question}</strong></Typography>
                  <Typography variant="body1">{answers[q.id]}</Typography>
                </div>
              ))}
            </ResultCard>
          </motion.div>
        ) : (
          questions.map((q, index) => (
            <motion.div key={q.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <QuestionCard elevation={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{q.question}</FormLabel>
                  <RadioGroup
                    value={answers[q.id] || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  >
                    {q.options.map((option, i) => (
                      <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </QuestionCard>
            </motion.div>
          ))
        )
      }
      {!submitted && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </motion.div>
      )}
    </Container>
  );
}
