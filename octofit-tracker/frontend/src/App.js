import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <div className="container py-4 py-md-5">
        <header className="app-hero mb-4 mb-md-5">
          <div className="hero-branding">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="Octofit logo"
              className="hero-logo"
            />
            <div>
              <h1 className="display-6 fw-bold mb-2">Octofit Tracker Dashboard</h1>
              <p className="mb-0 hero-subtitle">
                Monitor users, teams, activities, leaderboard, and workouts in one clean interface.
              </p>
            </div>
          </div>
        </header>

        <nav className="card border-0 shadow-sm mb-4">
          <div className="card-body p-2 p-md-3">
            <ul className="nav nav-pills nav-fill flex-column flex-md-row gap-2">
              <li className="nav-item">
                <NavLink
                  to="/users"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/teams"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/activities"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/workouts"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
