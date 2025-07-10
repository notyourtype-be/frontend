import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/AppRoutes"; // Your main App where routes are defined
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
  
      <Router />
    
  </React.StrictMode>
);
