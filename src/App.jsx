import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import VaultCard from './components/VaultCard'
import DepositPanel from './components/DepositPanel'
import VaultDetails from './components/VaultDetails'
import TrendingMemecoins from './components/TrendingMemecoins'
import Spline from '@splinetool/react-spline'

function mockVaults(){
  const colors = ['#22d3ee','#a78bfa','#60a5fa','#34d399','#f472b6','#f59e0b','#ef4444','#10b981']
  const names = ['Top Memes Index','DeGen Roulette','New Launches','Safe-ish Memes','Momentum Max','Liquidity Pool','Fresh Pumpers','Community Picks']
  return names.map((n,idx)=> ({
    id: idx,
    name: n,
    description: ['Diversified basket','High-volatility basket','Recently launched','Lower volatility mix','Trend-following','Top liquidity','Brand-new tokens','Curated by community'][idx%8],
    coins: Array.from({length: Math.floor(Math.random()*5)+5}).map((_,i)=> ({
      name: ['DOGE2','PEPEx','FROGGO','WOJAK','CHEEMS','RUG','MOON','PUMP','MEME','KITTY'][i%10],
      ticker: ['D2','PPX','FRG','WJK','CHM','RUG','MOON','PMP','MEME','KTY'][i%10],
      color: colors[(i+idx)%colors.length],
      change24: Math.round((Math.random()*40-20)*10)/10
    })),
    pnl24h: Math.round((Math.random()*20-10)*10)/10,
    perf7d: Math.round((Math.random()*40-20)*10)/10,
    tvl: (Math.random()*120+20).toFixed(1),
    tags: idx%2===0? ['Low risk','Experimental'] : ['High risk','Experimental']
  }))
}

export default function App(){
  const [collapsed, setCollapsed] = useState(true)
  const [current, setCurrent] = useState('vaults')
  const [filter, setFilter] = useState('All')
  const [onlyMine, setOnlyMine] = useState(false)
  const [connected, setConnected] = useState(false)
  const [balance] = useState('12.34')
  const [depositOpen, setDepositOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [activeVault, setActiveVault] = useState(null)

  const vaults = useMemo(()=> mockVaults(), [])
  const myVaults = vaults.slice(0,2)

  const shown = onlyMine ? myVaults : vaults

  const handleDeposit = (vault) => { setActiveVault(vault); setDepositOpen(true) }
  const handleDetails = (vault) => { setActiveVault(vault); setDetailsOpen(true) }

  return (
    <div className="min-h-screen bg-[#05060a] text-white/80">
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative flex">
        <Sidebar collapsed={collapsed} onToggle={()=>setCollapsed(!collapsed)} current={current} onNavigate={setCurrent} />
        <main className="flex-1 min-h-screen grid grid-cols-1 xl:grid-cols-[1fr_320px]">
          <div className="min-h-screen flex flex-col">
            <Topbar onConnect={()=>setConnected(!connected)} connected={connected} balance={balance} filter={filter} setFilter={setFilter} onlyMine={onlyMine} setOnlyMine={setOnlyMine} />

            {current==='my-vaults' && (
              <div className="p-6">
                <div className="text-white/70 text-sm bg-white/5 border border-white/10 rounded-lg p-6 text-center">
                  <div className="font-medium mb-1">You haven’t deposited into any vaults yet.</div>
                  <button onClick={()=>setCurrent('vaults')} className="mt-2 px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:from-purple-500 hover:to-blue-500">Browse vaults</button>
                </div>
              </div>
            )}

            {current==='vaults' && (
              <div className="p-4 md:p-6">
                <div className="mb-3 md:hidden">
                  <div className="flex gap-2 overflow-x-auto">
                    {['All','Blue-chip','Trending','DeGen'].map(f=> (
                      <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs border ${filter===f?'border-purple-500/40 text-white bg-purple-500/10':'border-white/10 text-white/70 hover:border-white/20'}`}>{f}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {shown.map(v => (
                    <VaultCard key={v.id} vault={v} onDeposit={handleDeposit} onDetails={handleDetails} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <TrendingMemecoins />
        </main>
      </div>

      <DepositPanel open={depositOpen} onClose={()=>setDepositOpen(false)} vault={activeVault} onConfirm={()=>setDepositOpen(false)} />
      <VaultDetails open={detailsOpen} onClose={()=>setDetailsOpen(false)} vault={activeVault} onDeposit={handleDeposit} onWithdraw={()=>setDetailsOpen(false)} />
    </div>
  )
}
