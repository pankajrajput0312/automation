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
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <HeroSection />
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Power-Packed Automation Tools
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
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
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
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
                  className="group p-6 bg-white rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent"
                >
                  <Icon className="w-12 h-12 mb-4 text-primary transition-colors duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-neutral-600">{benefit.description}</p>
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
