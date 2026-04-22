const  Prisma  = require('../prisma');

const competencyData = [
  { name: "DSP Certification", role: "dsp" },
  { name: "First Aid", role: "dsp" },
  { name: "CPR", role: "dsp" },
  { name: "Med Pass", role: "dsp" },
  { name: "CMT Certification", role: "cmt" },
  { name: "First Aid", role: "cmt" },
  { name: "CPR", role: "cmt" },
  { name: "MTTP", role: "cmt" },
  { name: "Nursing License", role: "lst" },
  { name: "License Expiration", role: "lst" },
  { name: "Supervising RN", role: "lst" }
];

async function main() {
  console.log("Cleaning and seeding...");
  await Prisma.competencyType.deleteMany({}); // Optional: clear table first

  for (const item of competencyData) {
    await Prisma.competencyType.create({
      data: item,
    });
  }
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await Prisma.$disconnect();
  });