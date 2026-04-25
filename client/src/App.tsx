import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Employers from "./pages/Employers";
import JobSeekers from "./pages/JobSeekers";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import JobListings from "./pages/JobListings";
import { JobSeekerConfirmation, EmployerConfirmation, ContactConfirmation } from "./pages/ConfirmationPages";
import AdminLogin from "./pages/AdminLogin";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/jobs"} component={Jobs} />
      <Route path={"/jobs/:id"} component={JobDetails} />
      <Route path={"/employers"} component={Employers} />
      <Route path={"/job-seekers"} component={JobSeekers} />
      <Route path={"/job-listings"} component={JobListings} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"job-seeker-confirmation"} component={JobSeekerConfirmation} />
      <Route path={"employer-confirmation"} component={EmployerConfirmation} />
      <Route path={"contact-confirmation"} component={ContactConfirmation} />
      <Route path={"admin-login"} component={AdminLogin} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AdminAuthProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen bg-white">
              <Navigation />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
              <FloatingWhatsApp />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </AdminAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
