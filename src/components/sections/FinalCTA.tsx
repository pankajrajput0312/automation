import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Badge variant="secondary" className="mb-8 bg-white/10 text-white border-white/20 animate-fade-in">
          Limited Time Offer
        </Badge>
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-primary-foreground to-white bg-clip-text text-transparent animate-fade-up">
          Ready to Transform Your Social Media?
        </h2>
        <p className="text-xl mb-12 text-neutral-300 max-w-2xl mx-auto animate-fade-up delay-100">
          Join thousands of successful businesses already using our platform. Start your 30-day free trial today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-200">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6" onClick={() => navigate('/login')}>
            Start Your Free Trial
            <ArrowRight className="ml-2" />
          </Button>
          <p className="text-sm text-neutral-400">No credit card required</p>
        </div>
      </div>
    </section>
  );
}