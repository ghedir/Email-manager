import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const CategoryForm = ({ onSave, selectedCategory, resetForm }) => {
  const [Name, setName] = useState('');
  const [Prompt, setPrompt] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.fields.Name);
      setPrompt(selectedCategory.fields.Prompt);
    } else {
      setName('');
      setPrompt('');
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form:', { Name, Prompt });
    onSave({ Name, Prompt, createdAt: new Date().toISOString() });
    resetForm();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 3,
        p: 3,
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {selectedCategory ? 'Modifier Categorie' : 'Ajouter Categorie'}
      </Typography>
      <TextField
        label="Nom"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Prompt"
        value={Prompt}
        onChange={(e) => setPrompt(e.target.value)}
        multiline
        rows={4}
        required
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: '#3f51b5',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#303f9f',
          },
        }}
      >
        {selectedCategory ? 'Modifier' : 'Ajouter'}
      </Button>
    </Box>
  );
};

export default CategoryForm;
