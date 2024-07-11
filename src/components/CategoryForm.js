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
    console.log('Submitting form:', { Name, Prompt }); // Debug log
    onSave({ Name, Prompt, createdAt: new Date().toISOString() });
    resetForm();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}
    >
      <Typography variant="h6">{selectedCategory ? 'Edit Category' : 'Add Category'}</Typography>
      <TextField
        label="Category Name"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Prompt"
        value={Prompt}
        onChange={(e) => setPrompt(e.target.value)}
        multiline
        rows={4}
        required
      />
      <Button variant="contained" type="submit">
        {selectedCategory ? 'Update' : 'Add'}
      </Button>
    </Box>
  );
};

export default CategoryForm;
