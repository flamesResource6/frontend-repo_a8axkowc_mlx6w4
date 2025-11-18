import { X, LineChart, ExternalLink } from 'lucide-react'

function MiniChart(){
  // simple sparkline-like chart using SVG and placeholder data
  const points = [5,7,6,8,9,7,10,12,9,11,13,12]
  const max = Math.max(...points)
  const min = Math.min(...points)
  const width = 280
  const height = 60
  const step = width/(points.length-1)
  const path = points.map((p,i)=> `${i*step},${height - ((p-min)/(max-min))*height}`).join(' ')
  return (
    <svg width={width} height={height} className="w-full">
      <polyline fill="none" stroke="url(#g)" strokeWidth="2" points={path} />
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function VaultDetails({ open, onClose, vault, onDeposit, onWithdraw }){
  if(!open || !vault) return null

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-x-0 top-12 mx-auto w-[95%] md:w-[900px] bg-[#0b0e15] border border-white/10 rounded-xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">{vault.name} · Details</div>
            <div className="text-white/50 text-sm">Strategy overview and basket composition</div>
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-white/5 text-white/60"><X size={18}/></button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-2 text-white/70 text-sm"><LineChart size={16}/> Performance (30d)</div>
              <MiniChart />
            </div>

            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-white/70 text-sm mb-2">Strategy description</div>
              <p className="text-white/60 text-sm">This vault aims to provide diversified exposure to trending memecoins launched on Pump.fun. Allocation tilts towards momentum and liquidity while capping concentration risk. Rebalancing occurs periodically to maintain target weights.</p>
            </div>

            <div className="bg-white/5 rounded-lg">
              <div className="p-3 text-white/70 text-sm">Included memecoins</div>
              <div className="divide-y divide-white/5">
                {vault.coins.slice(0,10).map((c,i)=> (
                  <div key={i} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full" style={{backgroundImage:`linear-gradient(135deg, ${c.color}33, ${c.color}99)`}} />
                      <div className="text-sm text-white/80">{c.name} <span className="text-white/40">· {c.ticker}</span></div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-xs text-white/60">Alloc ~{Math.round(100/vault.coins.length)}%</div>
                      <div className={`text-xs ${c.change24>=0? 'text-emerald-400':'text-red-400'}`}>{c.change24>=0? '+':''}{c.change24}%</div>
                      <a href="#" className="text-xs text-blue-300 hover:underline flex items-center gap-1">View on Pump.fun <ExternalLink size={12}/></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={()=>onDeposit(vault)} className="w-full px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-500 hover:to-blue-500">Deposit</button>
            <button onClick={onWithdraw} className="w-full px-3 py-2 rounded-md border border-white/10 text-white/80 hover:bg-white/5 text-sm">Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  )
}
