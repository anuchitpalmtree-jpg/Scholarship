import type {
  ApplicationHistory,
  FundTemplate,
  MatchedFund,
  PublicGrant,
} from "@/src/types/govfund";

export const publicGrants: PublicGrant[] = [
  {
    id: "nia-regional-2570",
    title: "โครงการนวัตกรรมด้านเศรษฐกิจ ปี 2570",
    agency: "สำนักงานนวัตกรรมแห่งชาติ (NIA)",
    summary:
      "สนับสนุนผู้ประกอบการไทยพัฒนาต้นแบบเชิงพาณิชย์ ทดลองใช้งานกับลูกค้าจริง และทดสอบตลาดผ่านกลไก Open Innovation และ Regional Market Validation",
    window: "เปิดรับ 23 ก.ย. – 31 ต.ค. 2569",
    deadline: "เหลือ 37 วัน",
    applicants: 128,
    applicantLabel: "ใบสมัครตัวอย่าง",
    image: "/grants/regional-innovation.jpg",
    tags: ["SME", "นวัตกรรมภูมิภาค", "Matching Fund"],
    sourceUrl: "https://www.nia.or.th/event/detail/18215",
    sourceLabel: "ประกาศ NIA",
  },
  {
    id: "nrct-health-2570",
    title: "ทุนวิจัยด้านการแพทย์และสุขภาพ ปี 2570",
    agency: "วช. / หน่วยงานด้านชีววิทยาศาสตร์",
    summary:
      "ตัวอย่างการเปิดรับข้อเสนอด้าน ATMPs ชีววัตถุ จีโนมิกส์ และการแพทย์แม่นยำ เน้นผลผลิตที่นำไปใช้ประโยชน์และเอกสารจริยธรรมที่ครบถ้วน",
    window: "ตัวอย่างรอบเปิดรับ ก.ย. – พ.ย. 2569",
    deadline: "เหลือ 52 วัน",
    applicants: 76,
    applicantLabel: "ใบสมัครตัวอย่าง",
    image: "/grants/health-research.jpg",
    tags: ["สุขภาพ", "ชีววิทยาศาสตร์", "Precision Medicine"],
    sourceUrl: "https://nriis.go.th/www/NewsEventAll.aspx?ntid=4",
    sourceLabel: "ข่าวทุน NRIIS",
  },
  {
    id: "pmub-future-industry-2570",
    title: "Technology for Future Industries ปี 2570",
    agency: "บพค. (PMU-B)",
    summary:
      "ตัวอย่างทุนพัฒนาเทคโนโลยีขั้นแนวหน้าสำหรับอุตสาหกรรมอนาคต ครอบคลุม AI หุ่นยนต์ ระบบอัตโนมัติ และความร่วมมือระหว่างนักวิจัยกับภาคอุตสาหกรรม",
    window: "ตัวอย่างรอบเปิดรับ ก.ย. – 15 พ.ย. 2569",
    deadline: "เหลือ 49 วัน",
    applicants: 214,
    applicantLabel: "ใบสมัครตัวอย่าง",
    image: "/grants/future-industry.jpg",
    tags: ["AI", "Robotics", "Future Industry"],
    sourceUrl: "https://www.nriis.go.th/www/NewsEventAll.aspx",
    sourceLabel: "ข่าวทุน NRIIS",
  },
];

export const matchedFunds: MatchedFund[] = [
  {
    id: 1,
    title: "โครงการนวัตกรรมด้านเศรษฐกิจ ปี 2570",
    agency: "สำนักงานนวัตกรรมแห่งชาติ (NIA)",
    match: 95,
    tags: ["พลังงาน", "SME", "นวัตกรรม"],
  },
  {
    id: 2,
    title: "ทุนสนับสนุนนวัตกรรม วว.",
    agency: "สถาบันวิจัยวิทยาศาสตร์และเทคโนโลยีแห่งประเทศไทย",
    match: 82,
    tags: ["เกษตร", "วิจัยประยุกต์"],
  },
];

export const fundTemplates: FundTemplate[] = [
  {
    id: "nrct-sf",
    shortName: "วช. Strategic Fund",
    fundName: "แบบฟอร์มข้อเสนอโครงการฉบับสมบูรณ์ Strategic Fund",
    agency: "สำนักงานการวิจัยแห่งชาติ (วช.)",
    templateVersion: "แม่แบบปีงบประมาณ 2569–2570",
    sourceUrl: "https://www.nriis.go.th/www/Manual.aspx",
    requirements: [
      { id: "nrct-1", title: "ข้อมูลทั่วไปและความสอดคล้องกับแผนงาน", detail: "ชื่อไทย/อังกฤษ ประเภทโครงการ โปรแกรม แผนงาน เป้าหมาย และ Key Result", status: "complete" },
      { id: "nrct-2", title: "หลักการ เหตุผล และทบทวนวรรณกรรม", detail: "ที่มา ช่องว่างองค์ความรู้ เอกสารอ้างอิง และความสำคัญของโจทย์", status: "complete" },
      { id: "nrct-3", title: "วัตถุประสงค์และระเบียบวิธีวิจัย", detail: "วัตถุประสงค์ กรอบการวิจัย วิธีดำเนินงาน และพื้นที่ศึกษา", status: "partial" },
      { id: "nrct-4", title: "ผลผลิต ผลลัพธ์ และการใช้ประโยชน์", detail: "Output, Outcome, ผู้ใช้ประโยชน์ และตัวชี้วัด", status: "complete" },
      { id: "nrct-5", title: "แผนงาน ระยะเวลา และงบประมาณ", detail: "กิจกรรม Milestone Gantt chart และรายละเอียดค่าใช้จ่าย", status: "missing" },
      { id: "nrct-6", title: "ทีมวิจัยและเอกสารประกอบ", detail: "ประวัตินักวิจัย หนังสือรับรอง จริยธรรม และไฟล์แนบตามประกาศ", status: "partial" },
    ],
  },
  {
    id: "nia-open",
    shortName: "NIA Open Innovation",
    fundName: "โครงการนวัตกรรมด้านเศรษฐกิจ – Open Innovation",
    agency: "สำนักงานนวัตกรรมแห่งชาติ (NIA)",
    templateVersion: "ประกาศรอบปีงบประมาณ 2570",
    sourceUrl: "https://www.nia.or.th/event/detail/18215",
    requirements: [
      { id: "nia-1", title: "ข้อมูลนิติบุคคลและผู้ยื่น", detail: "หนังสือรับรองนิติบุคคล ผู้ถือหุ้น ผู้มีอำนาจลงนาม และผู้ประสานงาน", status: "complete" },
      { id: "nia-2", title: "รายละเอียดนวัตกรรมและระดับความพร้อม", detail: "ความใหม่ เทคโนโลยีต้นแบบ หลักฐานการทดสอบ และสถานะทรัพย์สินทางปัญญา", status: "complete" },
      { id: "nia-3", title: "ตลาด ลูกค้า และรูปแบบธุรกิจ", detail: "กลุ่มลูกค้า ขนาดตลาด คู่แข่ง การทดสอบตลาด และรายได้ที่คาดการณ์", status: "partial" },
      { id: "nia-4", title: "แผนดำเนินงานและงบประมาณสมทบ", detail: "กิจกรรม ผลส่งมอบ ระยะเวลา งบขอรับการสนับสนุน และเงินสมทบ", status: "missing" },
      { id: "nia-5", title: "เอกสารยืนยันและไฟล์แนบ", detail: "Proposal, pitch deck, ใบเสนอราคา และหลักฐานความร่วมมือ", status: "partial" },
    ],
  },
  {
    id: "pmuc-full",
    shortName: "บพข. Full Proposal",
    fundName: "ข้อเสนอโครงการวิจัยฉบับสมบูรณ์ บพข.",
    agency: "หน่วยบริหารและจัดการทุนด้านการเพิ่มความสามารถในการแข่งขันของประเทศ",
    templateVersion: "แนวทาง Full Proposal ปี 2570",
    sourceUrl: "https://pmuc.or.th/open-call-proposal/",
    requirements: [
      { id: "pmuc-1", title: "ความสอดคล้องกับแผนงานและโจทย์ทุน", detail: "แผนงาน เป้าหมาย ตัวชี้วัด และผลลัพธ์ที่ตอบโจทย์ประกาศ", status: "complete" },
      { id: "pmuc-2", title: "เทคโนโลยี TRL และทรัพย์สินทางปัญญา", detail: "ระดับ TRL เดิม/เป้าหมาย จุดเด่นเทคโนโลยี และสิทธิในผลงาน", status: "partial" },
      { id: "pmuc-3", title: "ภาคีอุตสาหกรรมและตลาด", detail: "บทบาทผู้ประกอบการ ลูกค้าเป้าหมาย ขนาดตลาด และแผนใช้ประโยชน์", status: "complete" },
      { id: "pmuc-4", title: "แผนงาน Milestone และงบประมาณ", detail: "Work package, deliverable, milestone, งบประมาณ และ co-funding", status: "missing" },
      { id: "pmuc-5", title: "ทีมบริหารและเอกสารแนบ", detail: "ประวัติทีม หนังสือร่วมทุน หนังสือรับรอง และแบบฟอร์มที่ลงนาม", status: "partial" },
    ],
  },
];

export const applicationHistory: ApplicationHistory[] = [
  {
    id: "GF-2569-00182",
    project: "ระบบอบแห้งพลังงานแสงอาทิตย์",
    fund: "โครงการนวัตกรรมด้านเศรษฐกิจ NIA",
    submittedDate: "20 ส.ค. 2569",
    receivedDate: "21 ส.ค. 2569 เวลา 09:42 น.",
    receiptCode: "NIA-REG70-00182",
    status: "กำลังพิจารณา",
    english: "Under Review",
    tone: "amber",
    emailSubject: "[Grant+] NIA รับเรื่องใบสมัคร NIA-REG70-00182 แล้ว",
    emailBody: "NIA ได้รับข้อเสนอโครงการของท่านเมื่อวันที่ 21 ส.ค. 2569 และอยู่ระหว่างตรวจสอบคุณสมบัติและเอกสาร โดยจะแจ้งผลการเปลี่ยนสถานะผ่านอีเมลนี้",
  },
  {
    id: "GF-2569-00127",
    project: "สารสกัดสมุนไพรต้านอนุมูลอิสระ",
    fund: "ทุนสนับสนุนนวัตกรรม วว.",
    submittedDate: "12 ส.ค. 2569",
    receivedDate: "13 ส.ค. 2569 เวลา 14:18 น.",
    receiptCode: "TISTR-RI-69-00471",
    status: "ขอเอกสารเพิ่ม",
    english: "Action Required",
    tone: "red",
    emailSubject: "[Grant+] โปรดส่งเอกสารเพิ่มเติม – TISTR-RI-69-00471",
    emailBody: "สถานะใบสมัครเปลี่ยนเป็น “ขอเอกสารเพิ่มเติม” กรุณาแนบแผนงบประมาณฉบับลงนามและหนังสือรับรองนิติบุคคลภายใน 7 วันทำการ",
  },
];
