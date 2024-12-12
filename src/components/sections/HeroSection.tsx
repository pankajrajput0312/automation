import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center pt-16 pb-24 sm:pt-24 sm:pb-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Badge variant="secondary" className="animate-fade-in mb-8 text-lg py-2 px-4 font-medium bg-white/10 text-white border-white/20">
          <Sparkles className="w-4 h-4 mr-2 inline-block" />
          Transform Your Social Media Game
        </Badge>
        <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          Start <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">Automating</span> with Confidence
          <span className="text-accent-500">.</span>
        </h1>
        <p className="animate-fade-up animation-delay-100 text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
          Experience the power of social media automation risk-free. Sign up today and enjoy all premium features for 30 days at no cost.
        </p>
        <div className="animate-fade-up animation-delay-200 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            onClick={() => navigate('/login')}
          >
            Start My Free Trial
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}