import axios from 'axios';

const JETON = 'patOubwKxTaSffbim.54579952d2bb6d73720250b6a86012a20576bd6dd92c323a8700dbc61e2ce761';
const BASE_ID = 'appwySQCpsKcWPpcI';
const TABLE_NAME = 'Categories';

const airtableApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
  headers: {
    Authorization: `Bearer ${JETON}`,
  },
});

export const getCategories = async () => {
  const response = await airtableApi.get('/');
  //console.log('Fetched categories:', response.data.records); // Debug log
  return response.data.records;
};

export const createCategory = async (category) => {
    console.log('Creating category:', category); // Debug log
    const response = await airtableApi.post('/', {
      fields: {
        Name: category.Name,
        Prompt: category.Prompt,
        // createdAt: new Date().toISOString(),
      },
    });
    console.log('Create response:', response.data); // Debug log
    return response.data;
  };

  export const updateCategory = async (id, category) => {
    console.log('Updating category:', id, category); // Debug log
    const response = await airtableApi.patch(`/${id}`, {
      fields: {
        Name: category.Name,
        Prompt: category.Prompt,
        // UpdatedAt: new Date().toISOString(),
      },
    });
    console.log('Update response:', response.data); // Debug log
    return response.data;
  };

export const deleteCategory = async (id) => {
  console.log('Deleting category:', id); // Debug log
  const response = await airtableApi.delete(`/${id}`);
  console.log('Delete response:', response.data); // Debug log
  return response.data;
};
