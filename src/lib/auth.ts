import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing");
}

const client = new MongoClient(mongoUri);
const db = client.db("HireLoop_DB");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "jobSeeker",
        input: true,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role =
            user.role === "employer" ? "employer" : "jobSeeker";

          return {
            data: {
              ...user,
              role,
            },
          };
        },
      },
    },
  },

  plugins: [jwt()],
});
