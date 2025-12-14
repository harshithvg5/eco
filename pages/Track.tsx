import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Upload, Navigation, Car, Bus, Footprints, Zap, Clock, Repeat, ArrowLeft, TrainFront, Wrench, Sun, Droplets } from 'lucide-react';
import { analyzeBill, getMobilityComparison } from '../services/geminiService';
import { useLocation } from 'react-router-dom';

const data = [
  { name: 'Mon', kwh: 12, water: 200 },
  { name: 'Tue', kwh: 14, water: 220 },
  { name: 'Wed', kwh: 11, water: 180 },
  { name: 'Thu', kwh: 15, water: 240 },
  { name: 'Fri', kwh: 13, water: 210 },
  { name: 'Sat', kwh: 18, water: 280 },
  { name: 'Sun', kwh: 16, water: 260 },
];

const Track: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<'energy' | 'water' | 'mobility' | 'services' | null>(null);
  
  const [billAnalysis, setBillAnalysis] = useState<any>(null);
  const [analyzingBill, setAnalyzingBill] = useState(false);
  
  // Mobility States
  const [fromLoc, setFromLoc] = useState('');
  const [toLoc, setToLoc] = useState('');
  const [mobilityData, setMobilityData] = useState<any>(null);
  const [calculatingRoute, setCalculatingRoute] = useState(false);

  useEffect(() => {
    if (location.state && (location.state as any).mode) {
      const mode = (location.state as any).mode;
      // Handle legacy link if needed, but Home now passes 'water' correctly
      if (mode === 'utility') setActiveSection('energy'); 
      else setActiveSection(mode);
    }
  }, [location]);

  const handleBillUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'electricity' | 'water') => {
    if (e.target.files && e.target.files[0]) {
      setAnalyzingBill(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const result = await analyzeBill(base64.split(',')[1], type);
        try {
            setBillAnalysis(JSON.parse(result));
        } catch (e) {
            setBillAnalysis({ usage: "Unknown", suggestions: ["Could not parse response"]});
        }
        setAnalyzingBill(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRouteCheck = async () => {
    if (!fromLoc || !toLoc) return;
    setCalculatingRoute(true);
    const resultJson = await getMobilityComparison(fromLoc, toLoc);
    try {
      setMobilityData(JSON.parse(resultJson));
    } catch(e) {
      console.error(e);
    }
    setCalculatingRoute(false);
  };

  const resetSection = () => {
    setActiveSection(null);
    setBillAnalysis(null);
  }

  // Tracking Hub View
  if (!activeSection) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Tracking Hub</h2>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setActiveSection('energy')}
            className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:scale-[1.02] transition-transform aspect-square justify-center"
          >
            <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-3">
              <Zap size={28} />
            </div>
            <h3 className="font-bold text-slate-800">Energy</h3>
            <p className="text-slate-400 text-xs mt-1">Track kWh</p>
          </button>

          <button 
            onClick={() => setActiveSection('water')}
            className="bg-white p-5 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:scale-[1.02] transition-transform aspect-square justify-center"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <Droplets size={28} />
            </div>
            <h3 className="font-bold text-slate-800">Water</h3>
            <p className="text-slate-400 text-xs mt-1">Track Liters</p>
          </button>

          <button 
            onClick={() => setActiveSection('mobility')}
            className="col-span-2 bg-slate-900 text-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center hover:scale-[1.02] transition-transform relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="w-16 h-16 bg-white/10 text-emerald-400 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm relative z-10">
              <Navigation size={32} />
            </div>
            <h3 className="text-xl font-bold mb-1 relative z-10">Transport</h3>
            <p className="text-slate-300 text-sm relative z-10">Compare routes & reduce travel carbon.</p>
          </button>

          <button 
            onClick={() => setActiveSection('services')}
            className="col-span-2 bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-row items-center gap-4 hover:scale-[1.02] transition-transform"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Wrench size={28} />
            </div>
            <div className="text-left">
               <h3 className="text-xl font-bold text-slate-800">Eco Services</h3>
               <p className="text-slate-500 text-sm">Find plumbers, solar repair & more.</p>
            </div>
          </button>
        </div>
      </Layout>
    );
  }

  const getSectionTitle = () => {
    switch(activeSection) {
      case 'energy': return 'Energy Tracker';
      case 'water': return 'Water Tracker';
      case 'mobility': return 'Transport';
      case 'services': return 'Eco Services';
      default: return '';
    }
  }

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={resetSection} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
           <ArrowLeft size={20} className="text-slate-600"/>
        </button>
        <h2 className="text-2xl font-bold text-slate-800 capitalize">
          {getSectionTitle()}
        </h2>
      </div>

      {activeSection === 'energy' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Electricity Usage (kWh)
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="kwh" stroke="#eab308" strokeWidth={3} fillOpacity={1} fill="url(#colorKwh)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Upload size={20} /> Electricity Bill AI
                </h3>
                <p className="text-yellow-100 text-sm mb-4">Upload bill photo to analyze usage.</p>
                <label className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform">
                  Upload Bill
                  <input type="file" className="hidden" onChange={(e) => handleBillUpload(e, 'electricity')} accept="image/*" />
                </label>
             </div>
          </div>

          {analyzingBill && (
             <div className="text-center py-4 text-slate-500 animate-pulse">Reading your bill...</div>
          )}

          {billAnalysis && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 animate-fadeIn">
              <h4 className="font-bold text-slate-800 mb-2">Analysis Report</h4>
              <p className="text-sm text-slate-600 mb-2"><strong>Detected Usage:</strong> {billAnalysis.usage || "N/A"}</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {billAnalysis.suggestions?.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeSection === 'water' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Water Usage (Liters)
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Upload size={20} /> Water Bill AI
                </h3>
                <p className="text-blue-100 text-sm mb-4">Upload water bill for analysis.</p>
                <label className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform">
                  Upload Bill
                  <input type="file" className="hidden" onChange={(e) => handleBillUpload(e, 'water')} accept="image/*" />
                </label>
             </div>
          </div>

          {analyzingBill && (
             <div className="text-center py-4 text-slate-500 animate-pulse">Reading your bill...</div>
          )}

          {billAnalysis && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 animate-fadeIn">
              <h4 className="font-bold text-slate-800 mb-2">Analysis Report</h4>
              <p className="text-sm text-slate-600 mb-2"><strong>Detected Usage:</strong> {billAnalysis.usage || "N/A"}</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {billAnalysis.suggestions?.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {activeSection === 'mobility' && (
        <div className="space-y-6 animate-fadeIn">
           <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Route Carbon Check</h3>
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute left-3 top-3.5 w-2 h-2 rounded-full bg-emerald-500"></div>
                  <input 
                    type="text" 
                    placeholder="Current Location" 
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    value={fromLoc}
                    onChange={(e) => setFromLoc(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3.5 w-2 h-2 rounded-full bg-red-500"></div>
                  <input 
                    type="text" 
                    placeholder="Destination" 
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    value={toLoc}
                    onChange={(e) => setToLoc(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleRouteCheck}
                  disabled={calculatingRoute}
                  className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {calculatingRoute ? 'Calculating...' : <><Navigation size={16} /> Compare Routes</>}
                </button>
              </div>
           </div>

           {mobilityData && (
             <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 animate-fadeIn">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-bold text-slate-800">Route Comparison</h4>
                    <p className="text-xs text-slate-400">{mobilityData.distance} • {mobilityData.trafficCondition}</p>
                  </div>
               </div>
               
               {/* Comparison Chart */}
               <div className="flex justify-between items-end h-40 px-4 gap-2 mb-8 border-b border-slate-100 pb-8">
                  {/* Car */}
                  <div className="flex flex-col items-center w-1/4 group">
                    <div className="text-xs font-bold text-red-500 mb-1">{mobilityData.car?.co2}kg</div>
                    <div className="w-full bg-red-100 rounded-t-xl relative h-full flex items-end justify-center overflow-hidden">
                       <div className="w-full bg-red-400 transition-all duration-1000" style={{height: '100%'}}></div>
                    </div>
                    <div className="mt-2 flex flex-col items-center text-slate-600">
                      <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                        <Car size={16} />
                      </div>
                      <span className="text-[10px] font-medium mt-1">Car</span>
                    </div>
                  </div>

                  {/* Auto */}
                   <div className="flex flex-col items-center w-1/4">
                    <div className="text-xs font-bold text-orange-600 mb-1">{mobilityData.auto?.co2}kg</div>
                     <div className="w-full bg-orange-100 rounded-t-xl relative h-full flex items-end justify-center overflow-hidden">
                       <div className="w-full bg-orange-400 transition-all duration-1000" style={{height: `${(mobilityData.auto?.co2 / mobilityData.car?.co2) * 100}%`}}></div>
                    </div>
                    <div className="mt-2 flex flex-col items-center text-slate-600">
                      <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                        <Zap size={16} />
                      </div>
                      <span className="text-[10px] font-medium mt-1">Auto</span>
                    </div>
                  </div>

                  {/* Bus */}
                  <div className="flex flex-col items-center w-1/4">
                    <div className="text-xs font-bold text-yellow-600 mb-1">{mobilityData.bus?.co2}kg</div>
                     <div className="w-full bg-yellow-100 rounded-t-xl relative h-full flex items-end justify-center overflow-hidden">
                       <div className="w-full bg-yellow-400 transition-all duration-1000" style={{height: `${(mobilityData.bus?.co2 / mobilityData.car?.co2) * 100}%`}}></div>
                    </div>
                    <div className="mt-2 flex flex-col items-center text-slate-600">
                      <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-lg">
                        <Bus size={16} />
                      </div>
                      <span className="text-[10px] font-medium mt-1">Bus</span>
                    </div>
                  </div>

                  {/* Walk/Cycle */}
                  <div className="flex flex-col items-center w-1/4">
                    <div className="text-xs font-bold text-emerald-600 mb-1">{mobilityData.walk?.co2}kg</div>
                     <div className="w-full bg-emerald-100 rounded-t-xl relative h-full flex items-end justify-center overflow-hidden">
                       <div className="w-full bg-emerald-500 transition-all duration-1000" style={{height: '5%'}}></div>
                    </div>
                    <div className="mt-2 flex flex-col items-center text-slate-600">
                      <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                        <Footprints size={16} />
                      </div>
                      <span className="text-[10px] font-medium mt-1">Walk</span>
                    </div>
                  </div>
               </div>

               {/* Detailed Stats with Vehicle Logos */}
               <div className="space-y-4">
                 <h5 className="font-bold text-slate-700 text-sm mb-2">Travel Options</h5>
                 
                 {/* Bus Detail with BMTC Style Logo */}
                 <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm text-white font-bold text-xs tracking-tighter">
                         BMTC
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{mobilityData.bus?.desc || "Route 500-D"}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Repeat size={10} /> {mobilityData.bus?.transfers} Transfers
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1">
                        <Clock size={14} /> {mobilityData.bus?.time}
                      </p>
                      <span className="text-xs text-emerald-600 font-bold">{mobilityData.bus?.co2}kg CO₂</span>
                    </div>
                 </div>

                 {/* Auto Detail with Auto Logo */}
                 <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-black">
                         <span className="text-xl">🛺</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{mobilityData.auto?.desc || "Auto Rickshaw"}</p>
                        <p className="text-xs text-slate-500">Fast & Convenient</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1">
                        <Clock size={14} /> {mobilityData.auto?.time}
                      </p>
                      <span className="text-xs text-orange-600 font-bold">{mobilityData.auto?.co2}kg CO₂</span>
                    </div>
                 </div>

                 {/* Metro with Logo */}
                 <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                         <TrainFront size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Namma Metro</p>
                        <p className="text-xs text-slate-500">Purple Line</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1">
                        <Clock size={14} /> 25 mins
                      </p>
                      <span className="text-xs text-emerald-600 font-bold">0.4kg CO₂</span>
                    </div>
                 </div>

               </div>
               
               <div className="mt-6 bg-slate-800 text-white p-4 rounded-xl text-center shadow-lg">
                 <p className="text-sm font-medium">
                   Taking the <strong>Bus</strong> saves 
                   <span className="text-emerald-400 font-bold ml-1">
                     {(mobilityData.car?.co2 - mobilityData.bus?.co2).toFixed(1)}kg CO₂
                   </span>
                 </p>
                 <button className="mt-2 bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg font-bold">
                   Verify This Trip (+50 XP)
                 </button>
               </div>
             </div>
           )}
        </div>
      )}

      {activeSection === 'services' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-2">Local Green Services</h3>
            <p className="text-slate-500 text-sm mb-6">Verified professionals for your eco-needs.</p>
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                   <span className="text-xl">🚰</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Leak Fixer Pro</h4>
                  <p className="text-xs text-slate-500">Certified water-saving plumbers</p>
                </div>
                <button className="ml-auto text-white font-bold text-sm bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Call</button>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                   <Sun size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Solar Maintain</h4>
                  <p className="text-xs text-slate-500">Panel cleaning & repair</p>
                </div>
                <button className="ml-auto text-white font-bold text-sm bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">Call</button>
              </div>

               <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                   <Wrench size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Waste Pickup</h4>
                  <p className="text-xs text-slate-500">E-waste & large item disposal</p>
                </div>
                <button className="ml-auto text-white font-bold text-sm bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Book</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Track;