const API_URL = 'http://localhost:8080/api/v1/auth';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('jwtToken');
  return accessToken
      ? { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
      : { 'Content-Type': 'application/json' };
};

const fetchRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: getAuthHeaders(),
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        const message =
            errorData.message || errorData.error || errorData.msg || 'Įvyko klaida';

        console.error('Klaidos atsakymas iš serverio:', errorData); // Debug
        throw new Error(message);
      } else {
        const text = await response.text();
        throw new Error(text || `HTTP klaida: ${response.status}`);
      }
    }

    return await response.json();

  } catch (err) {
    console.error('Užklausos klaida:', err.message);
    throw err;
  }
};

// Prisijungimas
export const login = async (email, password) => {
  const res = await fetchRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Log the full response to check the data (remove later)
  console.log('Login Response:', res);

  // Check if the accessToken exists
  if (res.accessToken) {
    localStorage.setItem('jwtToken', res.accessToken);
  } else {
    console.error("Login failed, no accessToken in response.");
    throw new Error("No accessToken received during login.");
  }

  // Store the userId as before
  if (res.id) {
    localStorage.setItem('userId', res.id);
  } else {
    console.error("Login failed, no userId in response.");
    throw new Error("No userId received during login.");
  }

  return res;
};






export const createUser = async (userData) => {
  const data = await fetchRequest('/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (data.accessToken) {
    localStorage.setItem('jwtToken', data.accessToken);
  }
  if (data.id) {
    localStorage.setItem('userId', data.id);
  }

  return data;
};


// Atsijungimas
export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
};
