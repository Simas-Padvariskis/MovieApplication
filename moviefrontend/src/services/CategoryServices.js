const API_URL = 'http://localhost:8080/api/v1';

const getAuthHeaders = (accessToken) => ({
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
});

const fetchRequest = async (url, options = {}, accessToken) => {
    try {
        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: { ...getAuthHeaders(accessToken), ...options.headers },
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Klaida iš API:', errorData);
            throw new Error(errorData.message || 'Nenurodyta klaida');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Gauna kategorijų sąrašą +
export const getCategories = async (accessToken, queryParams = {}) => {
    const { id, fields, filter } = queryParams;
    const searchParams = new URLSearchParams();

    if (id) searchParams.append('id', id);
    if (fields) searchParams.append('fields', fields);
    if (filter) searchParams.append('filter', filter);

    const url = `/categories${searchParams.toString() ? `?${searchParams}` : ''}`;

    try {
        const res = await fetchRequest(url, { method: 'GET' }, accessToken);
        console.log('Response from getCategories:', res); // Log the full response for debugging

        // Access the category data directly from the 'data' property
        if (res && res.data && Array.isArray(res.data)) {
            return res.data; // Return the categories array directly
        } else {
            console.error('Cateogories data is not available or malformed');
            return []; // Return an empty array if no valid category data is found
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Return empty array in case of an error
    }
};


// Gauna konkursą pagal ID ???
export const getCategoryById = async (id, accessToken) => {
    try {
        const res = await fetchRequest(`/categories/${id}`, { method: 'GET' }, accessToken);
        return res?.data || null; // Consistent with getCategories structure
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        return null;
    }
};

// // Sukuria naują konkursą +
// export const createMovie = async (movieData, accessToken) => {
//     return fetchRequest('/movies', { method: 'POST', body: JSON.stringify(movieData) }, accessToken);
// };

// // Atnaujina konkursą +
// export const updateMovie = async (id, movieData, accessToken) => {
//     return fetchRequest(`/movies/${id}`, { method: 'POST', body: JSON.stringify(movieData) }, accessToken);
// };

// // Ištrina konkursą +
// export const deleteMovie = async (id, accessToken) => {
//     const response = await fetchRequest(`/movies/${id}`, { method: 'DELETE' }, accessToken);
//     return response.movie || null;
// };