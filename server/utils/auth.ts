import "dotenv/config"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../../db/client"
import * as schema from "../../db/schema"

export const auth = betterAuth({
    trustedOrigins: (process.env.TRUSTED_ORIGINS ?? "").split(","),
    database: drizzleAdapter(db, {
        schema,
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    onAPIError: {
        onError(err) {
            console.log("BetterAuth Error : ", err)
        },
    },
})
