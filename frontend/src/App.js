import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Lamarans from "./pages/Lamarans";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddLamaran from "./pages/AddLamaran";
import EditLamaran from "./pages/EditLamaran";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/lamarans" element={<Lamarans />} />
          <Route path="/lamarans/add" element={<AddLamaran />} />
          <Route path="/lamarans/edit/:id" element={<EditLamaran />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
