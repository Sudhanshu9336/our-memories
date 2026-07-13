import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// User Pages
import Landing from './pages/user/Landing';
import Verify from './pages/user/Verify';
import Home from './pages/user/Home';
import PlaceDetail from './pages/user/PlaceDetail';
import Journey from './pages/user/Journey';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import PlacesManage from './pages/admin/PlacesManage';
import MediaManage from './pages/admin/MediaManage';
import Settings from './pages/admin/Settings';
import AdminLayout from './components/AdminLayout';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="/journey" element={<Journey />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="places" element={<PlacesManage />} />
            <Route path="places/:id/media" element={<MediaManage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
