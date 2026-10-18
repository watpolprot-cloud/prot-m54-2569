/* =========================================================
   ตรวจข้อมูลเว็บ ม.5/4 ก่อนส่งให้ครูกด Commit/Push
   วิธีใช้:  node tools/check.js          (รันที่โฟลเดอร์ราก)
   ตรวจ 3 อย่าง
   1) ข่าวทุกข่าวมีช่องครบ รูปแบบวันที่ถูก หมวดถูก id ไม่ซ้ำ ไฟล์แนบมีจริง
      และข้อมูลสมาชิกห้อง (รูป ตำแหน่ง ผลงาน กลุ่มโครงงาน) อ้างถึงของที่มีจริง
   2) สแกนหาข้อมูลส่วนบุคคลที่ห้ามขึ้นเว็บ (เบอร์โทร เลขบัตรประชาชน
      รหัสนักเรียน 5 หลัก เลขบัญชี ที่อยู่ เกรดรายคน)
   3) สรุปจำนวนข่าว ข่าวด่วนที่ยังขึ้นอยู่ สิ่งที่ต้องทำ และข่าวร่าง
   จบด้วย exit code 1 ถ้ามีข้อผิดพลาดที่ต้องแก้
   ========================================================= */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const errors = [], warns = [];
const err = (m) => errors.push(m), warn = (m) => warns.push(m);

/* ---------- โหลดข้อมูลแบบเดียวกับที่เบราว์เซอร์โหลด ---------- */
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script[^>]+src="(data\/[^"]+)"/g)].map((m) => m[1]);
const ctx = { window: {} };
vm.createContext(ctx);
for (const s of scripts) {
  const f = path.join(ROOT, s);
  if (!fs.existsSync(f)) { err(`index.html โหลดไฟล์ ${s} แต่ไม่มีไฟล์นี้`); continue; }
  try { vm.runInContext(fs.readFileSync(f, "utf8"), ctx, { filename: s }); }
  catch (e) { err(`${s} มีจุดผิดไวยากรณ์: ${e.message}`); }
}
for (const f of fs.readdirSync(path.join(ROOT, "data"))) {
  if (f.endsWith(".js") && !scripts.includes("data/" + f)) warn(`มีไฟล์ data/${f} แต่ index.html ยังไม่ได้โหลด`);
}
const SITE = ctx.window.M54_SITE || {}, NEWS = ctx.window.M54_NEWS || [];

/* หมวดอ่านจาก app.js เพื่อให้ตรงกับหน้าเว็บเสมอ */
const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const catBlock = (app.match(/var CATS = \{([\s\S]*?)\n  \};/) || [])[1] || "";
const CATS = [...catBlock.matchAll(/^\s*(\w+):\s*\{/gm)].map((m) => m[1]);
const WHO = ["student", "parent"];

/* ---------- 1) ตรวจโครงข่าว ---------- */
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const okDate = (s) => ISO.test(s) && !isNaN(new Date(s + "T00:00:00Z"));
const ids = new Set();
NEWS.forEach((n, i) => {
  const at = `ข่าว ${n.id || "#" + (i + 1)}`;
  for (const k of ["id", "term", "date", "title", "cat", "to", "summary"]) if (!n[k] || (Array.isArray(n[k]) && !n[k].length)) err(`${at}: ไม่มีช่อง ${k}`);
  if (n.id) {
    if (ids.has(n.id)) err(`${at}: id ซ้ำ`);
    ids.add(n.id);
    if (!/^25\d\d-\d\d-\d\d-[a-z0-9-]+$/.test(n.id)) err(`${at}: id ต้องเป็นแบบ 2569-11-02-slug (อังกฤษตัวเล็ก ตัวเลข ขีด)`);
    else if (n.date && okDate(n.date)) {
      const be = String(+n.date.slice(0, 4) + 543) + n.date.slice(4);
      if (n.id.slice(0, 10) !== be) warn(`${at}: วันที่ใน id (${n.id.slice(0, 10)}) ไม่ตรงกับ date (${be})`);
    }
  }
  if (n.term && !/^[12]\/25\d\d$/.test(n.term)) err(`${at}: term ต้องเป็นแบบ 2/2569`);
  if (n.date && !okDate(n.date)) err(`${at}: date ต้องเป็น ค.ศ. แบบ 2026-11-02`);
  if (n.until && !okDate(n.until)) err(`${at}: until ต้องเป็น ค.ศ. แบบ 2026-11-02`);
  if (n.cat && !CATS.includes(n.cat)) err(`${at}: หมวด "${n.cat}" ไม่มีในเว็บ ใช้ได้: ${CATS.join(" ")}`);
  (n.to || []).forEach((w) => { if (!WHO.includes(w)) err(`${at}: to ใช้ได้แค่ student หรือ parent`); });
  (n.todo || []).forEach((t) => {
    if (!t.text) err(`${at}: todo ไม่มีข้อความ`);
    if (t.due && !okDate(t.due)) err(`${at}: todo.due ต้องเป็น ค.ศ. แบบ 2026-11-02`);
    if (t.who && !WHO.includes(t.who) && t.who !== "all") err(`${at}: todo.who ใช้ได้ student parent all`);
  });
  if (n.event) {
    if (!okDate(n.event.start || "")) err(`${at}: event.start ต้องเป็น ค.ศ. แบบ 2026-11-02`);
    if (n.event.end && !okDate(n.event.end)) err(`${at}: event.end ต้องเป็น ค.ศ. แบบ 2026-11-02`);
  }
  (n.links || []).forEach((l) => { if (!/^https:\/\//.test(l.url || "")) err(`${at}: ลิงก์ "${l.label}" ต้องขึ้นต้นด้วย https://`); });
  (n.files || []).forEach((f) => {
    if (!f.path || !fs.existsSync(path.join(ROOT, f.path))) err(`${at}: ไม่พบไฟล์แนบ ${f.path}`);
    else if (/[^\x20-\x7e]/.test(f.path)) warn(`${at}: ชื่อไฟล์ ${f.path} ควรเป็นภาษาอังกฤษล้วน`);
  });
});
(SITE.calendar || []).forEach((c) => { if (!okDate(c.date || "")) err(`site.js calendar: วันที่ "${c.date}" ต้องเป็น ค.ศ. แบบ 2026-11-02`); });
(SITE.countdowns || []).forEach((c) => { if (!okDate(c.date || "")) err(`site.js countdowns: วันที่ "${c.date}" ต้องเป็น ค.ศ.`); });

/* ---------- 1.5) ตรวจสมาชิกห้องและแฟ้มผลงาน (data/members.js) ---------- */
const MEM = ctx.window.M54_MEMBERS, ARC = ctx.window.M54_ARCHIVE || {};
const STU = (MEM && MEM.students) || [];
if (!MEM) err("ไม่พบข้อมูลสมาชิก ตรวจว่า index.html โหลด data/members.js");
else {
  const kindBlock = (app.match(/var KINDS = \{([\s\S]*?)\n  \};/) || [])[1] || "";
  const KINDS = [...kindBlock.matchAll(/^\s*(\w+):\s*\{/gm)].map((m) => m[1]);
  const liveIds = new Set(NEWS.filter((n) => !n.draft).map((n) => n.id));
  const roles = MEM.roles || {}, events = MEM.events || {}, groups = MEM.groups || {}, order = MEM.order || [];
  const fileOk = (p) => p && fs.existsSync(path.join(ROOT, p));
  const checkItem = (it, at) => {
    if (!it.t) err(`${at}: ผลงานไม่มีชื่อ (t)`);
    if (!KINDS.includes(it.k)) err(`${at}: ประเภท k "${it.k}" ใช้ได้: ${KINDS.join(" ")}`);
    if (it.d && !okDate(it.d)) err(`${at}: d ต้องเป็น ค.ศ. แบบ 2026-11-02`);
    if (!it.d && !it.term) warn(`${at}: "${it.t}" ไม่มีวันที่ (d) หรือภาคเรียน (term)`);
    if (it.term && !/^[12]\/25\d\d$/.test(it.term)) err(`${at}: term ต้องเป็นแบบ 2/2569`);
    if (it.n && !liveIds.has(it.n)) err(`${at}: ไม่พบข่าว ${it.n} (หรือยังเป็นข่าวร่าง)`);
    if (it.act && !(ARC.acts || []).some((a) => a.n === it.act)) err(`${at}: ไม่มีกิจกรรมเลข ${it.act} ในความทรงจำ`);
    (it.img || []).forEach((p) => { if (!fileOk(p)) err(`${at}: ไม่พบภาพ ${p}`); });
  };
  if (STU.length !== 40) warn(`members.js มีนักเรียน ${STU.length} คน (ห้องมี 40 คน)`);
  const nos = STU.map((s) => s.no);
  nos.forEach((n, i) => { if (nos.indexOf(n) !== i) err(`members.js: เลขที่ ${n} ซ้ำ`); });
  Object.entries(events).forEach(([k, e]) => checkItem(e, `members.js events.${k}`));
  Object.entries(roles).forEach(([k, r]) => {
    if (!order.includes(k)) warn(`members.js: ตำแหน่ง "${k}" ไม่อยู่ใน order จึงไม่ขึ้นแถวบน`);
    if (r.n && !liveIds.has(r.n)) err(`members.js roles "${k}": ไม่พบข่าว ${r.n}`);
  });
  Object.entries(groups).forEach(([k, g]) => {
    if (!fileOk(g.poster)) err(`members.js groups.${k}: ไม่พบโปสเตอร์ ${g.poster}`);
    if (!g.name || !g.desc) err(`members.js groups.${k}: ต้องมี name และ desc`);
    if (!STU.some((s) => s.is === k)) warn(`members.js groups.${k}: ยังไม่มีสมาชิก`);
  });
  /* ป้ายเกียรติ: เก็บเฉพาะเลขที่ เรียงตามเลขที่ และไม่มีตัวเลขผลการเรียน */
  Object.entries(MEM.honors || {}).forEach(([k, h]) => {
    const at = `members.js honors.${k}`, ns = h.nos || [];
    if (!h.b || !h.t) err(`${at}: ต้องมี b และ t`);
    if (!/^[12]\/25\d\d$/.test(h.term || "")) err(`${at}: term ต้องเป็นแบบ 1/2569`);
    ns.forEach((n, i) => {
      if (!nos.includes(n)) err(`${at}: ไม่มีนักเรียนเลขที่ ${n}`);
      if (ns.indexOf(n) !== i) err(`${at}: เลขที่ ${n} ซ้ำ`);
    });
    if (ns.some((n, i) => i && n < ns[i - 1])) err(`${at}: nos ต้องเรียงตามเลขที่ ห้ามเรียงตามอันดับ`);
    if (/\d\.\d/.test([h.b, h.t, h.x].join(" "))) err(`${at}: ห้ามมีตัวเลขผลการเรียน`);
  });
  STU.forEach((s) => {
    const at = `members.js เลขที่ ${s.no}`;
    if (!/^\S+ \S+/.test(s.name || "")) err(`${at}: name ต้องเป็น "ชื่อ นามสกุล"`);
    if (!s.pre) err(`${at}: ไม่มีคำนำหน้า (pre)`);
    if (s.photo && !fileOk(s.photo)) err(`${at}: ไม่พบรูป ${s.photo}`);
    if (s.is && !groups[s.is]) err(`${at}: ไม่มีกลุ่มโครงงาน ${s.is}`);
    (s.roles || []).forEach((r) => { if (!roles[r]) err(`${at}: ตำแหน่ง "${r}" ยังไม่มีใน roles`); });
    (s.items || []).forEach((it) => {
      if (typeof it === "string") { if (!events[it]) err(`${at}: ไม่มี events "${it}"`); }
      else checkItem(it, at);
    });
  });
  ((SITE.room || {}).committee || []).forEach((c) => {
    const s = STU.find((x) => x.name === c.name);
    if (!s) warn(`site.js committee: ไม่พบ "${c.name}" ใน members.js`);
    else if (!(s.roles || []).includes(c.role)) warn(`site.js committee: ${c.name} เป็น${c.role} แต่ members.js ไม่ได้ใส่ตำแหน่งนี้`);
  });
}
/* ชื่อไฟล์ห้ามมีเลข 5 หลัก เพราะรูปจากระบบโรงเรียนมักตั้งชื่อด้วยรหัสนักเรียน */
(function scanNames(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name.startsWith(".") || f.name === "node_modules") continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) scanNames(p);
    else {
      const m = f.name.match(/(?<!\d)\d{5}(?!\d)/);
      if (m && !/^2\d{4}$/.test(m[0])) err(`ชื่อไฟล์ ${path.relative(ROOT, p)} มีเลข 5 หลัก (อาจเป็นรหัสนักเรียน) ให้เปลี่ยนชื่อ`);
    }
  }
})(ROOT);

/* ---------- 1.6) ผู้ช่วยตอบคำถาม (แชตบอต) ----------
   คลังความรู้ต้องสร้างใหม่ทุกครั้งที่ข้อมูลเว็บเปลี่ยน และห้ามมีรหัส API ในไฟล์ใดของเว็บ */
const BOT = SITE.chatbot || {};
if (BOT.url && !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(BOT.url)) err("site.js chatbot.url ต้องเป็นลิงก์ Web app ของ Apps Script แบบ https://script.google.com/macros/s/.../exec");
try {
  const kb = require("./build-knowledge.js");
  if (!fs.existsSync(kb.OUT)) err("ยังไม่มี data/knowledge.txt ให้รัน node tools/build-knowledge.js");
  else if (fs.readFileSync(kb.OUT, "utf8") !== kb.build()) err("data/knowledge.txt ไม่ตรงกับข้อมูลเว็บล่าสุด ให้รัน node tools/build-knowledge.js แล้วตรวจใหม่");
} catch (e) { err("สร้างคลังความรู้ของผู้ช่วยไม่ได้: " + e.message); }
(function scanKeys(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === ".git" || f.name === "node_modules") continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) scanKeys(p);
    else if (/\.(js|gs|html|md|json|txt|csv|css)$/i.test(f.name) && /AIza[0-9A-Za-z_-]{35}/.test(fs.readFileSync(p, "utf8")))
      err(`พบสิ่งที่คล้ายรหัส API ของ Google ใน ${path.relative(ROOT, p)} ห้ามเผยแพร่ ลบออกก่อน แล้วเปลี่ยนรหัสใหม่ที่ Google AI Studio`);
  }
})(ROOT);

/* ---------- 2) สแกนข้อมูลส่วนบุคคล ---------- */
const RULES = [
  [/(?<![\d/])0[689]\d[- ]?\d{3}[- ]?\d{4}(?!\d)/g, "เบอร์มือถือ"],
  [/(?<![\d/])0[2-7][- ]?\d{3}[- ]?\d{4}(?!\d)/g, "เบอร์โทรบ้าน/สำนักงาน"],
  [/(?<![\d-])\d-?\d{4}-?\d{5}-?\d{2}-?\d(?![\d-])/g, "เลขบัตรประชาชน 13 หลัก"],
  [/(?<![\d,./:\u0E00-\u0E7FA-Za-z-])\d{5}(?![\d,./:])/g, "เลข 5 หลัก (อาจเป็นรหัสนักเรียน)"],  /* ไม่นับรหัสวิชา เช่น ว32204 */
  [/(?<!\d)\d{3}-\d-\d{5}-\d(?!\d)/g, "เลขบัญชีธนาคาร"],
  [/บ้านเลขที่|เลขที่บ้าน|หมู่ที่\s*\d|ตำบล|แขวง\S+\s+เขต/g, "ที่อยู่"],
  [/เกรดเฉลี่ย|GPA|ผลการเรียนเฉลี่ย|\b[0-4]\.\d\d\b/g, "ผลการเรียน (ถ้าเป็นเกณฑ์ทั่วไปใช้ได้ ถ้าเป็นของนักเรียนรายคนต้องลบ)", "warn"],
  [/เลขบัญชี|พร้อมเพย์|รหัสผ่าน|password/gi, "ข้อมูลการเงินหรือรหัสผ่าน"]
];
/* ข้อความที่ตรงรูปแบบแต่ไม่ใช่ข้อมูลส่วนบุคคล เช่น ปีการศึกษา หรือเลขสถิติ */
const ALLOW = [/^2\d{4}$/];
const SKIP_DIRS = new Set([".git", "archive", "img", "node_modules", "tools"]);
/* app.js เป็นโค้ด ส่วนคู่มือพูดถึงกฎเรื่องข้อมูลส่วนบุคคลจึงมีคำต้องห้ามอยู่แล้ว
   knowledge.txt สร้างจากไฟล์ข้อมูลที่สแกนแล้ว จึงไม่สแกนซ้ำ */
const SKIP_FILES = new Set(["app.js", "README.md", "UPDATE_GUIDE.md", "knowledge.txt"]);
function walk(dir, out) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name.startsWith(".") && f.name !== ".nojekyll") continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (!SKIP_DIRS.has(f.name)) walk(p, out); }
    else if (/\.(js|html|md|json|txt|csv)$/i.test(f.name) && !SKIP_FILES.has(f.name)) out.push(p);
  }
  return out;
}
for (const file of walk(ROOT, [])) {
  const rel = path.relative(ROOT, file);
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    /* ข้ามไอดีใน URL และไอดี Google Drive / YouTube */
    const text = line.replace(/https?:\/\/\S+/g, " ").replace(/["'][A-Za-z0-9_-]{11,}["']/g, " ").replace(/#[0-9a-f]{6}\b/gi, " ");
    for (const [re, label, level] of RULES) {
      for (const m of text.matchAll(re)) {
        if (ALLOW.some((a) => a.test(m[0]))) continue;
        const near = text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).trim();
        (level === "warn" ? warn : err)(`ข้อมูลส่วนบุคคล? ${label} "${m[0]}" ที่ ${rel}:${i + 1}  ...${near}...`);
      }
    }
  });
}
for (const f of fs.readdirSync(ROOT)) {
  if (/^_|\.(xlsx?|docx?|csv|pdf)$/i.test(f)) warn(`ไฟล์ ${f} ที่รากเว็บจะถูกเผยแพร่ด้วย ตรวจว่าตั้งใจหรือไม่`);
}

/* ---------- 3) สรุป ---------- */
const today = process.env.TODAY || new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10);
const live = NEWS.filter((n) => !n.draft);
const byTerm = {}, byCat = {};
live.forEach((n) => { byTerm[n.term] = (byTerm[n.term] || 0) + 1; byCat[n.cat] = (byCat[n.cat] || 0) + 1; });
const days = (a, b) => Math.round((new Date(a) - new Date(b)) / 864e5);
const urgent = live.filter((n) => n.urgent && (n.until ? n.until >= today : days(today, n.date) <= 3));
const todos = [];
live.forEach((n) => (n.todo || []).forEach((t) => { if (!t.due || days(today, t.due) <= 2) todos.push(`${t.due || "ไม่มีกำหนด"}  ${t.text}`); }));

console.log(`\nเว็บ ม.5/4  ตรวจวันที่ ${today}  (ใช้ TODAY=2026-11-02 node tools/check.js เพื่อจำลองวันอื่น)`);
console.log(`ข่าวที่แสดง ${live.length} ข่าว  ` + Object.entries(byTerm).map(([k, v]) => `${k}: ${v}`).join("  "));
console.log("ตามหมวด  " + CATS.filter((c) => byCat[c]).map((c) => `${c} ${byCat[c]}`).join("  "));
console.log(`ข่าวด่วนที่ขึ้นอยู่ตอนนี้ ${urgent.length}` + urgent.map((n) => `\n  - ${n.title}`).join(""));
console.log(`สิ่งที่ต้องทำที่ยังแสดง ${todos.length}` + todos.sort().map((t) => `\n  - ${t}`).join(""));
const drafts = NEWS.filter((n) => n.draft);
if (drafts.length) console.log(`ข่าวร่าง (ยังไม่แสดง) ${drafts.length}` + drafts.map((n) => `\n  - ${n.id}`).join(""));
console.log(`site.js updated: ${SITE.updated}  รอประกาศ: ${(SITE.pending || []).length} เรื่อง`);
console.log(`ผู้ช่วยตอบคำถาม: ${BOT.url ? "เปิดใช้ " + BOT.url : "ซ่อนอยู่ (ยังไม่ใส่ chatbot.url)"}`);
if (STU.length) {
  const noPhoto = STU.filter((s) => !s.photo).map((s) => s.no);
  console.log(`สมาชิก ${STU.length} คน  มีรูป ${STU.length - noPhoto.length}` + (noPhoto.length ? ` (ยังไม่มีรูป เลขที่ ${noPhoto.join(", ")})` : "") +
    `  มีตำแหน่ง ${STU.filter((s) => (s.roles || []).length).length}  มีผลงานในแฟ้ม ${STU.filter((s) => (s.items || []).length || Object.values(MEM.honors || {}).some((h) => (h.nos || []).includes(s.no))).length} คน` +
    `  ป้ายเกียรติ ${Object.values(MEM.honors || {}).map((h) => h.b + " " + (h.nos || []).length + " คน").join(" · ") || "-"}`);
}

if (warns.length) console.log("\nควรดู\n" + warns.map((w) => "  ! " + w).join("\n"));
if (errors.length) { console.log("\nต้องแก้ก่อนเผยแพร่\n" + errors.map((e) => "  x " + e).join("\n")); process.exit(1); }
console.log("\nผ่าน ไม่พบข้อผิดพลาด\n");
