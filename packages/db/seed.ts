import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Ensure a user exists and fetch its ID
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: { email: "test@example.com" },
  });

  console.log(`✅ User created: ${user.id}`);

  // Create websites linked to the user
  await prisma.website.createMany({
    data: [
      { id: "web_1", url: "https://example.com", userId: user.id },
      { id: "web_2", url: "https://github.com", userId: user.id },
      { id: "web_3", url: "https://prisma.io", userId: user.id },
      { id: "web_4", url: "https://stackoverflow.com", userId: user.id },
      { id: "web_5", url: "https://openai.com", userId: user.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Websites seeded");

  // Create validators
  await prisma.validator.createMany({
    data: [
      { id: "val_1", publicKey: "pubKey1", location: "US", ip: "192.168.1.1" },
      { id: "val_2", publicKey: "pubKey2", location: "IN", ip: "192.168.1.2" },
      { id: "val_3", publicKey: "pubKey3", location: "DE", ip: "192.168.1.3" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Validators seeded");

  // Create website ticks (Fixed model name)
  await prisma.websiteTicks.createMany({
    data: [
      { id: "tick_1", websiteId: "web_1", validatorId: "val_1", status: Status.GOOD, latency: 120 },
      { id: "tick_2", websiteId: "web_1", validatorId: "val_2", status: Status.BAD, latency: 300 },
      { id: "tick_3", websiteId: "web_2", validatorId: "val_1", status: Status.GOOD, latency: 150 },
      { id: "tick_4", websiteId: "web_3", validatorId: "val_3", status: Status.GOOD, latency: 90 },
      { id: "tick_5", websiteId: "web_4", validatorId: "val_2", status: Status.BAD, latency: 400 },
      { id: "tick_6", websiteId: "web_5", validatorId: "val_3", status: Status.GOOD, latency: 80 },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Website ticks seeded");

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
