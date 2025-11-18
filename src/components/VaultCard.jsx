import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

function pctClass(v){
  return v>=0? 'text-emerald-400':'text-red-400'
}

export default function VaultCard({ vault, onDeposit, onDetails }){
  return (
    <div className="bg-[#0b0e15] border border-white/5 rounded-xl p-4 hover:border-white/10 transition flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-white font-medium">{vault.name}</div>
          <div className="text-white/50 text-xs">{vault.description}</div>
          <div className="text-white/40 text-[11px] mt-1">Composed of {vault.coins.length} Pump.fun memecoins</div>
        </div>
        <div className="flex -space-x-2">
          {vault.coins.slice(0,7).map((c,i)=> (
            <div key={i} className="w-6 h-6 rounded-full bg-white/10 ring-2 ring-[#0b0e15]" style={{backgroundImage:`linear-gradient(135deg, ${c.color}33, ${c.color}99)`}} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm mb-3">
        <div className="bg-white/5 rounded-md p-2">
          <div className="text-white/40 text-[11px]">24h P&L</div>
          <div className={`font-medium ${pctClass(vault.pnl24h)} flex items-center gap-1`}>
            {vault.pnl24h>=0? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {vault.pnl24h}%
          </div>
        </div>
        <div className="bg-white/5 rounded-md p-2">
          <div className="text-white/40 text-[11px]">7d</div>
          <div className={`font-medium ${pctClass(vault.perf7d)} flex items-center gap-1`}>
            {vault.perf7d>=0? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {vault.perf7d}%
          </div>
        </div>
        <div className="bg-white/5 rounded-md p-2">
          <div className="text-white/40 text-[11px]">TVL</div>
          <div className="text-white font-medium">{vault.tvl} SOL</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {vault.tags.map((t,i)=> (
          <span key={i} className={`px-2 py-1 rounded-full text-[10px] border ${t==='Low risk'?'border-emerald-400/30 text-emerald-300':'border-red-400/30 text-red-300'} ${t==='Experimental' || t==='High risk'? 'border-red-400/30 text-red-300':''} ${t==='Experimental'?'border-purple-400/30 text-purple-300':''}`}>{t}</span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2">
        <button onClick={()=>onDeposit(vault)} className="px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-500 hover:to-blue-500">Deposit</button>
        <button onClick={()=>onDetails(vault)} className="px-3 py-2 rounded-md border border-white/10 text-white/80 hover:bg-white/5 text-sm">Details</button>
      </div>
    </div>
  )
}
