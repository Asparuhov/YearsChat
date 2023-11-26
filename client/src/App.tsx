import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LogicPage";
import ChatPage from "./pages/ChatPage/ChatPage";

const App: React.FC = () => {
  const isUserLogged = false;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route
          path="/"
          element={
            isUserLogged ? <Navigate to="/chat" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
