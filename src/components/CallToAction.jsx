
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to strengthen your security?
      </h2>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        Experience the next generation of cybersecurity with our autonomous defense system.
      </p>
      <Link to="/dashboard">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
          Get Started
        </Button>
      </Link>
    </section>
  );
};

export default CallToAction;
