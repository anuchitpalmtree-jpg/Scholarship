import type { Funder, FundedResearch, GrantContract, ResearcherProfile, ResearchFieldId, NationalStrategyId } from "@/src/types/funder";

// Official strategy names; all links between strategies, budgets and records below are synthetic.
export const nationalStrategies: { id: NationalStrategyId; shortName: string; name: string; color: string }[] = [
  { id: "NS1", shortName: "ความมั่นคง", name: "ด้านความมั่นคง", color: "#1E3A8A" },
  { id: "NS2", shortName: "ความสามารถในการแข่งขัน", name: "ด้านการสร้างความสามารถในการแข่งขัน", color: "#0891B2" },
  { id: "NS3", shortName: "ศักยภาพทรัพยากรมนุษย์", name: "ด้านการพัฒนาและเสริมสร้างศักยภาพทรัพยากรมนุษย์", color: "#7C3AED" },
  { id: "NS4", shortName: "โอกาสและความเสมอภาค", name: "ด้านการสร้างโอกาสและความเสมอภาคทางสังคม", color: "#D97706" },
  { id: "NS5", shortName: "การเติบโตที่เป็นมิตรต่อสิ่งแวดล้อม", name: "ด้านการสร้างการเติบโตบนคุณภาพชีวิตที่เป็นมิตรต่อสิ่งแวดล้อม", color: "#059669" },
  { id: "NS6", shortName: "การบริหารจัดการภาครัฐ", name: "ด้านการปรับสมดุลและพัฒนาระบบการบริหารจัดการภาครัฐ", color: "#DB2777" },
];
export const strategySourceUrl = "https://mhesi.nrct.go.th/archives/s/mhesi_archives/item/1288";
export const researchFields: { id: ResearchFieldId; name: string }[] = [
  { id: "natural", name: "วิทยาศาสตร์ธรรมชาติ" },
  { id: "engineering", name: "วิศวกรรมและเทคโนโลยี" },
  { id: "health", name: "วิทยาศาสตร์การแพทย์และสุขภาพ" },
  { id: "agriculture", name: "เกษตรศาสตร์" },
  { id: "social", name: "สังคมศาสตร์" },
  { id: "humanities", name: "มนุษยศาสตร์และศิลปะ" },
];
export const demoFunders: Funder[] = [
  { id: "F-NRCT", name: "วช. (ข้อมูลสาธิต)", kind: "public" },
  { id: "F-NIA", name: "NIA (ข้อมูลสาธิต)", kind: "public" },
  { id: "F-PMUB", name: "บพค. (ข้อมูลสาธิต)", kind: "public" },
  { id: "F-PMUC", name: "บพข. (ข้อมูลสาธิต)", kind: "public" },
  { id: "F-FOOD", name: "บริษัท อาหารก้าวหน้า จำกัด (สมมติ)", kind: "private" },
  { id: "F-FOUNDATION", name: "มูลนิธิการเรียนรู้ร่วมกัน (สมมติ)", kind: "private" },
];
export const researcherDirectory: ResearcherProfile[] = [
  { id: "R-001", name: "รศ. ดร. ณัฐชา สุขเกษม", institution: "มหาวิทยาลัยพลังงานตัวอย่าง", fieldId: "engineering", expertise: ["พลังงาน", "อาหาร", "IoT"], lab: "ห้องปฏิบัติการพลังงานและระบบอัจฉริยะ", interests: "ระบบพลังงานสะอาดสำหรับโรงงานและวิสาหกิจชุมชน" },
  { id: "R-002", name: "ดร. วิภา วัสดุวิจัย", institution: "สถาบันวัสดุตัวอย่าง", fieldId: "natural", expertise: ["วัสดุ", "สิ่งแวดล้อม", "บรรจุภัณฑ์"], lab: "ห้องปฏิบัติการวัสดุชีวภาพ", interests: "วัสดุทดแทนพลาสติกและการทดสอบการย่อยสลาย" },
  { id: "R-003", name: "ดร. กิตติ ระบบอัจฉริยะ", institution: "มหาวิทยาลัยเทคโนโลยีตัวอย่าง", fieldId: "engineering", expertise: ["ข้อมูล", "IoT", "วิศวกรรม", "ความมั่นคงไซเบอร์"], lab: "ห้องปฏิบัติการข้อมูลอุตสาหกรรม", interests: "การวิเคราะห์ข้อมูลเพื่อซ่อมบำรุงและความมั่นคงของระบบ" },
  { id: "R-004", name: "ดร. ปรียา สุขภาพชุมชน", institution: "มหาวิทยาลัยสุขภาพตัวอย่าง", fieldId: "health", expertise: ["สาธารณสุข", "ผู้สูงอายุ", "การเรียนรู้"], lab: "ศูนย์วิจัยสุขภาพชุมชน", interests: "เครื่องมือพัฒนาทักษะผู้ดูแลและลดความเหลื่อมล้ำด้านสุขภาพ" },
  { id: "R-005", name: "ดร. ธนา เกษตรแม่นยำ", institution: "มหาวิทยาลัยเกษตรตัวอย่าง", fieldId: "agriculture", expertise: ["เกษตร", "น้ำ", "เซนเซอร์"], lab: "แปลงทดลองเกษตรแม่นยำ", interests: "การจัดการน้ำและต้นทุนการผลิตสำหรับเกษตรกรรายย่อย" },
  { id: "R-006", name: "ดร. ศิริพร นโยบายสังคม", institution: "มหาวิทยาลัยสังคมตัวอย่าง", fieldId: "social", expertise: ["ความเสมอภาค", "นโยบายสาธารณะ", "บริการภาครัฐ"], lab: "ศูนย์วิจัยนโยบายและสังคม", interests: "การเข้าถึงบริการภาครัฐและการประเมินผลนโยบาย" },
  { id: "R-007", name: "ดร. อรทัย ศิลป์สร้างสรรค์", institution: "มหาวิทยาลัยศิลปะตัวอย่าง", fieldId: "humanities", expertise: ["วัฒนธรรม", "ออกแบบ", "ทักษะสร้างสรรค์"], lab: "ห้องปฏิบัติการออกแบบและวัฒนธรรม", interests: "การเรียนรู้ผ่านศิลปะและเศรษฐกิจสร้างสรรค์ของชุมชน" },
  { id: "R-008", name: "ดร. พีระ ระบบนิเวศ", institution: "สถาบันสิ่งแวดล้อมตัวอย่าง", fieldId: "natural", expertise: ["สิ่งแวดล้อม", "คุณภาพน้ำ", "ระบบนิเวศ"], lab: "ห้องปฏิบัติการคุณภาพสิ่งแวดล้อม", interests: "การฟื้นฟูแหล่งน้ำและการเฝ้าระวังมลพิษชุมชน" },
  { id: "R-009", name: "ดร. กมล การศึกษา", institution: "มหาวิทยาลัยการเรียนรู้ตัวอย่าง", fieldId: "social", expertise: ["การศึกษา", "ทักษะดิจิทัล", "แรงงาน"], lab: "ศูนย์วิจัยการเรียนรู้ตลอดชีวิต", interests: "การพัฒนาทักษะดิจิทัลและโอกาสการเรียนรู้ของแรงงาน" },
  { id: "R-010", name: "ดร. มาลี อาหารปลอดภัย", institution: "มหาวิทยาลัยเกษตรตัวอย่าง", fieldId: "agriculture", expertise: ["อาหาร", "เกษตร", "ความปลอดภัย"], lab: "ห้องปฏิบัติการอาหารและเกษตรปลอดภัย", interests: "กระบวนการเพิ่มมูลค่าและตรวจสอบย้อนกลับสินค้าเกษตร" },
];

export const fundedResearch: FundedResearch[] = [
  { id: "GP-001", title: "ตู้อบผลไม้พลังงานแสงอาทิตย์ควบคุมความชื้น", funderId: "F-PMUC", researcherId: "R-001", fieldId: "engineering", fiscalYear: 2570, primaryStrategyId: "NS2", allocatedAmount: 2500000, status: "active", summary: "พัฒนาตู้อบเพื่อลดพลังงานและรักษาคุณภาพอาหารในโรงงานขนาดเล็ก", output: "ต้นแบบตู้อบ 1 ระบบและผลทดสอบการใช้พลังงาน" },
  { id: "GP-002", title: "บรรจุภัณฑ์ชีวภาพจากเส้นใยเกษตร", funderId: "F-NIA", researcherId: "R-002", fieldId: "natural", fiscalYear: 2570, primaryStrategyId: "NS5", allocatedAmount: 1800000, status: "active", summary: "พัฒนาวัสดุทดแทนพลาสติกและประเมินการย่อยสลายของบรรจุภัณฑ์", output: "สูตรวัสดุและผลทดสอบการย่อยสลาย" },
  { id: "GP-003", title: "ระบบคาดการณ์ซ่อมบำรุงเครื่องจักร", funderId: "F-NRCT", researcherId: "R-003", fieldId: "engineering", fiscalYear: 2570, primaryStrategyId: "NS2", allocatedAmount: 3000000, status: "active", summary: "วิเคราะห์ข้อมูลการสั่นสะเทือนจากเซนเซอร์ IoT เพื่อลดเวลาหยุดเครื่อง", output: "ต้นแบบระบบแจ้งเตือนและแผนซ่อมบำรุง" },
  { id: "GP-004", title: "การเฝ้าระวังภัยไซเบอร์สำหรับโครงสร้างพื้นฐาน", funderId: "F-NRCT", researcherId: "R-003", fieldId: "engineering", fiscalYear: 2570, primaryStrategyId: "NS1", allocatedAmount: 4200000, status: "active", summary: "ศึกษาการตรวจจับความผิดปกติในระบบสารสนเทศที่ให้บริการสาธารณะ", output: "ชุดทดสอบและแนวทางเฝ้าระวังภัยไซเบอร์" },
  { id: "GP-005", title: "หลักสูตรพัฒนาทักษะผู้ดูแลผู้สูงอายุ", funderId: "F-PMUB", researcherId: "R-004", fieldId: "health", fiscalYear: 2570, primaryStrategyId: "NS3", allocatedAmount: 1200000, status: "active", summary: "พัฒนาหลักสูตรและเครื่องมือประเมินทักษะผู้ดูแลในชุมชน", output: "หลักสูตรต้นแบบและผลประเมินการเรียนรู้" },
  { id: "GP-006", title: "บริการสุขภาพเคลื่อนที่สำหรับชุมชนห่างไกล", funderId: "F-FOUNDATION", researcherId: "R-004", fieldId: "health", fiscalYear: 2570, primaryStrategyId: "NS4", allocatedAmount: 1600000, status: "active", summary: "ทดลองรูปแบบบริการเพื่อลดอุปสรรคในการเข้าถึงการดูแลสุขภาพ", output: "รูปแบบบริการและรายงานการเข้าถึงบริการ" },
  { id: "GP-007", title: "ระบบจัดการน้ำอัจฉริยะในแปลงเกษตร", funderId: "F-FOOD", researcherId: "R-005", fieldId: "agriculture", fiscalYear: 2570, primaryStrategyId: "NS5", allocatedAmount: 2100000, status: "active", summary: "ใช้เซนเซอร์ความชื้นและข้อมูลสภาพอากาศเพื่อจัดการน้ำในแปลงทดลอง", output: "ระบบควบคุมน้ำและข้อมูลการใช้น้ำเทียบฐานเดิม" },
  { id: "GP-008", title: "การออกแบบบริการภาครัฐที่ประชาชนเข้าถึงได้", funderId: "F-NRCT", researcherId: "R-006", fieldId: "social", fiscalYear: 2570, primaryStrategyId: "NS6", allocatedAmount: 900000, status: "active", summary: "ทดสอบกระบวนการบริการและลดขั้นตอนที่ประชาชนต้องเตรียมข้อมูลซ้ำ", output: "ต้นแบบบริการและข้อเสนอปรับกระบวนงาน" },
  { id: "GP-009", title: "ศิลปะชุมชนเพื่อพัฒนาทักษะสร้างสรรค์เยาวชน", funderId: "F-FOUNDATION", researcherId: "R-007", fieldId: "humanities", fiscalYear: 2570, primaryStrategyId: "NS3", allocatedAmount: 700000, status: "active", summary: "พัฒนากิจกรรมเรียนรู้ร่วมกับแหล่งวัฒนธรรมในชุมชน", output: "ชุดกิจกรรมและหลักฐานการเรียนรู้ของผู้เข้าร่วม" },
  { id: "GP-010", title: "เครือข่ายตรวจคุณภาพน้ำและฟื้นฟูแหล่งน้ำชุมชน", funderId: "F-NIA", researcherId: "R-008", fieldId: "natural", fiscalYear: 2569, primaryStrategyId: "NS5", allocatedAmount: 1500000, status: "completed", summary: "ทดลองเครือข่ายเฝ้าระวังและคืนข้อมูลคุณภาพน้ำให้ชุมชน", output: "ชุดข้อมูลคุณภาพน้ำและคู่มือชุมชน" },
  { id: "GP-011", title: "ทักษะดิจิทัลสำหรับแรงงานนอกระบบ", funderId: "F-PMUB", researcherId: "R-009", fieldId: "social", fiscalYear: 2569, primaryStrategyId: "NS4", allocatedAmount: 1100000, status: "completed", summary: "ออกแบบการเรียนรู้ที่เข้าถึงได้สำหรับแรงงานที่มีข้อจำกัดด้านเวลา", output: "หลักสูตรสาธิตและผลติดตามการใช้ทักษะ" },
  { id: "GP-012", title: "อาหารปลอดภัยและระบบตรวจสอบย้อนกลับ", funderId: "F-FOOD", researcherId: "R-010", fieldId: "agriculture", fiscalYear: 2569, primaryStrategyId: "NS2", allocatedAmount: 1400000, status: "completed", summary: "ทดลองบันทึกข้อมูลกระบวนการผลิตอาหารตั้งแต่แปลงถึงผู้ประกอบการ", output: "ต้นแบบระบบตรวจสอบย้อนกลับ" },
  { id: "GP-013", title: "การซ้อมรับมือภัยพิบัติด้วยข้อมูลชุมชน", funderId: "F-NRCT", researcherId: "R-006", fieldId: "social", fiscalYear: 2569, primaryStrategyId: "NS1", allocatedAmount: 800000, status: "completed", summary: "พัฒนารูปแบบสื่อสารและซ้อมรับมือเหตุฉุกเฉินร่วมกับชุมชน", output: "แผนการซ้อมและข้อเสนอปรับการสื่อสาร" },
  { id: "GP-014", title: "มาตรฐานข้อมูลวิจัยสำหรับบริการภาครัฐ", funderId: "F-PMUC", researcherId: "R-003", fieldId: "engineering", fiscalYear: 2569, primaryStrategyId: "NS6", allocatedAmount: 1300000, status: "completed", summary: "ทดสอบสัญญาข้อมูลกลางและการแปลงข้อมูลข้ามหน่วยงานใน sandbox", output: "ข้อเสนอมาตรฐานข้อมูลและตัวอย่าง Adapter" },
];

function contract(projectId: string, amounts: number[], paid: number): GrantContract {
  const project=fundedResearch.find(p=>p.id===projectId)!;
  const id=`CT-${projectId}`;
  const startYear=project.fiscalYear===2570?2026:2025;
  return { id, number:`GP/${project.fiscalYear}/${projectId.slice(-3)}`, projectId, signedDate:`${startYear}-10-01`, endDate:`${startYear+1}-09-30`, installments:amounts.map((amount,i)=>({id:`${id}-${i+1}`,name:`งวดที่ ${i+1}`,amount,dueDate:i===0?`${startYear}-10-15`:`${startYear+1}-${String(2+i*2).padStart(2,"0")}-15`,status:i<paid?"disbursed":"pending",...(i<paid?{paidDate:i===0?`${startYear}-10-15`:`${startYear+1}-${String(2+i*2).padStart(2,"0")}-15`,reference:`DEMO-PAY-${projectId}-${i+1}`}:{})})) };
}
export const demoGrantContracts: GrantContract[] = [
  contract("GP-001",[500000,1000000,1000000],1),
  contract("GP-002",[600000,600000,600000],1),
  contract("GP-003",[750000,750000,750000,750000],0),
  contract("GP-004",[1400000,1400000,1400000],1),
  contract("GP-005",[400000,400000,400000],0),
  contract("GP-006",[800000,800000],1),
  contract("GP-007",[700000,700000,700000],0),
  contract("GP-010",[500000,500000,500000],3),
  contract("GP-011",[550000,550000],2),
  contract("GP-012",[700000,700000],2),
];
