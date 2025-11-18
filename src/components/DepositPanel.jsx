import { X, PieChart } from 'lucide-react'

function SegmentedBar({ segments }){
  const total = segments.reduce((a,s)=> a + s.value, 0)
  return (
    <div className="w-full h-2 rounded bg-white/5 overflow-hidden flex">
      {segments.map((s,i)=> {
        const w = `${(s.value/total)*100}%`
        return <div key={i} className="h-full" style={{width:w, backgroundColor:s.color, opacity:0.7}} />
      })}
    </div>
  )
}

export default function DepositPanel({ open, onClose, vault, onConfirm }){
  if(!open || !vault) return null

  const mockAlloc = vault.coins.slice(0,6).map(c=> ({ label: `${c.name}`, value: Math.round(100/vault.coins.length), color: c.color }))

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-[#0b0e15] border-l border-white/10 shadow-xl overflow-auto">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">{vault.name}</div>
            <div className="text-white/50 text-sm">Deposit SOL into this vault and it will be automatically spread across multiple Pump.fun memecoins according to this strategy.</div>
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-white/5 text-white/60"><X size={18}/></button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs text-white/60 mb-1">Amount to deposit</label>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="0.00" className="flex-1 bg-white/5 text-white/80 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500/40" />
              <button className="px-3 py-2 rounded bg-white/5 text-white/70 hover:bg-white/10 text-sm">Max</button>
            </div>
            <p className="text-[11px] text-white/40 mt-1">Example: 1 SOL will be distributed across all memecoins in this vault.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/70 text-sm"><PieChart size={16}/> Allocation preview</div>
            <SegmentedBar segments={mockAlloc} />
            <div className="divide-y divide-white/5 rounded-md border border-white/5">
              {vault.coins.slice(0,6).map((c,i)=> (
                <div key={i} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full" style={{backgroundImage:`linear-gradient(135deg, ${c.color}33, ${c.color}99)`}} />
                    <div className="text-sm text-white/80">{c.name} <span className="text-white/40">· {c.ticker}</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/60">Alloc ~{Math.round(100/vault.coins.length)}%</div>
                    <div className={`text-xs ${c.change24>=0? 'text-emerald-400':'text-red-400'}`}>{c.change24>=0? '+':''}{c.change24}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button onClick={onConfirm} className="flex-1 px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-500 hover:to-blue-500">Confirm deposit</button>
            <button onClick={onClose} className="px-3 py-2 rounded-md border border-white/10 text-white/80 hover:bg-white/5 text-sm">Cancel</button>
          </div>

          <p className="text-[10px] text-white/40 pt-2">Memeed is not affiliated with Pump.fun. This is not financial advice. Memecoins are extremely volatile.</p>
        </div>
      </div>
    </div>
  )
}
