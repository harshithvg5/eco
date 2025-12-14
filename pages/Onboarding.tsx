import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserInterest } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

const Onboarding: React.FC = () => {
  const { completeOnboarding, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ageGroup: '',
    interests: [] as UserInterest[],
    gender: '',
    locationPermission: false
  });

  const handleInterestToggle = (interest: UserInterest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const finish = () => {
    completeOnboarding(formData);
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Setup Profile</h2>
        <span className="text-emerald-600 font-semibold">Step {step}/3</span>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-slate-600 font-medium mb-3">How old are you?</label>
              <div className="grid grid-cols-2 gap-3">
                {['Under 13', '13–15', '16–18', '18+'].map(age => (
                  <button
                    key={age}
                    onClick={() => setFormData({...formData, ageGroup: age})}
                    className={`p-4 rounded-xl border-2 font-medium transition-all ${
                      formData.ageGroup === age 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-slate-600 font-medium mb-3">Gender (Optional)</label>
              <div className="flex gap-3">
                {['Boy', 'Girl', 'Prefer not to say'].map(gen => (
                  <button
                    key={gen}
                    onClick={() => setFormData({...formData, gender: gen})}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      formData.gender === gen 
                        ? 'bg-slate-800 text-white border-slate-800' 
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <label className="block text-slate-600 font-medium">What are you interested in?</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(UserInterest).map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <span className="font-medium">{interest}</span>
                  {formData.interests.includes(interest) 
                    ? <CheckCircle2 size={20} className="text-emerald-500" />
                    : <Circle size={20} className="text-slate-300" />
                  }
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Enable Location?</h3>
              <p className="text-slate-500 text-sm mb-6">
                We use your location to find nearby recycling centers, public transport, and local challenges.
              </p>
              
              <div className="flex flex-col gap-3">
                 <button
                    onClick={() => setFormData({...formData, locationPermission: true})}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      formData.locationPermission 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {formData.locationPermission ? 'Location Enabled!' : 'Allow Location'}
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, locationPermission: false})}
                    className="text-slate-400 text-sm"
                  >
                    Skip for now
                  </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => step < 3 ? setStep(step + 1) : finish()}
        className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg mt-6 active:scale-95 transition-transform"
      >
        {step === 3 ? "Let's Go!" : "Next"}
      </button>
    </div>
  );
};

export default Onboarding;