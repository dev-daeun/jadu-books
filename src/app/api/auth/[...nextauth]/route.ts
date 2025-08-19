import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({ 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("AUTHORIZE : ", credentials)
        if (credentials?.username && credentials?.password) {
          return { 
            id: "1", 
            name: credentials.username,
          }
        }
        return null
      },
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log("SIGN IN : ", user, account, profile, email, credentials)
      return true
    },
    session: async ({ session, token }) => {
      console.log("SESSION : ", session, token)
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
})

export { handler as GET, handler as POST }

