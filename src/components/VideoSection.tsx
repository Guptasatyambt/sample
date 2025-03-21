import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Box, IconButton, Paper, Grid, Typography, Stack } from '@mui/material';
import { 
  Videocam, 
  VideocamOff, 
  Mic, 
  MicOff, 
  ScreenShare,
  StopScreenShare,
} from '@mui/icons-material';

interface VideoSectionProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  isVideoEnabled,
  isAudioEnabled,
  onToggleVideo,
  onToggleAudio,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (videoRef.current && screenStream) {
      videoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  const handleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: {
            displaySurface: 'monitor',
          } as MediaTrackConstraints,
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          }
        });
        
        stream.getVideoTracks()[0].addEventListener('ended', () => {
          setScreenStream(null);
          setIsScreenSharing(false);
        });

        setScreenStream(stream);
        setIsScreenSharing(true);
      } else {
        if (screenStream) {
          screenStream.getTracks().forEach(track => track.stop());
        }
        setScreenStream(null);
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
      setIsScreenSharing(false);
    }
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: 20, marginLeft:20,marginRight:20 }}>
      <Grid item style={{ width: '60%',marginRight:20 }}>
        <Paper elevation={3} style={{ position: 'relative' }}>
          <Box style={{ height: '400px', backgroundColor: '#f5f5f5', position: 'relative' }}>
            {isVideoEnabled && !isScreenSharing && (
              <Webcam
                ref={webcamRef}
                audio={isAudioEnabled}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                mirrored={true}
              />
            )}
            {isScreenSharing && (
              <video
                ref={videoRef}
                autoPlay
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            )}
          </Box>
          <Box
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '8px',
              borderRadius: '24px',
              zIndex: 1,
            }}
          >
            <IconButton
              onClick={onToggleVideo}
              style={{ color: 'white' }}
              disabled={isScreenSharing}
            >
              {isVideoEnabled ? <Videocam /> : <VideocamOff />}
            </IconButton>
            <IconButton
              onClick={onToggleAudio}
              style={{ color: 'white' }}
            >
              {isAudioEnabled ? <Mic /> : <MicOff />}
            </IconButton>
            {/* <IconButton
              onClick={handleScreenShare}
              style={{ color: 'white' }}
            >
              {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
            </IconButton> */}
          </Box>
        </Paper>
      </Grid>
      <Grid item style={{ width: '30%' }}>
        <Paper 
          elevation={3} 
          style={{ 
            height: '400px',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box style={{ flex: 1, overflow: 'hidden' }}>
            <img 
              src={process.env.PUBLIC_URL + '/interviewer_image.png'}
              alt="Interviewer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box 
            style={{ 
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography variant="h6" style={{ fontWeight: 600, color: '#2f2f2f', marginBottom: '4px' }}>
              Ramest Gupta
            </Typography>
            <Typography variant="subtitle2" style={{ color: '#666' }}>
              Senior Technical Interviewer
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VideoSection; 