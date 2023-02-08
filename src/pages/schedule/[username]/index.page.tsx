import { Avatar } from '@/components/Avatar'
import { HeaderMain } from '@/components/Header'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { prisma } from '@/lib/prisma'
import { GetStaticPaths, GetStaticProps } from 'next'
import ScheduleForm from '../schedule-form/index.page'
import { Container, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <HeaderMain />

      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} alt={user.name} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        {/* Chamando o componente de calendário */}
        <ScheduleForm />
      </Container>
    </>
  )
}

// A página só será gerada estática quando o usuário acessá-la
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
