// src/services/api.js
import localGames from './games.json'; // ดึงข้อมูลจากไฟล์ที่เราเพิ่งสร้าง

export const fetchGames = async () => {
    try {
        // จำลองการโหลดให้เหมือน API จริง (เพื่อให้ Loading State ทำงาน)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(localGames);
            }, 500); // รอ 0.5 วินาที
        });
    } catch (error) {
        console.error("QA Alert: Data Load Failed", error);
        return [];
    }
};