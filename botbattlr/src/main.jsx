import { StrictMode } from 'react'; // Importing StrictMode from React for additional checks and warnings
import { createRoot } from 'react-dom/client'; // Importing createRoot from react-dom/client to create a root for rendering
import App from './App'; // Importing the App component

// Creating a root for the React application and rendering the App component inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Rendering the App component wrapped in StrictMode */}
  </StrictMode>
);