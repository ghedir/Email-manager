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

  const accordionStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  };

  const accordionSummaryStyle = {
    backgroundColor: '#3f51b5',
    color: '#fff',
  };

  const iconButtonStyle = {
    color: '#f50057',
  };

  const listItemStyle = {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  };

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff',
    padding: '16px',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '900px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#3f51b5',
    marginBottom: '24px',
  };

  return (
    <div style={pageStyle}>
      <Container style={containerStyle}>
        <Typography variant="h4" component="h1" gutterBottom style={titleStyle}>
          Email Manager
        </Typography>
        <CategoryForm onSave={handleSave} selectedCategory={selectedCategory} resetForm={resetForm} />
        {Object.keys(categories).map((categoryName) => (
          <Accordion
            key={categoryName}
            expanded={expandedCategory === categoryName}
            onChange={() => handleAccordionChange(categoryName)}
            style={accordionStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMore style={{ color: 'white' }} />}
              style={accordionSummaryStyle}
            >
              <Typography variant="h6">{categoryName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {categories[categoryName].map((record) => (
                  <ListItem key={record.id} style={listItemStyle}>
                    <ListItemText
                      primary={record.fields.Prompt}
                      //secondary={`Created at: ${record.fields.createdAt}`}
                    />
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(record)} style={iconButtonStyle}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(record.id)} style={iconButtonStyle}>
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </div>
  );
};

export default CategoryList;
