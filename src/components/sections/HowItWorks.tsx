import { Timeline } from "@/components/Timeline";

const steps = [
  {
    title: "Sign Up",
    description: "Create an account in under 2 minutes.",
    isCompleted: true,
  },
  {
    title: "Connect Your Instagram",
    description: "Seamless integration with your profile.",
    isCompleted: false,
  },
  {
    title: "Set Up Automation",
    description: "Customize replies, DMs, and post schedules to suit your needs.",
    isCompleted: false,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Start Automating in 3 Easy Steps
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Get started with social media automation in minutes
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Timeline steps={steps} />
        </div>
      </div>
    </section>
  );
}