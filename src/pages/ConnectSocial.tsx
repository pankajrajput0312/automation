import { Button } from "@/components/ui/button";
import { Plus, Instagram, Youtube, X, Facebook, Linkedin, Trash2 } from "lucide-react";
import { TiktokIcon } from "@/components/icons/TiktokIcon";
import { cn } from "@/lib/utils";
import { socialConnect } from "@/services/social-connect";

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  isAvailable: boolean;
  accounts?: {
    id: string;
    username: string;
    avatar?: string;
  }[];
}

const socialPlatforms: SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className="h-5 w-5 text-white" />,
    color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
    isAvailable: true,
    accounts: [
      { 
        id: '1', 
        username: '@socialhub', 
        avatar: 'https://ui-avatars.com/api/?name=Social+Hub&background=FF5E5B&color=fff'
      },
      { 
        id: '2', 
        username: '@socialautomator', 
        avatar: 'https://ui-avatars.com/api/?name=Social+Automator&background=7C3AED&color=fff'
      },
      { 
        id: '3', 
        username: '@techbrand', 
        avatar: 'https://ui-avatars.com/api/?name=Tech+Brand&background=0EA5E9&color=fff'
      }
    ]
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

export function ConnectSocialPage() {
  const handleConnect = (platformId: string) => {
    if (platformId === 'instagram') {
      socialConnect.instagram();
    } else {
      console.log('Connecting to:', platformId);
    }
  };

  const handleDisconnect = (platformId: string, accountId: string) => {
    console.log('Disconnecting:', platformId, accountId);
    // Implement disconnect logic
  };

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
              <div className="space-y-3 mt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">Connected Accounts</h4>
                  {platform.accounts.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      {platform.accounts.length} accounts
                    </span>
                  )}
                </div>
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
                          <span className="text-xs text-muted-foreground">Personal Account</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDisconnect(platform.id, account.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 