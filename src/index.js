import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
// import { Router } from "react-router-dom";

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        {/* <Router> */}
        <App />
        {/* </Router> */}
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
