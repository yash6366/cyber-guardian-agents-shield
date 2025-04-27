
import { Card } from "@/components/ui/card";
import { Activity, BarChart, PieChart, TrendingUp } from "lucide-react";

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 pb-12">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex items-center mb-8">
          <BarChart className="w-8 h-8 text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold">Security Reports</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 text-blue-500 mr-2" />
              Threat Analysis
            </h2>
            {/* Add threat analysis chart here */}
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <PieChart className="w-5 h-5 text-blue-500 mr-2" />
              Attack Distribution
            </h2>
            {/* Add attack distribution chart here */}
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
              Response Metrics
            </h2>
            {/* Add response metrics chart here */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
