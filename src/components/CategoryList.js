import React, { useEffect, useState, useCallback } from 'react';
import { getCategories, deleteCategory, createCategory, updateCategory } from '../api';
import CategoryForm from './CategoryForm';
import { List, ListItem, ListItemText, IconButton, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Edit, Delete, ExpandMore } from '@mui/icons-material';

const CategoryList = () => {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      const groupedData = groupByCategory(data);
      setCategories(groupedData);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const groupByCategory = (data) => {
    const grouped = data.reduce((acc, record) => {
      const categoryName = record.fields.Name;
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(record);
      return acc;
    }, {});

    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => new Date(a.fields.createdAt) - new Date(b.fields.createdAt));
    });

    return grouped;
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
  };

  const resetForm = () => {
    setSelectedCategory(null);
  };


  const handleSave = async (category) => {
    try {
      if (selectedCategory) {
        console.log('Updating category:', category);
        await updateCategory(selectedCategory.id, category);
      } else {
        console.log('Creating category:', category);
        await createCategory(category);
      }
      resetForm(); // Reset form after save
      fetchCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
    }
  };

  const handleAccordionChange = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };


  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>Email Manager</Typography>
      <CategoryForm onSave={handleSave} selectedCategory={selectedCategory} resetForm={resetForm} />
      {Object.keys(categories).map((categoryName) => (
        <Accordion
          key={categoryName}
          expanded={expandedCategory === categoryName}
          onChange={() => handleAccordionChange(categoryName)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">{categoryName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {categories[categoryName].map((record) => (
                <ListItem key={record.id}>
                  <ListItemText
                    primary={record.fields.Prompt}
                    secondary={`Created at: ${record.fields.createdAt}`}
                  />
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(record)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(record.id)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default CategoryList;
