/* ม.5/4 ศูนย์ข่าวสาร — สคริปต์หน้าเว็บ (ไม่ต้องแก้ไฟล์นี้เวลาเพิ่มข่าว) */
(function () {
  "use strict";
  var SITE = window.M54_SITE || {};
  var ARC = window.M54_ARCHIVE || { acts: [], pride: [] };
  var params = new URLSearchParams(location.search);
  var PREVIEW = params.has("preview");
  var ALL = (window.M54_NEWS || []).filter(function (n) { return PREVIEW || !n.draft; });

  var CATS = {
    schedule: { name: "ตารางเรียนและวันหยุด", c: "#3d6fd1" },
    homework: { name: "งานและการบ้าน", c: "#6a44a3" },
    exam:     { name: "วัดผลและสอบ", c: "#c2410c" },
    rules:    { name: "ระเบียบและการแต่งกาย", c: "#475569" },
    event:    { name: "กิจกรรมและวันสำคัญ", c: "#b9821a" },
    house:    { name: "คณะสีกระดังงา", c: "#2c9a68" },
    chance:   { name: "โอกาส ทุน และพอร์ต", c: "#0e8a9c" },
    parent:   { name: "เรื่องถึงผู้ปกครอง", c: "#a3437e" },
    care:     { name: "สุขภาพและความปลอดภัย", c: "#c8343c" },
    docs:     { name: "เอกสารและบริการ", c: "#5b5bd6" },
    pride:    { name: "ข่าวดีและผลงาน", c: "#d4a019" }
  };
  var WHO = { student: "นักเรียน", parent: "ผู้ปกครอง" };
  var MONTHS = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
  var MON = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
  var DAYS = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];

  /* ---------- dates (เวลาประเทศไทย) ---------- */
  function bkkToday() {
    if (params.get("today")) return params.get("today");
    var d = new Date(Date.now() + 7 * 3600 * 1000);
    return d.toISOString().slice(0, 10);
  }
  var TODAY = bkkToday();
  function parse(iso) { var p = iso.split("-"); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); }
  function iso(d) { return d.toISOString().slice(0, 10); }
  function diffDays(a, b) { return Math.round((parse(a) - parse(b)) / 86400000); }
  function thLong(s) { var d = parse(s); return "วัน" + DAYS[d.getUTCDay()] + "ที่ " + d.getUTCDate() + " " + MONTHS[d.getUTCMonth()] + " " + (d.getUTCFullYear() + 543); }
  function thMed(s) { var d = parse(s); return d.getUTCDate() + " " + MONTHS[d.getUTCMonth()] + " " + (d.getUTCFullYear() + 543); }
  function thShort(s) { var d = parse(s); return d.getUTCDate() + " " + MON[d.getUTCMonth()] + " " + String(d.getUTCFullYear() + 543).slice(2); }
  function rangeTxt(a, b) { return b && b !== a ? thShort(a) + " – " + thShort(b) : thLong(a); }

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  /* กันคำไทยที่เป็นคำประสมไม่ให้ถูกตัดกลางคำเวลาขึ้นบรรทัดใหม่ */
  var KEEP = ["การแต่งกาย","ผู้ปกครอง","ภาคเรียน","ปีการศึกษา","ค่าบำรุงการศึกษา","ทุนการศึกษา","การศึกษา","การบ้าน","ประชาสัมพันธ์","วิศวกรรม","สถาปัตยกรรม",
    "เทคโนโลยี","วิทยาศาสตร์","คณิตศาสตร์","พรตพิทยพยัต","กระดังงา","ครูที่ปรึกษา","เกียรติบัตร","จิตอาสา","ทำความสะอาด","อุทกภัย","กิจกรรม","ความปลอดภัย",
    "ปฏิทินวิชาการ","ปฏิทิน","บริหารวิชาการ","สำนักงานวิชาการ","วิชาการ","ใบรับรอง","ผลการเรียน","ผลสัมฤทธิ์","การเรียน","นักเรียน","อนุญาต","ประกาศ","ระเบียบ",
    "วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์","วันอาทิตย์","ประชุม","เยี่ยมบ้าน","ฟุตซอล","ตักบาตร","ประกันอุบัติเหตุ","อุบัติเหตุ",
    "สุขภาพ","พอร์ตโฟลิโอ","แอปพลิเคชัน","อิเล็กทรอนิกส์","เครื่องแบบ","ทรงผม","ห้องเรียน","โรงเรียน","ลานโดมอเนกประสงค์","หอประชุม","ประมวลภาพ",
    "ความประทับใจ","วีดิทัศน์","วารสาร","เว็บไซต์","ผู้อำนวยการ","แข่งขัน","สมัคร","คณะสี","ชุดนักเรียน","ชุดพละ","ปิดภาคเรียน","เปิดภาคเรียน","ตารางเรียน","ตารางสอบ",
    "วัดผล","ประเมินผล","สอบปลายภาค","สอบกลางภาค","ภาพกิจกรรม","อัลบั้ม","ความภาคภูมิใจ","ดำเนินการ","รายละเอียด","เรียบร้อย",
    "หมวดหมู่","คัดลอก","วันสำคัญ","สิ่งที่ต้องทำ","ย้อนหลัง","ไฮไลต์","ลิงก์","ข่าวสาร","ห้องเรา","กะทันหัน","กำหนดส่ง","ถอยหลัง","หน้าจอ","โทรศัพท์",
    "เบราว์เซอร์","ส่วนบุคคล","ครอบครัว","ส่วนตัว","ครูประจำวิชา","ฉบับเต็ม","ค้นหา","เร่งด่วน","อย่างเป็นทางการ","ทางการ","ปรึกษา","ช่องทาง","คำตอบ","สอบถาม",
    "รูปแบบ","ข้อมูล","ติดต่อ","ตัวแทน","ระหว่าง","ประมาณ","สามัคคี","รับผิดชอบ","สนับสนุน","ร่วมมือ","คำร้อง","รูปถ่าย","ใบเสร็จ","ใบรับรองแพทย์","บัตรประชาชน","หลักฐาน","สำเนา","ค่าใช้จ่าย","ล่วงหน้า","เพิ่มเติม","รายชื่อ","สัปดาห์","เข้าแถว","เสาธง","อาหารกลางวัน","น้ำดื่ม","อุปกรณ์","มะพร้าว","กางเกง","รองเท้า","ผ้าใบ","เสื้อพละ","ลงทะเบียน","ประกาศนียบัตร","มหาวิทยาลัย","ชั่วโมง","เรียบเรียง","วีดิโอ","คลิป","ยูทูบ",
    "เพื่อนที่ปรึกษา","หัวหน้าห้อง","รองหัวหน้าห้อง","เหรัญญิก","หัวหน้าฝ่าย","ประธาน","รองชนะเลิศ","อันดับ","การแข่งขัน","โครงงาน","ตอบปัญหา","สังคม","ดนตรีไทย","ตะโพน","กลองยาว",
    "ลูกเสือ","นักดนตรี","กีตาร์","ร้องนำ","การแสดง","ถวายพระพร","ชัยมงคล","ราชินี","วันแม่แห่งชาติ","ประดิษฐ์","ไหว้ครู","อบรม","คัดเลือก","ยอดเยี่ยม","วิศวกรรมศาสตร์",
    "นิทรรศการ","หลักสูตร","ปทุมธานี","แบบพกพา","อัจฉริยะ","แจ้งเตือน","สัตว์ป่า","ลูกระนาด","มะเขือเทศ","สัตว์เลี้ยง","กล่องยา","พลังงาน","กังหันลม","โซลาร์ไลฟ์","ประหยัด",
    "ไมโครคอนโทรลเลอร์","เซนเซอร์","อัตโนมัติ","เรียลไทม์","ความเร็ว","ผู้ขับขี่","ผู้สูงอายุ","รับประทาน","ลูกหลาน","อุปกรณ์ไฟฟ้า","เชื้อเพลิง","ฟอสซิล","แสงอาทิตย์","รวบรวม",
    "ประจำสัปดาห์","ภาระงาน","เปอร์เซ็นไทล์","คะแนน","ธรรมชาติ","กลั่นแกล้ง","ต้อนรับ","ประตู","สถาปนิก","วิศวกร","ความชื้น","อุณหภูมิ","ตรวจจับ","คำนวณ","กะพริบ","ปั๊ม","ตารางเวร","ตาราง","สั่งงาน","ภาคภูมิใจ","สีเขียว","พัฒนาการ","พัฒนาขึ้น","สูงสุด","ที่สุด","อันดับแรก","อันดับร่วม","ผลงาน","ทุกคน"];
  var KEEP_RE = new RegExp("(" + KEEP.sort(function (a, b) { return b.length - a.length; }).join("|") + ")", "g");
  /* แก้เฉพาะข้อความ ไม่แตะแท็กและแอตทริบิวต์ และกันคำอังกฤษมีขีด เช่น E-PLC ไม่ให้ขาดที่ขีด */
  function protect(h) {
    return String(h).replace(/(<[^>]*>)|([^<]+)/g, function (m, tag, text) {
      if (tag) return tag;
      return text.replace(KEEP_RE, '<span class="nw">$1</span>').replace(/\b([A-Za-z]{1,8}-[A-Za-z0-9]{1,10})\b/g, '<span class="nw">$1</span>');
    });
  }
  function tx(s) { return protect(esc(s)); }
  function cat(n) { return CATS[n.cat] || { name: "ทั่วไป", c: "#6c6379" }; }
  function whoTxt(to) { return (to || []).map(function (w) { return WHO[w] || w; }).join(" · "); }
  function byDateDesc(a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }
  function isUrgentNow(n) { return n.urgent && (!n.until ? diffDays(TODAY, n.date) <= 3 : n.until >= TODAY); }
  function toast(t) { var el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove("show"); }, 2200); }
  function copy(text, msg) {
    function ok() { toast(msg || "คัดลอกแล้ว"); }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(ok, fallback); } else fallback();
    function fallback() { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) { toast("คัดลอกไม่สำเร็จ"); } t.remove(); }
  }
  function bodyHtml(txt) {
    var out = [], list = [];
    function flush() { if (list.length) { out.push("<ul>" + list.join("") + "</ul>"); list = []; } }
    String(txt || "").split("\n").forEach(function (line) {
      var l = line.trim();
      if (/^[-•]\s+/.test(l)) { list.push("<li>" + protect(linkify(esc(l.replace(/^[-•]\s+/, "")))) + "</li>"); }
      else { flush(); if (l) out.push("<p>" + protect(linkify(esc(l))) + "</p>"); }
    });
    flush(); return out.join("");
  }
  function linkify(s) { return s.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>'); }
  function newsUrl(id) { return location.origin + location.pathname + "#n=" + encodeURIComponent(id); }
  function newsById(id) { return ALL.filter(function (x) { return x.id === id; })[0]; }
  function pad2(n) { return String(n).padStart(2, "0"); }

  /* ---------- สมาชิกห้อง (ข้อมูลจาก data/members.js) ---------- */
  var MEM = window.M54_MEMBERS || {};
  ["order", "students"].forEach(function (k) { MEM[k] = MEM[k] || []; });
  ["roles", "events", "groups", "honors"].forEach(function (k) { MEM[k] = MEM[k] || {}; });
  var STU = MEM.students.slice().sort(function (a, b) { return a.no - b.no; });
  var KINDS = {
    award:   { name: "รางวัลและเกียรติบัตร", c: "#c48a0e" },
    contest: { name: "การแข่งขันและเวทีวิชาการ", c: "#c2410c" },
    rep:     { name: "ตัวแทนห้องและโรงเรียน", c: "#6a44a3" },
    talent:  { name: "ความสามารถพิเศษ", c: "#0e8a9c" },
    service: { name: "งานเพื่อส่วนรวม", c: "#2c9a68" }
  };
  function stu(no) { return STU.filter(function (s) { return s.no === +no; })[0]; }
  function stuByName(n) { return STU.filter(function (s) { return s.name === n; })[0]; }
  function nameParts(s) { var p = s.name.split(" "); return { first: p[0], last: p.slice(1).join(" ") }; }
  function nwName(t) { return String(t).split(" ").map(function (w) { return '<span class="nw">' + esc(w) + "</span>"; }).join(" "); }
  function photoHtml(s) {
    if (s.photo) return '<img src="' + esc(s.photo) + '" alt="' + esc(s.pre + s.name) + '" loading="lazy" decoding="async">';
    return '<span class="ini" aria-hidden="true">' + esc(nameParts(s).first.replace(/^[เแโใไ]/, "").charAt(0)) + "</span>";
  }
  function rolesOf(s) { return (s.roles || []).slice().sort(function (a, b) { return MEM.order.indexOf(a) - MEM.order.indexOf(b); }); }
  function rankOf(s) { var r = rolesOf(s).map(function (t) { return MEM.order.indexOf(t); }).filter(function (i) { return i > -1; }); return r.length ? r[0] : 99; }
  function honorsOf(s) {
    return Object.keys(MEM.honors).map(function (k) { return MEM.honors[k]; }).filter(function (h) { return (h.nos || []).indexOf(s.no) > -1; });
  }
  function itemsOf(s) {
    return honorsOf(s).map(function (h) { return { term: h.term, k: "award", star: true, t: h.t, x: h.x }; })
      .concat((s.items || []).map(function (it) { return typeof it === "string" ? MEM.events[it] : it; })).filter(Boolean)
      .sort(function (a, b) { var x = a.d || "9999", y = b.d || "9999"; return x < y ? 1 : x > y ? -1 : (b.star ? 1 : 0) - (a.star ? 1 : 0); });
  }

  /* กันตัดคำในข้อความที่เขียนไว้ใน index.html */
  $$(".sec-desc, .sec-head h2, .hero-lead, .hero-sub, .steps li, .privacy, .pending > p").forEach(function (el) {
    if (el.querySelector("#rotator")) return;
    el.innerHTML = protect(el.innerHTML);
  });

  /* ---------- alert bar ---------- */
  (function () {
    var a = SITE.alert; var bar = $("#alertbar");
    if (a && a.text && (!a.until || a.until >= TODAY)) {
      bar.innerHTML = esc(a.text) + (a.link ? ' <a href="' + esc(a.link) + '">อ่านรายละเอียด</a>' : "");
      bar.hidden = false;
    }
  })();

  /* ---------- hero: photo wall, rotator, countdown ---------- */
  (function () {
    var rows = $$(".wall-row"); var n = 43; var per = Math.ceil(n / rows.length);
    rows.forEach(function (row, r) {
      var html = "";
      for (var i = 0; i < per; i++) {
        var k = (r * per + i) % n; var f = "archive/1-2569/wall/w" + String(k).padStart(2, "0") + ".jpg";
        html += '<img src="' + f + '" alt="" loading="' + (r === 0 ? "eager" : "lazy") + '" decoding="async">';
      }
      row.innerHTML = html + html; /* ซ้ำ 2 รอบ เพื่อให้เลื่อนวนได้ต่อเนื่อง */
    });
    var words = ["ข่าวสาร", "สิ่งที่ต้องทำ", "ปฏิทิน", "ตารางเรียน", "เอกสาร", "ความทรงจำ"]; var i = 0; var el = $("#rotator");
    setInterval(function () { el.classList.add("out"); setTimeout(function () { i = (i + 1) % words.length; el.textContent = words[i]; el.classList.remove("out"); }, 350); }, 2600);

    var next = (SITE.countdowns || []).filter(function (c) { return c.date >= TODAY; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; })[0];
    var box = $("#countdown");
    if (next) {
      box.hidden = false;
      var target = parse(next.date).getTime() - 7 * 3600 * 1000 + 7.5 * 3600 * 1000; /* 07.30 น. เวลาไทย */
      function tick() {
        var ms = Math.max(0, target - Date.now());
        var d = Math.floor(ms / 86400000), h = Math.floor(ms / 3600000) % 24, m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
        if (params.get("today")) { d = diffDays(next.date, TODAY); h = m = s = 0; }
        box.innerHTML = '<div class="cd-label">อีกไม่นาน<b>' + esc(next.label) + '</b>' + esc(thLong(next.date)) + '</div>' +
          '<div class="cd-units"><div class="cd-u"><b>' + d + '</b><small>วัน</small></div><div class="cd-u"><b>' + String(h).padStart(2, "0") + '</b><small>ชั่วโมง</small></div>' +
          '<div class="cd-u"><b>' + String(m).padStart(2, "0") + '</b><small>นาที</small></div><div class="cd-u"><b>' + String(s).padStart(2, "0") + '</b><small>วินาที</small></div></div>';
      }
      tick(); setInterval(tick, 1000);
    }
  })();

  /* ---------- ticker ---------- */
  (function () {
    var items = ALL.filter(function (n) { return n.term === SITE.term; }).sort(byDateDesc).slice(0, 8);
    if (!items.length) { $("#ticker").hidden = true; return; }
    var html = items.map(function (n) {
      return '<a href="#n=' + esc(n.id) + '"><b>' + (isUrgentNow(n) ? "ด่วน" : esc(thShort(n.date))) + '</b>' + esc(n.title) + "</a>";
    }).join("");
    $("#tickerTrack").innerHTML = html + html;
  })();

  /* ---------- now: urgent + todo + pending ---------- */
  function renderUrgent() {
    var list = ALL.filter(isUrgentNow).sort(byDateDesc); var box = $("#urgentList");
    if (!list.length) {
      $(".urgent-panel .pulse-dot").classList.add("calm");
      box.innerHTML = '<div class="calm-box"><b>ตอนนี้ไม่มีข่าวด่วน</b>เมื่อมีเรื่องเร่งด่วน เช่น ปรับเวลาเรียนกะทันหัน หรือโรงเรียนปิดกรณีพิเศษ จะแสดงที่กล่องนี้ทันที</div>';
      return;
    }
    box.innerHTML = list.map(function (n) {
      return '<button class="u-card" data-open="' + esc(n.id) + '"><span class="u-meta">' + esc(thLong(n.date)) + " · " + esc(whoTxt(n.to)) + '</span><h4>' + tx(n.title) + '</h4><p>' + tx(n.summary || "") + "</p></button>";
    }).join("");
  }
  var todoWho = "all";
  function renderTodo() {
    var items = [];
    ALL.forEach(function (n) {
      (n.todo || []).forEach(function (t) {
        if (t.due && diffDays(TODAY, t.due) > 2) return; /* เลยกำหนดเกิน 2 วัน ไม่ต้องแสดง */
        if (!t.due && n.term !== SITE.term) return;
        items.push({ t: t, n: n });
      });
    });
    items = items.filter(function (x) {
      var to = x.n.to || [], w = x.t.who || (to.length === 1 ? to[0] : "all");
      return todoWho === "all" || w === "all" || w === todoWho;
    });
    items.sort(function (a, b) { return (a.t.due || "9999") < (b.t.due || "9999") ? -1 : 1; });
    var ol = $("#todoList");
    if (!items.length) { ol.innerHTML = '<li class="empty">ยังไม่มีงานที่ต้องทำในตอนนี้ เมื่อครูแจ้งงานพร้อมกำหนดส่ง รายการจะขึ้นที่นี่และนับวันถอยหลังให้</li>'; return; }
    ol.innerHTML = items.map(function (x) {
      var t = x.t, n = x.n, left = "", soon = false, dueBox;
      if (t.due) {
        var d = diffDays(t.due, TODAY); soon = d <= 2;
        left = d > 1 ? "อีก " + d + " วัน" : d === 1 ? "พรุ่งนี้" : d === 0 ? "วันนี้" : "เลยกำหนด";
        var dd = parse(t.due);
        dueBox = '<div class="due' + (soon ? " soon" : "") + '"><b>' + dd.getUTCDate() + '</b><small>' + MON[dd.getUTCMonth()] + "</small></div>";
      } else { dueBox = '<div class="due none"><small>ไม่มี<br>กำหนด</small></div>'; left = "ทำเมื่อพร้อม"; }
      var who = t.who && WHO[t.who] ? WHO[t.who] : whoTxt(n.to);
      return '<li class="todo" data-open="' + esc(n.id) + '" tabindex="0">' + dueBox + '<div><div class="t-text">' + tx(t.text) + '</div><div class="t-from">' + esc(who) + " · จากข่าว " + tx(n.title) + '</div></div><span class="left' + (soon ? " soon" : "") + '">' + left + "</span></li>";
    }).join("");
  }
  $("#todoSeg").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; todoWho = b.dataset.who;
    $$("#todoSeg button").forEach(function (x) { x.setAttribute("aria-selected", x === b); }); renderTodo();
  });
  (function () {
    var p = SITE.pending || [];
    if (!p.length) { $("#pendingBox").hidden = true; return; }
    $("#pendingList").innerHTML = p.map(function (x) { return "<li><b>" + tx(x.title) + "</b><span>" + tx(x.note || "") + '</span><br><span class="wait">รอประกาศ</span></li>'; }).join("");
  })();

  /* ---------- board ---------- */
  var terms = []; ALL.forEach(function (n) { if (terms.indexOf(n.term) < 0) terms.push(n.term); });
  terms.sort(function (a, b) { var pa = a.split("/"), pb = b.split("/"); return (pb[1] + pb[0]) > (pa[1] + pa[0]) ? 1 : -1; });
  if (terms.indexOf(SITE.term) < 0) terms.unshift(SITE.term);
  var state = { term: SITE.term, who: "all", cat: "all", q: "", shown: 9 };
  $("#termSeg").innerHTML = terms.map(function (t) {
    return '<button role="tab" data-term="' + esc(t) + '" aria-selected="' + (t === state.term) + '">' + (t === SITE.term ? "ภาคเรียนนี้ " : "ย้อนหลัง ") + esc(t) + "</button>";
  }).join("");
  $("#termSeg").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; state.term = b.dataset.term; state.cat = "all"; state.shown = 9;
    $$("#termSeg button").forEach(function (x) { x.setAttribute("aria-selected", x === b); }); renderBoard();
  });
  $("#whoSeg").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; state.who = b.dataset.who; state.shown = 9;
    $$("#whoSeg button").forEach(function (x) { x.setAttribute("aria-selected", x === b); }); renderBoard();
  });
  var qT; $("#q").addEventListener("input", function (e) { clearTimeout(qT); qT = setTimeout(function () { state.q = e.target.value.trim(); state.shown = 9; renderBoard(); }, 180); });
  $("#chips").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; state.cat = b.dataset.cat; state.shown = 9; renderBoard(); });
  $("#moreBtn").addEventListener("click", function () { state.shown += 9; renderBoard(true); });

  function boardBase() {
    return ALL.filter(function (n) {
      if (state.q) { /* ค้นหาจะค้นทุกภาคเรียน */
        var hay = (n.title + " " + (n.summary || "") + " " + (n.body || "") + " " + cat(n).name).toLowerCase();
        return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
      }
      return n.term === state.term;
    }).filter(function (n) { return state.who === "all" || (n.to || []).indexOf(state.who) > -1; });
  }
  function renderBoard(keepScroll) {
    var base = boardBase(); var counts = {};
    base.forEach(function (n) { counts[n.cat] = (counts[n.cat] || 0) + 1; });
    var chips = '<button class="chip" role="tab" data-cat="all" aria-selected="' + (state.cat === "all") + '">ทั้งหมด<i>' + base.length + "</i></button>";
    Object.keys(CATS).forEach(function (k) {
      if (!counts[k]) return;
      chips += '<button class="chip" role="tab" data-cat="' + k + '" style="--c:' + CATS[k].c + '" aria-selected="' + (state.cat === k) + '">' + CATS[k].name + "<i>" + counts[k] + "</i></button>";
    });
    $("#chips").innerHTML = chips;
    var list = base.filter(function (n) { return state.cat === "all" || n.cat === state.cat; });
    list.sort(function (a, b) {
      var pa = a.pin && a.term === SITE.term ? 1 : 0, pb = b.pin && b.term === SITE.term ? 1 : 0;
      var ua = isUrgentNow(a) ? 1 : 0, ub = isUrgentNow(b) ? 1 : 0;
      return (ub - ua) || (pb - pa) || byDateDesc(a, b);
    });
    var grid = $("#newsGrid");
    if (!list.length) {
      grid.innerHTML = '<div class="empty" style="grid-column:1/-1">' + (state.q ? "ไม่พบข่าวที่ตรงกับคำค้นหา ลองใช้คำอื่น" : "ยังไม่มีข่าวในหมวดนี้") + "</div>";
    } else {
      grid.innerHTML = list.slice(0, state.shown).map(function (n, i) {
        var c = cat(n), u = isUrgentNow(n);
        return '<button class="n-card' + (u ? " urgent" : "") + '" style="--c:' + c.c + ";animation-delay:" + Math.min(i % 9, 8) * 45 + 'ms" data-open="' + esc(n.id) + '">' +
          '<div class="n-top">' + (u ? '<span class="tag red">ด่วน</span>' : "") + (n.pin && n.term === SITE.term ? '<span class="tag pin">ปักหมุด</span>' : "") +
          '<span class="tag">' + esc(c.name) + '</span><span class="tag who">' + esc(whoTxt(n.to)) + "</span>" + (n.draft ? '<span class="tag red">ฉบับร่าง</span>' : "") + "</div>" +
          "<h3>" + tx(n.title) + "</h3><p>" + tx(n.summary || "") + '</p><div class="n-date"><span>' + esc(thMed(n.date)) + (state.q && n.term !== SITE.term ? " · ภาค " + esc(n.term) : "") + '</span><span class="more">อ่านต่อ</span></div></button>';
      }).join("");
    }
    $("#newsCount").textContent = list.length ? "แสดง " + Math.min(state.shown, list.length) + " จาก " + list.length + " ข่าว" + (state.q ? " (ค้นหาทุกภาคเรียน)" : "") : "";
    $("#moreBtn").hidden = list.length <= state.shown;
  }

  /* ---------- modal ---------- */
  function openNews(id, push) {
    var n = ALL.filter(function (x) { return x.id === id; })[0]; if (!n) return;
    var c = cat(n), h = "";
    h += '<header class="m-head" style="--c:' + c.c + '"><div class="n-top">' + (isUrgentNow(n) ? '<span class="tag red">ด่วน</span>' : "") + (n.pin && n.term === SITE.term ? '<span class="tag pin">ปักหมุด</span>' : "") +
      '<span class="tag">' + esc(c.name) + '</span><span class="tag">' + esc(whoTxt(n.to)) + '</span><span class="tag">ภาคเรียน ' + esc(n.term) + "</span></div>" +
      '<h2 id="mTitle">' + tx(n.title) + '</h2><p class="m-date">ประกาศ' + esc(thLong(n.date)) + "</p></header>";
    h += '<div class="m-main">';
    if (n.event) {
      var ev = n.event;
      h += '<div class="m-box ev"><h4>วันและเวลา</h4><div>' + esc(rangeTxt(ev.start, ev.end)) + (ev.time ? " เวลา " + esc(ev.time) : "") + (ev.place ? "<br>สถานที่: " + esc(ev.place) : "") + "</div></div>";
    }
    if (n.todo && n.todo.length) {
      h += '<div class="m-box"><h4>สิ่งที่ต้องทำ</h4><ul>' + n.todo.map(function (t) { return "<li>" + tx(t.text) + (t.due ? " (ภายใน" + esc(thLong(t.due)) + ")" : "") + (t.who && WHO[t.who] ? " · " + WHO[t.who] : "") + "</li>"; }).join("") + "</ul></div>";
    }
    h += '<div class="m-body">' + bodyHtml(n.body || n.summary) + "</div>";
    if (n.files && n.files.length) {
      h += '<div class="m-files">' + n.files.map(function (f) {
        return /\.(jpe?g|png|webp|gif)$/i.test(f.path) ? '<a href="' + esc(f.path) + '" target="_blank" rel="noopener"><img src="' + esc(f.path) + '" alt="' + esc(f.label) + '" loading="lazy"></a>'
          : '<div class="m-links"><a href="' + esc(f.path) + '" target="_blank" rel="noopener">' + esc(f.label) + "</a></div>";
      }).join("") + "</div>";
    }
    if (n.links && n.links.length) {
      h += '<div class="m-box"><h4>ลิงก์ที่เกี่ยวข้อง</h4><div class="m-links">' + n.links.map(function (l) { return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>"; }).join("") + "</div></div>";
    }
    var back = backTo && stu(backTo);
    h += '<div class="m-actions">' + (back ? '<button class="btn gold small" data-student="' + back.no + '">กลับไปแฟ้มผลงานของ' + esc(nameParts(back).first) + "</button>" : "") +
      '<button class="btn line small" data-copylink="' + esc(n.id) + '">คัดลอกลิงก์ข่าวนี้</button><button class="btn line small" data-copytext="' + esc(n.id) + '">คัดลอกข้อความ</button></div>';
    h += '<p class="m-src">ที่มา: ' + esc(n.src || "ครูที่ปรึกษา") + "</p></div>";
    $("#mBody").innerHTML = h; $(".modal-card").classList.remove("is-prof"); $("#modal").hidden = false; document.body.style.overflow = "hidden";
    $(".modal-card").scrollTop = 0; $(".modal-x").focus({ preventScroll: true });
    if (push !== false) history.replaceState(null, "", "#n=" + encodeURIComponent(id));
  }
  function closeModal() {
    $("#modal").hidden = true; document.body.style.overflow = ""; backTo = null;
    if (/^#n=/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search + "#news");
    if (/^#s=/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search + "#members");
  }
  document.addEventListener("click", function (e) {
    var st = e.target.closest("[data-student]"); if (st) { e.preventDefault(); openStudent(st.dataset.student); return; }
    var cs = e.target.closest("[data-copystu]"); if (cs) { copy(location.origin + location.pathname + "#s=" + pad2(cs.dataset.copystu), "คัดลอกลิงก์แฟ้มผลงานแล้ว นำไปวางใน LINE ได้เลย"); return; }
    var o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); backTo = null; openNews(o.dataset.open); return; }
    if (e.target.closest("[data-close]")) { closeModal(); return; }
    var cl = e.target.closest("[data-copylink]"); if (cl) { copy(newsUrl(cl.dataset.copylink), "คัดลอกลิงก์แล้ว นำไปวางใน LINE ได้เลย"); return; }
    var ct = e.target.closest("[data-copytext]");
    if (ct) { var n = ALL.filter(function (x) { return x.id === ct.dataset.copytext; })[0]; copy(n.title + "\n\n" + (n.body || n.summary) + "\n\n" + newsUrl(n.id), "คัดลอกข้อความแล้ว"); return; }
    var a = e.target.closest('a[href^="#n="]'); if (a) { e.preventDefault(); backTo = a.closest("[data-prof]") ? curStu : null; openNews(decodeURIComponent(a.getAttribute("href").slice(3))); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("#modal").hidden) closeModal();
    if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && !$("#modal").hidden && $("#mBody .prof")) {
      var i = STU.indexOf(stu(curStu)) + (e.key === "ArrowRight" ? 1 : -1); openStudent(STU[(i + STU.length) % STU.length].no);
    }
    if (e.key === "Enter" && e.target.matches(".todo[data-open]")) openNews(e.target.dataset.open);
  });
  function fromHash() {
    var m = location.hash.match(/^#n=(.+)$/); if (m) openNews(decodeURIComponent(m[1]), false);
    var s = location.hash.match(/^#s=(\d+)$/); if (s) openStudent(+s[1], false);
  }
  window.addEventListener("hashchange", fromHash);

  /* ---------- calendar ---------- */
  var EVENTS = [];
  ALL.forEach(function (n) { if (n.event && n.event.start) EVENTS.push({ start: n.event.start, end: n.event.end || n.event.start, title: n.event.title || n.title, c: cat(n).c, id: n.id, time: n.event.time, place: n.event.place }); });
  (SITE.calendar || []).forEach(function (e) { EVENTS.push({ start: e.date, end: e.end || e.date, title: e.title, c: (CATS[e.cat] || CATS.event).c, id: e.news || "", time: e.time, place: e.place }); });
  var calM = parse(TODAY); calM.setUTCDate(1);
  function renderCal() {
    var y = calM.getUTCFullYear(), m = calM.getUTCMonth();
    $("#calTitle").textContent = MONTHS[m] + " " + (y + 543);
    var first = new Date(Date.UTC(y, m, 1)); var start = new Date(first); start.setUTCDate(1 - first.getUTCDay());
    var html = "";
    for (var i = 0; i < 42; i++) {
      var d = new Date(start); d.setUTCDate(start.getUTCDate() + i); var ds = iso(d);
      if (i >= 35 && d.getUTCMonth() !== m) break;
      var evs = EVENTS.filter(function (e) { return e.start <= ds && e.end >= ds; });
      html += '<div class="cal-day' + (d.getUTCMonth() !== m ? " out" : "") + (ds === TODAY ? " today" : "") + (d.getUTCDay() % 6 === 0 ? " wk" : "") + '"><span class="d">' + d.getUTCDate() + "</span>" +
        evs.map(function (e) { return '<button class="cal-ev" style="--c:' + e.c + '" ' + (e.id ? 'data-open="' + esc(e.id) + '"' : "") + ' title="' + esc(e.title) + '">' + esc(e.title) + "</button>"; }).join("") + "</div>";
    }
    $("#calDays").innerHTML = html;
  }
  $("#calPrev").addEventListener("click", function () { calM.setUTCMonth(calM.getUTCMonth() - 1); renderCal(); });
  $("#calNext").addEventListener("click", function () { calM.setUTCMonth(calM.getUTCMonth() + 1); renderCal(); });
  (function () {
    var up = EVENTS.filter(function (e) { return e.end >= TODAY; }).sort(function (a, b) { return a.start < b.start ? -1 : 1; }).slice(0, 6);
    $("#upcoming").innerHTML = up.length ? up.map(function (e) {
      var d = parse(e.start); var left = diffDays(e.start, TODAY);
      return '<li class="up-item" ' + (e.id ? 'data-open="' + esc(e.id) + '"' : "") + '><div class="up-date"><b>' + d.getUTCDate() + "</b><small>" + MON[d.getUTCMonth()] + "</small></div><div><h4>" + tx(e.title) + "</h4><span>" +
        (left > 0 ? "อีก " + left + " วัน" : left === 0 ? "วันนี้" : "กำลังดำเนินอยู่") + (e.time ? " · " + esc(e.time) : "") + "</span></div></li>";
    }).join("") : '<li class="up-empty">ยังไม่มีกิจกรรมที่ประกาศแล้วในช่วงนี้ ปฏิทินวิชาการภาคเรียนที่ 2/2569 จะเพิ่มเมื่อโรงเรียนประกาศ</li>';
  })();

  /* ---------- timetable & dress ---------- */
  (function () {
    var tt = SITE.timetable, box = $("#ttBox");
    var wd = DAYS[parse(TODAY).getUTCDay()];
    if (!tt) {
      var g = '<span class="h"></span>'; for (var i = 0; i < 5; i++) g += '<span class="h"></span>';
      for (var r = 0; r < 4; r++) { g += '<span class="h"></span>'; for (var j = 0; j < 5; j++) g += "<span></span>"; }
      box.innerHTML = '<div class="placeholder"><h3>ตารางเรียน<span class="nw">ภาคเรียนที่ 2/2569</span> <span class="nw">กำลังจะมา</span></h3><p>' + tx("ครูจะลงตารางเรียนของห้อง ม.5/4 พร้อมชื่อครูประจำวิชาและห้องเรียนที่นี่ ทันทีที่ได้รับจากโรงเรียน เปิดดูจากโทรศัพท์ได้ทุกวัน และจะไฮไลต์วันปัจจุบันให้") + '</p><div class="ghost-grid" aria-hidden="true">' + g + "</div></div>";
    } else {
      var order = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];
      var head = "<tr><th>วัน</th>" + tt.periods.map(function (p) { return "<th>คาบ " + p.n + "<br><small>" + esc(p.time || "") + "</small></th>"; }).join("") + "</tr>";
      var rows = order.map(function (d) {
        var cells = (tt.days[d] || []), cols = "", p = 1;
        tt.periods.forEach(function () {});
        while (p <= tt.periods.length) {
          var c = cells.filter(function (x) { return x.p === p; })[0];
          if (c) { var sp = c.span || 1; cols += '<td colspan="' + sp + '"><b>' + esc(c.name) + "</b><small>" + esc([c.code, c.teacher, c.room].filter(Boolean).join(" · ")) + "</small></td>"; p += sp; }
          else { cols += "<td></td>"; p++; }
        }
        return '<tr class="' + (d === wd ? "today" : "") + '"><th>' + d + "</th>" + cols + "</tr>";
      }).join("");
      box.innerHTML = (tt.note ? '<p class="muted">' + esc(tt.note) + "</p>" : "") + '<div class="tt-scroll"><table class="tt-table">' + head + rows + "</table></div>" +
        (tt.image ? '<p><a class="btn line small" href="' + esc(tt.image) + '" target="_blank" rel="noopener">ดูภาพตารางเรียนต้นฉบับ</a></p>' : "");
    }
    var dr = SITE.dress, db = $("#dressBox");
    if (dr && dr.days) {
      db.innerHTML = '<div class="dress"><h3 style="margin-bottom:10px;color:var(--p900)">ตารางการแต่งกาย</h3><div class="dress-row">' +
        ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"].map(function (d) { return '<div class="' + (d === wd ? "today" : "") + '"><b>' + d + "</b>" + esc(dr.days[d] || "-") + "</div>"; }).join("") + "</div>" + (dr.note ? '<p class="muted" style="margin-top:8px">' + esc(dr.note) + "</p>" : "") + "</div>";
    } else {
      db.innerHTML = '<div class="dress"><p class="muted">ตารางการแต่งกายภาคเรียนที่ 2/2569 จะแสดงที่นี่เมื่อโรงเรียนประกาศ</p></div>';
    }
  })();

  /* ---------- docs ---------- */
  (function () {
    var groups = {}; (SITE.docs || []).forEach(function (d) { (groups[d.group] = groups[d.group] || []).push(d); });
    $("#docGroups").innerHTML = Object.keys(groups).map(function (g) {
      return '<div class="doc-group reveal"><h3>' + esc(g) + "</h3>" + groups[g].map(function (d) {
        var ext = d.url && !/^#/.test(d.url);
        return '<div class="doc"><div><b>' + tx(d.title) + "</b><span>" + tx(d.desc || "") + "</span></div>" +
          (d.url ? '<a href="' + esc(d.url) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(d.label || "เปิด") + "</a>" : "") + "</div>";
      }).join("") + "</div>";
    }).join("");
  })();

  /* ---------- faq ---------- */
  $("#faq").innerHTML = (SITE.faq || []).map(function (f) { return '<details class="reveal"><summary>' + tx(f.q) + "</summary><p>" + tx(f.a) + "</p></details>"; }).join("");

  /* ---------- room ---------- */
  (function () {
    $("#teachers").innerHTML = (SITE.teachers || []).map(function (t) {
      return '<div class="t-card"><div class="ph"><img src="' + esc(t.img) + '" alt="' + esc(t.name) + '" loading="lazy"></div><div class="tx"><em>' + esc(t.call) + "</em><b>" + t.name.split(" ").map(function (w) { return '<span class="nw">' + esc(w) + "</span>"; }).join(" ") + "</b><span>ครูที่ปรึกษา</span><span>" + esc(t.dept) + "</span></div></div>";
    }).join("");
    var r = SITE.room || {};
    $("#roomFacts").innerHTML = '<div class="facts"><div class="fact"><b data-count="' + r.students + '">0</b><span>นักเรียนทั้งหมด</span></div><div class="fact"><b data-count="' + r.boys + '">0</b><span>นักเรียนชาย</span></div><div class="fact"><b data-count="' + r.girls + '">0</b><span>นักเรียนหญิง</span></div></div>' +
      '<div class="fact green" style="text-align:left"><span style="color:#e6fff2">คณะสีของห้องเรา</span><b style="font-size:24px">' + esc(r.house || "") + "</b></div>" +
      '<div class="committee"><h4>คณะกรรมการห้อง</h4><ul>' + (r.committee || []).map(function (c) {
        var s = stuByName(c.name);
        return "<li><small>" + esc(c.role) + "</small>" + (s ? '<button class="cm" data-student="' + s.no + '">' + esc(c.name) + "</button>" : esc(c.name)) + "</li>";
      }).join("") + '</ul><a class="go-mem" href="#members">ดูสมาชิกทั้ง 40 คนและแฟ้มผลงาน</a></div>' +
      '<p class="plan-note">' + esc(r.plan || "") + "</p>";
  })();

  /* ---------- members & portfolio ---------- */
  function renderMembers() {
    var box = $("#memBoard"), q = memState.q, g = memState.g, h = "";
    $("#memChips").innerHTML = '<button class="chip" role="tab" data-g="all" aria-selected="' + (g === "all") + '">ทุกคน<i>' + STU.length + "</i></button>" +
      Object.keys(MEM.groups).map(function (k) {
        return '<button class="chip" role="tab" data-g="' + k + '" aria-selected="' + (g === k) + '">' + esc(MEM.groups[k].name) + "<i>" + STU.filter(function (s) { return s.is === k; }).length + "</i></button>";
      }).join("");
    if (q) {
      var ql = q.toLowerCase();
      var found = STU.filter(function (s) { return String(s.no) === q || (s.pre + s.name).toLowerCase().indexOf(ql) > -1 || (s.roles || []).join(" ").indexOf(q) > -1; });
      h = '<h3 class="mem-sub">ผลการค้นหา<small>' + found.length + " คน</small></h3>" +
        (found.length ? '<div class="mem-grid">' + found.map(function (s, i) { return memCard(s, i); }).join("") + "</div>" : '<div class="empty">ไม่พบชื่อที่ค้นหา ลองพิมพ์ชื่อจริงหรือเลขที่</div>');
    } else if (g !== "all" && MEM.groups[g]) {
      var gr = MEM.groups[g], mem = STU.filter(function (s) { return s.is === g; });
      h = '<div class="mem-proj"><a class="poster" href="' + esc(gr.poster) + '" target="_blank" rel="noopener"><img src="' + esc(gr.poster) + '" alt="โปสเตอร์โครงงาน ' + esc(gr.name) + '" loading="lazy"><span>ดูโปสเตอร์เต็ม</span></a>' +
        '<div class="tx"><span class="tag" style="--c:var(--p500)">โครงงาน IS1 ภาคเรียนที่ 1/2569</span><h3>' + tx(gr.name) + "</h3>" + (gr.sub ? '<p class="sub">' + tx(gr.sub) + "</p>" : "") + "<p>" + tx(gr.desc) + "</p>" +
        (gr.show ? '<p class="show">' + tx(gr.show) + "</p>" : "") + "</div></div>" +
        '<h3 class="mem-sub">สมาชิกกลุ่ม<small>' + mem.length + " คน</small></h3>" + '<div class="mem-grid">' + mem.map(function (s, i) { return memCard(s, i); }).join("") + "</div>";
    } else {
      var lead = STU.filter(function (s) { return rankOf(s) < 99; }).sort(function (a, b) { return rankOf(a) - rankOf(b) || a.no - b.no; });
      var rest = STU.filter(function (s) { return rankOf(s) === 99; });
      h = '<h3 class="mem-sub first">คณะกรรมการห้องและผู้มีตำแหน่ง<small>' + lead.length + " คน</small></h3>" +
        '<div class="mem-lead-grid">' + lead.map(function (s, i) { return memCard(s, i, true); }).join("") + "</div>" +
        '<h3 class="mem-sub">เพื่อนร่วมห้อง<small>เรียงตามเลขที่ ' + rest.length + " คน</small></h3>" +
        '<div class="mem-grid">' + rest.map(function (s, i) { return memCard(s, i + lead.length); }).join("") + "</div>";
    }
    box.innerHTML = h;
  }
  function memCard(s, i, lead) {
    var np = nameParts(s), roles = rolesOf(s), n = itemsOf(s).length;
    var html = '<button class="mem-card' + (lead ? " lead" : "") + '" style="--i:' + Math.min(i, 40) + '" data-student="' + s.no + '" aria-label="เปิดแฟ้มผลงานของ ' + esc(s.pre + s.name) + " เลขที่ " + s.no + '">' +
      '<span class="ph">' + photoHtml(s) + '<span class="no">' + s.no + "</span>" + (lead && roles.length ? '<span class="role">' + esc(roles[0]) + "</span>" : "") + "</span>" +
      '<span class="nm"><b>' + esc(np.first) + "</b><small>" + esc(np.last) + "</small></span>";
    roles.slice(lead ? 1 : 0).forEach(function (t) { html += '<span class="role2" style="--c:' + esc((MEM.roles[t] || {}).c || "var(--gold-deep)") + '">' + tx(t) + "</span>"; });
    if (n) html += '<span class="cnt">ผลงาน ' + n + " รายการ</span>";
    return html + "</button>";
  }
  var curStu = null, backTo = null;
  function openStudent(no, push) {
    var s = stu(no); if (!s) return; curStu = s.no; backTo = null;
    var roles = rolesOf(s), items = itemsOf(s), g = MEM.groups[s.is], idx = STU.indexOf(s);
    var prev = STU[(idx - 1 + STU.length) % STU.length], next = STU[(idx + 1) % STU.length];
    var h = '<div class="prof" data-prof="' + s.no + '"><header class="p-head"><div class="p-art" aria-hidden="true"><span class="p-glow"></span><span class="p-ring r1"></span><span class="p-ring r2"></span><span class="p-ring r3"></span><img class="p-crest" src="img/crest-art.png" alt="" decoding="async"></div><div class="p-photo">' + photoHtml(s) + '</div><div class="p-id">' +
      '<span class="p-no">เลขที่ ' + s.no + " · ม.5/4 · ปีการศึกษา 2569</span><h2 id=\"mTitle\">" + nwName(s.pre + s.name) + '</h2><div class="p-badges">' +
      roles.map(function (t) { var r = MEM.roles[t] || {}; return '<span class="p-badge' + (r.c ? "" : " gold") + '"' + (r.c ? ' style="background:' + esc(r.c) + '"' : "") + ">" + tx(t) + "</span>"; }).join("") +
      honorsOf(s).map(function (o) { return '<span class="p-badge honor">' + tx(o.b) + " <small>" + esc(o.term) + "</small></span>"; }).join("") +
      '<span class="p-badge house">คณะกระดังงา (สีเขียว)</span></div></div></header><div class="m-main">';
    if (roles.length) {
      h += '<h3 class="p-h">ตำแหน่งและหน้าที่</h3><div class="p-roles">' + roles.map(function (t, i) {
        var r = MEM.roles[t] || {};
        return '<div class="p-role" style="--i:' + i + (r.c ? ";--c:" + esc(r.c) : "") + '"><b>' + tx(t) + "</b><span>" + tx(r.at || "") + "</span>" + (r.n && newsById(r.n) ? '<a href="#n=' + esc(r.n) + '">อ่านประกาศ</a>' : "") + "</div>";
      }).join("") + "</div>";
    }
    if (items.length) h += '<h3 class="p-h">แฟ้มผลงานและความภาคภูมิใจ<small>' + items.length + " รายการ</small></h3><ol class=\"p-tl\">" + items.map(tlItem).join("") + "</ol>";
    if (g) {
      var mates = STU.filter(function (x) { return x.is === s.is && x.no !== s.no; });
      h += '<h3 class="p-h">โครงงาน IS1 ภาคเรียนที่ 1/2569</h3><div class="p-is"><a class="poster" href="' + esc(g.poster) + '" target="_blank" rel="noopener"><img src="' + esc(g.poster) + '" alt="โปสเตอร์โครงงาน ' + esc(g.name) + '" loading="lazy"><span>ดูโปสเตอร์เต็ม</span></a>' +
        '<div class="tx"><h4>' + tx(g.name) + "</h4>" + (g.sub ? '<p class="sub">' + tx(g.sub) + "</p>" : "") + "<p>" + tx(g.desc) + "</p>" + (g.show ? '<p class="show">' + tx(g.show) + "</p>" : "") +
        '<div class="p-team"><small>ทำร่วมกับเพื่อนในกลุ่ม</small>' + mates.map(function (m) { return '<button class="mate" data-student="' + m.no + '"><span class="mph">' + photoHtml(m) + "</span>" + esc(nameParts(m).first) + "</button>"; }).join("") + "</div></div></div>";
    }
    h += '<div class="m-actions p-nav"><button class="btn line small" data-student="' + prev.no + '">ก่อนหน้า · เลขที่ ' + prev.no + '</button><button class="btn line small" data-student="' + next.no + '">ถัดไป · เลขที่ ' + next.no + "</button>" +
      '<button class="btn line small" data-copystu="' + s.no + '">คัดลอกลิงก์แฟ้มนี้</button></div>' +
      '<p class="m-src">' + tx("รวบรวมจากประกาศของครูที่ปรึกษา เกียรติบัตรที่ได้รับ และรายงานผลการเรียนของห้อง แฟ้มนี้ไม่แสดงเกรดหรือลำดับที่ของนักเรียน ครูจะเพิ่มผลงานใหม่ทุกครั้งที่มีประกาศ") + "</p></div></div>";
    $("#mBody").innerHTML = h; $(".modal-card").classList.add("is-prof"); $("#modal").hidden = false; document.body.style.overflow = "hidden";
    $(".modal-card").scrollTop = 0; $(".modal-x").focus({ preventScroll: true });
    if (push !== false) history.replaceState(null, "", "#s=" + pad2(s.no));
  }
  function tlItem(it, i) {
    var k = KINDS[it.k] || KINDS.rep, links = "";
    if (it.n && newsById(it.n)) links += '<a href="#n=' + esc(it.n) + '">อ่านประกาศ</a>';
    var act = it.act ? (ARC.acts || []).filter(function (a) { return a.n === it.act; })[0] : null;
    if (act) links += '<a href="https://drive.google.com/drive/folders/' + esc(act.album || (act.albums || [{}])[0].id) + '" target="_blank" rel="noopener">อัลบั้มภาพ ' + tx(act.title) + "</a>";
    var imgs = (it.img || []).map(function (src) { return '<a href="' + esc(src) + '" target="_blank" rel="noopener"><img src="' + esc(src) + '" alt="' + esc(it.t) + '" loading="lazy"></a>'; }).join("");
    return '<li class="p-item' + (it.star ? " star" : "") + '" style="--c:' + k.c + ";--i:" + i + '"><div class="p-when"><span>' + esc(it.d ? thMed(it.d) : it.term ? "ภาคเรียนที่ " + it.term : "") + '</span><span class="tag">' + esc(k.name) + "</span>" + (it.star ? '<span class="tag star">ผลงานเด่น</span>' : "") + "</div>" +
      "<h4>" + tx(it.t) + "</h4>" + (it.x ? "<p>" + tx(it.x) + "</p>" : "") + (imgs ? '<div class="p-imgs">' + imgs + "</div>" : "") + (links ? '<div class="p-links">' + links + "</div>" : "") + "</li>";
  }
  var memState = { g: "all", q: "" };
  $("#memChips").addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; memState.g = b.dataset.g; memState.q = ""; $("#memQ").value = ""; renderMembers(); });
  /* บอร์ดสูงมากบนมือถือ จึงเริ่มแอนิเมชันทันทีที่ขอบบนโผล่เข้าจอ */
  if ("IntersectionObserver" in window) {
    var mo = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { $("#memBoard").classList.add("in"); mo.disconnect(); } }, { rootMargin: "0px 0px -8% 0px" });
    mo.observe($("#memBoard"));
  } else $("#memBoard").classList.add("in");
  var mqT; $("#memQ").addEventListener("input", function (e) { clearTimeout(mqT); mqT = setTimeout(function () { memState.q = e.target.value.trim(); renderMembers(); }, 160); });

  /* ---------- memories ---------- */
  (function () {
    var acts = ARC.acts || [];
    $("#stats").innerHTML = [[acts.length, "กิจกรรมของห้อง"], [ARC.photos || 0, "ภาพในอัลบั้ม"], [(SITE.room || {}).students || 40, "นักเรียนที่ร่วมเดินทาง"], [(ARC.pride || []).length, "เรื่องที่ภาคภูมิใจ"]]
      .map(function (s) { return '<div class="stat"><b data-count="' + s[0] + '">0</b><span>' + s[1] + "</span></div>"; }).join("");
    $("#reel").innerHTML = acts.map(function (a) {
      var base = "archive/1-2569/" + a.img;
      var albums = a.albums || [{ id: a.album, label: "เปิดอัลบั้ม", count: a.count }];
      return '<article class="act"><div class="pic"><img src="' + base + '_h.jpg" alt="' + esc(a.title) + '" loading="lazy" style="object-position:' + esc(a.pos || "50% 50%") + '"><span class="num">' + esc(a.n) + '</span><span class="dt">' + esc(thShort(a.date)) + '</span></div>' +
        '<div class="thumbs"><img src="' + base + '_s1.jpg" alt="" loading="lazy"><img src="' + base + '_s2.jpg" alt="" loading="lazy"></div>' +
        '<div class="tx"><h3>' + tx(a.title) + "</h3><p>" + tx(a.desc) + '</p><div class="albums">' + albums.map(function (al) {
          return '<a href="https://drive.google.com/drive/folders/' + esc(al.id) + '" target="_blank" rel="noopener">' + esc(al.label) + (al.count ? " " + al.count + " ภาพ" : "") + "</a>";
        }).join("") + "</div></div></article>";
    }).join("");
    var reel = $("#reel");
    function step(dir) { var w = (reel.querySelector(".act") || { offsetWidth: 400 }).offsetWidth + 20; reel.scrollBy({ left: dir * w, behavior: "smooth" }); }
    $("#reelPrev").addEventListener("click", function () { step(-1); });
    $("#reelNext").addEventListener("click", function () { step(1); });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("vis", e.isIntersecting); }); }, { root: reel, threshold: .6 });
      $$(".act", reel).forEach(function (a) { io.observe(a); });
    }
    $("#media").innerHTML =
      '<div class="media"><button class="cover" id="clipBtn" aria-label="เล่นคลิปความประทับใจ"><img src="archive/1-2569/clip-cover.jpg" alt="ภาพปกคลิปความประทับใจ ม.5/4" loading="lazy"><span class="play"></span></button><div class="tx"><h3>คลิปความประทับใจ ม.5/4 ภาคเรียนที่ 1/2569</h3><p>รวมภาพหมู่จาก 11 กิจกรรม พร้อมเพลงบรรเลง ความยาว 5 นาที 42 วินาที</p><a class="go" href="' + esc(ARC.clip) + '" target="_blank" rel="noopener">เปิดใน YouTube</a></div></div>' +
      '<div class="media"><a class="cover tall" href="' + esc(ARC.journal) + '" target="_blank" rel="noopener"><img src="archive/1-2569/journal-cover.jpg" alt="ปกวารสาร ม.5/4 ฉบับที่ 1" loading="lazy"></a><div class="tx"><h3>วารสาร ม.5/4 ฉบับที่ 1</h3><p>PDF 28 หน้า ตุลาคม 2569</p><a class="go" href="' + esc(ARC.journal) + '" target="_blank" rel="noopener">อ่านวารสาร</a></div></div>' +
      '<div class="media"><a class="cover tall" href="' + esc(ARC.web) + '" target="_blank" rel="noopener"><img src="archive/1-2569/a08_h.jpg" alt="เว็บไซต์ ม.5/4 ภาคเรียนที่ 1/2569" loading="lazy"></a><div class="tx"><h3>เว็บไซต์ภาคเรียนที่ 1/2569</h3><p>ไทม์ไลน์ อัลบั้มภาพ และทำเนียบเกียรติยศ</p><a class="go" href="' + esc(ARC.web) + '" target="_blank" rel="noopener">เปิดเว็บไซต์</a></div></div>';
    $("#clipBtn").addEventListener("click", function () {
      this.outerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(ARC.clipId) + '?autoplay=1&rel=0" title="คลิปความประทับใจ ม.5/4" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    });
    $("#prideList").innerHTML = (ARC.pride || []).map(function (p) { return "<li><b>" + tx(p.who) + "</b><span>" + tx(p.what) + "</span></li>"; }).join("");
  })();

  /* ---------- footer ---------- */
  $("#updated").textContent = "อัปเดตล่าสุด " + thLong(SITE.updated || TODAY) + " · ข้อมูลจากกลุ่ม LINE นักเรียนและผู้ปกครอง ม.5/4";

  /* ---------- reveal, counters, nav highlight ---------- */
  function countUp(el) {
    var to = +el.dataset.count || 0, t0 = performance.now(), dur = 1400;
    (function f(t) { var k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString("th-TH"); if (k < 1) requestAnimationFrame(f); })(t0);
  }
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; e.target.classList.add("in");
        $$("[data-count]", e.target).forEach(function (c) { if (!c._done) { c._done = 1; countUp(c); } });
        ro.unobserve(e.target);
      });
    }, { threshold: .12 });
    $$(".reveal").forEach(function (el) { ro.observe(el); });
    var navs = $$(".topnav a, .bottomnav a");
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; var id = "#" + e.target.id;
        navs.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main > section[id]").forEach(function (s) { so.observe(s); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); $$("[data-count]").forEach(function (c) { c.textContent = c.dataset.count; }); }
  window.addEventListener("scroll", function () { $("#topbar").classList.toggle("solid", window.scrollY > 40); }, { passive: true });

  renderUrgent(); renderTodo(); renderBoard(); renderCal(); renderMembers(); fromHash();
})();
