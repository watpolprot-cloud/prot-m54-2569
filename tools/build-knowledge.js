/* =========================================================
   สร้างคลังความรู้ของผู้ช่วยตอบคำถาม (แชตบอต) จากข้อมูลบนเว็บ
   วิธีใช้:  node tools/build-knowledge.js     (รันที่โฟลเดอร์ราก)
   ได้ไฟล์ data/knowledge.txt ซึ่งตัวกลาง Apps Script ดึงไปให้ Gemini อ่าน
   - ใช้เฉพาะข้อมูลที่แสดงบนเว็บสาธารณะอยู่แล้ว ไม่อ่านไฟล์อื่นนอกเว็บ
   - ข่าวร่าง (draft) ไม่ถูกนำไปใส่
   - รันใหม่ทุกครั้งที่แก้ข่าว site.js หรือ members.js (check.js จะเตือนถ้าลืม)
   ========================================================= */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "data", "knowledge.txt");
const BASE = "https://watpolprot-cloud.github.io/prot-m54-2569/";

function load() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const scripts = [...html.matchAll(/<script[^>]+src="(data\/[^"]+)"/g)].map((m) => m[1]);
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const s of scripts) vm.runInContext(fs.readFileSync(path.join(ROOT, s), "utf8"), ctx, { filename: s });
  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  /* ชื่อหมวดข่าวและประเภทผลงานอ่านจาก app.js เพื่อให้ตรงกับหน้าเว็บ */
  const names = (v) => {
    const block = (app.match(new RegExp("var " + v + " = \\{([\\s\\S]*?)\\n  \\};")) || [])[1] || "";
    return Object.fromEntries([...block.matchAll(/^\s*(\w+):\s*\{\s*name:\s*"([^"]+)"/gm)].map((m) => [m[1], m[2]]));
  };
  return { w: ctx.window, CATS: names("CATS"), KINDS: names("KINDS") };
}

const MON = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const DAY = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
const thDate = (iso, wd) => {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return (wd ? "วัน" + DAY[d.getUTCDay()] + "ที่ " : "") + d.getUTCDate() + " " + MON[d.getUTCMonth()] + " " + (d.getUTCFullYear() + 543);
};
const WHO = { student: "นักเรียน", parent: "ผู้ปกครอง", all: "ทุกคน" };
const abs = (u) => (!u ? "" : /^(https?:|#)/.test(u) ? u : BASE + u);
const clean = (s) => String(s || "").replace(/\r/g, "").trim();

function build() {
  const { w, CATS, KINDS } = load();
  const S = w.M54_SITE || {}, A = w.M54_ARCHIVE || {}, M = w.M54_MEMBERS || {};
  const NEWS = (w.M54_NEWS || []).filter((n) => !n.draft).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const L = [];
  const h = (t) => L.push("", "==== " + t + " ====");

  L.push("คลังข้อมูลเว็บ ม.5/4 ศูนย์ข่าวสาร โรงเรียนพรตพิทยพยัต ปีการศึกษา 2569");
  L.push("สร้างจากข้อมูลบนเว็บ ข้อมูลเว็บอัปเดตล่าสุด " + thDate(S.updated));
  L.push("ที่อยู่เว็บ: " + BASE);
  L.push("ลิงก์ภายในเว็บ: ข่าวแต่ละข่าว #n=รหัสข่าว · แฟ้มผลงานนักเรียน #s=เลขที่ · หมวด #now ต้องรู้ตอนนี้, #news บอร์ดข่าวสาร, #calendar ปฏิทิน, #homework การบ้านประจำสัปดาห์ (ลิงก์ตรง #hw=เลขสัปดาห์), #timetable ตารางเรียนและการแต่งกาย, #docs เอกสารและบริการ, #parents สำหรับผู้ปกครอง, #members สมาชิกห้อง, #memories ความทรงจำ 1/2569");

  h("เกี่ยวกับเว็บนี้");
  L.push("เป็นพื้นที่กลางของห้อง ม.5/4 ทุกประกาศจากกลุ่ม LINE ของห้องถูกเก็บไว้ที่นี่เป็นหมวดหมู่ ค้นย้อนหลังได้ เห็นว่าเรื่องไหนด่วน และต้องทำอะไรเมื่อไร");
  L.push("กลุ่ม LINE ยังเป็นช่องทางแจ้งข่าวหลักและแจ้งลาเหมือนเดิม เว็บนี้เก็บทุกประกาศไว้ให้เปิดย้อนดูได้ตลอด");
  L.push("บันทึกเว็บไว้ที่หน้าจอโทรศัพท์ได้ โดยเปิดเว็บด้วยเบราว์เซอร์ แล้วเลือก \"เพิ่มไปยังหน้าจอโฮม\"");
  L.push("เว็บนี้เป็นเว็บสาธารณะ จึงไม่มีข้อมูลส่วนบุคคลของนักเรียน เช่น ผลการเรียนรายคน เบอร์โทรศัพท์ ที่อยู่ หรือข้อมูลครอบครัว เรื่องเฉพาะบุคคลครูจะติดต่อทาง LINE ส่วนตัว");

  h("ข้อมูลห้อง");
  const R = S.room || {};
  L.push("ชั้น ม.5/4 โรงเรียนพรตพิทยพยัต สพม.กท.2 ภาคเรียนปัจจุบัน " + (S.term || "") + (S.termStart ? " เปิดภาคเรียน " + thDate(S.termStart, true) : ""));
  L.push(`แผนการเรียน: ${R.plan || ""} · นักเรียน ${R.students} คน (ชาย ${R.boys} หญิง ${R.girls}) · คณะสี: ${R.house || ""}`);
  (S.teachers || []).forEach((t) => L.push(`ครูที่ปรึกษา: ${t.name} (${t.call}) ${t.dept}`));
  if ((R.committee || []).length) L.push("คณะกรรมการห้อง: " + R.committee.map((c) => `${c.role} ${c.name}`).join(" · "));

  h("ประกาศด่วนและวันสำคัญ");
  if (S.alert && S.alert.text) L.push("แถบประกาศด่วน: " + S.alert.text + (S.alert.until ? " (ถึง " + thDate(S.alert.until) + ")" : "") + (S.alert.link ? " " + S.alert.link : ""));
  else L.push("แถบประกาศด่วน: ไม่มี");
  (S.countdowns || []).forEach((c) => L.push(`นับถอยหลัง: ${c.label} ${thDate(c.date, true)}${c.end && c.end !== c.date ? " ถึง " + thDate(c.end, true) : ""}${c.time ? " เวลา " + c.time + " น." : ""}`));

  h("เรื่องที่ยังรอโรงเรียนประกาศ");
  (S.pending || []).forEach((p) => L.push(`- ${p.title}: ${p.note}`));

  h("ตารางเรียนและการแต่งกาย");
  const T = S.timetable;
  if (!T) L.push("ตารางเรียน ภาคเรียนที่ " + S.term + ": ยังไม่ประกาศ");
  else {
    L.push("ตารางเรียน: " + clean(T.note) + (T.image ? " ภาพต้นฉบับ " + abs(T.image) : ""));
    const per = Object.fromEntries((T.periods || []).map((p) => [p.n, p.time]));
    const A = T.alt;
    if (A) L.push(`${A.label} ใช้ ${A.from} ถึง ${A.to}: ${clean(A.why)} เวลาคาบ: ` + A.periods.map((t, i) => `คาบ ${i + 1} ${t}`).join(" · ") + " · เรียนเสร็จ " + Object.entries(A.ends || {}).map(([d, t]) => `วัน${d} ${t} น.`).join(" · ") + (A.tentative ? " (โรงเรียนยังอาจปรับเปลี่ยน)" : "") + " · นอกช่วงนี้ใช้เวลาคาบปกติข้างล่าง");
    Object.entries(T.days || {}).forEach(([d, list]) => {
      L.push(`วัน${d}: ` + list.map((c) => `คาบ ${c.p}${c.span > 1 ? "-" + (c.p + c.span - 1) : ""}${per[c.p] ? " (" + per[c.p] + ")" : ""} ${c.code || ""} ${c.name || ""}${c.teacher ? " " + c.teacher : ""}${c.room ? " ห้อง " + c.room : ""}`.replace(/\s+/g, " ")).join(" · "));
    });
  }
  const D = S.dress;
  if (!D) L.push("ตารางการแต่งกาย: ยังไม่ประกาศ");
  else L.push("ตารางการแต่งกาย: " + clean(D.note) + " " + Object.entries(D.days || {}).map(([d, v]) => `วัน${d} ${v}`).join(" · "));

  h("ปฏิทินกิจกรรม (เรียงตามวัน)");
  const cal = (S.calendar || []).map((c) => ({ date: c.date, end: c.end, title: c.title, time: c.time, place: c.place, link: "" }))
    .concat(NEWS.filter((n) => n.event && n.event.start).map((n) => ({ date: n.event.start, end: n.event.end, title: n.title, time: n.event.time, place: n.event.place, link: "#n=" + n.id })))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  cal.forEach((c) => L.push(`- ${thDate(c.date, true)}${c.end && c.end !== c.date ? " ถึง " + thDate(c.end, true) : ""}: ${c.title}${c.time ? " เวลา " + c.time : ""}${c.place ? " ที่ " + c.place : ""}${c.link ? " " + c.link : ""}`));

  h("เอกสารและบริการ");
  (S.docs || []).forEach((d) => L.push(`- [${d.group}] ${d.title}: ${d.desc}${d.url ? " ลิงก์ " + abs(d.url) : ""}`));

  h("คำถามที่ผู้ปกครองถามบ่อย");
  (S.faq || []).forEach((f) => L.push("ถาม: " + f.q, "ตอบ: " + clean(f.a)));

  h(`ข่าวและประกาศทั้งหมด ${NEWS.length} ข่าว (ใหม่ไปเก่า)`);
  NEWS.forEach((n) => {
    L.push("", `## ${n.title}`);
    L.push(`ลิงก์ #n=${n.id} · ประกาศ ${thDate(n.date, true)} · ภาคเรียน ${n.term} · หมวด ${CATS[n.cat] || n.cat} · ถึง ${(n.to || []).map((x) => WHO[x] || x).join(" และ ")}${n.src ? " · จาก " + n.src : ""}`);
    if (n.urgent) L.push("ข่าวด่วน" + (n.until ? " แสดงถึง " + thDate(n.until) : ""));
    L.push("สรุป: " + clean(n.summary));
    if (n.body && clean(n.body) !== clean(n.summary)) L.push(clean(n.body));
    if (n.event && n.event.start) L.push(`วันกิจกรรม: ${thDate(n.event.start, true)}${n.event.end && n.event.end !== n.event.start ? " ถึง " + thDate(n.event.end, true) : ""}${n.event.time ? " เวลา " + n.event.time : ""}${n.event.place ? " ที่ " + n.event.place : ""}`);
    (n.todo || []).forEach((t) => L.push(`สิ่งที่ต้องทำ (${WHO[t.who] || "ทุกคน"}): ${t.text}${t.due ? " กำหนด " + thDate(t.due, true) : ""}`));
    (n.links || []).forEach((l) => L.push(`ลิงก์: ${l.label} ${abs(l.url)}`));
    (n.files || []).forEach((f) => L.push(`ไฟล์แนบ: ${f.label || "ไฟล์"} ${abs(f.path)}`));
  });

  const HW = w.M54_HW || { weeks: [] };
  h("การบ้านประจำสัปดาห์");
  L.push(`สรุปโดย ${HW.by || "ฝ่ายวิชาการของห้อง"} ทุกสัปดาห์ ดูบนเว็บที่ #homework นักเรียนติ๊กงานที่ทำเสร็จได้ในเครื่องของตัวเอง กำหนดส่งและรายละเอียดงานให้ยึดตามที่ครูผู้สอนแจ้ง`);
  (HW.weeks || []).slice().sort((a, b) => b.week - a.week).forEach((wk) => {
    L.push("", `## การบ้านสัปดาห์ที่ ${wk.week} ภาคเรียน ${HW.term || S.term} (${thDate(wk.from, true)} ถึง ${thDate(wk.to, true)}) ลิงก์ #hw=${wk.week}`);
    if (wk.note) L.push(clean(wk.note));
    (wk.items || []).forEach((x) => L.push(`- ${x.subj} (${x.teacher}): ${x.task}${x.mode === "pair" ? " · งานคู่" : x.mode === "group" ? " · งานกลุ่ม" + (x.size ? " " + x.size + " คน" : "") : x.mode === "solo" ? " · งานเดี่ยว" : ""} · ${x.due ? "กำหนดส่ง " + thDate(x.due, true) : "กำหนดส่งตามที่ครูผู้สอนแจ้ง"}`));
  });

  h("สมาชิกห้อง ม.5/4 และแฟ้มผลงาน");
  L.push("ทุกคนมีแฟ้มผลงานบนเว็บ เปิดได้ที่ #s=เลขที่ แฟ้มรวมตำแหน่ง รางวัล งานเพื่อส่วนรวม และโครงงาน IS ไม่แสดงเกรดหรือลำดับที่");
  const roles = M.roles || {}, events = M.events || {}, groups = M.groups || {}, honors = Object.values(M.honors || {});
  (M.students || []).forEach((s) => {
    L.push("", `เลขที่ ${s.no} ${s.pre}${s.name} · แฟ้มผลงาน #s=${s.no}`);
    (s.roles || []).forEach((r) => L.push(`ตำแหน่ง: ${r}${roles[r] && roles[r].at ? " (" + roles[r].at + ")" : ""}${roles[r] && roles[r].n ? " #n=" + roles[r].n : ""}`));
    if (s.is && groups[s.is]) L.push(`โครงงาน IS: ${groups[s.is].name} (${groups[s.is].sub})`);
    const items = honors.filter((x) => (x.nos || []).includes(s.no)).map((x) => ({ term: x.term, k: "award", t: "ป้าย " + x.b, x: x.x }))
      .concat((s.items || []).map((it) => (typeof it === "string" ? events[it] : it)).filter(Boolean))
      .sort((a, b) => ((a.d || "9999") < (b.d || "9999") ? 1 : -1));
    if (!items.length && !(s.roles || []).length) L.push("ยังไม่มีผลงานบันทึกในแฟ้ม");
    items.forEach((it) => L.push(`- ${it.d ? thDate(it.d) : it.term ? "ภาคเรียน " + it.term : "ยังไม่ระบุวันที่"} · ${KINDS[it.k] || it.k} · ${it.t}${it.x ? ": " + it.x : ""}${it.n ? " #n=" + it.n : ""}`));
  });

  h("โครงงาน IS ของห้อง");
  Object.entries(groups).forEach(([k, g]) => {
    const mem = (M.students || []).filter((s) => s.is === k).map((s) => `${s.name} (เลขที่ ${s.no})`);
    L.push(`- ${g.name} (${g.sub}): ${g.desc}${g.show ? " · " + g.show : ""} · สมาชิก ${mem.join(", ") || "-"}`);
  });

  h("ความทรงจำ ภาคเรียนที่ " + (A.term || "1/2569"));
  L.push(`ภาพกิจกรรมทั้งหมด ${A.photos} ภาพ อัลบั้มรวม ${A.albumRoot || ""}`);
  if (A.web) L.push("เว็บไซต์ภาคเรียนที่ 1/2569: " + A.web);
  if (A.journal) L.push("วารสาร ม.5/4 ฉบับที่ 1 (PDF): " + A.journal);
  if (A.clip) L.push("คลิปความประทับใจ (YouTube): " + A.clip);
  (A.acts || []).forEach((a) => L.push(`- กิจกรรมที่ ${a.n} ${thDate(a.date, true)}: ${a.title} ${a.desc}${a.count ? " (ภาพ " + a.count + " ภาพ" + (a.album ? " อัลบั้ม https://drive.google.com/drive/folders/" + a.album : "") + ")" : ""}`));
  L.push("ความภาคภูมิใจของห้อง:");
  (A.pride || []).forEach((p) => L.push(`- ${p.who}: ${p.what}`));

  return L.join("\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

module.exports = { build, OUT };
if (require.main === module) {
  const txt = build();
  fs.writeFileSync(OUT, txt);
  console.log(`เขียน data/knowledge.txt แล้ว ${txt.length.toLocaleString()} ตัวอักษร ${Buffer.byteLength(txt).toLocaleString()} ไบต์`);
}
