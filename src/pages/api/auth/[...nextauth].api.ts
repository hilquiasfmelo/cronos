import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    // Chamada do Adapter customizado para persistir os dados no banco
    adapter: PrismaAdapter(req, res),

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        httpOptions: {
          timeout: 40000,
        },
        // Busca escopos de acessos aos dados do perfil e calendário do usuário
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        // Busca somente os dados do usuário que queremos do Google
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            // Escrito dessa forma pois o mesmo já está criado no Banco
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      }),
    ],

    // No momento que o usuário se logar, essas funções serão chamadas
    callbacks: {
      // Verifica se o usuário permitiu acesso ao Google Calendar
      async signIn({ account }) {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/connect-calendar/?error=permissions'
        }

        return true
      },

      // Retorna todos os dados que queremos como resposta para ser consumido pelo Frontend
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
