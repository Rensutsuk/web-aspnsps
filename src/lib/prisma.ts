import { PrismaClient } from "@prisma/client";

type PrismaErrorLike = {
  code?: string;
  message?: string;
  name?: string;
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pris?: PrismaClient;
};

function createPrismaClient() {
  const connectionLimit = Number.parseInt(process.env.PRISMA_CONNECTION_LIMIT ?? "5", 10);
  const poolTimeout = Number.parseInt(process.env.PRISMA_POOL_TIMEOUT ?? "20", 10);
  const connectTimeout = Number.parseInt(process.env.PRISMA_CONNECT_TIMEOUT ?? "15", 10);

  return new PrismaClient({
    log: ["error", "warn"],
    errorFormat: "pretty",
    transactionOptions: {
      maxWait: 3_500,
      timeout: 10_000,
    },
    ...(connectionLimit || poolTimeout || connectTimeout
      ? {
          datasources: {
            db: {
              url: process.env.DATABASE_URL,
            },
          },
        }
      : {}),
  });
}

export const prisma: PrismaClient = globalForPrisma.pris ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pris = prisma;
}

export function isPrismaConnectionError(error: unknown): error is PrismaErrorLike {
  if (!error || typeof error !== "object") return false;
  const err = error as PrismaErrorLike;
  const code = err.code ?? "";
  const message = (err.message ?? "").toLowerCase();
  if (["P1000", "P1001", "P1002", "P1003", "P1008", "P1009", "P1010", "P1011", "P1012", "P1013", "P1015", "P1016", "P1017"].includes(code)) {
    return true;
  }
  const keywords = [
    "server has closed the connection",
    "connection terminated",
    "connection closed",
    "connection reset",
    "connection refused",
    "connection timed out",
    "operation timed out",
    "pool is empty",
    "no database connection",
    "ssl connection has been closed unexpectedly",
  ];
  return keywords.some((keyword) => message.includes(keyword));
}

export async function ensurePrismaConnection(client: PrismaClient = prisma, maxRetries = 2): Promise<void> {
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      await client.$queryRawUnsafe("SELECT 1;");
      return;
    } catch (error) {
      lastError = error;
      if (isPrismaConnectionError(error)) {
        try {
          await client.$disconnect();
        } catch {
          /* ignore cleanup errors */
        }
        if (attempt < maxRetries) {
          await new Promise((resolve) => {
            setTimeout(resolve, 250 + attempt * 300);
          });
          continue;
        }
      }
      throw error;
    }
  }

  throw lastError ?? new Error("Unable to verify Prisma connection.");
}

export function withConnectionGuard<TArgs extends unknown[], TResult>(
  operation: (...args: TArgs) => Promise<TResult>,
  onConnectionFailure: () => TResult | Promise<TResult>,
  onUnexpectedFailure?: (error: unknown) => TResult | Promise<TResult>,
) {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      return await operation(...args);
    } catch (error) {
      if (isPrismaConnectionError(error)) {
        try {
          await prisma.$disconnect().catch(() => undefined);
          return await onConnectionFailure();
        } catch {
          return await onConnectionFailure();
        }
      }
      if (onUnexpectedFailure) {
        return await onUnexpectedFailure(error);
      }
      return await onConnectionFailure();
    }
  };
}
