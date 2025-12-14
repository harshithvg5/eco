import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Droplets, Zap, Trash2, Wind, Bus, Shield, ChevronRight, X, PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeWasteImage } from '../services/geminiService';

const Home: React.FC = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [showWasteScanner, setShowWasteScanner] = useState(false);
  const [wasteResult, setWasteResult] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome modal on first mount
    setShowWelcome(true);
  }, []);

  const stats = [
    { icon: Droplets, val: "0L", label: "Water Saved", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Zap, val: "0kWh", label: "Energy Saved", color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: Trash2, val: "0kg", label: "Recycled", color: "text-green-500", bg: "bg-green-50" },
    { icon: Wind, val: user?.carbonSaved.toFixed(1) + "kg", label: "CO₂ Reduced", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const handleWasteUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAnalyzing(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        const result = await analyzeWasteImage(base64Data);
        setWasteResult(result);
        setAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Hi, {user?.name.split(' ')[0]} 👋</h2>
        <p className="text-slate-500">Ready to save the planet today?</p>
      </div>

      {/* Daily Score */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Today's Eco Score</p>
              <h3 className="text-4xl font-bold">0<span className="text-lg opacity-70">/100</span></h3>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-lg text-xs backdrop-blur-sm">
              Beginner
            </div>
          </div>
          <div className="h-2 bg-emerald-900/30 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-200 w-[5%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Quick Tip */}
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-8 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="font-bold text-orange-800 text-sm mb-1">Did you know?</h4>
          <p className="text-orange-700 text-xs leading-relaxed">
            Recycling one aluminum can saves enough energy to run a TV for three hours!
          </p>
        </div>
      </div>

      {/* Impact Grid */}
      <h3 className="font-bold text-slate-800 mb-4 text-lg">Your Impact</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} p-4 rounded-2xl flex flex-col items-center justify-center text-center`}>
            <s.icon className={`${s.color} mb-2`} size={24} />
            <span className={`font-bold text-lg ${s.color}`}>{s.val}</span>
            <span className="text-xs text-slate-500 font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="font-bold text-slate-800 mb-4 text-lg">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => navigate('/track', { state: { mode: 'water' } })} className="flex flex-col items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <Droplets size={20} />
          </div>
          <span className="text-xs font-medium text-slate-600">Track Water</span>
        </button>
        <button onClick={() => setShowWasteScanner(true)} className="flex flex-col items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
            <Trash2 size={20} />
          </div>
          <span className="text-xs font-medium text-slate-600">Scan Waste</span>
        </button>
        <button onClick={() => navigate('/track', { state: { mode: 'mobility' } })} className="flex flex-col items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
            <Bus size={20} />
          </div>
          <span className="text-xs font-medium text-slate-600">Transport</span>
        </button>
        <button onClick={() => navigate('/heroes')} className="flex flex-col items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-95 transition-transform">
          <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
            <Shield size={20} />
          </div>
          <span className="text-xs font-medium text-slate-600">Report Issue</span>
        </button>
      </div>

      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 relative animate-fadeIn text-center">
            <button 
              onClick={() => setShowWelcome(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <PartyPopper size={40} className="text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">Congratulations!</h3>
            <p className="text-slate-500 mb-6">
              Welcome to EcoSphere! You've taken the first step towards a greener planet.
            </p>
            <button 
              onClick={() => setShowWelcome(false)}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors"
            >
              Let's Start!
            </button>
          </div>
        </div>
      )}

      {/* Waste Scanner Modal */}
      {showWasteScanner && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative animate-fadeIn">
            <button 
              onClick={() => { setShowWasteScanner(false); setWasteResult(null); }} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">AI Waste Scanner</h3>
            
            {!wasteResult && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
                  <Trash2 size={48} className="text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500 text-center mb-4">Take a photo of your waste item</p>
                  <label className="bg-emerald-600 text-white px-6 py-2 rounded-full font-medium cursor-pointer hover:bg-emerald-700 transition-colors">
                    Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handleWasteUpload} />
                  </label>
                </div>
                {analyzing && <p className="text-center text-emerald-600 font-medium animate-pulse">AI is analyzing...</p>}
              </div>
            )}

            {wasteResult && (
              <div className="bg-emerald-50 p-4 rounded-xl">
                <h4 className="font-bold text-emerald-800 mb-2">Analysis Result:</h4>
                <pre className="whitespace-pre-wrap font-sans text-sm text-emerald-700">{wasteResult}</pre>
                <button 
                  onClick={() => { setShowWasteScanner(false); setWasteResult(null); }}
                  className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-xl font-bold"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;