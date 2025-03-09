import { PrismaClient } from "@prisma/client"

// 1. Import libSQL and the Prisma libSQL driver adapter
import { PrismaLibSQL } from "@prisma/adapter-libsql"
import { createClient } from "@libsql/client"

let prisma: PrismaClient

// 2. Instantiate libSQL
const libsql = createClient({
  // @ts-expect-error
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

// 3. Instantiate the libSQL driver adapter
const adapter = new PrismaLibSQL(libsql)

// https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
// https://github.com/vercel/next.js/issues/7811#issuecomment-618425485
// https://github.com/prisma/prisma-client-js/issues/730
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter })
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  // @ts-ignore
  global["prisma"] = global["prisma"] || new PrismaClient({ adapter })
  // @ts-ignore
  prisma = global["prisma"]
}

export default prisma
