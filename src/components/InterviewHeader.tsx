import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

interface InterviewHeaderProps {
  timeRemaining: string;
  onEndInterview: () => void;
}

const InterviewHeader: React.FC<InterviewHeaderProps> = ({ timeRemaining, onEndInterview }) => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mr: 2,
          }}
        >
          <img 
            src={process.env.PUBLIC_URL + '/logo_RM.png'} 
            alt="Interview Logo"
            style={{
              height: '40px',
              width: 'auto',
              marginRight: '12px'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg,rgb(33, 34, 35) 30%,rgb(19, 21, 21) 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Technical Interview
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="body1" sx={{ mr: 2 }}>
          {timeRemaining}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={onEndInterview}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          End Interview
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default InterviewHeader; 