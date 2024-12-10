import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MessageSquare, Send, Calendar, Clock, Zap, Users, Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="animate-fade-in mb-8">
            Ready to Automate?
          </Badge>
          <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 tracking-tight">
            Start Automating with Confidence
            <span className="text-accent-500">.</span>
          </h1>
          <p className="animate-fade-up animation-delay-100 text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
            Experience the power of social media automation risk-free. Sign up today and enjoy all premium features for 30 days at no cost.
          </p>
          <div className="animate-fade-up animation-delay-200 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800">
              Start My Free Trial
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

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
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <Clock className="w-12 h-12 mb-4 text-accent-500" />
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-neutral-600">Automate repetitive tasks and focus on creating content.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <Zap className="w-12 h-12 mb-4 text-accent-500" />
              <h3 className="text-xl font-semibold mb-2">Boost Engagement</h3>
              <p className="text-neutral-600">Never miss a comment or DM opportunity.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <Users className="w-12 h-12 mb-4 text-accent-500" />
              <h3 className="text-xl font-semibold mb-2">Increase Reach</h3>
              <p className="text-neutral-600">Consistently publish content to stay top-of-mind with your audience.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <Workflow className="w-12 h-12 mb-4 text-accent-500" />
              <h3 className="text-xl font-semibold mb-2">Streamline Workflow</h3>
              <p className="text-neutral-600">Manage Instagram activities seamlessly from one platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Hear from Our Happy Users
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This tool saved me hours every week! My engagement has skyrocketed!",
                author: "Sarah Johnson",
                role: "Business Owner"
              },
              {
                quote: "I love the auto-DMs feature. It's a game-changer for building relationships with followers.",
                author: "Mike Chen",
                role: "Influencer"
              },
              {
                quote: "Scheduling posts has never been easier. This tool is a must-have for any marketer!",
                author: "Emily Rodriguez",
                role: "Social Media Manager"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 bg-neutral-50 rounded-2xl">
                <p className="text-lg mb-4 text-neutral-700">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-neutral-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Automate?</h2>
          <p className="text-xl mb-8 text-neutral-300">
            Start saving time and growing your Instagram today!
          </p>
          <Button size="lg" className="bg-accent-500 hover:bg-accent-600">
            Sign Up Free
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-neutral-900 text-white border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-neutral-400">support@yourdomain.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-400 hover:text-white">Twitter</a>
                <a href="#" className="text-neutral-400 hover:text-white">Instagram</a>
                <a href="#" className="text-neutral-400 hover:text-white">LinkedIn</a>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-neutral-400 mb-4">
                Subscribe to get the latest updates and tips on social media automation.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
