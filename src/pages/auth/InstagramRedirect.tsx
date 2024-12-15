import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function InstagramRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);



  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    
    const handleInstagramRedirect = async () => {
      if (!code) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Social not connected. Please try again."
        });
        navigate('/connect-social');
        return;
      }

      try {
        console.log("fetching", code);
        const response = await fetch('https://automationapi.getmentore.com/social/instagram/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            token: code
          })
        });

        const data = await response.json();
        
        if (data.error || !response.ok) {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.message || "Social not connected. Please try again."
          });
        } else {
          toast({
            title: "Success",
            description: "Successfully connected to Instagram!"
          });
        }
        // navigate('/connect-social');
      } catch (error) {
        console.error('Connection error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to connect. Please try again."
        });
        // navigate('/connect-social');
      } finally {
        setIsLoading(false);
      }
    };

    handleInstagramRedirect();
  }, [navigate, location.search, toast, token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Connecting to Instagram...</h2>
          <p className="text-muted-foreground">Please wait while we complete the connection.</p>
        </div>
      </div>
    );
  }

  return null;
}

export default InstagramRedirect; 