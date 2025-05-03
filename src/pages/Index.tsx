
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HealthForm, { HealthData } from "@/components/HealthForm";
import PredictionResult from "@/components/PredictionResult";
import DiagnosticReport from "@/components/DiagnosticReport";
import Chatbot from "@/components/Chatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { predictHeartDisease, generateRecommendations } from "@/lib/predictionModel";

const Index = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [predictionResult, setPredictionResult] = useState<{
    probability: number;
    risk: "low" | "moderate" | "high";
    factors: { factor: string; impact: number }[];
  } | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"assessment" | "chat">("assessment");

  const handleFormSubmit = (data: HealthData) => {
    // Use the prediction model to get results
    const prediction = predictHeartDisease(data);
    setPredictionResult(prediction);
    setHealthData(data);
    
    // Generate recommendations based on data and prediction
    const healthRecommendations = generateRecommendations(data, prediction);
    setRecommendations(healthRecommendations);
  };

  const handleReset = () => {
    setPredictionResult(null);
    setHealthData(null);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-medical-bg">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-medical-accent animate-pulse-gentle" />
            <h1 className="text-3xl font-bold text-medical-dark">HeartWise Insight System</h1>
          </div>
          <p className="text-medical-neutral max-w-2xl mx-auto">
            Get insights about your heart health with our advanced AI-powered prediction system. 
            Fill in your health information to receive a personalized assessment and recommendations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs
              defaultValue="assessment"
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "assessment" | "chat")}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="assessment">Health Assessment</TabsTrigger>
                <TabsTrigger value="chat">Health Chat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assessment">
                <Card>
                  <CardContent className="pt-6">
                    {!predictionResult ? (
                      <div className="space-y-6">
                        <div className="text-left mb-4">
                          <h2 className="text-xl font-semibold text-medical-dark mb-2">
                            Enter Your Health Information
                          </h2>
                          <p className="text-sm text-medical-neutral">
                            Please provide accurate health information below to receive a personalized heart health assessment.
                          </p>
                        </div>
                        <HealthForm onSubmit={handleFormSubmit} />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold text-medical-dark">
                            Your Heart Health Assessment
                          </h2>
                          <Button
                            variant="outline"
                            onClick={handleReset}
                            className="text-medical-primary border-medical-primary hover:bg-medical-primary hover:text-white"
                          >
                            Start New Assessment
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <PredictionResult
                            probability={predictionResult.probability}
                            risk={predictionResult.risk}
                          />
                          
                          <DiagnosticReport
                            healthData={healthData!}
                            predictionResult={predictionResult}
                            recommendations={recommendations}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="chat">
                <Chatbot />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-medical-dark mb-4">
                  About Heart Health
                </h2>
                <div className="space-y-4 text-sm">
                  <p>
                    Heart disease remains one of the leading causes of death globally. 
                    Early detection and preventive measures can significantly reduce risk.
                  </p>
                  <p>
                    Our assessment tool uses medical indicators to evaluate your heart 
                    disease risk based on established medical research and statistical models.
                  </p>
                  <p>
                    Key risk factors for heart disease include:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>High blood pressure</li>
                    <li>High cholesterol</li>
                    <li>Smoking</li>
                    <li>Diabetes</li>
                    <li>Obesity</li>
                    <li>Physical inactivity</li>
                    <li>Unhealthy diet</li>
                    <li>Family history</li>
                  </ul>
                  <p className="text-xs text-medical-neutral italic mt-4">
                    Disclaimer: This tool is for informational purposes only and is not intended 
                    to be a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional resources card */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-medical-dark mb-4">
                  Health Resources
                </h2>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://www.heart.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-medical-primary hover:underline flex items-center"
                    >
                      <span className="mr-2">•</span>
                      American Heart Association
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.cdc.gov/heartdisease/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-medical-primary hover:underline flex items-center"
                    >
                      <span className="mr-2">•</span>
                      CDC - Heart Disease
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.nhlbi.nih.gov/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-medical-primary hover:underline flex items-center"
                    >
                      <span className="mr-2">•</span>
                      National Heart, Lung, and Blood Institute
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.mayoclinic.org/diseases-conditions/heart-disease/symptoms-causes/syc-20353118" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-medical-primary hover:underline flex items-center line-clamp-1"
                    >
                      <span className="mr-2">•</span>
                      Mayo Clinic - Heart Disease
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
