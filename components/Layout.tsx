import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, Gamepad2, ShoppingCart, ShieldCheck, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'track', icon: BarChart2, label: 'Track', path: '/track' },
    { id: 'play', icon: Gamepad2, label: 'Play', path: '/play' },
    { id: 'learn', icon: BookOpen, label: 'Learn', path: '/learn' },
    { id: 'shop', icon: ShoppingCart, label: 'Shop', path: '/shop' },
  ];

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20 max-w-lg mx-auto shadow-2xl overflow-hidden border-x border-slate-200">
      <header className="bg-emerald-600 text-white p-4 sticky top-0 z-20 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-lg">E</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">EcoSphere</h1>
        </div>
        {user && (
          <div className="flex items-center gap-2 bg-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
            <span>🪙 {user.ecoCoins}</span>
          </div>
        )}
      </header>

      <main className="p-4 overflow-y-auto h-[calc(100vh-140px)] scroll-smooth">
        {children}
      </main>

      <nav className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 z-20 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrent(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                  active ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-[10px] mt-1 ${active ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;