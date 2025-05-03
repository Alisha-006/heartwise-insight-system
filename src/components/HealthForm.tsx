import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

export type HealthData = {
  age: number;
  sex: string;
  chestPainType: string;
  restingBP: number;
  cholesterol: number;
  fastingBS: string;
  restingECG: string;
  maxHR: number;
  exerciseAngina: string;
  oldpeak: number;
  stSlope: string;
};

const initialHealthData: HealthData = {
  age: 45,
  sex: "male",
  chestPainType: "typical",
  restingBP: 130,
  cholesterol: 200,
  fastingBS: "below120",
  restingECG: "normal",
  maxHR: 150,
  exerciseAngina: "no",
  oldpeak: 1.0,
  stSlope: "flat",
};

type HealthFormProps = {
  onSubmit: (data: HealthData) => void;
};

const HealthForm = ({ onSubmit }: HealthFormProps) => {
  const [formData, setFormData] = useState<HealthData>(initialHealthData);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({
      ...formData,
      [name]: value[0],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.age < 18 || formData.age > 120) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid age between 18 and 120",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.restingBP < 90 || formData.restingBP > 200) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid resting blood pressure",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.cholesterol < 100 || formData.cholesterol > 600) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid cholesterol value",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full"
            min="18"
            max="120"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Sex</Label>
          <RadioGroup
            value={formData.sex}
            onValueChange={(value) => handleSelectChange("sex", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chestPainType">Chest Pain Type</Label>
          <Select
            value={formData.chestPainType}
            onValueChange={(value) => handleSelectChange("chestPainType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select chest pain type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typical">Typical Angina</SelectItem>
              <SelectItem value="atypical">Atypical Angina</SelectItem>
              <SelectItem value="nonanginal">Non-Anginal Pain</SelectItem>
              <SelectItem value="asymptomatic">Asymptomatic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="restingBP">Resting Blood Pressure (mm Hg)</Label>
          <Input
            id="restingBP"
            name="restingBP"
            type="number"
            value={formData.restingBP}
            onChange={handleInputChange}
            className="w-full"
            min="90"
            max="200"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cholesterol">Cholesterol (mg/dl)</Label>
          <Input
            id="cholesterol"
            name="cholesterol"
            type="number"
            value={formData.cholesterol}
            onChange={handleInputChange}
            className="w-full"
            min="100"
            max="600"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Fasting Blood Sugar &gt; 120 mg/dl</Label>
          <RadioGroup
            value={formData.fastingBS}
            onValueChange={(value) => handleSelectChange("fastingBS", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="above120" id="above120" />
              <Label htmlFor="above120">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="below120" id="below120" />
              <Label htmlFor="below120">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="restingECG">Resting ECG Results</Label>
          <Select
            value={formData.restingECG}
            onValueChange={(value) => handleSelectChange("restingECG", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select resting ECG result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="st-abnormality">ST-T Wave Abnormality</SelectItem>
              <SelectItem value="lvh">Left Ventricular Hypertrophy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxHR">Maximum Heart Rate</Label>
          <Input
            id="maxHR"
            name="maxHR"
            type="number"
            value={formData.maxHR}
            onChange={handleInputChange}
            className="w-full"
            min="60"
            max="220"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Exercise-Induced Angina</Label>
          <RadioGroup
            value={formData.exerciseAngina}
            onValueChange={(value) => handleSelectChange("exerciseAngina", value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="angina-yes" />
              <Label htmlFor="angina-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="angina-no" />
              <Label htmlFor="angina-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>ST Depression (oldpeak): {formData.oldpeak}</Label>
          <Slider
            defaultValue={[formData.oldpeak]}
            max={6}
            step={0.1}
            onValueChange={(value) => handleSliderChange("oldpeak", value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stSlope">ST Slope</Label>
          <Select
            value={formData.stSlope}
            onValueChange={(value) => handleSelectChange("stSlope", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ST slope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upsloping">Upsloping</SelectItem>
              <SelectItem value="flat">Flat</SelectItem>
              <SelectItem value="downsloping">Downsloping</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="bg-medical-primary hover:bg-medical-dark text-white w-full">
        Generate Heart Health Assessment
      </Button>
    </form>
  );
};

export default HealthForm;
