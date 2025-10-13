/*import { ref, push, set } from "firebase/database";
import { rtdb } from "./database/database";

export async function seedCVs() {
  const testCVs = [
    { age: 28, educationLevel: "Bachelor", region: "Hovedstaden", availability: "Fuldtid", salaryMin: 40000, yearsExp: 4,
      headline: "Frontend udvikler",
      text: "Frontend med fokus på React/TypeScript og UX. Vant til små agile teams.",
      skills: ["react", "typescript", "css", "ux"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800" },

    { age: 33, educationLevel: "Master", region: "Midtjylland", availability: "Deltid", salaryMin: 50000, yearsExp: 8,
      headline: "Projektleder",
      text: "Styrer digitale projekter med fokus på leverancer, risiko og stakeholder management.",
      skills: ["scrum", "jira", "stakeholder", "budget"],
      languages: ["dansk", "engelsk", "tysk"],
      photoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800" },

    { age: 41, educationLevel: "PhD", region: "Nordjylland", availability: "Fuldtid", salaryMin: 60000, yearsExp: 12,
      headline: "Data scientist",
      text: "Bygger ML-modeller til forecasting og klassifikation. Erfaring med MLOps.",
      skills: ["python", "pandas", "pytorch", "mlops"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1603415526960-f7e0328a3a5d?w=800" },

    { age: 25, educationLevel: "Erhvervsuddannelse", region: "Syddanmark", availability: "Fuldtid", salaryMin: 35000, yearsExp: 3,
      headline: "Elektriker",
      text: "Service og installation. Vant til dokumentation og kundekontakt.",
      skills: ["installation", "service", "fejlfinding"],
      languages: ["dansk"],
      photoUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800" },

    { age: 30, educationLevel: "Bachelor", region: "Sjælland", availability: "Deltid", salaryMin: 42000, yearsExp: 6,
      headline: "UX designer",
      text: "Prototyper i Figma, brugerinterviews og design systemer.",
      skills: ["figma", "research", "ui", "accessibility"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800" },

    { age: 27, educationLevel: "Bachelor", region: "Hovedstaden", availability: "Fuldtid", salaryMin: 38000, yearsExp: 5,
      headline: "Grafisk designer",
      text: "Branding og SoMe-grafik. Arbejder tæt med marketing.",
      skills: ["adobe", "branding", "layout"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800" },

    { age: 36, educationLevel: "Master", region: "Syddanmark", availability: "Fuldtid", salaryMin: 55000, yearsExp: 10,
      headline: "Marketingchef",
      text: "E-commerce, performance og content. Driver vækst via data.",
      skills: ["seo", "sem", "meta ads", "email"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800" },

    { age: 32, educationLevel: "Bachelor", region: "Midtjylland", availability: "Fuldtid", salaryMin: 47000, yearsExp: 7,
      headline: "Softwareudvikler",
      text: "Full-stack JS. Node, React og SQL. Fokus på kvalitet og tests.",
      skills: ["node", "react", "postgres", "jest"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800" },

    { age: 26, educationLevel: "Erhvervsuddannelse", region: "Nordjylland", availability: "Fuldtid", salaryMin: 36000, yearsExp: 4,
      headline: "Tømrer",
      text: "Nybyg, tag og køkken. Kvalitet og finish i top.",
      skills: ["nybyg", "renovering", "målfasthed"],
      languages: ["dansk"],
      photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800" },

    { age: 40, educationLevel: "PhD", region: "Hovedstaden", availability: "Deltid", salaryMin: 62000, yearsExp: 15,
      headline: "Forsker",
      text: "Publiceret internationalt. Erfaring med projektmidler og samarbejder.",
      skills: ["research", "statistics", "grant writing"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800" },

    { age: 31, educationLevel: "Bachelor", region: "Sjælland", availability: "Fuldtid", salaryMin: 43000, yearsExp: 6,
      headline: "Systemadministrator",
      text: "Windows/Linux, netværk og sikkerhed. Automatiserer med scripts.",
      skills: ["linux", "windows", "network", "scripting"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800" },

    { age: 29, educationLevel: "Master", region: "Midtjylland", availability: "Fuldtid", salaryMin: 49000, yearsExp: 5,
      headline: "Dataanalytiker",
      text: "Bygger dashboards og analyser. Erfaring med Power BI og SQL.",
      skills: ["sql", "power bi", "etl", "excel"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800" },

    { age: 38, educationLevel: "Gymnasial", region: "Syddanmark", availability: "Deltid", salaryMin: 37000, yearsExp: 12,
      headline: "Sælger",
      text: "B2B nykundesalg og pipeline. Kender CRM og KPI-styring.",
      skills: ["crm", "outreach", "forhandling"],
      languages: ["dansk"],
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800" },

    { age: 35, educationLevel: "Bachelor", region: "Nordjylland", availability: "Fuldtid", salaryMin: 52000, yearsExp: 9,
      headline: "Projektkoordinator",
      text: "Planlægning, mødenoter og opfølgning. Holder tråd på tværs.",
      skills: ["planlægning", "excel", "opfølgning"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800" },

    { age: 23, educationLevel: "Erhvervsuddannelse", region: "Midtjylland", availability: "Fuldtid", salaryMin: 33000, yearsExp: 2,
      headline: "Kontorassistent",
      text: "Support, kalendere og kundemail. Hurtig på tasterne.",
      skills: ["office", "kundeservice", "koordination"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=800" },

    { age: 42, educationLevel: "PhD", region: "Sjælland", availability: "Fuldtid", salaryMin: 65000, yearsExp: 18,
      headline: "Professor",
      text: "Undervisning, vejledning og forskning. Leder af forskergruppe.",
      skills: ["undervisning", "vejledning", "publikationer"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800" },

    { age: 37, educationLevel: "Master", region: "Hovedstaden", availability: "Fuldtid", salaryMin: 54000, yearsExp: 11,
      headline: "HR-konsulent",
      text: "Rekruttering, onboarding og performanceprocesser.",
      skills: ["rekruttering", "onboarding", "hr-processer"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800" },

    { age: 24, educationLevel: "Bachelor", region: "Nordjylland", availability: "Fuldtid", salaryMin: 34000, yearsExp: 2,
      headline: "Junior udvikler",
      text: "React Native og Firebase. Eager to learn.",
      skills: ["react native", "firebase", "js"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=800" },

    { age: 39, educationLevel: "Master", region: "Syddanmark", availability: "Fuldtid", salaryMin: 56000, yearsExp: 13,
      headline: "Økonom",
      text: "Budgetter, controlling og rapportering til ledelse.",
      skills: ["controlling", "budget", "excel", "power bi"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800" },

    { age: 27, educationLevel: "Bachelor", region: "Hovedstaden", availability: "Deltid", salaryMin: 38000, yearsExp: 3,
      headline: "Kundeservice",
      text: "1st line support og ticketing. Høj kundetilfredshed.",
      skills: ["support", "ticketing", "kommunikation"],
      languages: ["dansk", "engelsk"],
      photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800" },
  ];

  for (const cv of testCVs) {
    const newRef = push(ref(rtdb, "cvs"));
    await set(newRef, cv);
  }

  console.log("✅ 20 test-CV’er med headline + text tilføjet");
}
*/