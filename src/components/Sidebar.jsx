import { useState } from 'react'
import { Grid2X2, Layers3, Activity, BookText, Settings, ChevronRight, ChevronLeft } from 'lucide-react'

export default function Sidebar({ collapsed, onToggle, current, onNavigate }) {
  const nav = [
    { key: 'vaults', label: 'Vaults', icon: Grid2X2 },
    { key: 'my-vaults', label: 'My Vaults', icon: Layers3 },
    { key: 'activity', label: 'Activity', icon: Activity },
    { key: 'docs', label: 'Docs', icon: BookText },
  ]

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 h-screen bg-[#080a10] border-r border-white/5 sticky top-0 flex flex-col`}>      
      <div className="h-14 flex items-center px-3 gap-2 border-b border-white/5">
        <button onClick={onToggle} className="p-2 rounded-md hover:bg-white/5 text-white/70">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        {!collapsed && (
          <div className="text-white font-semibold tracking-tight">Memeed</div>
        )}
      </div>

      <nav className="flex-1 py-3">
        {nav.map((item) => {
          const Icon = item.icon
          const active = current === item.key
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition ${active ? 'text-white bg-white/5' : 'text-white/70'}`}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto border-t border-white/5 p-3 space-y-2">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} text-xs text-white/60 bg-white/5 rounded-md px-2 py-2`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
            {!collapsed && <span>Solana · mainnet</span>}
          </div>
          {!collapsed && <span className="text-white/40">Read-only</span>}
        </div>
        <button className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-2 text-sm rounded-md hover:bg-white/5 text-white/70`}>
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  )
}
