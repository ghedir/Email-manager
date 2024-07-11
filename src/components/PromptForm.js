import React, { useState, useEffect } from 'react';
import { updateCategory } from '../api';

const PromptForm = ({ fetchCategories, selectedCategory }) => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setPrompt(selectedCategory.fields.prompt || '');
    }
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCategory) {
      await updateCategory(selectedCategory.id, { prompt });
      fetchCategories();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Prompt</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Prompt Text"
        required
      />
      <button type="submit">Update Prompt</button>
    </form>
  );
};

export default PromptForm;
