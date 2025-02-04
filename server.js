require('dotenv').config(); // Load environment variables from the .env file
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GitHub OAuth credentials from environment variables
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// OAuth endpoint for exchanging code for token, using POST
app.post('/auth/github', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }
  try {
    // Exchange code for an access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );
    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }
    // Retrieve GitHub user info using the access token
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });
    const githubUsername = userResponse.data.login;
    res.json({ access_token: accessToken, github_username: githubUsername });
  } catch (error) {
    console.error(
      'Error during OAuth flow:',
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
