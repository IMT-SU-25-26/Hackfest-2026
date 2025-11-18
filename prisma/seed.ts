import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"; // 1. Import bcrypt

async function main() {
  // Clear existing data (optional)
  await prisma.member.deleteMany();
  await prisma.team.deleteMany();

  console.log("Existing data cleared.");

  // 2. Hash the passwords before creating the records
  // The second argument '10' is the salt rounds/cost factor
  const passwordAlpha = await bcrypt.hash("password123", 10);
  const passwordBeta = await bcrypt.hash("password456", 10);

  // Create Team 1 with 5 members
  const team1 = await prisma.team.create({
    data: {
      team_name: "Alpha Innovators",
      country: "Indonesia",
      university: "Universitas Indonesia",
      phone_number: "081234567890",
      line_id: "alpha_line",
      password: passwordAlpha, // 3. Use the hashed password
      proposal_url: "https://example.com/proposal-alpha",
      members: {
        create: [
          { name: "Member 1A" },
          { name: "Member 2A" },
          { name: "Member 3A" },
          { name: "Member 4A" },
          { name: "Member 5A" },
        ],
      },
    },
  });

  // Create Team 2 with 5 members
  const team2 = await prisma.team.create({
    data: {
      team_name: "Beta Pioneers",
      country: "Singapore",
      university: "Nanyang Technological University",
      phone_number: "081298765432",
      line_id: "beta_line",
      password: passwordBeta, // 3. Use the hashed password
      proposal_url: "https://example.com/proposal-beta",
      members: {
        create: [
          { name: "Member 1B" },
          { name: "Member 2B" },
          { name: "Member 3B" },
          { name: "Member 4B" },
          { name: "Member 5B" },
        ],
      },
    },
  });

  console.log("Seed completed:", { 
    team1: team1.team_name, 
    team2: team2.team_name 
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });