# SolveSync Backend (Currently in Development)

SolveSync Backend is responsible for handling OAuth authentication with GitHub and providing an API for the Chrome extension to upload LeetCode solutions directly to a GitHub repository.

## Features
- Handles GitHub OAuth authentication to retrieve access tokens.
- API endpoint to receive LeetCode solutions and upload them to the specified GitHub repository and branch.

## Setup

### Prerequisites
1. **Node.js** (v14 or higher).
2. **GitHub OAuth credentials** (client ID and client secret).
3. **Render.com** (or similar cloud platform) for deployment.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/art2url/solve-sync-oauth-server.git
    cd solve-sync-oauth-server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add your **GitHub OAuth credentials**:
    ```env
    GITHUB_CLIENT_ID=your-client-id
    GITHUB_CLIENT_SECRET=your-client-secret
    ```

4. Run the server locally for development:
    ```bash
    npm start
    ```

### Deployment on Render
1. Push the code to your **GitHub** repository.
2. Sign up or log in to [Render.com](https://render.com).
3. Create a **New Web Service** and connect your GitHub repository.
4. Set the environment variables (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`) in Render's environment settings.
5. Deploy the service.

### API Endpoints

#### `/auth/github`
- **GET**: Initiates the OAuth flow by redirecting the user to GitHub for authentication.

#### `/auth/github/callback`
- **GET**: The callback endpoint GitHub redirects to after the user authenticates.
- **Action**: Exchanges the authorization code for an access token and fetches the user's GitHub username.

#### `/upload/code`
- **POST**: Uploads a solution to the specified GitHub repository and branch.
- **Body**:
    ```json
    {
      "code": "JavaScript code string",
      "problemTitle": "Problem Title"
    }
    ```

### Deployment URL
Once deployed, your backend will be available at `https://solvesync-backend.onrender.com`.

### License
This project is licensed under the MIT License.
