import { Badge } from "@/components/ui/badge";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This automation tool has completely transformed how I manage my social media. My engagement rates have increased by 300% since I started using it!",
      author: "Sarah Johnson",
      role: "Digital Marketing Manager",
      company: "TechStart Inc."
    },
    {
      quote: "The auto-DM feature is brilliant! It's helped me build meaningful connections with my followers while saving hours of manual work.",
      author: "Mike Chen",
      role: "Content Creator",
      company: "Creative Minds"
    },
    {
      quote: "As a social media manager handling multiple accounts, this tool has been a game-changer. The scheduling features are particularly impressive.",
      author: "Emily Rodriguez",
      role: "Social Media Strategist",
      company: "Growth Media"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Real Stories, Real Results
          </Badge>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Trusted by Social Media Professionals
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their social media presence with our automation tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-neutral-200 relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-lg mb-6 text-neutral-700 italic leading-relaxed">{testimonial.quote}</p>
                <div className="mt-6 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}