import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Product, UserInterest } from '../types';
import { Leaf, Wrench, Sun } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neem Wood Toothbrush Set',
    category: 'Eco',
    price: 199,
    ecoImpact: 'Saves 500g plastic',
    points: 120,
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb6dcaf?q=80&w=800&auto=format&fit=crop',
    recommended: true
  },
  {
    id: '5',
    name: 'Khadir Self-Watering Pot',
    category: 'Tech',
    price: 899,
    ecoImpact: 'Saves Water',
    points: 300,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Desi Recycled Notebook',
    category: 'Books',
    price: 85,
    ecoImpact: '100% Recycled Paper',
    points: 80,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Copper Water Bottle',
    category: 'Eco',
    price: 999,
    ecoImpact: 'Lifetime Use',
    points: 450,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-11115cdbf69c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Upcycled Saree Tote',
    category: 'Eco',
    price: 450,
    ecoImpact: 'Textile Waste Saved',
    points: 300,
    imageUrl: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=800&auto=format&fit=crop'
  }
];

const Shop: React.FC = () => {
  const { user } = useApp();

  const sortedProducts = [...MOCK_PRODUCTS].sort((a, b) => {
    const aMatch = user?.interests.includes(a.category as UserInterest);
    const bMatch = user?.interests.includes(b.category as UserInterest);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return (
    <Layout>
      <div className="bg-emerald-50 p-6 rounded-3xl mb-6 text-center shadow-sm border border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-900 mb-1">Eco Marketplace</h2>
        <p className="text-emerald-700 text-sm">Shop Indian sustainable brands.</p>
        <div className="inline-block bg-white px-4 py-2 rounded-full mt-4 shadow-sm border border-emerald-100">
          <span className="font-bold text-emerald-600">You have 🪙 {user?.ecoCoins}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        {sortedProducts.map(product => (
          <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
            <div className="relative aspect-square w-full bg-slate-100">
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              {user?.interests.includes(product.category as UserInterest) && (
                <span className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10">
                  FOR YOU
                </span>
              )}
              <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-emerald-800 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm z-10 border border-emerald-100">
                 <Leaf size={12} className="text-emerald-600" /> {product.ecoImpact}
              </span>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="font-bold text-slate-800 text-xl leading-tight w-2/3">{product.name}</h3>
                 <div className="flex flex-col items-end">
                    <span className="font-bold text-slate-900 text-xl">₹{product.price}</span>
                    <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-lg mt-1">+{product.points} Coins</span>
                 </div>
               </div>
               
               <button className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg active:scale-95">
                 Add to Cart
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Services Section - Separate Section */}
      <div className="bg-slate-900 -mx-4 px-6 py-10 pb-24 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-yellow-400 rounded-lg text-slate-900">
            <Wrench size={20} />
          </div>
          <h3 className="font-bold text-white text-xl">Local Green Services</h3>
        </div>
        
        <p className="text-slate-400 text-sm mb-6">Verified professionals for your eco-needs.</p>
        
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-700 flex items-center gap-4 hover:bg-slate-750 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
               <span className="text-xl">🚰</span>
            </div>
            <div>
              <h4 className="font-bold text-white">Leak Fixer Pro</h4>
              <p className="text-xs text-slate-400">Certified water-saving plumbers</p>
            </div>
            <button className="ml-auto text-slate-900 font-bold text-sm bg-blue-400 hover:bg-blue-300 px-4 py-2 rounded-lg transition-colors">Call</button>
          </div>
          
          <div className="bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-700 flex items-center gap-4 hover:bg-slate-750 transition-colors">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400">
               <Sun size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white">Solar Maintain</h4>
              <p className="text-xs text-slate-400">Panel cleaning & repair</p>
            </div>
            <button className="ml-auto text-slate-900 font-bold text-sm bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-lg transition-colors">Call</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;