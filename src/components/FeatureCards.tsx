"use client";

import { 
  Building2, 
  CreditCard, 
  LineChart, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  Settings,
  Zap,
  BarChart3,
  Wallet,
  Calendar,
  FileCheck,
  PieChart,
  Lock,
  HelpCircle
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Invest in Essential Equipment",
    description: "Streamline operations with our comprehensive property management solutions."
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description: "Issue virtual cards instantly for secure and controlled spending."
  },
  {
    icon: LineChart,
    title: "Growth Analytics",
    description: "Track performance and make data-driven decisions with real-time insights."
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Enterprise-grade security for all your financial transactions."
  },
  {
    icon: Clock,
    title: "Extended Terms",
    description: "Flexible payment terms to optimize your cash flow."
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Manage team access and permissions with granular controls."
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Keep all your important documents organized and accessible."
  },
  {
    icon: Settings,
    title: "Customizable Workflows",
    description: "Tailor the platform to match your business processes."
  },
  {
    icon: Zap,
    title: "Quick Setup",
    description: "Get started in minutes with our intuitive onboarding process."
  },
  {
    icon: BarChart3,
    title: "Performance Metrics",
    description: "Monitor key performance indicators in real-time."
  },
  {
    icon: Wallet,
    title: "Expense Tracking",
    description: "Track and categorize all expenses automatically."
  },
  {
    icon: Calendar,
    title: "Payment Scheduling",
    description: "Schedule and automate recurring payments."
  },
  {
    icon: FileCheck,
    title: "Compliance Tools",
    description: "Stay compliant with built-in regulatory tools."
  },
  {
    icon: PieChart,
    title: "Financial Reporting",
    description: "Generate detailed financial reports with ease."
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "Your data is protected with bank-level security."
  },
  {
    icon: HelpCircle,
    title: "24/7 Support",
    description: "Get help whenever you need it with our support team."
  }
];

export function FeatureCards() {
  return (
    <section className="py-24 bg-blue-600 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-medium text-left mb-16">
            How Incoxchange Helps You Maximize Profit Potential
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <feature.icon className="w-8 h-8 text-foreground mb-6" />
              <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
              <p className="text-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 