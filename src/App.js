import React from 'react';
import CategoryList from './components/CategoryList';
import { CssBaseline, Container, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme();


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <CategoryList />
      </Container>
    </ThemeProvider>
  );
}
export default App;
