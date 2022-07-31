import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [

    Credentials({
        name: 'Custom Login',
        credentials: {
            email: {label: 'Correo:', type: 'email', placeholder: 'correo@google.com'},
            password: { label: 'Password:', type: 'password', placeholder: 'password'}
        },
        async authorize(credentials){
            console.log(credentials)

            // return await dbUsers.checkUserEmaiPassword( credetials!.email, credetials!.password)
            return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );
        }
    }),

    GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    
  ],

  pages:{
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400
  },


//   Callbacks
  jwt:{

  },

  callbacks:{
    async jwt({ token, account, user}){
      if(account){
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
              token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '');
            break;
          case 'credentials':
            token.user = user
            break;
        }
      }
      return token
    },

    async session({ session, token, user}){
      session.accessYoken = token.accessToken;
      session.user = token.user as any

      return session
    }
  }
})