import { useParams, useNavigate } from 'react-router-dom';
import localGames from './services/games.json'; // ดึงข้อมูลจากไฟล์เดิมของเรา

function GameDetail() {
  const { id } = useParams(); // ดึง ID เกมมาจาก URL (เช่น /game/540)
  const navigate = useNavigate(); // ใช้สำหรับปุ่ม "ย้อนกลับ"
  
  // ค้นหาข้อมูลเกมที่ตรงกับ ID ใน URL
  const game = localGames.find(g => g.title === id);

  if (!game) return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center font-sans">
      <div className="text-center">
        <h1 className="text-2xl mb-4">ไม่พบข้อมูลเกม...</h1>
        <button onClick={() => navigate(-1)} className="text-[#00D3F3]">ย้อนกลับ</button>
      </div>
    </div>
  );

  return (
    /* --- ใช้พื้นหลัง bg-[#0A0A0A] เหมือนหน้าแรก --- */
    <div className="min-h-screen bg-[#0A0A0A] text-white p-5 md:p-14 font-sans">
      
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 text-[#828C8E] hover:text-[#00D3F3] transition-colors flex items-center gap-2 text-sm"
      >
        ← ย้อนกลับ
      </button>

      {/* --- ปรับ Card Detail ให้แมตช์กับการ์ดหน้าแรก --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#101010] p-8 rounded-3xl border border-[#C3C3C3]/10 shadow-2xl">
        
        {/* รูปภาพพร้อมเงาจางๆ */}
        <div className="overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(0,211,243,0.1)]">
          <img src={game.thumbnail} alt={game.title} className="w-full h-auto object-cover" />
        </div>
        
        <div>
          {/* Badge หมวดหมู่สไตล์เดียวกัน */}
          <span className="bg-[#00798C]/60 text-[#00D3F3]/80 px-4 py-1.5 rounded-2xl border border-[#00DDFF]/40 text-[10px] font-black uppercase tracking-[0.15em]">
            {game.genre}
          </span>
          
          {/* ชื่อเกมใช้สี #E8E8E8 */}
          <h1 className="text-4xl md:text-5xl font-black text-[#E8E8E8] my-6 tracking-tight">{game.title}</h1>
          
          {/* คำอธิบายใช้สี #AEBCBE */}
          <p className="text-[#AEBCBE] text-lg leading-relaxed mb-10">{game.short_description}</p>
          
          {/* ส่วน Platform ใช้ Gradient เหมือนช่อง Search หน้าแรก */}
          <div className="bg-gradient-to-r from-[#056E7E]/30 to-[#0A0A0A]/20 p-6 rounded-2xl border border-[#FFFFFF]/10">
            <h3 className="text-[#FFFFFF]/50 font-bold mb-2 uppercase text-[10px] tracking-widest">Platform</h3>
            <p className="text-[#00D3F3] font-black text-xl">{game.platform}</p>
          </div>

          {/* ปุ่มเสริมเพื่อความสวยงาม (ถ้าอยากเพิ่มภายหลัง) */}
          <button className="mt-8 w-full bg-gradient-to-r from-[#056E7E]/80 to-[#0A0A0A] py-4 rounded-full border border-[#FFFFFF]/10 font-black hover:from-[#00D3F3] transition-all duration-500 shadow-lg shadow-cyan-500/10 active:scale-95">
             GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;