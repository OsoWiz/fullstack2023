import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/UserContext";
import { NotificationContextProvider } from "./context/NotificationContext";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
