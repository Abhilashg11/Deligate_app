const { PrismaClient } = require("@prisma/client");

// In v7, Prisma handles the env injection automatically if generate was successful
const prisma = new PrismaClient(); 

async function main() {
  console.log("Starting seed...");
  
  await prisma.competencyType.createMany({
    data: [
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
    ],
    skipDuplicates: true
  });

  console.log("Seeding done!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });