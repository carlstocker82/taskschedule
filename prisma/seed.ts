import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const schedule1 = await prisma.schedule.upsert({
        where: { id: 1 },
        update: {},
        create: {
            account_id: 123,
            agent_id: 234,
            start_time: "2024-12-06T08:00:00Z",
            end_time: '2024-12-06T10:00:00Z',
        },
    });

    const schedule2 = await prisma.schedule.upsert({
        where: { id: 2 },
        update: {},
        create: {
            account_id: 565,
            agent_id: 75675,
            start_time: '2024-12-06T15:00:00Z',
            end_time: '2024-12-06T17:00:00Z',
        },
    });


    const task1 = await prisma.task.upsert({
        where: { id: 1 },
        update: {},
        create: {
            account_id: 123,
            schedule_id: 1,
            start_time: '2024-12-06T15:00:00Z',
            duration: 2,
            type: 'work',
        },
    });

    const task2 = await prisma.task.upsert({
        where: { id: 2 },
        update: {},
        create: {
            account_id: 123,
            schedule_id: 2,
            start_time: '2024-12-06T13:00:00Z',
            duration: 4,
            type: 'work',
        },
    });

    const task3 = await prisma.task.upsert({
        where: { id: 3 },
        update: {},
        create: {
            account_id: 565,
            schedule_id: 2,
            start_time: '2024-12-06T17:00:00Z',
            duration: 3,
            type: 'break',
        },
    });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });