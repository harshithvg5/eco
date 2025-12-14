import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplets, Zap, Trash2, Wind, Building2,
  Lightbulb, BarChart2, Gamepad2, Users,
  ScanLine, Map, ShoppingBag, Wrench, Shield,
  PiggyBank, CloudOff, Sparkles, Globe,
  Coins, Award, Ticket, FileBadge, ArrowRight,
  Leaf
} from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => navigate('/login');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Leaf size={20} />
            </div>
            <span className="text-xl font-bold text-emerald-900 tracking-tight">EcoSphere</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#impact" className="hover:text-emerald-600 transition-colors">Impact</a>
            <a href="#rewards" className="hover:text-emerald-600 transition-colors">Rewards</a>
          </div>
          <button
            onClick={handleStart}
            className="bg-emerald-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-emerald-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-emerald-50 rounded-bl-[100px] -z-10" />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Sustainability App
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              One app for a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                sustainable future
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
              Join millions of students and citizens in saving water, energy, and the planet.
              Track your impact, play games, and earn real rewards.
            </p>
            <div className="flex gap-4 pt-2">
              <button
                onClick={handleStart}
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all flex items-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </button>
              <button onClick={handleStart} className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors">
                Log In
              </button>
            </div>
          </div>

          <div className="relative animate-fadeIn delay-100">
            <div className="grid grid-cols-2 gap-4">
               <HeroCard icon={Droplets} label="Save Water" color="blue" />
               <HeroCard icon={Zap} label="Save Energy" color="yellow" />
               <HeroCard icon={Trash2} label="Manage Waste" color="green" />
               <HeroCard icon={Wind} label="Reduce Carbon" color="teal" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-2xl">
              <Building2 size={40} className="text-purple-500" />
            </div>
          </div>
        </div>
      </header>

      {/* How It Helps Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How EcoSphere Helps You</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We combine AI technology with gamification to make sustainability fun, easy, and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard icon={Lightbulb} title="AI Smart Tips" desc="Get personalized tips for daily habits" color="orange" />
            <FeatureCard icon={BarChart2} title="Track Usage" desc="Monitor water & electricity consumption" color="blue" />
            <FeatureCard icon={Gamepad2} title="Play & Earn" desc="Complete challenges and win rewards" color="purple" />
            <FeatureCard icon={Users} title="Community" desc="Join forces for local eco actions" color="emerald" />
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Everything you need to <br/> live sustainably</h2>
            <ul className="space-y-6">
               <ListItem icon={BarChart2} text="Track water & energy usage with AI analysis" />
               <ListItem icon={ScanLine} text="Scan waste to identify recyclables instantly" />
               <ListItem icon={Map} text="Find green public transport routes nearby" />
               <ListItem icon={ShoppingBag} text="Shop curated eco-friendly products" />
               <ListItem icon={Wrench} text="Connect with local eco-services & plumbers" />
               <ListItem icon={Shield} text="Report civic issues and become a Hero" />
            </ul>
          </div>
          <div className="relative">
             {/* Abstract phone or dashboard representation */}
             <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">CityGuard Hero</h3>
                    <p className="text-slate-400 text-sm">Report submitted successfully</p>
                  </div>
                  <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    +50 XP
                  </div>
                </div>
                <div className="space-y-3">
                   <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                   <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
                   <div className="h-32 bg-slate-100 rounded-xl w-full mt-4"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
           <h2 className="text-3xl md:text-4xl font-bold mb-12">Your Actions Matter</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             <ImpactStat icon={PiggyBank} label="Lower Bills" value="20%" />
             <ImpactStat icon={CloudOff} label="Less Pollution" value="-15%" />
             <ImpactStat icon={Sparkles} label="Cleaner Cities" value="10k+" />
             <ImpactStat icon={Globe} label="Real Impact" value="Global" />
           </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 bg-yellow-100 text-yellow-600 rounded-full mb-6">
            <Coins size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get Rewarded for Doing Good 🎁</h2>
          <p className="text-slate-500 mb-12">Earn EcoCoins for every sustainable action and redeem them for real-world benefits.</p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
             <RewardCard icon={Coins} title="EcoCoins" desc="Virtual currency earned by tracking habits and completing challenges." />
             <RewardCard icon={Award} title="Badges & Levels" desc="Climb the leaderboard and show off your achievements." />
             <RewardCard icon={Ticket} title="Discounts & Coupons" desc="Unlock exclusive deals on eco-friendly products." />
             <RewardCard icon={FileBadge} title="Certificates" desc="Get official recognition for your contribution to the planet." />
          </div>
          
          <div className="mt-12">
            <button
              onClick={handleStart}
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:bg-slate-800 hover:scale-105 transition-all"
            >
              Start Using EcoSphere
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Leaf size={20} />
            </div>
            <span className="text-xl font-bold text-emerald-900">EcoSphere</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 EcoSphere. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <Globe size={20} className="hover:text-emerald-600 cursor-pointer" />
            <Users size={20} className="hover:text-emerald-600 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

// Components

const HeroCard = ({ icon: Icon, label, color }: any) => {
  const colors: any = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    teal: "bg-teal-100 text-teal-600",
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colors[color]}`}>
        <Icon size={28} />
      </div>
      <span className="font-bold text-slate-700">{label}</span>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => {
  const colors: any = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    emerald: "bg-emerald-100 text-emerald-600",
  };
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow text-center">
      <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${colors[color]}`}>
        <Icon size={32} />
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

const ListItem = ({ icon: Icon, text }: any) => (
  <li className="flex items-center gap-4 text-slate-700 text-lg font-medium">
    <div className="p-3 bg-white border border-slate-200 rounded-xl text-emerald-600 shadow-sm">
      <Icon size={24} />
    </div>
    {text}
  </li>
);

const ImpactStat = ({ icon: Icon, label, value }: any) => (
  <div className="flex flex-col items-center">
    <div className="text-emerald-300 mb-3 opacity-80">
      <Icon size={40} />
    </div>
    <div className="text-4xl font-extrabold mb-1">{value}</div>
    <div className="text-emerald-200 font-medium">{label}</div>
  </div>
);

const RewardCard = ({ icon: Icon, title, desc }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
    <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-bold text-slate-800 text-lg mb-1">{title}</h4>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  </div>
);

export default Landing;