import type { GovFundDemoData } from "@/src/types/govfund";

export const govFundDemoData: GovFundDemoData = {
  user: {
    name: "คุณดนัย นักประดิษฐ์",
    company: "บริษัท อกริเทค จำกัด",
    registrationNo: "010555XXXXXXX",
    address:
      "88/12 อาคารนวัตกรรมเกษตร ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
  },
  funds: [
    {
      id: 1,
      title: "กองทุนส่งเสริมการอนุรักษ์พลังงาน",
      matchScore: 95,
      tags: ["พลังงาน", "SME"],
      agency: "กระทรวงพลังงาน",
    },
    {
      id: 2,
      title: "ทุนสนับสนุนนวัตกรรม วว. (TISTR)",
      matchScore: 80,
      tags: ["นวัตกรรมเกษตร", "วิจัย"],
      agency: "กระทรวง อว.",
    },
    {
      id: 3,
      title: "ทุนวิจัยด้านการแพทย์ TCELS",
      matchScore: 45,
      tags: ["ชีววิทยาศาสตร์"],
      agency: "ศูนย์ความเป็นเลิศด้านชีววิทยาศาสตร์",
    },
  ],
  applications: [
    {
      title: "ระบบอบแห้งพลังงานแสงอาทิตย์",
      fund: "กองทุนอนุรักษ์พลังงาน",
      status: "กำลังพิจารณา (Under Review)",
      tone: "amber",
      date: "20 Aug 2026",
      progress: 58,
    },
    {
      title: "สารสกัดสมุนไพร",
      fund: "วว.",
      status: "ขอเอกสารเพิ่มเติม (Action Required)",
      tone: "red",
      date: "12 Aug 2026",
      progress: 34,
    },
  ],
};
