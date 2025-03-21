import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box, Button, Fab } from '@mui/material';
import { Code } from '@mui/icons-material';
import InterviewHeader from './components/InterviewHeader';
import VideoSection from './components/VideoSection';
import QuestionSection from './components/QuestionSection';

const App: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState('45:00');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // Sample question data with 5 technical interview questions
  const questions = [
    {
      question: 'Implement a Function to Find the Maximum Subarray Sum',
      example: `Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Write a function that finds the contiguous subarray with the largest sum 
and returns its sum. The array will contain at least one number.`,
    },
    {
      question: 'Design a Stack with GetMin Function',
      example: `Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Methods:
- push(x) -- Push element x onto stack.
- pop() -- Removes the element on top of the stack.
- top() -- Get the top element.
- getMin() -- Retrieve the minimum element in the stack.

Example:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> Returns -3
minStack.pop();
minStack.top();      --> Returns 0
minStack.getMin();   --> Returns -2`,
    },
    {
      question: 'Implement a Function to Check if a Binary Tree is Balanced',
      example: `A binary tree is considered balanced if the heights of the two subtrees 
of any node never differ by more than one.

Example 1:
    3
   / \\
  9  20
     / \\
    15  7
Output: true

Example 2:
       1
      / \\
     2   2
    / \\
   3   3
  / \\
 4   4
Output: false`,
    },
    {
      question: 'Design an LRU (Least Recently Used) Cache',
      example: `Implement a data structure for Least Recently Used (LRU) cache.

Requirements:
- get(key) -- Get the value of the key if it exists in the cache
- put(key, value) -- Set or insert the value if the key is not already present

Example:
LRUCache cache = new LRUCache(2); // capacity = 2
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4`,
    },
    {
      question: 'Implement a Function to Detect a Cycle in a Linked List',
      example: `Given a linked list, determine if it has a cycle in it.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, 
where the tail connects to the 1st node (0-indexed).

3 → 2 → 0 → -4
    ↑_________|

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, 
where the tail connects to the 0th node.

1 → 2
↑___|`,
    },
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const [minutes, seconds] = timeRemaining.split(':').map(Number);
      let newMinutes = minutes;
      let newSeconds = seconds - 1;

      if (newSeconds < 0) {
        newMinutes -= 1;
        newSeconds = 59;
      }

      if (newMinutes < 0) {
        clearInterval(timer);
        return;
      }

      setTimeRemaining(
        `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleEndInterview = () => {
    // Implement end interview logic
    console.log('Interview ended');
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(questions.length, prev + 1));
  };

  const handleOpenEditor = () => {
    window.open('https://codesandbox.io/s/new', '_blank');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <InterviewHeader
        timeRemaining={timeRemaining}
        onEndInterview={handleEndInterview}
      />
      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3, position: 'relative' }}>
        <VideoSection
          isVideoEnabled={isVideoEnabled}
          isAudioEnabled={isAudioEnabled}
          onToggleVideo={() => setIsVideoEnabled((prev) => !prev)}
          onToggleAudio={() => setIsAudioEnabled((prev) => !prev)}
        />
        <QuestionSection
          questionNumber={currentQuestion}
          totalQuestions={questions.length}
          question={questions[currentQuestion - 1].question}
          example={questions[currentQuestion - 1].example}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
        {/* <Fab
          color="primary"
          variant="extended"
          onClick={handleOpenEditor}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Code sx={{ mr: 1 }} />
          Open Editor
        </Fab> */}
      </Container>
    </Box>
  );
};

export default App;
