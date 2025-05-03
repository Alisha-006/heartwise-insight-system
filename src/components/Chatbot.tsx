
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { User, MessageCircle } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Predefined health-related questions and answers
const healthQA: Record<string, string> = {
  "What is heart disease?": 
    "Heart disease refers to various conditions that affect the heart, including coronary artery disease, heart rhythm problems, heart valve disease, and heart muscle disease. These conditions can lead to heart attacks, chest pain, or stroke.",
  
  "What causes high cholesterol?": 
    "High cholesterol can be caused by various factors including genetics, diet high in saturated fats, lack of physical activity, obesity, smoking, age, and certain medical conditions like diabetes.",
  
  "How can I reduce my risk of heart disease?": 
    "To reduce heart disease risk: maintain a healthy diet low in saturated fats, exercise regularly, avoid smoking, limit alcohol consumption, manage stress, maintain a healthy weight, and get regular health check-ups.",
  
  "What do my cholesterol numbers mean?": 
    "Total cholesterol below 200 mg/dL is desirable. LDL (bad) cholesterol should be below 100 mg/dL. HDL (good) cholesterol should be 60 mg/dL or higher. Triglycerides should be below 150 mg/dL.",
  
  "What is a normal resting heart rate?": 
    "A normal resting heart rate for adults ranges from 60 to 100 beats per minute. Athletes and people who are physically fit may have lower resting heart rates, sometimes in the 40s or 50s.",
  
  "What is blood pressure?": 
    "Blood pressure is the force of blood pushing against the walls of your arteries as your heart pumps blood. It's measured in two numbers: systolic (pressure during heart beats) and diastolic (pressure between beats).",
  
  "What is a heart attack?": 
    "A heart attack occurs when blood flow to part of the heart muscle is blocked, usually by a blood clot. Without blood flow, the heart tissue becomes damaged or dies. Symptoms may include chest pain, shortness of breath, and discomfort in the upper body.",
  
  "What is angina?": 
    "Angina is chest pain or discomfort caused when your heart muscle doesn't get enough oxygen-rich blood. It may feel like pressure or squeezing in your chest, and can also occur in shoulders, arms, neck, jaw, or back.",
};

// Function to find the best matching question for user input
const findBestMatch = (userInput: string): string => {
  const userInputLower = userInput.toLowerCase();
  
  // First check for direct matches with question keywords
  for (const question of Object.keys(healthQA)) {
    const questionLower = question.toLowerCase();
    if (userInputLower.includes(questionLower) || 
        questionLower.includes(userInputLower)) {
      return question;
    }
  }
  
  // If no direct match, check for keyword matches
  const keywordMap: Record<string, string[]> = {
    "heart disease": ["what is heart disease"],
    "cholesterol": ["what causes high cholesterol", "what do my cholesterol numbers mean"],
    "risk": ["how can I reduce my risk of heart disease"],
    "heart rate": ["what is a normal resting heart rate"],
    "blood pressure": ["what is blood pressure"],
    "heart attack": ["what is a heart attack"],
    "angina": ["what is angina"],
  };
  
  for (const [keyword, questions] of Object.entries(keywordMap)) {
    if (userInputLower.includes(keyword)) {
      return questions[0];
    }
  }
  
  // Default response if no match found
  return "";
};

// Generate a bot response based on user input
const generateBotResponse = (userInput: string): string => {
  const matchedQuestion = findBestMatch(userInput);
  
  if (matchedQuestion && healthQA[matchedQuestion]) {
    return healthQA[matchedQuestion];
  }
  
  // Generic responses if no specific match found
  if (userInput.toLowerCase().includes("hello") || 
      userInput.toLowerCase().includes("hi")) {
    return "Hello! How can I assist you with your heart health questions today?";
  }
  
  if (userInput.toLowerCase().includes("thank")) {
    return "You're welcome! Is there anything else you'd like to know about heart health?";
  }
  
  return "I don't have specific information on that topic. For personalized medical advice, please consult with your healthcare provider. I can answer general questions about heart disease, cholesterol, blood pressure, and heart health recommendations.";
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your heart health assistant. How can I help you today? You can ask me questions about heart disease, cholesterol, blood pressure, or risk factors.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  
  const handleSend = () => {
    if (inputValue.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Generate and add bot response with a small delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateBotResponse(userMessage.text),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[500px] animate-fade-in">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="h-5 w-5 text-medical-primary" />
          <h3 className="text-lg font-semibold text-medical-dark">Heart Health Chat</h3>
        </div>
        
        <ScrollArea className="flex-grow mb-4 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 animate-slide-in ${
                    message.sender === "user"
                      ? "bg-medical-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === "user" ? (
                      <>
                        <span className="text-xs opacity-70">You</span>
                        <User className="h-3 w-3 opacity-70" />
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-3 w-3 opacity-70" />
                        <span className="text-xs opacity-70">Health Assistant</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Ask a health question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={handleSend} className="bg-medical-primary hover:bg-medical-dark">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
