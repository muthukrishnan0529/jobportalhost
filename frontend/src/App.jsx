import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layout/MainLayout";

import JobListPage from "./pages/JobListPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import PostJobPage from "./pages/PostJobPage";
import JobDetailPage from "./pages/JobDetailPage";
import CandidateProfilePage from "./pages/CandidateProfilePage";
import ProfilePage from "./pages/ProfilePage";
import CandidateMyApplicationsPage from "./pages/CandidateMyApplicationsPage";
import RegisterPage from "./pages/RegisterPage";
import SetupProfilePage from "./pages/SetupProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/setup-profile" element={<SetupProfilePage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/jobs" element={<JobListPage />} />
        {/* <Route path="/my-applications" element={<MyApplicationsPage />} /> */}
        <Route
          path="/my-applications"
          element={
            localStorage.getItem("role") === "candidate" ? (
              <CandidateMyApplicationsPage />
            ) : (
              <MyApplicationsPage />
            )
          }
        />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/job-detail/:id" element={<JobDetailPage />} />
        <Route path="/candidate/:id" element={<CandidateProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
