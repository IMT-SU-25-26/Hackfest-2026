import prisma from "@/lib/config/prisma"
import bcrypt from "bcrypt"

async function main() {
  console.log("🌱 Running safe, idempotent seed...")

  const passwordAlpha = await bcrypt.hash("password12321", 10)
  const passwordBeta = await bcrypt.hash("password45654", 10)
  const passwordAdmin = await bcrypt.hash("admin@h4ckf3st-IMT", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@hackfest.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@hackfest.com",
      password: passwordAdmin,
      role: "ADMIN",
      country: "Indonesia",
      phone_number: "0000000000",
      line_id: "admin_line",
      poster_url: "",
      twibbon_url: "",
    },
  })
  console.log({ admin })
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
