import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { CheckCircle, Users, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="animate-fade-in inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-neutral-900 text-white mb-8">
            Now Available
          </span>
          <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 tracking-tight">
            Your Product Title
            <span className="text-accent-500">.</span>
          </h1>
          <p className="animate-fade-up animation-delay-100 text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
            A beautifully crafted product description that captures attention and drives engagement.
          </p>
          <div className="animate-fade-up animation-delay-200 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors">
              Get Started
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-neutral-900 font-medium border border-neutral-200 hover:bg-neutral-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Features that make a difference
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Discover how our product can transform your workflow with these powerful features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={CheckCircle}
              title="Simple & Intuitive"
              description="Designed with simplicity in mind, making it easy for anyone to use."
            />
            <FeatureCard
              icon={Users}
              title="Built for Teams"
              description="Collaborate seamlessly with your team members in real-time."
            />
            <FeatureCard
              icon={Heart}
              title="Loved by Users"
              description="Join thousands of satisfied users who love our product."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;