
import { HealthData } from "@/components/HealthForm";

// Mock model for heart disease prediction
// In a real application, this would use a proper ML model
export const predictHeartDisease = (data: HealthData): {
  probability: number;
  risk: "low" | "moderate" | "high";
  factors: { factor: string; impact: number }[];
} => {
  // This is a simplified mock model using weighted risk factors
  let score = 0;
  const factors: { factor: string; impact: number }[] = [];
  
  // Age factor (increases with age)
  const ageFactor = (data.age - 18) / 60 * 0.2;
  score += ageFactor;
  factors.push({ factor: "Age", impact: ageFactor });
  
  // Sex factor (males have higher risk statistically)
  const sexFactor = data.sex === "male" ? 0.1 : 0;
  score += sexFactor;
  if (sexFactor > 0) {
    factors.push({ factor: "Sex", impact: sexFactor });
  }
  
  // Chest pain type factor
  let chestPainFactor = 0;
  switch (data.chestPainType) {
    case "typical":
      chestPainFactor = 0.05;
      break;
    case "atypical":
      chestPainFactor = 0.1;
      break;
    case "nonanginal":
      chestPainFactor = 0.15;
      break;
    case "asymptomatic":
      chestPainFactor = 0.25;
      break;
  }
  score += chestPainFactor;
  factors.push({ factor: "Chest Pain Type", impact: chestPainFactor });
  
  // Blood pressure factor (increases with BP)
  const bpFactor = (data.restingBP - 90) / 110 * 0.15;
  score += bpFactor;
  factors.push({ factor: "Resting Blood Pressure", impact: bpFactor });
  
  // Cholesterol factor
  const cholesterolFactor = (data.cholesterol - 100) / 500 * 0.15;
  score += cholesterolFactor;
  factors.push({ factor: "Cholesterol Level", impact: cholesterolFactor });
  
  // Fasting blood sugar factor
  const bsFactor = data.fastingBS === "above120" ? 0.1 : 0;
  score += bsFactor;
  if (bsFactor > 0) {
    factors.push({ factor: "Fasting Blood Sugar", impact: bsFactor });
  }
  
  // ECG factor
  let ecgFactor = 0;
  switch (data.restingECG) {
    case "normal":
      ecgFactor = 0;
      break;
    case "st-abnormality":
      ecgFactor = 0.15;
      break;
    case "lvh":
      ecgFactor = 0.1;
      break;
  }
  score += ecgFactor;
  if (ecgFactor > 0) {
    factors.push({ factor: "Resting ECG Results", impact: ecgFactor });
  }
  
  // Max heart rate factor (lower max HR increases risk)
  const maxHrFactor = (220 - data.age - data.maxHR) / 100 * 0.1;
  score += Math.max(0, maxHrFactor);
  if (maxHrFactor > 0) {
    factors.push({ factor: "Maximum Heart Rate", impact: maxHrFactor });
  }
  
  // Exercise angina factor
  const anginaFactor = data.exerciseAngina === "yes" ? 0.2 : 0;
  score += anginaFactor;
  if (anginaFactor > 0) {
    factors.push({ factor: "Exercise-Induced Angina", impact: anginaFactor });
  }
  
  // ST depression factor
  const oldpeakFactor = data.oldpeak / 6 * 0.15;
  score += oldpeakFactor;
  if (oldpeakFactor > 0) {
    factors.push({ factor: "ST Depression", impact: oldpeakFactor });
  }
  
  // ST slope factor
  let slopeFactor = 0;
  switch (data.stSlope) {
    case "upsloping":
      slopeFactor = 0.05;
      break;
    case "flat":
      slopeFactor = 0.15;
      break;
    case "downsloping":
      slopeFactor = 0.2;
      break;
  }
  score += slopeFactor;
  factors.push({ factor: "ST Slope", impact: slopeFactor });
  
  // Normalize score to a probability between 0 and 1
  const probability = Math.min(Math.max(score, 0), 1);
  
  // Sort factors by impact (highest first)
  factors.sort((a, b) => b.impact - a.impact);
  
  // Determine risk level
  let risk: "low" | "moderate" | "high";
  if (probability < 0.3) {
    risk = "low";
  } else if (probability < 0.6) {
    risk = "moderate";
  } else {
    risk = "high";
  }
  
  return {
    probability,
    risk,
    factors: factors.slice(0, 5) // Return top 5 factors
  };
};

// Generate recommendations based on prediction results
export const generateRecommendations = (
  data: HealthData,
  prediction: { probability: number; risk: string; factors: { factor: string; impact: number }[] }
): string[] => {
  const recommendations: string[] = [];

  // General recommendations for everyone
  recommendations.push("Schedule regular check-ups with your healthcare provider.");
  recommendations.push("Maintain a balanced diet rich in fruits, vegetables, and whole grains.");
  
  // Risk-based recommendations
  if (prediction.risk === "high") {
    recommendations.push("Consult with a cardiologist as soon as possible.");
    recommendations.push("Consider cardiac stress testing for further evaluation.");
    recommendations.push("Follow a heart-healthy diet with reduced sodium and saturated fat.");
  } else if (prediction.risk === "moderate") {
    recommendations.push("Schedule a follow-up with your primary care physician to discuss these results.");
    recommendations.push("Consider lifestyle modifications to address risk factors.");
  }
  
  // Factor-specific recommendations
  prediction.factors.forEach(factor => {
    switch (factor.factor) {
      case "Cholesterol Level":
        if (data.cholesterol > 200) {
          recommendations.push("Monitor cholesterol levels regularly and consider dietary changes to lower LDL cholesterol.");
        }
        break;
      case "Resting Blood Pressure":
        if (data.restingBP > 130) {
          recommendations.push("Monitor blood pressure regularly and consider methods to maintain healthy blood pressure.");
        }
        break;
      case "Exercise-Induced Angina":
        if (data.exerciseAngina === "yes") {
          recommendations.push("Discuss your exercise-induced chest pain with a cardiologist for proper evaluation.");
        }
        break;
      case "Age":
        if (data.age > 60) {
          recommendations.push("Consider age-appropriate cardiovascular screening tests.");
        }
        break;
      case "ST Depression":
        if (data.oldpeak > 2) {
          recommendations.push("The ST depression in your ECG may indicate reduced blood flow to the heart - follow up with a specialist.");
        }
        break;
      case "Fasting Blood Sugar":
        if (data.fastingBS === "above120") {
          recommendations.push("Monitor blood glucose levels and consider consulting with a healthcare provider about diabetes management.");
        }
        break;
    }
  });
  
  // Add lifestyle recommendations
  recommendations.push("Aim for at least 150 minutes of moderate physical activity each week.");
  if (prediction.risk !== "low") {
    recommendations.push("Consider smoking cessation resources if you currently smoke.");
    recommendations.push("Manage stress through techniques such as mindfulness, meditation, or yoga.");
  }
  
  // Randomize and limit recommendations to avoid overwhelming the user
  return shuffleArray(recommendations).slice(0, 7);
};

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
