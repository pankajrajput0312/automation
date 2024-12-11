import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { HeroSection } from "@/components/sections/HeroSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { MessageSquare, Send, Calendar, Clock, Zap, Users, Workflow } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Power-Packed Automation Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how our automation tools can transform your social media strategy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageSquare}
              title="Auto-Reply to Comments"
              description="Engage with your audience 24/7 by sending instant, personalized replies to comments on your posts."
            />
            <FeatureCard
              icon={Send}
              title="Automated DMs"
              description="Turn comments into conversations by sending direct messages automatically to users commenting on your posts."
            />
            <FeatureCard
              icon={Calendar}
              title="Instagram Post Scheduling"
              description="Plan, schedule, and publish your posts effortlessly to maintain a consistent online presence."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Automation Tool?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Save Time",
                description: "Automate repetitive tasks and focus on creating content."
              },
              {
                icon: Zap,
                title: "Boost Engagement",
                description: "Never miss a comment or DM opportunity."
              },
              {
                icon: Users,
                title: "Increase Reach",
                description: "Consistently publish content to stay top-of-mind with your audience."
              },
              {
                icon: Workflow,
                title: "Streamline Workflow",
                description: "Manage Instagram activities seamlessly from one platform."
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 bg-card rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent border border-border"
                >
                  <Icon className="w-12 h-12 mb-4 text-primary transition-colors duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorks />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;