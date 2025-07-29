import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof setupPrisma> | undefined
}

// Séparé pour éviter les problèmes de typage
const setupPrisma = () =>
  new PrismaClient({
    log: ['query'], // Optionnel : utile en dev
  }).$extends(withAccelerate())

export const prisma =
  globalForPrisma.prisma ?? setupPrisma()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}