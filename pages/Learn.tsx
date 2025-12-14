import React, { useState } from 'react';
import Layout from '../components/Layout';
import { PlayCircle, BookOpen, Share2 } from 'lucide-react';

const Learn: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 1,
      title: "How Recycling Actually Works in India",
      duration: "5:20",
      thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=400&auto=format&fit=crop",
      category: "Video"
    },
    {
      id: 2,
      title: "Composting at Home: Zero Smell Guide",
      duration: "3:45",
      thumbnail: "https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?q=80&w=400&auto=format&fit=crop",
      category: "Video"
    }
  ];

  const blogs = [
    {
      id: 1,
      title: "5 Swaps for a Plastic-Free Kitchen",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop",
      summary: "Switching to steel, glass, and bamboo can save 5kg of plastic/year."
    },
    {
      id: 2,
      title: "Understanding E-Waste",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop",
      summary: "Don't throw away that old charger! Here is where it should go."
    }
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Knowledge Hub 🧠</h2>
        <p className="text-slate-500 text-sm">Learn how to make a real difference.</p>
      </div>

      {/* Featured Video */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg mb-8 relative group cursor-pointer aspect-video">
        {isPlaying ? (
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/OasbYWF4_S8?autoplay=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        ) : (
          <div onClick={() => setIsPlaying(true)} className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1526951521990-620dc14c2103?q=80&w=800&auto=format&fit=crop" 
              alt="Featured" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                 <PlayCircle size={36} className="text-white fill-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-5 w-full bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 block">Featured</span>
              <h3 className="text-white font-bold text-xl leading-tight">The Journey of a Plastic Bottle</h3>
            </div>
          </div>
        )}
      </div>

      {/* Video Shorts Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <PlayCircle size={20} className="text-red-500" />
          Watch & Learn
        </h3>
        <span className="text-xs text-emerald-600 font-bold">View All</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {videos.map(v => (
          <div key={v.id} className="min-w-[200px] snap-center bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="relative h-28">
              <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                {v.duration}
              </span>
            </div>
            <div className="p-3">
              <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug line-clamp-2">{v.title}</h4>
              <p className="text-xs text-slate-400">{v.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Blog Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-500" />
            Green Reads
          </h3>
        </div>

        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
               <img src={blog.image} alt={blog.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
               <div className="flex flex-col justify-between py-1">
                 <div>
                   <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                     {blog.readTime}
                   </span>
                   <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{blog.title}</h4>
                   <p className="text-xs text-slate-500 line-clamp-2">{blog.summary}</p>
                 </div>
                 <div className="flex gap-4 mt-2">
                   <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-1">
                     <Share2 size={12} /> Share
                   </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Learn;