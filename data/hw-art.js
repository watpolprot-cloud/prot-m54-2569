/* =========================================================
   ภาพประกอบการบ้าน (วาดเป็นเส้นโทนทอง ใช้บนการ์ดการบ้านและภาพ info)
   - ART: ภาพตามเนื้องาน ใส่ชื่อภาพใน homework.js ช่อง art เช่น art: "vlog"
     งานใหม่ที่ไม่มีภาพตรง ให้วาดภาพใหม่เพิ่มที่นี่ (viewBox 0 0 120 120 · เส้นใช้ currentColor)
   - TONES: สีพื้นการ์ดของแต่ละวิชา (ชื่อวิชาต้องตรงกับ subj) วิชาที่ไม่มีในรายการใช้สีม่วงของห้อง
   ========================================================= */
window.M54_HW_ART = {
  /* ท่องอาขยาน ลิลิตตะเลงพ่าย: ช้างศึก (ยุทธหัตถี) + สมุดไทย + คลื่นเสียงท่อง */
  recite: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M50 34l10-14 10 14" /><path d="M54 30h12" opacity=".7" />' +
    '<path d="M44 46c0-9 7-14 16-14s16 5 16 14c0 6-3 10-6 13v22c0 5 3 8 7 7" />' +
    '<path d="M44 46c0 6 3 10 6 13v8" />' +
    '<path d="M44 42c-10-6-24-2-26 10-2 11 6 22 18 22 5 0 8-3 10-6" />' +
    '<path d="M76 42c10-6 24-2 26 10 2 11-6 22-18 22-5 0-8-3-10-6" />' +
    '<circle cx="53" cy="47" r="2" fill="currentColor" /><circle cx="67" cy="47" r="2" fill="currentColor" />' +
    '<path d="M52 64c-4 3-7 7-8 12M68 64c4 3 7 7 8 12" />' +
    '<rect x="14" y="98" width="92" height="12" rx="3" /><circle cx="34" cy="104" r="1.8" fill="currentColor" /><circle cx="86" cy="104" r="1.8" fill="currentColor" />' +
    '<path d="M42 104h36" opacity=".6" /></g>',
  /* จดคำศัพท์: สมุดจดพร้อม Aa และปากกา */
  vocab: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="14" y="18" width="62" height="86" rx="6" /><path d="M25 18v86" opacity=".55" />' +
    '<path d="M35 62l9-24 9 24M38 54h12" /><path d="M66 56a5 5 0 1 0 0 1v6" />' +
    '<path d="M35 78h30M35 88h20" opacity=".7" />' +
    '<path d="M104 18l6 6-24 40-9 5 1-10z" /><path d="M99 26l6 6" /></g>',
  /* เรื่องเล่าช่วงปิดภาค: หนังสือเปิด ดวงอาทิตย์ และกระเป๋านักเรียน */
  story: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M60 58c-12-8-28-9-44-6v48c16-3 32-2 44 6 12-8 28-9 44-6V52c-16-3-32-2-44 6z" /><path d="M60 58v48" />' +
    '<path d="M26 66h22M26 76h22M26 86h16M72 66h22M72 76h22M72 86h16" opacity=".65" />' +
    '<circle cx="60" cy="26" r="9" /><path d="M60 8v5M60 39v5M42 26h5M73 26h5M47 13l3 3M70 36l3 3M73 13l-3 3M50 36l-3 3" opacity=".85" /></g>',
  /* ทำสไลด์นำเสนอจังหวัด: จอนำเสนอ หมุดแผนที่ ภูเขา */
  slides: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="12" y="20" width="96" height="62" rx="5" /><path d="M60 82v14M44 106l16-10 16 10" />' +
    '<path d="M20 74l20-24 14 16 10-10 18 18" opacity=".8" />' +
    '<path d="M88 30c-7 0-12 5-12 11 0 9 12 20 12 20s12-11 12-20c0-6-5-11-12-11z" /><circle cx="88" cy="41" r="4" />' +
    '<path d="M24 32h22M24 40h14" opacity=".6" /></g>',
  /* ทำ vlog ไปเที่ยว: กล้องวิดีโอ ปุ่มเล่น และเพื่อนในกลุ่ม */
  vlog: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="12" y="30" width="70" height="50" rx="8" /><path d="M82 46l24-14v46L82 64" />' +
    '<path d="M40 44v22l18-11z" fill="currentColor" fill-opacity=".25" />' +
    '<circle cx="24" cy="40" r="3" fill="currentColor" />' +
    '<g opacity=".85"><circle cx="20" cy="96" r="5" /><circle cx="38" cy="96" r="5" /><circle cx="56" cy="96" r="5" /><circle cx="74" cy="96" r="5" />' +
    '<path d="M12 112c0-6 4-9 8-9s8 3 8 9M30 112c0-6 4-9 8-9s8 3 8 9M48 112c0-6 4-9 8-9s8 3 8 9M66 112c0-6 4-9 8-9s8 3 8 9" /></g>' +
    '<path d="M98 92h8M102 88v8" /></g>',
  /* สร้างโปรไฟล์ส่วนตัว: บัตรประวัติ รูปคน และดาว */
  profile: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="14" y="26" width="92" height="68" rx="8" /><path d="M48 26v-8h24v8" />' +
    '<circle cx="40" cy="52" r="10" /><path d="M24 82c0-10 7-16 16-16s16 6 16 16" />' +
    '<path d="M66 50h28M66 62h22M66 74h26" opacity=".75" />' +
    '<path d="M96 100l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" /></g>',
  /* โปรแกรมรักสุขภาพ 7 วัน: หัวใจ คลื่นชีพจร และปฏิทิน 7 ช่อง */
  health: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M60 64C44 52 28 42 28 28c0-8 6-14 14-14 7 0 12 4 18 11 6-7 11-11 18-11 8 0 14 6 14 14 0 14-16 24-32 36z" />' +
    '<path d="M30 36h14l5-9 7 18 6-12 4 3h24" opacity=".9" />' +
    '<rect x="14" y="76" width="92" height="32" rx="5" />' +
    '<path d="M27 76v32M40 76v32M53 76v32M67 76v32M80 76v32M93 76v32" opacity=".5" />' +
    '<path d="M18 92l3 3 4-6M31 92l3 3 4-6M44 92l3 3 4-6" /></g>',
  /* สำรอง: สมุดงานทั่วไป */
  general: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="26" y="16" width="68" height="88" rx="6" /><path d="M46 16v-4h28v4" /><path d="M40 44l6 6 10-12M40 66l6 6 10-12" />' +
    '<path d="M64 46h18M64 68h18M40 88h42" opacity=".7" /></g>'
};
window.M54_HW_TONES = {
  "ภาษาไทย": ["#5a1f7a", "#9b3f8c"],
  "ภาษาอังกฤษ": ["#26357f", "#5059c9"],
  "ภาษาอังกฤษเพื่อการสื่อสาร": ["#1b4f7d", "#3a86b3"],
  "ภาษาอังกฤษเพื่อการท่องเที่ยว": ["#0d5c5a", "#23927a"],
  "การงานอาชีพ": ["#7a3b0e", "#c0761b"],
  "วิทยาการคำนวณ": ["#24143d", "#55309a"]
};
