
async function action(request) {
  try {
    const authData = {
      email: request.email,
      password: request.password,
    };

    const response = await fetch('https://inventorymanagement-7i2p.onrender.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      // Handle authentication failure (422 or 401 status)
      return response;
    }

    if (!response.ok) {
      // Handle other errors (e.g., server error)
      throw new Error('Could not authenticate user.');
    }

    const resData = await response.json();
    const token = resData.token;

    // Store the token in local storage
    localStorage.setItem('token', token);

    // Return the response data or any additional information if needed
    return resData;
  } catch (error) {
    // Handle unexpected errors
    console.error('Authentication error:', error);
    throw new Error('Authentication failed.');
  }
}

export default action;

export const  logout =()=>{
  localStorage.removeItem('token')
}