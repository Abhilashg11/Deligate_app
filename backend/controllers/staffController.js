const prisma = require("../prisma");

exports.createStaff = async (req, res) => {
  try {
    const { generalData, competencies, role } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create staff
      const staff = await tx.staff.create({
        data: {
          firstname: generalData.firstname,
          lastname: generalData.lastname,
          dob: new Date(generalData.dob),
          role: role,
          gender: generalData.gender || null
        },
      });

      // 2. Get competency types
      const competencyTypes = await tx.competencyType.findMany({
        where: { role: role },
      });

      const typeMap = {};
      competencyTypes.forEach((c) => {
        typeMap[c.name] = c.id;
      });

      // 3. Prepare competency data
      const competencyData = Object.entries(competencies).map(
        ([name, value]) => {
          if (!typeMap[name]) {
            throw new Error(`Invalid competency: ${name}`);
          }

          return {
            staffId: staff.id,
            competencyTypeId: typeMap[name],
            expiryDate: value.expiryDate
              ? new Date(value.expiryDate)
              : null,
            fileUrl: value.fileUrl || null,
          };
        }
      );

      // 4. Insert
      const uploadedCompetencies = await tx.staffCompetency.createMany({
        data: competencyData,
      });

      return { staff, uploadedCompetencies };
    });

    return res.status(201).json({
      message: "Staff created successfully",
      ...result,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};