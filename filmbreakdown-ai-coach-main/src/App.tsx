import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AthleteProfile from "./pages/AthleteProfile";
import UploadFilm from "./pages/UploadFilm";
import ThankYou from "./pages/ThankYou";
import SubmissionView from "./pages/SubmissionView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSubmissionReview from "./pages/AdminSubmissionReview";
import RecordingStudio from "./pages/RecordingStudio";
import PortalHome from "./pages/portal/PortalHome";
import BreakdownWorkspace from "./pages/portal/BreakdownWorkspace";
import PortalProfile from "./pages/portal/PortalProfile";
import MyLibrary from "./pages/portal/MyLibrary";
import LearnDiscover from "./pages/learn/LearnDiscover";
import AthleteLibrary from "./pages/learn/AthleteLibrary";
import Athletes from "./pages/Athletes";
import EliteOnboarding from "./pages/EliteOnboarding";
import MySubmissions from "./pages/MySubmissions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/onboarding/elite" element={<EliteOnboarding />} />
            <Route path="/athletes/:id" element={<AthleteProfile />} />
            <Route path="/upload" element={<UploadFilm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/submission/:id" element={<SubmissionView />} />
            <Route path="/my-submissions" element={<MySubmissions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/submissions/:id" element={<AdminSubmissionReview />} />
            <Route path="/admin/studio/:id" element={<RecordingStudio />} />
            <Route path="/portal" element={<PortalHome />} />
            <Route path="/portal/breakdown/:id" element={<BreakdownWorkspace />} />
            <Route path="/portal/profile" element={<PortalProfile />} />
            <Route path="/portal/library" element={<MyLibrary />} />
            <Route path="/learn" element={<LearnDiscover />} />
            <Route path="/learn/:athleteId" element={<AthleteLibrary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
