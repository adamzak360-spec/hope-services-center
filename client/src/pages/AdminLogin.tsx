import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

/**
 * Admin Login Page
 * Design: Secure login page for admin dashboard access
 */
export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!password) {
      toast.error("Please enter your password");
      setIsLoading(false);
      return;
    }

    if (login(password)) {
      toast.success("Login successful!");
      setLocation("/admin");
    } else {
      toast.error("Invalid password. Please try again.");
      setPassword("");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <section className="min-h-screen bg-gradient-to-br from-[#0A2540] to-[#0A2540] flex items-center justify-center py-16 md:py-24 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#F59E0B] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#0A2540] mb-2">
                Admin Login
              </h1>
              <p className="text-gray-600">
                Enter your password to access the admin dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none text-lg"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold py-3 text-lg"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Security Note */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                🔒 This page is password protected. Only authorized administrators should have access to this password.
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-white hover:text-[#F59E0B] transition-colors text-sm font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
