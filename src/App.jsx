import { useEffect, useState } from 'react'
import { fetchGames } from './services/api'
import { Link } from 'react-router-dom'
import myLogo from './assets/logo.png' // อย่าลืมใส่ไฟล์โลโก้ PNG ของคุณที่นี่
import searchIcon from './assets/icon-search.png'

function App() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true)
      const data = await fetchGames()
      setGames(data)
      setLoading(false)
    }
    loadGames()
  }, [])

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || game.genre === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    /* --- 1. เปลี่ยนสีพื้นหลังเป็นดำสนิท (bg-black) ตามรูป --- */
    <div className="min-h-screen bg-[#0A0A0A] text-white p-5 font-sans">
      
      {/* --- 2. จัดโครงสร้าง NAVBAR ใหม่ (flex แนวนอน) --- */}
      <nav className="min-h-[80px] w-full bg-[#0A0A0A] border-b border-[#00D3F3]/30 sticky top-0 z-50 py-3 md:py-0">
        {/* ✅ ใช้ flex-wrap เพื่อให้ของลงมาบรรทัดใหม่ได้บนมือถือ และปรับ px-4 ในมือถือ px-10 ในคอม */}
        <div className="w-full h-full flex items-center justify-between px-4 md:px-10 gap-3 flex-wrap md:flex-nowrap"> {/* px-10 คือระยะห่างโลโก้จากขอบจอ */}
          
          {/* LOGO */}
          <Link to="/" className="h-full flex items-center hover:opacity-80 transition-opacity ml-0 md:ml-14 flex-shrink-0">
            {/* เปลี่ยนตัวเลขหลัง ml- เพื่อปรับระยะตามใจชอบ */} {/* h-10 ขนาดของมือถือ h-20 ขนาดของ Desktop */}
            <img src={myLogo} alt="Logo" className="h-10 md:h-20 w-auto object-contain" /> 
          </Link>

          {/* กลุ่ม Search & Dropdown */}
          {/* ✅ ใช้ flex-grow เพื่อขยายเต็มที่บนมือถือ และ justify-end บนคอม */}
          <div className="flex items-center gap-3 flex-grow md:flex-grow-0 justify-end md:justify-center mr-0 md:mr-20">
            
            {/* Search Bar */}
            {/* ✅ ใช้ max-w-[200px] บนมือถือ และ w-80 บนคอม */}
            <div className="relative w-full max-w-[200px] sm:max-w-xs md:w-80">
              <input
                type="text"
                placeholder="ค้นหาชื่อเกม..."
                value={searchTerm}
                className="w-full bg-gradient-to-r from-[#056E7E]/51 to-[#0A0A0A]/25 border border-[#FFFFFF]/23 rounded-full p-2 px-5 text-sm focus:border-[#06b6d4] text-white outline-none placeholder:text-[#FFFFFF]/50"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                <img 
                  src={searchIcon} // ✅ ใส่ตัวแปรที่เรา Import มาตรงนี้ (ไม่ต้องมีเครื่องหมาย "" ครอบ)
                  alt="search" 
                  className="w-4 h-4 opacity-90" // ✅ ปรับขนาดไอคอนและความจางได้ตามชอบ
                />
              </div>
            </div>

            {/* Dropdown */}
            {/* ✅ ปรับ text-[11px] บนมือถือ text-sm บนคอม */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              /* ✅ ใส่ bg-[#111] และ hover:bg-[#1a1a1a] เพื่อให้มีมิติเวลาเอาเมาส์วาง */
              className="bg-[#111]/90 text-[#06b6d4] font-bold text-[11px] md:text-sm cursor-pointer outline-none border border-[#333]/0 px-4 py-2 rounded-lg hover:border-cyan-500/50 transition-all shadow-lg"
            >
              <option value="All">All</option>
              <option value="Shooter">Shooter</option>
              <option value="MMORPG">MMORPG</option>
              <option value="ARPG">ARPG</option>
              <option value="Strategy">Strategy</option>
              <option value="Fighting">Fighting</option>
            </select>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="container mx-auto mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500">กำลังดึงข้อมูล...</p>
          </div>
        ) : (
          <>
            {/* ข้อความบอกจำนวน (ใช้ text-slate-400 ชิดซ้าย) */}
            <p className="text-[#FFFFFF]/80 mb-6 text-sm px-4">
              พบเกมทั้งหมด <span className="text-cyan-400 font-bold">{filteredGames.length}</span> เกม
            </p>

            {/* ---  การ์ดเกม  --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
              {filteredGames.length > 0 ? (
                filteredGames.map(game => (
                  <Link to={`/game/${game.title}`} key={game.id} className="block group">
                    <div className="bg-[#101010] rounded-2xl overflow-hidden border border-[#C3C3C3]/10 
                      hover:border-cyan-500/50 transition-all duration-300 cursor-pointer h-full
                      hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      {/* 0 0: คือตำแหน่งเงา (X และ Y) ถ้าเป็น 0 ทั้งคู่ เงาจะกระจายออกรอบทิศทางเป็นวงกลม / px: คือความฟุ้ง (Blur) */}  
                      <div className="relative overflow-hidden">
                        <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-slate-900/80 px-2 py-1 rounded text-[10px] font-bold text-cyan-400 ">
                          {game.platform}
                        </div>
                      </div>
                      
                      <div className="p-5">
                        {/* --- 🟢 สีชื่อเกมเป็นสีขาว --- */}
                        <h2 className="text-xl font-bold text-[#E8E8E8] transition-colors mb-2">
                          {game.title}
                        </h2>
                        <p className="text-[#AEBCBE] text-xs line-clamp-2 mb-5">
                          {game.short_description}
                        </p>
                        <div className="flex justify-between items-center">
                          {/* --- 🔵 เปลี่ยนปุ่มหมวดหมู่ --- */}
                          <span className="text-[10px] font-black bg-[#00798C]/60 text-[#00D3F3]/80 px-3 py-1 rounded-lg uppercase tracking-tight shadow-md rounded-2xl overflow-hidden border border-[#00DDFF]/40 ">
                            {game.genre}
                          </span>
                          <span className="text-[12px] text-[#828C8E] italic">View details →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-[#FFFFFF]/80">ไม่พบเกมที่ค้นหา...</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App