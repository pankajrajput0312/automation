import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="animate-fade-in mb-8 text-lg py-2 px-4 font-medium bg-primary/10 text-primary">
          <Sparkles className="w-4 h-4 mr-2 inline-block" />
          Transform Your Social Media Game
        </Badge>
        <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 tracking-tight">
          Start <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">Automating</span> with Confidence
          <span className="text-accent-500">.</span>
        </h1>
        <p className="animate-fade-up animation-delay-100 text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
          Experience the power of social media automation risk-free. Sign up today and enjoy all premium features for 30 days at no cost.
        </p>
        <div className="animate-fade-up animation-delay-200 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
            Start My Free Trial
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}