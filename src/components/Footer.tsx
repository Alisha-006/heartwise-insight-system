
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-medical-neutral">
              © 2025 HeartWise Insight System. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-medical-neutral hover:text-medical-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-medical-neutral hover:text-medical-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-medical-neutral hover:text-medical-primary transition-colors">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-4 text-xs text-center text-medical-neutral">
          <p>Disclaimer: This tool provides informational insights only and is not a substitute for professional medical advice or diagnosis.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
