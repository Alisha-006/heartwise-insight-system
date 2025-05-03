
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HealthData } from "./HealthForm";

type DiagnosticReportProps = {
  healthData: HealthData;
  predictionResult: {
    probability: number;
    risk: "low" | "moderate" | "high";
    factors: { factor: string; impact: number }[];
  };
  recommendations: string[];
};

const DiagnosticReport = ({
  healthData,
  predictionResult,
  recommendations,
}: DiagnosticReportProps) => {
  // Format data for the risk factors chart
  const factorChartData = predictionResult.factors.map((factor) => ({
    name: factor.factor,
    impact: Math.round(factor.impact * 100),
  }));

  // Helper function to get risk color
  const getRiskColor = () => {
    switch (predictionResult.risk) {
      case "low":
        return "text-medical-success";
      case "moderate":
        return "text-medical-moderate";
      case "high":
        return "text-medical-accent";
      default:
        return "text-medical-neutral";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-medical-dark flex items-center justify-between">
            <span>Diagnostic Report</span>
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getRiskColor()} bg-opacity-10 border ${
              predictionResult.risk === "low"
                ? "border-medical-success bg-medical-success"
                : predictionResult.risk === "moderate"
                ? "border-medical-moderate bg-medical-moderate"
                : "border-medical-accent bg-medical-accent"
            }`} style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
              {predictionResult.risk === "low"
                ? "Low Risk"
                : predictionResult.risk === "moderate"
                ? "Moderate Risk"
                : "High Risk"} - {Math.round(predictionResult.probability * 100)}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-medium mb-3">Patient Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">Age:</span>
                    <span className="text-sm font-medium">{healthData.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">Sex:</span>
                    <span className="text-sm font-medium capitalize">
                      {healthData.sex}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      Chest Pain Type:
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {healthData.chestPainType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      Resting Blood Pressure:
                    </span>
                    <span className="text-sm font-medium">
                      {healthData.restingBP} mm Hg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      Cholesterol:
                    </span>
                    <span className="text-sm font-medium">
                      {healthData.cholesterol} mg/dl
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      Fasting Blood Sugar > 120 mg/dl:
                    </span>
                    <span className="text-sm font-medium">
                      {healthData.fastingBS === "above120" ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      Resting ECG:
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {healthData.restingECG}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      Maximum Heart Rate:
                    </span>
                    <span className="text-sm font-medium">
                      {healthData.maxHR} bpm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      Exercise Angina:
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {healthData.exerciseAngina}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-medical-neutral">
                      ST Slope:
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {healthData.stSlope}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-md font-medium mb-3">Risk Factors Analysis</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={factorChartData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      label={{
                        value: "Impact Score (%)",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar
                      dataKey="impact"
                      fill={
                        predictionResult.risk === "low"
                          ? "#43A047"
                          : predictionResult.risk === "moderate"
                          ? "#FF9800"
                          : "#E53935"
                      }
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-md font-medium mb-3">Recommendations</h4>
              <ul className="space-y-2 list-disc list-inside">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 text-xs text-medical-neutral text-center">
              <p>
                This assessment is based on statistical models and is not a
                medical diagnosis. Please consult with a healthcare professional
                for proper medical advice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticReport;
