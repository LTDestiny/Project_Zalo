import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HomePage } from "./components/home/HomePage";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { ChatList } from "./components/chat/ChatList";
import { ChatRoom } from "./components/chat/ChatRoom";
import "./index.css";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
