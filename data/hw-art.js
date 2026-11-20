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
  /* ทำสไลด์จากเรื่องในหนังสือวรรณคดี: หนังสือเปิด ลายกนก และจอนำเสนอ */
  litslides: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="48" y="10" width="64" height="44" rx="4" /><path d="M80 54v8M70 66l10-4 10 4" />' +
    '<path d="M56 21h24M56 29h14" opacity=".6" /><path d="M98 46c-7-5-7-14 0-21 7 7 7 16 0 21z" /><path d="M98 46v-9" opacity=".7" />' +
    '<path d="M40 80c-9-6-20-7-30-5v30c10-2 21-1 30 5 9-6 20-7 30-5V75c-10-2-21-1-30 5z" /><path d="M40 80v30" />' +
    '<path d="M16 87h16M16 95h16M48 87h16M48 95h16" opacity=".6" />' +
    '<path d="M26 70c0-14 6-22 16-26" /><path d="M36 40l7 4-4 7" /></g>',
  /* แบบฝึกหัดภาษาอังกฤษและอ่านออกเสียง: สมุดแบบฝึกหัด ช่องติ๊ก และกล่องคำพูด */
  workbook: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="10" y="22" width="64" height="88" rx="6" /><path d="M22 22v88" opacity=".55" />' +
    '<rect x="31" y="38" width="11" height="11" rx="2" /><path d="M33 43l3 3 5-6" /><path d="M48 44h18" opacity=".7" />' +
    '<rect x="31" y="60" width="11" height="11" rx="2" /><path d="M48 66h18" opacity=".7" />' +
    '<rect x="31" y="82" width="11" height="11" rx="2" /><path d="M33 87l3 3 5-6" /><path d="M48 88h18" opacity=".7" />' +
    '<path d="M86 12h22a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H98l-8 8v-8h-4a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z" /><path d="M88 23h18M88 30h11" opacity=".7" />' +
    '<path d="M86 64c4 4 4 12 0 16M95 58c7 7 7 21 0 28" opacity=".85" /></g>',
  /* จับคู่วาดรูปเหมือน: ขาตั้งภาพ ภาพใบหน้า ดินสอ และเพื่อนคู่ */
  portrait: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="32" y="12" width="58" height="56" rx="3" /><path d="M46 112l12-44M78 112L66 68M61 68v40" />' +
    '<circle cx="61" cy="34" r="11" /><path d="M43 64c2-9 9-14 18-14s16 5 18 14" />' +
    '<circle cx="57" cy="33" r="1.6" fill="currentColor" /><circle cx="65" cy="33" r="1.6" fill="currentColor" /><path d="M57 39c2 2 6 2 8 0" />' +
    '<path d="M104 40l7 7-14 28-8 3 1-8z" /><path d="M100 48l7 7" opacity=".7" />' +
    '<circle cx="16" cy="66" r="7" /><path d="M4 90c0-8 5-12 12-12s12 4 12 12" /></g>',
  /* ใบกิจกรรมคณิตศาสตร์: ใบงาน กราฟ เครื่องหมายราก และดินสอ */
  mathsheet: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M18 16a6 6 0 0 1 6-6h52l14 14v80a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" /><path d="M76 10v14h14" />' +
    '<path d="M30 72V34M30 72h48" opacity=".7" /><path d="M32 68c10-2 16-28 28-28s12 10 16 14" />' +
    '<path d="M30 88l4 6 6-14h14" /><path d="M62 84l8 8M70 84l-8 8" />' +
    '<path d="M102 50l8 4-16 40-7 4-1-8z" /><path d="M98 58l8 4" opacity=".7" /></g>',
  /* เลือกสินค้าหรือบริการและบอกเหตุผลที่ควรซื้อ: ถุงช้อปปิ้ง ป้ายราคาเงินบาท และคำถาม */
  market: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M14 46h50l-4 60H18z" /><path d="M28 46v-8a11 11 0 0 1 22 0v8" /><path d="M39 70v14M32 77h14" opacity=".7" />' +
    '<g transform="rotate(-18 90 36)"><path d="M70 24h30l10 12-10 12H70z" /><circle cx="101" cy="36" r="2.5" />' +
    '<path d="M76 28h7a4 4 0 0 1 0 8h-7M76 36h8a4.5 4.5 0 0 1 0 9h-8M76 28v17M80 25v23" /></g>' +
    '<path d="M82 66h24a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H94l-8 8v-8h-4a6 6 0 0 1-6-6V72a6 6 0 0 1 6-6z" />' +
    '<path d="M89 77a5 5 0 1 1 6 5v3" /><circle cx="95" cy="90" r="1.8" fill="currentColor" /></g>',
  /* ภาพถ่ายตัวเองในกีฬาสีพร้อมคำอธิบาย: รูปโพลารอยด์ ลูกวอลเลย์บอล ธงคณะสี และปากกา */
  sportphoto: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<g transform="rotate(-8 50 54)"><rect x="12" y="14" width="74" height="84" rx="4" /><rect x="20" y="22" width="58" height="52" rx="2" opacity=".55" />' +
    '<circle cx="49" cy="48" r="17" /><path d="M49 48c0-8-3-13-9-16M49 48c7-3 13-3 17 2M49 48c-5 5-5 11-2 17M33 42c6 4 12 6 16 6" />' +
    '<path d="M24 86h34" opacity=".7" /></g>' +
    '<path d="M96 10v40" /><path d="M96 12h18l-5 7 5 7H96" />' +
    '<path d="M110 62l6 6-18 28-8 3 1-8z" /><path d="M66 112h22" opacity=".7" /></g>',
  /* การจัดตกแต่งบ้านและโรงเรียน: บ้าน ภาพติดผนัง โคมไฟ และกระถางต้นไม้ */
  decor: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M10 56L60 16l50 40" /><path d="M22 47v61h76V47" /><circle cx="60" cy="36" r="6" />' +
    '<rect x="32" y="56" width="26" height="18" rx="1.5" /><path d="M35 71l7-8 5 5 3-3 6 6" opacity=".75" />' +
    '<path d="M74 58h16l-3 10h-10z" /><path d="M82 68v32M75 100h14" />' +
    '<path d="M32 92h20l-3 16H35z" /><path d="M42 92c0-8-6-12-11-12 0 6 4 10 11 12zM42 92c0-9 6-13 11-13 0 7-5 11-11 13z" /></g>',
  /* ใบงานวิทยาการข้อมูล: ฐานข้อมูล แว่นขยาย และกราฟแท่ง */
  datasci: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<ellipse cx="30" cy="22" rx="18" ry="7" /><path d="M12 22v36c0 4 8 7 18 7s18-3 18-7V22M12 34c0 4 8 7 18 7s18-3 18-7M12 46c0 4 8 7 18 7s18-3 18-7" />' +
    '<path d="M30 74v12c0 8 6 14 14 14h6" opacity=".6" /><path d="M46 96l5 4-5 4" opacity=".6" />' +
    '<path d="M58 108h54M58 108V60" opacity=".7" />' +
    '<rect x="64" y="90" width="8" height="18" rx="1" /><rect x="76" y="78" width="8" height="30" rx="1" /><rect x="88" y="84" width="8" height="24" rx="1" /><rect x="100" y="68" width="8" height="40" rx="1" />' +
    '<circle cx="84" cy="28" r="13" /><path d="M93 37l12 12" /><path d="M78 32v-4M84 32v-9M90 32v-6" opacity=".8" /></g>',
  /* พรีเซนต์ลิลิตตะเลงพ่าย: จอนำเสนอรูปช้างศึก และผู้นำเสนอสองคน */
  present: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="26" y="10" width="84" height="56" rx="5" /><path d="M68 66v10M54 82l14-6 14 6" />' +
    '<path d="M52 50c-2-14 6-24 18-24 11 0 18 8 18 18v12M78 44v12M62 50v6" /><path d="M52 50c-6 0-8-6-6-12" /><path d="M66 26l6-8 6 8" opacity=".8" /><circle cx="62" cy="38" r="1.8" fill="currentColor" />' +
    '<circle cx="18" cy="78" r="7" /><path d="M6 110v-8c0-8 5-12 12-12s12 4 12 12v8" /><path d="M26 92l12-12" />' +
    '<circle cx="100" cy="88" r="6" /><path d="M90 110v-4c0-7 4-10 10-10s10 3 10 10v4" opacity=".85" /></g>',
  /* ตอบคำถามจากหัวข้อที่สุ่มได้ในหนังสือวรรณคดี: หนังสือเปิด สลากสุ่ม และเครื่องหมายคำถาม */
  bookquiz: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M58 70c-12-8-28-9-44-6v40c16-3 32-2 44 6 12-8 28-9 44-6V64c-16-3-32-2-44 6z" /><path d="M58 70v40" />' +
    '<path d="M24 78h22M24 88h22M70 78h22M70 88h22" opacity=".6" />' +
    '<g transform="rotate(-12 34 30)"><rect x="14" y="16" width="40" height="28" rx="3" /><path d="M22 26h24M22 34h14" opacity=".7" /></g>' +
    '<circle cx="88" cy="30" r="20" /><path d="M81 24a7 7 0 1 1 9 7v5" /><circle cx="90" cy="42" r="2" fill="currentColor" /></g>',
  /* แบบฝึกหัดสมดุลเคมี: ขวดรูปชมพู่ ลูกศรสมดุลไปกลับ และนาฬิกากำหนดส่ง */
  chem: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M34 12h20M38 12v26L16 92c-3 8 2 16 10 16h36c8 0 13-8 10-16L50 38V12" />' +
    '<path d="M24 78h40" opacity=".7" /><circle cx="36" cy="92" r="3" /><circle cx="52" cy="86" r="2" fill="currentColor" /><circle cx="46" cy="98" r="2" fill="currentColor" />' +
    '<path d="M72 34h36M100 26l8 8" /><path d="M110 48H74M82 56l-8-8" />' +
    '<circle cx="96" cy="88" r="16" /><path d="M96 78v10l7 5" /></g>',
  /* เขียนชื่อเล่นและตกแต่งให้มีมิติ: ตัวอักษรสามมิติ ประกายดาว และปากกามาร์กเกอร์ */
  lettering: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M14 84V34h20l8 20 8-20h20v50H56V60l-9 24h-10l-9-24v24z" /><path d="M70 34l8-8v50l-8 8M34 34l8-8h20M50 34l8-8h20" opacity=".75" />' +
    '<path d="M96 12l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" /><path d="M18 14v8M14 18h8" opacity=".8" />' +
    '<path d="M108 54l6 6-22 36-10 4 2-10z" /><path d="M102 62l6 6" opacity=".7" /><path d="M14 104c12-6 22 6 34 0s20-4 28 0" opacity=".7" /></g>',
  /* เตรียมกระดาษร้อยปอนด์ A3 และเทป nitto ของกลุ่ม: แผ่นกระดาษ ม้วนเทป และสมาชิกกลุ่ม */
  artkit: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 14h56l12 12v56H12z" /><path d="M68 14v12h12" /><path d="M24 58l9-24 9 24M27 50h12" /><path d="M48 36c2-2 5-3 8-3 5 0 8 3 8 6s-3 6-7 6c5 0 8 3 8 7s-4 7-9 7c-4 0-7-1-9-4" />' +
    '<circle cx="88" cy="88" r="20" /><circle cx="88" cy="88" r="8" /><path d="M108 88v14H94" /><path d="M72 76c4-6 10-9 16-9" opacity=".6" />' +
    '<circle cx="20" cy="94" r="5" /><circle cx="38" cy="94" r="5" /><circle cx="56" cy="94" r="5" opacity=".85" /><path d="M12 112c0-6 4-9 8-9s8 3 8 9M30 112c0-6 4-9 8-9s8 3 8 9M48 112c0-6 4-9 8-9s8 3 8 9" opacity=".85" /></g>',
  /* เขียนศัพท์ชีววิทยา: สมุดจดคำศัพท์ ใบไม้ และเกลียวดีเอ็นเอ */
  biovocab: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="12" y="20" width="60" height="88" rx="6" /><path d="M24 20v88" opacity=".55" />' +
    '<path d="M34 40h28M34 52h28M34 64h28M34 76h28M34 88h18" opacity=".7" />' +
    '<path d="M86 16c12 9 12 20 0 29s-12 20 0 29 12 20 0 29" /><path d="M108 16c-12 9-12 20 0 29s12 20 0 29-12 20 0 29" /><path d="M91 26h12M91 36h12M91 55h12M91 65h12M91 84h12M91 94h12" opacity=".65" /></g>',
  /* ปฏิบัติการผ่ากบ: กบ ถาดผ่าตัด และมีดผ่าตัด */
  frog: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="8" y="66" width="104" height="44" rx="8" /><path d="M16 100h88" opacity=".5" />' +
    '<circle cx="42" cy="26" r="9" /><circle cx="66" cy="26" r="9" /><circle cx="42" cy="26" r="2.5" fill="currentColor" /><circle cx="66" cy="26" r="2.5" fill="currentColor" />' +
    '<path d="M30 34c-8 6-12 16-10 26 3 14 16 22 34 22s31-8 34-22c2-10-2-20-10-26" /><path d="M42 54c8 6 16 6 24 0" />' +
    '<path d="M22 74c-6 4-10 10-8 18M86 74c6 4 10 10 8 18" opacity=".8" />' +
    '<path d="M112 10L92 44l-6 2 1-6 20-33z" /><path d="M94 40l-3-2" opacity=".7" /></g>',
  /* ธุรกิจวัยเรียน: ร้านค้าเล็ก ๆ ของนักเรียน กันสาด เหรียญ และกราฟขึ้น */
  bizkid: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 44l8-24h72l8 24" /><path d="M12 44c0 6 5 10 11 10s11-4 11-10c0 6 5 10 11 10s11-4 11-10c0 6 5 10 11 10s11-4 11-10c0 6 5 10 11 10s11-4 11-10" />' +
    '<path d="M20 56v52h72V56" /><rect x="30" y="70" width="24" height="20" rx="2" /><path d="M66 108V72h16v36" /><path d="M10 108h100" />' +
    '<circle cx="100" cy="76" r="0" /><path d="M96 20l6-8 6 8M102 12v18" opacity=".85" />' +
    '<circle cx="42" cy="80" r="5" opacity=".8" /></g>',
  /* สรุปเนื้อหาจากหนังสือลงสมุด: หนังสือเรียน ลูกศร และสมุดจดสรุปย่อ */
  summary: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="8" y="14" width="44" height="60" rx="4" /><path d="M16 14v60" opacity=".55" /><path d="M24 28h20M24 38h20M24 48h20M24 58h14" opacity=".7" />' +
    '<path d="M56 34c12 0 20 6 22 18" /><path d="M72 46l6 7 7-6" />' +
    '<rect x="58" y="58" width="52" height="50" rx="4" /><path d="M58 70h52" opacity=".55" /><path d="M66 58v-6M78 58v-6M90 58v-6M102 58v-6" />' +
    '<path d="M68 82l3 3 5-6M82 82h20M68 96l3 3 5-6M82 96h14" /></g>',
  /* ใบงานการคิดเชิงออกแบบ: หลอดไฟไอเดีย กระดาษโน้ต และดินสอ */
  designthink: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M44 12c-16 0-28 12-28 27 0 10 5 17 12 23v10h32V62c7-6 12-13 12-23 0-15-12-27-28-27z" /><path d="M32 82h24M36 92h16" /><path d="M38 60V46l6 6 6-6v14" opacity=".8" />' +
    '<rect x="78" y="14" width="30" height="30" rx="3" /><path d="M84 24h18M84 32h12" opacity=".7" />' +
    '<rect x="70" y="56" width="30" height="30" rx="3" transform="rotate(-8 85 71)" /><path d="M78 68l4 4 8-9" />' +
    '<path d="M108 66l6 6-18 32-9 4 1-9z" opacity=".9" /><path d="M14 108h60" opacity=".6" /></g>',
  /* ใบงานสองใบ: กระดาษใบงานซ้อนกัน มีช่องติ๊กและดินสอ */
  sheets: '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M34 28V10h46l12 12v62H78" opacity=".7" /><path d="M80 10v12h12" opacity=".7" />' +
    '<path d="M16 28h50l12 12v70H16z" /><path d="M66 28v12h12" />' +
    '<rect x="26" y="50" width="10" height="10" rx="2" /><path d="M28 55l2 3 5-6M42 55h26" /><rect x="26" y="70" width="10" height="10" rx="2" /><path d="M42 75h26" opacity=".8" /><rect x="26" y="90" width="10" height="10" rx="2" /><path d="M42 95h18" opacity=".8" />' +
    '<path d="M104 54l7 6-18 36-9 4 1-9z" /><path d="M99 62l7 6" opacity=".7" /></g>',
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
  "วิทยาการคำนวณ": ["#24143d", "#55309a"],
  "ศิลปะ": ["#7a1f45", "#c0446e"],
  "คณิตศาสตร์เพิ่มเติม": ["#2f4a12", "#5f8a26"],
  "เศรษฐศาสตร์": ["#5c1d1d", "#a33b2f"],
  "วอลเลย์บอล 2": ["#103a73", "#1a8ad1"],
  "เคมี": ["#0b4a5e", "#1ba3a8"],
  "ชีววิทยา": ["#1d5230", "#3fa35a"]
};
