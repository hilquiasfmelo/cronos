import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import { styled } from '@/styles'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const AvatarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$gray900',
})

export const FormAnnotation = styled(Text, {
  color: '$gray900',
})
