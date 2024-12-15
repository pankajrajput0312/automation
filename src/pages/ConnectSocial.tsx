import { Button } from "@/components/ui/button";
import { Plus, Instagram, Youtube, X, Facebook, Linkedin, Trash2 } from "lucide-react";
import { TiktokIcon } from "@/components/icons/TiktokIcon";
import { cn } from "@/lib/utils";
import { socialConnect } from "@/services/social-connect";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface InstagramAccount {
  _id: string;
  accountId: string;
  username: string;
  profilePictureUrl: string;
  followers: number;
  accountType: string;
  permissions: string[];
}

interface SocialListResponse {
  success: boolean;
  data: {
    results: {
      instagram: InstagramAccount[];
    };
  };
  message: string;
}

export function ConnectSocialPage() {
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    fetchSocialAccounts();
  }, [token]);

  const fetchSocialAccounts = async () => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Authentication token not found"
      });
      return;
    }

    try {
      const response = await fetch('https://automationapi.getmentore.com/social/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data: SocialListResponse = await response.json();

      if (data.success) {
        setAccounts(data.data.results.instagram || []);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch connected accounts"
        });
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch connected accounts"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = (platformId: string) => {
    if (platformId === 'instagram') {
      socialConnect.instagram();
    }
  };

  const handleDisconnect = async (accountId: string) => {
    if (!token) return;

    try {
      // Implement disconnect logic here
      console.log('Disconnecting:', accountId);
    } catch (error) {
      console.error('Error disconnecting account:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to disconnect account"
      });
    }
  };

  const socialPlatforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5 text-white" />,
      color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
      isAvailable: true,
      accounts: accounts.map(account => ({
        id: account._id,
        username: account.username,
        avatar: account.profilePictureUrl,
        followers: account.followers,
        accountType: account.accountType
      }))
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: <Youtube className="h-5 w-5 text-white" />,
      color: "bg-red-600",
      isAvailable: false
    },
    {
      id: 'x',
      name: 'X',
      icon: <X className="h-5 w-5 text-white" />,
      color: "bg-black dark:bg-white dark:text-black",
      isAvailable: false
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <TiktokIcon className="h-5 w-5 text-white dark:text-black" />,
      color: "bg-[#000000] dark:bg-white",
      isAvailable: false
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5 text-white" />,
      color: "bg-[#1877F2]",
      isAvailable: false
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5 text-white" />,
      color: "bg-[#0A66C2]",
      isAvailable: false
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Connected Accounts</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {socialPlatforms.map((platform) => (
          <div
            key={platform.id}
            className={cn(
              "p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all",
              !platform.isAvailable && "opacity-75"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  platform.color
                )}>
                  <div className="w-5 h-5">
                    {platform.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{platform.name}</h3>
                  {platform.accounts && (
                    <span className="text-sm text-muted-foreground">
                      {platform.accounts.length} connected
                    </span>
                  )}
                </div>
              </div>
              {platform.isAvailable ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect(platform.id)}
                >
                  Connect
                </Button>
              ) : (
                <span className="text-xs font-medium bg-accent/50 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>

            {platform.accounts && platform.accounts.length > 0 && (
              <div className="space-y-2">
                {platform.accounts.map(account => (
                  <div 
                    key={account.id} 
                    className="flex items-center justify-between bg-accent/30 hover:bg-accent/50 p-3 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={account.avatar}
                        alt={account.username}
                        className="w-8 h-8 rounded-full ring-2 ring-background"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{account.username}</span>
                        <span className="text-xs text-muted-foreground">
                          {account.accountType} · {account.followers} followers
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDisconnect(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 