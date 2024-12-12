import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { PasswordInput } from "@/components/ui/password-input";
import { authApi } from "@/lib/api/auth";
import type { LoginFormData } from "@/types/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login(formData);
      
      if (response.success && response.data) {
        // Store token and redirect
        localStorage.setItem("token", response.data.token);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Social Automator</h1>
        <p className="text-muted-foreground">Plan your content, automate smartly</p>
      </div>

      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => 
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ 
                    ...prev, 
                    rememberMe: checked as boolean 
                  }))
                }
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="text-sm"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="text-primary"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </p>
        </form>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="#" className="text-primary hover:underline">Terms of Service</a>
        {" "}and{" "}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
} 