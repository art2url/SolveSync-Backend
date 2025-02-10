# SolveSync OAuth Server

This server handles the OAuth authentication flow for the **SolveSync** Chrome extension, enabling secure GitHub authorization and token management.

## Features
- Secure OAuth authentication with GitHub.
- Exchanges authorization codes for access tokens.
- Retrieves GitHub user information using access tokens.
- Cross-Origin Resource Sharing (CORS) enabled for broad compatibility.

## Prerequisites
- **Node.js** (v12 or higher)
- **npm** or **yarn**
- A **GitHub OAuth App** with the following details:
  - **Client ID** and **Client Secret**

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/art2url/solve-sync-oauth-server.git
   cd solve-sync-oauth-server
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   PORT=3000  # Optional: Defaults to 3000 if not set
   ```

4. **Run the Server:**
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

## API Endpoints

### POST `/auth/github`
Exchanges the GitHub OAuth code for an access token and retrieves the GitHub username.

**Request:**
```json
{
  "code": "authorization_code_from_github"
}
```

**Response:**
```json
{
  "access_token": "github_access_token",
  "github_username": "your_github_username"
}
```

## License
This project is licensed under the **MIT License**.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---

**SolveSync** — Automate your coding workflow with secure GitHub integration! 🚀
