import { GitHubUserProfile } from './components/GitHubUserProfile';
import { Container, Typography } from '@mui/material';
import './index.css';

export const App = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 10 }}>
      </Typography>
      <GitHubUserProfile />
    </Container>
  );
};
