import prisma from "@/lib/config/prisma"
import bcrypt from "bcrypt"

async function main() {
  console.log("🌱 Running safe, idempotent seed...")

  const passwordAlpha = await bcrypt.hash("password12321", 10)
  const passwordBeta = await bcrypt.hash("password45654", 10)
  const passwordAdmin = await bcrypt.hash("h4ckf3st@4dm1n?punyaIMT", 10)

}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
