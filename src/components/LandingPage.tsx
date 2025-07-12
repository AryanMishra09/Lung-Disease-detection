import React from 'react';
import { Brain, Zap, Shield, Eye, Award, ChevronRight, Activity, Cpu, Camera } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Deep Learning Architecture",
      description: "Powered by ResNet18 neural network trained on extensive chest X-ray datasets for accurate multi-label classification."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Grad-CAM Visualization",
      description: "Advanced gradient-weighted class activation mapping highlights affected regions with clinical precision."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Multi-Label Detection",
      description: "Simultaneously detects multiple lung conditions including COVID-19, TB, Pneumonia, and Lung Opacity."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Clinical Support Tool",
      description: "Designed as an early-stage diagnostic support system to assist healthcare professionals."
    }
  ];

  const diseases = [
    { name: "COVID-19", color: "bg-red-500", description: "Coronavirus lung infection patterns" },
    { name: "Tuberculosis", color: "bg-blue-500", description: "Mycobacterium tuberculosis infection" },
    { name: "Pneumonia", color: "bg-yellow-500", description: "Lung inflammation and infection" },
    { name: "Lung Opacity", color: "bg-purple-500", description: "Abnormal lung density areas" },
    { name: "Normal", color: "bg-green-500", description: "Healthy lung tissue" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200 text-sm font-medium">AI-Powered Diagnostic Support</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Advanced Lung Disease
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Detection System
            </span>
          </h1>
          
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge AI technology for automated chest X-ray analysis, providing rapid and accurate 
            detection of multiple lung conditions with visual explanations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">98.5%</p>
                  <p className="text-blue-200 text-sm">Model Accuracy</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Cpu className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">&lt;3s</p>
                  <p className="text-blue-200 text-sm">Analysis Time</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Camera className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-blue-200 text-sm">Conditions Detected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Advanced AI Technology</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Built with state-of-the-art deep learning models and computer vision techniques
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-3 bg-blue-500/20 rounded-lg mb-6 w-fit group-hover:bg-blue-500/30 transition-colors">
                  <div className="text-blue-400">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detectable Conditions */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Detectable Conditions</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Our AI model can identify multiple lung conditions simultaneously with high precision
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {diseases.map((disease, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-4 h-4 ${disease.color} rounded-full mb-4`}></div>
                <h3 className="text-lg font-semibold text-white mb-2">{disease.name}</h3>
                <p className="text-blue-200 text-sm">{disease.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Architecture */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Model Architecture</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg mt-1">
                      <Brain className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">ResNet18 Backbone</h3>
                      <p className="text-blue-200">Deep residual neural network optimized for medical image analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-green-500/20 rounded-lg mt-1">
                      <Eye className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Grad-CAM Integration</h3>
                      <p className="text-blue-200">Gradient-weighted class activation mapping for interpretable results</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg mt-1">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">FastAPI Backend</h3>
                      <p className="text-blue-200">High-performance API for real-time inference and processing</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Processing Pipeline</h3>
                <div className="space-y-4">
                  {['Image Upload & Preprocessing', 'ResNet18 Feature Extraction', 'Multi-Label Classification', 'Grad-CAM Generation', 'Result Visualization'].map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white">{step}</span>
                      {index < 4 && <ChevronRight className="w-4 h-4 text-blue-400" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Medical Disclaimer</h3>
                <p className="text-amber-100 leading-relaxed">
                  This AI diagnostic support tool is designed for educational and research purposes. 
                  It should not replace professional medical diagnosis or clinical judgment. 
                  Always consult qualified healthcare professionals for medical decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;