import prisma from "@/lib/config/prisma";
import bcrypt from "bcrypt";

async function main() {
  // Clear existing data
  await prisma.member.deleteMany();
  await prisma.team.deleteMany();

  console.log("Existing data cleared.");

  // Hash passwords
  const passwordAlpha = await bcrypt.hash("password123", 10);
  const passwordBeta = await bcrypt.hash("password456", 10);
  const passwordAdmin = await bcrypt.hash("admin123", 10);

  // Team 1
  const team1 = await prisma.team.create({
    data: {
      team_name: "Alpha Innovators",
      country: "Indonesia",
      university: "Universitas Indonesia",
      phone_number: "081234567890",
      line_id: "alpha_line",
      password: passwordAlpha,
      proposal_url: "https://example.com/proposal-alpha",
      role: "USER",
      poster_url: "https://posterteam1",
      twibbon_url: "https://twibbonteam1",
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

  // Team 2
  const team2 = await prisma.team.create({
    data: {
      team_name: "Beta Pioneers",
      country: "Singapore",
      university: "Nanyang Technological University",
      phone_number: "081298765432",
      line_id: "beta_line",
      password: passwordBeta,
      proposal_url: "https://example.com/proposal-beta",
      role: "USER",
      poster_url: "https://posterteam2",
      twibbon_url: "https://twibbonteam2",
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

  // ✅ Admin Team (Only 1 member)
  const teamAdmin = await prisma.team.create({
    data: {
      team_name: "Hackfest Admin",
      country: "Indonesia",
      university: "Admin HQ",
      phone_number: "0000000000",
      line_id: "admin_line",
      password: passwordAdmin,
      proposal_url: null,
      role: "ADMIN",
      poster_url: "https://posterAdmin",
      twibbon_url: "https://twibbonAdmin",
      members: {
        create: [
          { name: "Hackfest Administrator" },
        ],
      },
    },
  });

  console.log("Seed completed:", { 
    team1: team1.team_name,
    team2: team2.team_name,
    admin: teamAdmin.team_name
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
