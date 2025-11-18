import { Search, Filter, Wallet, ChevronDown } from 'lucide-react'

export default function Topbar({ onConnect, connected, balance, filter, setFilter, onlyMine, setOnlyMine }) {
  const filters = ['All', 'Blue-chip', 'Trending', 'DeGen']

  return (
    <div className="sticky top-0 z-10 bg-[#0a0b12]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0a0b12]/60">
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <h1 className="text-white font-semibold tracking-tight">Vaults</h1>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-white/30" size={16} />
            <input placeholder="Search vaults or memecoins…" className="pl-9 pr-3 py-2 bg-white/5 text-white/80 placeholder-white/30 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 w-72" />
          </div>
          <div className="hidden md:flex items-center gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs border ${filter===f?'border-purple-500/40 text-white bg-purple-500/10':'border-white/10 text-white/70 hover:border-white/20'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-white/60 select-none">
            <input type="checkbox" checked={onlyMine} onChange={(e)=>setOnlyMine(e.target.checked)} className="accent-purple-500" />
            Show only my vaults
          </label>
          {connected ? (
            <div className="flex items-center gap-2">
              <div className="text-emerald-400 text-sm bg-emerald-500/10 px-2 py-1 rounded">{balance} SOL</div>
              <button className="px-3 py-2 rounded-md bg-white/5 text-white/80 hover:bg-white/10 text-sm flex items-center gap-2"><Wallet size={16}/> <span>Disconnect</span></button>
            </div>
          ) : (
            <button onClick={onConnect} className="px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium shadow hover:from-purple-500 hover:to-blue-500 flex items-center gap-2">
              <Wallet size={16}/> Connect wallet
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
