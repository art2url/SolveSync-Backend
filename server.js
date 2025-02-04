require('dotenv').config(); // Load environment variables from the .env file
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// GitHub OAuth credentials from environment variables
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.post('/auth/github', async (req, res) => {
  const { code } = req.body;
  console.log('Received code:', code); // Debug logging

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code },
      { headers: { Accept: 'application/json' } }
    );
    console.log('Token response:', tokenResponse.data); // Debug logging

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    // Retrieve GitHub user info using the access token
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });
    const githubUsername = userResponse.data.login;

    return res.json({
      access_token: accessToken,
      github_username: githubUsername,
    });
  } catch (error) {
    console.error(
      'Error during OAuth flow:',
      error.response ? error.response.data : error.message
    );
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
