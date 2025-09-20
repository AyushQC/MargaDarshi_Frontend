# Margadarshi - Your Career Guidance Partner

Margadarshi is a modern, user-friendly web application designed to guide students in Karnataka through their educational and career journeys. It provides personalized recommendations, detailed career roadmaps, and a comprehensive college search tool to help students make informed decisions about their future.

## ✨ Key Features

- **User Authentication:** Secure registration and login system with OTP verification.
- **Personalized Dashboard:** A dynamic dashboard that adapts to the user's qualification (After 10th or After 12th), providing relevant guidance and resources.
- **Career Quiz:** An interactive quiz that analyzes a user's interests and suggests suitable career paths.
- **Dynamic Career Roadmaps:** Detailed, visually-rich roadmaps for recommended careers, including required degrees, key skills, and a step-by-step visual guide using Mermaid.js.
- **Comprehensive College Search:** Users can search for colleges in Karnataka by district and program, with results displayed clearly.
- **User Profile Management:** Users can view and manage their profile information.
- **Responsive Design:** Built with Tailwind CSS and React-Bootstrap for a seamless experience on all devices.

## 🚀 Tech Stack

- **Frontend:** React.js
- **UI Frameworks:** React-Bootstrap & Tailwind CSS
- **Routing:** React Router
- **State Management:** React Hooks (useState, useEffect) & LocalStorage
- **Form Handling:** Formik & Yup for validation
- **API Communication:** Axios
- **Diagramming:** Mermaid.js for rendering career roadmaps

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/AyushQC/MargaDarshi_Frontend.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd MargaDarshi_Frontend/margadarshi-web
    ```

3.  **Install NPM packages:**
    This will install all the necessary dependencies for the project.
    ```sh
    npm install
    ```

### Running the Application

Once the dependencies are installed, you can run the application in development mode.

```sh
npm start
```

This will open the application in your default browser at `http://localhost:3000`. The page will automatically reload if you make any changes to the code.

### Building for Production

To create an optimized build of the application for deployment, run:

```sh
npm run build
```

This command creates a `build` folder in the project directory, which contains the static files ready to be hosted on a web server.

## 📂 Folder Structure

Here is an overview of the main files and folders in the project:

```
margadarshi-web/
├── public/             # Public assets and index.html
├── src/
│   ├── components/
│   │   ├── auth/       # Login, Register components
│   │   ├── common/     # Reusable components like Navbar
│   │   ├── colleges/   # College search and card components
│   │   └── pages/      # Main page components (Home, Dashboard, etc.)
│   ├── services/
│   │   └── api.js      # Centralized Axios instance for API calls
│   ├── App.js          # Main application component with routing
│   ├── index.js        # Entry point of the React application
│   └── index.css       # Global styles and Tailwind CSS imports
├── package.json        # Project dependencies and scripts
└── tailwind.config.js  # Tailwind CSS configuration
```
