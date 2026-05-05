/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  FlaskConical, 
  Zap, 
  Flame, 
  Info, 
  Settings,
  ArrowDownUp,
  Droplets,
  Gem,
  Coins,
  ChevronDown,
  History,
  Wallet
} from "lucide-react";

// Real token addresses for mainnet
const ESSENCES = [
  { id: 'eth', name: 'Stellar Ether', icon: Sparkles, color: 'text-blue-400', address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', decimals: 18 },
  { id: 'usdc', name: 'Moon Essence', icon: Moon, color: 'text-indigo-300', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6 },
  { id: 'dodo', name: 'Magic Dodo', icon: Zap, color: 'text-yellow-400', address: '0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd', decimals: 18 },
  { id: 'wbtc', name: 'Ancient Gold', icon: Coins, color: 'text-orange-400', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', decimals: 8 },
];

export default function App() {
  const { address, isConnected, isConnecting, chainId } = useAccount();
  const { connect, connectors, error: connectError, status } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (connectError) {
      console.error("Alchemy Connection Error:", connectError);
      // Only alert on explicit errors, not just cancellations if possible
      if (!connectError.message.toLowerCase().includes('user rejected')) {
        alert(`The mystical connection was interrupted: ${connectError.message}`);
      }
    }
  }, [connectError]);

  // Debugging log to see what connectors are available
  useEffect(() => {
    console.log("Available Alchemical Portals (Connectors):", connectors.map(c => c.name));
  }, [connectors]);

  const [fromEssence, setFromEssence] = useState(ESSENCES[0]);
  const [toEssence, setToEssence] = useState(ESSENCES[1]);
  const [amount, setAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState<string | null>(null);
  const [isMixing, setIsMixing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [showTokenSelect, setShowTokenSelect] = useState<'from' | 'to' | null>(null);

  // Fetch quote from DODO API
  const fetchQuote = useCallback(async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setQuoteAmount(null);
      return;
    }

    setLoadingQuote(true);
    try {
      // In a real app, you'd use a more robust fetching method and handle CORS
      // For this demo, we simulate the API call to show how it would integrate with DODO
      const fromAmount = (parseFloat(amount) * Math.pow(10, fromEssence.decimals)).toString();
      
      // Simulate DODO API delay and logic
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock exchange rates for demo purposes since we can't reliably call external APIs directly in some preview environments
      const rates: Record<string, number> = {
        'eth-usdc': 2400,
        'usdc-eth': 1/2400,
        'dodo-usdc': 0.12,
        'usdc-dodo': 1/0.12,
        'eth-dodo': 20000,
        'dodo-eth': 1/20000,
        'wbtc-usdc': 65000,
        'usdc-wbtc': 1/65000,
        'eth-wbtc': 0.036,
        'wbtc-eth': 1/0.036
      };

      const pair = `${fromEssence.id}-${toEssence.id}`;
      const revPair = `${toEssence.id}-${fromEssence.id}`;
      const rate = rates[pair] || (rates[revPair] ? 1 / rates[revPair] : 1);
      
      setQuoteAmount((parseFloat(amount) * rate * 0.995).toFixed(6)); // 0.5% slippage/magic tax
    } catch (error) {
      console.error("Mystic failed:", error);
    } finally {
      setLoadingQuote(false);
    }
  }, [amount, fromEssence, toEssence]);

  useEffect(() => {
    const timer = setTimeout(fetchQuote, 500);
    return () => clearTimeout(timer);
  }, [fetchQuote]);

  const handleMix = () => {
    if (!amount) return;
    if (!isConnected) {
      alert("Please connect your soul (wallet) before transmuted ingredients.");
      return;
    }
    setIsMixing(true);
    setTimeout(() => {
      setIsMixing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 3000);
  };

  const swapDirections = () => {
    setFromEssence(toEssence);
    setToEssence(fromEssence);
  };

  const [showRealWidget, setShowRealWidget] = useState(false);

  const dodoWidgetUrl = `https://app.dodoex.io/widget?network=mainnet&from=${fromEssence.address}&to=${toEssence.address}&theme=dark&apikey=e39c3b4106d07edaa1&referral=0xE46ab5f9092350F55D12f0Cf346D4e6017C875f2&feeRate=0.0018`;

  useEffect(() => {
    console.log("Mystic Swap Heartbeat: Component Mounted");
    const interval = setInterval(() => {
      console.log("Mystic Swap Heartbeat: Alive at " + new Date().toLocaleTimeString());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="mystic-swap-root"
      className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#0A0510] font-sans overflow-y-auto"
    >
      <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-[10px] z-[9999] text-center font-bold">
        MYSTIC SWAP IS LIVE
      </div>

      {/* Background Decor - Hidden temporarily */}


      {/* Background Pattern - Mystical Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#B794F4 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Mystical Overlay */}
      <div className="absolute inset-0 bg-[#1A1025]/40 backdrop-brightness-75 pointer-events-none" />

      {/* Floating Magic Assets - Hidden temporarily */}


      {/* Main Alchemist Mascot - Hidden temporarily for diagnosis */}
      {/* <motion.div ... mascot code ... </motion.div> */}


      {/* Navbar Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <div className="bg-magic-purple/30 p-2.5 rounded-2xl border border-white/20 backdrop-blur-md">
            <FlaskConical className="text-white drop-shadow-sm" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Mystic Swap</h1>
            <p className="text-[10px] font-bold text-magic-pink uppercase tracking-[0.3em]">Mystical Dex Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shadow-2xl">
          <button className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-2xl border border-white/20 backdrop-blur-md transition-all">
            <History size={18} className="text-purple-200" />
            <span className="text-sm font-medium text-white">Records</span>
          </button>
          <button 
            onClick={() => {
              if (isConnected) {
                disconnect();
              } else {
                console.log("Attempting to connect soul...");
                if (connectors.length === 0) {
                  alert("No mystical portals (wallets) found in this realm. Please ensure a wallet extension is active.");
                  return;
                }
                const connector = connectors.find(c => c.id === 'injected') || connectors[0];
                connect({ connector });
              }
            }}
            disabled={isConnecting || status === 'pending'}
            className="flex items-center gap-2 bg-gradient-to-r from-magic-purple to-magic-pink px-5 py-2.5 rounded-2xl border border-white/30 text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wallet size={18} className={isConnecting ? 'animate-bounce' : ''} />
            <span className="text-sm">
              {isConnecting ? 'Summoning...' : (isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Soul')}
            </span>
          </button>
          
          {isConnected && chainId !== 1 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => switchChain?.({ chainId: 1 })}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/30 backdrop-blur-md"
            >
              Switch to Mainnet
            </motion.button>
          )}
        </div>
      </div>

      {/* The Mystic Mixer Centerpiece */}
      <div 
        className="relative z-20 w-full max-w-md mx-4 my-20"
      >

        <div className="magic-glass rounded-[2rem] p-7 md:p-9 relative border border-white/30 ring-1 ring-black/5 shadow-2xl">

          {/* Internal Glow Decor */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-magic-pink/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-magic-blue/20 rounded-full blur-3xl pointer-events-none" />

          {/* Mixer Controls */}
          <div className="space-y-3 relative">
            {/* From Token Block */}
            <div className="bg-black/20 border border-white/10 rounded-3xl p-5 transition-all group hover:border-purple-300/40 hover:bg-black/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold text-purple-200 uppercase tracking-widest opacity-70">Ingredient Base</span>
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-purple-100 font-medium tracking-tight">Active</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  placeholder="0.0"
                  className="bg-transparent border-none text-4xl font-bold w-full focus:outline-none placeholder-white/20 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button 
                  onClick={() => setShowTokenSelect('from')}
                  className="flex items-center gap-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-white/10 p-2 pr-4 rounded-2xl transition-all h-fit shadow-inner"
                >
                  <div className={`p-2 rounded-xl bg-black/30 shadow-inner group-hover:scale-110 transition-transform`}>
                    <fromEssence.icon className={fromEssence.color} size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white tracking-widest leading-none">{fromEssence.id.toUpperCase()}</p>
                    <ChevronDown size={14} className="text-purple-300 opacity-60 mt-0.5" />
                  </div>
                </button>
              </div>
            </div>

            {/* Central Switch Arc */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 py-1">
              <motion.button 
                whileHover={{ rotate: 180, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapDirections}
                className="bg-[#1A1025] border-[6px] border-[#251833] p-2.5 rounded-2xl text-magic-blue shadow-[0_0_20px_rgba(99,179,237,0.3)] hover:text-white transition-colors"
              >
                <ArrowDownUp size={22} />
              </motion.button>
            </div>

            {/* To Token Block */}
            <div className="bg-black/20 border border-white/10 rounded-3xl p-5 transition-all group hover:border-pink-300/40 hover:bg-black/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold text-pink-200 uppercase tracking-widest opacity-70">Transmuted Elixir</span>
                {loadingQuote && (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-pink-300"
                  >
                    <Sparkles size={14} />
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col w-full">
                  <input 
                    type="text" 
                    readOnly 
                    placeholder="0.0"
                    className="bg-transparent border-none text-4xl font-bold w-full focus:outline-none placeholder-white/10 text-white cursor-default"
                    value={quoteAmount || ""}
                  />
                  {amount && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-[10px] text-pink-300/60 font-medium mt-1"
                    >
                      ~ $ {(parseFloat(amount) * 2400).toLocaleString()} Value
                    </motion.p>
                  )}
                </div>
                <button 
                   onClick={() => setShowTokenSelect('to')}
                   className="flex items-center gap-2.5 bg-pink-500/10 hover:bg-pink-500/20 border border-white/10 p-2 pr-4 rounded-2xl transition-all h-fit shadow-inner"
                >
                  <div className={`p-2 rounded-xl bg-black/30 shadow-inner group-hover:scale-110 transition-transform`}>
                    <toEssence.icon className={toEssence.color} size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white tracking-widest leading-none">{toEssence.id.toUpperCase()}</p>
                    <ChevronDown size={14} className="text-pink-300 opacity-60 mt-0.5" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mixing Settings Summary */}
          <div className="mt-7 flex items-center justify-between px-3 text-[10px] text-purple-200/50 font-bold uppercase tracking-widest">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5"><Zap size={10} /> Sacrifice: 0.001 ✨</span>
              <span className="flex items-center gap-1.5"><Flame size={10} /> Heat Index: 0.5%</span>
            </div>
            <div className="text-right flex flex-col gap-1 items-end">
               <span className="flex items-center gap-1.5">Route: DODO Magic <Gem size={10} /></span>
               <span className="flex items-center gap-1.5">Est. Time: 3 Moons <Moon size={10} /></span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              onClick={handleMix}
              disabled={isMixing || !amount}
              className={`w-full py-5 rounded-[1.5rem] font-bold text-xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-3 overflow-hidden relative group border-t border-white/20
                ${isMixing ? 'bg-purple-900/40 cursor-not-allowed grayscale' : 'bg-gradient-to-br from-magic-purple via-magic-pink to-magic-purple bg-[length:200%_auto] animate-gradient-shift text-white hover:shadow-[0_20px_40px_-5px_rgba(183,148,244,0.4)]'}
              `}
            >
              {isMixing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <FlaskConical size={26} className="text-white" />
                    <motion.div 
                      className="absolute inset-0 bg-white rounded-full blur-md opacity-30"
                      animate={{ scale: [1, 2, 1] }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                  <span className="z-10 tracking-tight">Transmuting Essences...</span>
                </>
              ) : (
                <>
                  <Sparkles size={26} className="group-hover:rotate-12 transition-transform" />
                  <span className="z-10 tracking-tight">Mix Alchemical Elixir</span>
                </>
              )}

              {/* Liquid Progress Fill */}
              {isMixing && (
                <motion.div 
                  className="absolute bottom-0 left-0 top-0 bg-white/20 z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              )}
            </motion.button>
          </div>

          {/* Success Overlay Modal */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                className="absolute inset-0 rounded-[2rem] overflow-hidden z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-green-500/90 backdrop-blur-xl flex flex-col items-center justify-center text-white p-8 text-center">
                  <motion.div
                    initial={{ rotate: -45, scale: 0, y: 50 }}
                    animate={{ rotate: 0, scale: 1.3, y: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                    className="relative"
                  >
                    <Gem size={96} className="drop-shadow-[0_0_30px_rgba(255,255,255,0.7)]" />
                    <motion.div 
                      className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <h2 className="text-3xl font-black mt-10 tracking-tight">Gold Created!</h2>
                  <p className="text-lg font-medium opacity-90 mt-4 leading-relaxed max-w-[200px]">
                    The spirits have granted your request. Your elixir is pure.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 bg-white text-green-600 px-8 py-3 rounded-[1.2rem] font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                  >
                    Next Brew
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DODO Branding - The "Soul" of the machine */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <motion.div 
            className="flex items-center gap-3 px-5 py-2.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl group hover:border-magic-purple/50 transition-all cursor-help"
            whileHover={{ y: -5 }}
          >
            <div className="relative">
              <img 
                src="https://app.dodoex.io/favicon.png" 
                alt="DODO" 
                className="w-6 h-6 z-10 relative rounded-full" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/DODOEX/dodo-assets/master/logo/dodo-white.png";
                }}
              />
              <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-40 group-hover:opacity-80 transition-opacity" />
            </div>
            <div className="text-left border-l border-white/10 pl-3">
              <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-1">Execution Core</p>
              <p className="text-xs font-bold text-white tracking-widest leading-none">DODO FINANCE</p>
            </div>
          </motion.div>
          <div className="flex gap-4 opacity-40">
             <div className="w-1.5 h-1.5 rounded-full bg-magic-purple animate-ping" />
             <div className="w-1.5 h-1.5 rounded-full bg-magic-pink animate-ping [animation-delay:0.3s]" />
             <div className="w-1.5 h-1.5 rounded-full bg-magic-blue animate-ping [animation-delay:0.6s]" />
          </div>
        </div>
      </div>


      {/* Side Decorative Elements: The High Alchemist's Props */}
      <div className="fixed top-1/2 left-6 -translate-y-1/2 hidden xl:flex flex-col gap-5 pointer-events-none opacity-20">
         {[Zap, Moon, Sun, Gem, FlaskConical, Droplets, Sparkles].map((Icon, idx) => (
           <motion.div
             key={idx}
             animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
             transition={{ duration: 10 + idx, repeat: Infinity, ease: "linear" }}
             className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
           >
             <Icon size={32} className="text-white" />
           </motion.div>
         ))}
      </div>

      {/* Token Select Modal (Simulated) */}
      <AnimatePresence>
        {showTokenSelect && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTokenSelect(null)}
          >
            <motion.div 
              className="magic-glass w-full max-w-sm rounded-[2.5rem] p-8 border border-white/20 shadow-inner"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-magic-pink" />
                Select Essence
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {ESSENCES.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => {
                      if (showTokenSelect === 'from') setFromEssence(token);
                      else setToEssence(token);
                      setShowTokenSelect(null);
                    }}
                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-black/40 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-inner">
                        <token.icon size={24} className={token.color} />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white uppercase tracking-widest">{token.id}</p>
                        <p className="text-[10px] text-white/50 font-medium">{token.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Bottom Footer Details */}
      <div className="absolute bottom-6 right-6 flex items-center gap-4 z-20">
        <div className="text-right hidden sm:block">
           <p className="text-[10px] font-bold text-purple-300 uppercase tracking-widest leading-tight">Master Alchemist</p>
           <p className="text-sm font-medium text-white/80">bullerwill@gmail.com</p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-magic-purple p-0.5 overflow-hidden">
          <img 
            src="https://api.dicebear.com/9.x/pixel-art/svg?seed=alchemist" 
            alt="Avatar" 
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
