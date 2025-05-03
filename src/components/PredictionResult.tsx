
import { Progress } from "@/components/ui/progress";
import { HealthData } from "./HealthForm";
import { useState, useEffect } from "react";

type PredictionResultProps = {
  probability: number;
  risk: "low" | "moderate" | "high";
};

const PredictionResult = ({ probability, risk }: PredictionResultProps) => {
  const [progress, setProgress] = useState(0);
  
  // Animation for the progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(probability * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [probability]);
  
  // Determine color based on risk level
  const getRiskColor = () => {
    switch (risk) {
      case "low":
        return "bg-medical-success";
      case "moderate":
        return "bg-medical-moderate";
      case "high":
        return "bg-medical-accent";
      default:
        return "bg-medical-neutral";
    }
  };
  
  const getRiskTextColor = () => {
    switch (risk) {
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
  
  const getRiskLabel = () => {
    switch (risk) {
      case "low":
        return "Low Risk";
      case "moderate":
        return "Moderate Risk";
      case "high":
        return "High Risk";
      default:
        return "Unknown Risk";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
      <h3 className="text-lg font-semibold text-medical-dark mb-4">Heart Disease Risk Assessment</h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-medical-neutral">Risk Probability</span>
          <span className="text-sm font-medium">{Math.round(probability * 100)}%</span>
        </div>
        <Progress value={progress} className="h-2.5" indicatorClassName={getRiskColor()} />
      </div>
      
      <div className="flex justify-center">
        <div className={`text-center px-4 py-2 rounded-full font-semibold ${getRiskTextColor()} border ${risk === "low" ? "border-medical-success" : risk === "moderate" ? "border-medical-moderate" : "border-medical-accent"}`}>
          {getRiskLabel()}
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
