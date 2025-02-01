require('dotenv').config(); // Load environment variables from the .env file
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// GitHub OAuth credentials from environment variables
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

app.use(express.json());

// GitHub OAuth callback route
app.get('/auth/github', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    // Step 1: Exchange the code for an access token
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

    // Step 2: Fetch GitHub user info using the access token
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const githubUsername = userResponse.data.login;

    // Step 3: Redirect the user back to the extension with access token and username
    const redirectUrl = `chrome-extension://pklkphgccjdmimlphbkmkhmnmlnnjlkj/oauth/callback.html?access_token=${accessToken}&github_username=${githubUsername}`;
    res.redirect(redirectUrl); // Redirect the user to the Chrome extension's callback page
  } catch (error) {
    console.error('Error during OAuth flow:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
