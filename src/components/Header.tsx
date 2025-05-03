
import { Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-medical-accent animate-pulse-gentle" />
          <h1 className="text-xl font-semibold text-medical-dark">HeartWise Insight System</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-medical-text hover:text-medical-primary transition-colors">Home</a></li>
            <li><a href="#" className="text-medical-text hover:text-medical-primary transition-colors">About</a></li>
            <li><a href="#" className="text-medical-text hover:text-medical-primary transition-colors">Resources</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
