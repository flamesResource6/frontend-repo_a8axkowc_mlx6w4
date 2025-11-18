import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function TrendingMemecoins(){
  const items = Array.from({length:12}).map((_,i)=> ({
    name: ['DOGE2','PEPEx','FROGGO','WOJAK','CHEEMS','RUG','MOON','PUMP','MEME','KITTY','BONKX','SHIBX'][i%12],
    ticker: ['D2','PPX','FRG','WJK','CHM','RUG','MOON','PMP','MEME','KTY','BNKX','SHX'][i%12],
    cap: (Math.random()*5+0.5).toFixed(2)+ 'm',
    change: Math.round((Math.random()*40-20)*10)/10,
    color: ['#22d3ee','#a78bfa','#60a5fa','#34d399','#f472b6','#f59e0b'][i%6]
  }))

  return (
    <div className="bg-[#0b0e15] border-l border-white/5 h-full hidden xl:flex xl:flex-col w-80">
      <div className="p-3 border-b border-white/5">
        <div className="text-white/80 text-sm flex items-center justify-between">
          <span>Now trending on Pump.fun</span>
          <a href="#" className="text-blue-300 hover:underline text-xs">View more</a>
        </div>
      </div>
      <div className="p-3 space-y-3 overflow-auto">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {items.slice(0,8).map((c,i)=> (
            <div key={i} className="min-w-[140px] bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{backgroundImage:`linear-gradient(135deg, ${c.color}33, ${c.color}99)`}} />
                <div className="text-white/80 text-sm">{c.name} <span className="text-white/40">· {c.ticker}</span></div>
              </div>
              <div className="text-xs text-white/40 mt-1">MC: {c.cap}</div>
              <div className={`text-xs mt-1 flex items-center gap-1 ${c.change>=0?'text-emerald-400':'text-red-400'}`}>{c.change>=0? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>} {c.change}%</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {items.map((c,i)=> (
            <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full" style={{backgroundImage:`linear-gradient(135deg, ${c.color}33, ${c.color}99)`}} />
                <div className="text-white/80 text-sm">{c.name} <span className="text-white/40">· {c.ticker}</span></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-white/40">MC {c.cap}</div>
                <div className={`text-xs ${c.change>=0?'text-emerald-400':'text-red-400'}`}>{c.change>=0? '+':''}{c.change}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
