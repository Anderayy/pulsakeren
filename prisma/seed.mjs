import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const superAdmin = await prisma.role.upsert({
    where: { name: "Super Admin" },
    update: {},
    create: { name: "Super Admin", permissions: ["*"] },
  });

  await prisma.role.upsert({
    where: { name: "Finance" },
    update: {},
    create: { name: "Finance", permissions: ["payments.read", "reports.export", "deposits.manage"] },
  });

  await prisma.role.upsert({
    where: { name: "Customer Service" },
    update: {},
    create: { name: "Customer Service", permissions: ["tickets.manage", "orders.read", "refunds.request"] },
  });

  await prisma.admin.upsert({
    where: { email: "admin@pulsakeren.com" },
    update: {},
    create: {
      name: "Jane Doe",
      email: "admin@pulsakeren.com",
      passwordHash: hashSync("password123", 10),
      roleId: superAdmin.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@pulsakeren.com" },
    update: {},
    create: {
      name: "Pulsakeren User",
      email: "user@pulsakeren.com",
      passwordHash: hashSync("password123", 10),
      phone: "081234567890",
      balance: 1250000,
      points: 1200,
    },
  });

  console.log("Seed completed. Demo accounts: user@pulsakeren.com and admin@pulsakeren.com / password123");
}

main().finally(async () => {
  await prisma.$disconnect();
});
