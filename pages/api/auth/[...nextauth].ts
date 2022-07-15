import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [

    Credentials({
        name: 'Custom Login',
        credentials: {
            email: {label: 'Correo:', type: 'email', placeholder: 'crreo@google.com'},
            password: { label: 'Password:', type: 'password', placeholder: 'password'}
        },
        async authorize(credetials){
            console.log(credetials)

            return null
        }
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
    // ...add more providers here
  ],


//   Callbacks
  jwt:{
    
  },

  callbacks:{

  }
})