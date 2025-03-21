import React from 'react';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

interface QuestionSectionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  example: string;
  onPrevious: () => void;
  onNext: () => void;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  questionNumber,
  totalQuestions,
  question,
  example,
  onPrevious,
  onNext,
}) => {
  return (
    <Paper elevation={3} style={{ padding: 24, marginTop: 20 }}>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Question {questionNumber} of {totalQuestions}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {question}
      </Typography>
      <Paper
        variant="outlined"
        style={{
          backgroundColor: '#f5f5f5',
          padding: 16,
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
          {example}
        </Typography>
      </Paper>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={onPrevious}
          disabled={questionNumber === 1}
          startIcon={<NavigateBefore />}
          sx={{ 
            minWidth: '120px',
            bgcolor: 'grey.700',
            '&:hover': {
              bgcolor: 'grey.800',
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          endIcon={<NavigateNext />}
          sx={{ minWidth: '120px' }}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default QuestionSection; 