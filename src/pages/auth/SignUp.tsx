import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";
import { PasswordInput } from "@/components/ui/password-input";
import { authApi } from "@/lib/api/auth";
import type { SignUpFormData } from "@/types/auth";

export function SignUpPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    otp: "",
  });

  const handleSendOTP = async () => {
    if (!formData.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }

    setSendingOTP(true);
    try {
      const response = await authApi.sendOTP(formData.email);
      
      if (response.success) {
        setOtpSent(true);
        toast({
          title: "Success",
          description: "OTP has been sent to your email",
        });
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
        description: "Failed to send OTP",
      });
    } finally {
      setSendingOTP(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpSent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please verify your email with OTP first",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.signup(formData);
      
      if (response.success && response.data) {
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        navigate("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-muted-foreground mt-2">
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={otpSent}
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSendOTP}
                disabled={sendingOTP || otpSent || !formData.email}
              >
                {sendingOTP ? "Sending..." : otpSent ? "Sent" : "Send OTP"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phoneNo: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              placeholder="Enter OTP from email"
              value={formData.otp}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, otp: e.target.value }))
              }
              disabled={!otpSent}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !otpSent}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-primary"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
} 