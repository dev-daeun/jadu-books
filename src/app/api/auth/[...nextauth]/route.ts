import { signUpSchema } from "@/types/user"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"




const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "아이디를 입력하세요" },
      password: { label: "Password", type: "password", placeholder: "비밀번호를 입력하세요" },
      confirmPassword: { label: "Confirm Password", type: "password", placeholder: "비밀번호를 다시 입력하세요" },

    },
    authorize: async (credentials) => {
      const result = signUpSchema.safeParse({
        username: credentials?.username,
        password: credentials?.password,
        confirmPassword: credentials?.confirmPassword,
      })
      if (!result.success) {
        return null
      }
      else if (result.data.password != result.data.confirmPassword) {
        return null
      }
      else {
        const user = {id: "1", name: result.data.username}
        return user
      }
    },
  })
]


const handler =  NextAuth({ providers })


export { handler as GET, handler as POST }

