import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Camera, MapPin, CheckCircle } from 'lucide-react';

const Heroes: React.FC = () => {
  const [reportStep, setReportStep] = useState(1); // 1: Upload, 2: Location, 3: Success

  const handleReport = () => {
    // Mock submission
    setReportStep(2);
    setTimeout(() => setReportStep(3), 1500);
  };

  return (
    <Layout>
      <div className="bg-slate-900 text-white p-6 rounded-3xl mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">CityGuard Heroes</h2>
          <p className="text-slate-400 text-sm">Report issues, fix your city, become a legend.</p>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500 rounded-full blur-2xl opacity-20"></div>
      </div>

      {reportStep === 3 ? (
        <div className="flex flex-col items-center justify-center py-10 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
            <CheckCircle size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Report Submitted!</h3>
          <p className="text-slate-500 text-center max-w-xs mt-2">
            Thank you, Hero! Our AI is verifying the issue. You will receive 50 EcoCoins once verified.
          </p>
          <button 
            onClick={() => setReportStep(1)}
            className="mt-6 bg-slate-900 text-white px-6 py-2 rounded-xl font-bold"
          >
            Report Another
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-2">Report a Civic Issue</h3>
            <div className="flex gap-2 mb-4">
               {['Pothole', 'Garbage', 'Water Leak', 'Broken Light'].map(type => (
                 <button key={type} className="border border-slate-200 px-3 py-1 rounded-full text-xs text-slate-600 hover:bg-slate-50">
                   {type}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100">
                 <Camera size={24} className="mb-2" />
                 <span className="text-xs font-bold">Before Photo</span>
              </div>
              <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 opacity-50">
                 <Camera size={24} className="mb-2" />
                 <span className="text-xs font-bold">After (Optional)</span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl flex items-center gap-3 text-blue-800 text-sm mb-6">
               <MapPin size={18} />
               <span>Using current location</span>
            </div>

            <button 
              onClick={handleReport}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              {reportStep === 1 ? 'Submit Report' : 'Verifying...'}
            </button>
          </div>
        </div>
      )}

      {/* Community Feed with Real Problem Images */}
      <h3 className="font-bold text-slate-800 mb-4 mt-8 text-lg">Recent Issues in Your Area</h3>
      <div className="space-y-4">
           {/* Report 1 */}
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">AM</div>
               <div>
                 <p className="text-sm font-bold text-slate-800">Garbage Dump Cleared</p>
                 <p className="text-xs text-slate-400">2 hours ago • Indiranagar</p>
               </div>
               <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-bold">Solved</span>
             </div>
             <div className="h-40 bg-slate-100 rounded-xl mb-3 overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=400&auto=format&fit=crop" alt="Garbage Problem" className="w-full h-full object-cover" />
               <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">Before</div>
             </div>
             <div className="flex gap-4">
                <button className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  👍 24 Appreciations
                </button>
             </div>
           </div>

           {/* Report 2 */}
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-600">RK</div>
               <div>
                 <p className="text-sm font-bold text-slate-800">Dangerous Pothole</p>
                 <p className="text-xs text-slate-400">5 hours ago • MG Road</p>
               </div>
               <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg font-bold">Pending</span>
             </div>
             <div className="h-40 bg-slate-100 rounded-xl mb-3 overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=400&auto=format&fit=crop" alt="Pothole" className="w-full h-full object-cover" />
             </div>
             <div className="flex gap-4">
                <button className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  ⚠️ 12 People Verified
                </button>
             </div>
           </div>
      </div>
    </Layout>
  );
};

export default Heroes;