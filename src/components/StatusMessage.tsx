import { Box, Typography } from '@mui/material';
import { StatusMessageProps } from '../types/GitHubTypes';

export const StatusMessage = ({ imageSrc, message }:StatusMessageProps) => {
    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            sx={{ height: 'calc(100vh - 450px)', textAlign: 'center', padding: 2 }}
        >
            <Box
                component="img" 
                src={imageSrc}
                alt="No results found" 
                sx={{
                    maxWidth: '300px',
                    mb: 2,
                }}
            />
            <Typography variant="h5" gutterBottom>{message}</Typography>
        </Box>
    );
};