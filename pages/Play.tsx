import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Trophy, Flame, Target, RotateCcw, CheckCircle2, XCircle, Heart, Timer } from 'lucide-react';
import { useApp } from '../context/AppContext';

type ItemType = 'Wet' | 'Dry' | 'Recycle';

interface GameItem {
  id: number;
  emoji: string;
  name: string;
  type: ItemType;
  fact: string;
}

const ITEMS: GameItem[] = [
  { id: 1, emoji: '🍌', name: 'Banana Peel', type: 'Wet', fact: 'Banana peels decompose in 2-10 days!' },
  { id: 2, emoji: '🥤', name: 'Plastic Cup', type: 'Recycle', fact: 'Plastic can be recycled into fabric.' },
  { id: 3, emoji: '🍕', name: 'Greasy Pizza Box', type: 'Wet', fact: 'Oil makes cardboard unrecyclable. Compost it!' },
  { id: 4, emoji: '📰', name: 'Newspaper', type: 'Recycle', fact: 'Paper can be recycled 5-7 times.' },
  { id: 5, emoji: '🥛', name: 'Milk Packet', type: 'Recycle', fact: 'Clean milk packets are highly recyclable.' },
  { id: 6, emoji: '🦴', name: 'Chicken Bone', type: 'Wet', fact: 'Bones are organic waste.' },
  { id: 7, emoji: '🔋', name: 'Battery', type: 'Dry', fact: 'Batteries are E-Waste/Hazardous.' },
];

const Play: React.FC = () => {
  const { user, addEcoCoins } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying && !gameOver && !feedback && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      addEcoCoins(score);
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameOver, feedback, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLives(3);
    setTimeLeft(30);
    setCurrentItemIndex(0);
    setGameOver(false);
    setFeedback(null);
  };

  const handleGuess = (guess: ItemType) => {
    const item = ITEMS[currentItemIndex];
    const isCorrect = item.type === guess || (guess === 'Dry' && item.type === 'Recycle'); 

    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback({ correct: true, message: `Correct! ${item.fact}` });
    } else {
      setLives(l => l - 1);
      if (lives <= 1) {
        setGameOver(true);
        addEcoCoins(score);
      }
      setFeedback({ correct: false, message: `Oops! It's ${item.type}.` });
    }
  };

  const nextItem = () => {
    setFeedback(null);
    if (currentItemIndex < ITEMS.length - 1) {
      setCurrentItemIndex(p => p + 1);
    } else {
      setGameOver(true);
      addEcoCoins(score);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Eco Arcade 🎮</h2>
           <p className="text-slate-500 text-sm">Play games, learn, & earn coins.</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-orange-500 font-bold">
            <Flame size={20} fill="currentColor" />
            <span>{user?.streak} Day Streak!</span>
          </div>
        </div>
      </div>

      {/* Game Card */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden min-h-[460px] flex flex-col items-center">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>

        {!isPlaying ? (
          <div className="relative z-10 animate-fadeIn text-center my-auto">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm shadow-inner border border-white/5">
               <Target size={48} className="text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Waste Sorter</h3>
            <p className="text-slate-300 mb-8 max-w-xs mx-auto text-sm">
              Sort items into the correct bins. Be quick!
              <br/><span className="text-emerald-400 font-bold mt-2 block">3 Lives • 30 Seconds</span>
            </p>
            <button 
              onClick={startGame}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Start Playing
            </button>
          </div>
        ) : gameOver ? (
          <div className="relative z-10 animate-fadeIn text-center my-auto">
            <Trophy size={64} className="text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
            <div className="bg-white/10 p-4 rounded-xl mb-6">
               <p className="text-3xl font-bold text-emerald-400">{score} XP</p>
               <p className="text-slate-300 text-xs mt-1">Total Score</p>
            </div>
            <button 
              onClick={startGame}
              className="flex items-center gap-2 mx-auto bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        ) : (
          <div className="relative z-10 w-full flex flex-col h-full justify-between">
            {/* HUD */}
            <div className="flex justify-between items-center w-full mb-8">
              <span className="text-sm font-bold text-slate-300">Item {currentItemIndex + 1}/{ITEMS.length}</span>
              <span className="text-sm font-bold text-emerald-400">{score} XP</span>
            </div>

            {/* Main Game Item */}
            <div className="flex-1 flex flex-col items-center justify-center mb-8">
               <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 w-full border border-white/10 text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-2 right-3 flex items-center gap-1 text-xs text-slate-400">
                    <Timer size={12} /> {timeLeft}s
                  </div>
                  <div className="absolute top-2 left-3 flex items-center gap-1 text-xs text-red-400">
                    <Heart size={12} fill="currentColor" /> {lives}
                  </div>
                  
                  <div className="text-7xl mb-6 animate-bounce mt-4">{ITEMS[currentItemIndex].emoji}</div>
                  <h4 className="text-xl font-bold text-white">{ITEMS[currentItemIndex].name}</h4>
               </div>
            </div>

            {/* Feedback Overlay or Buttons */}
            {feedback ? (
              <div className="animate-fadeIn w-full bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className={`flex items-center justify-center gap-2 font-bold mb-1 ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                   {feedback.correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                   {feedback.correct ? 'Excellent!' : 'Wrong Bin!'}
                </div>
                <p className="text-sm text-slate-400 text-center mb-3">{feedback.message}</p>
                <button onClick={nextItem} className="w-full bg-white text-slate-900 px-4 py-2 rounded-lg font-bold">
                   Next Item
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 w-full">
                <button onClick={() => handleGuess('Wet')} className="bg-green-600 hover:bg-green-500 border-b-4 border-green-800 active:border-b-0 active:translate-y-1 py-4 rounded-xl font-bold text-sm transition-all flex flex-col items-center">
                  <span className="text-xl mb-1">🍏</span> Wet
                </button>
                <button onClick={() => handleGuess('Recycle')} className="bg-blue-600 hover:bg-blue-500 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 py-4 rounded-xl font-bold text-sm transition-all flex flex-col items-center">
                  <span className="text-xl mb-1">♻️</span> Recycle
                </button>
                <button onClick={() => handleGuess('Dry')} className="bg-red-600 hover:bg-red-500 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 py-4 rounded-xl font-bold text-sm transition-all flex flex-col items-center">
                  <span className="text-xl mb-1">🗑️</span> Dry
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Play;