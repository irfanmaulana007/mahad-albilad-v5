import { Role } from '@prisma/client'

export type SortKey = keyof User | 'actions'

export type SortConfig = {
  key: SortKey | null
  direction: 'asc' | 'desc'
}

export type User = {
  id: string
  name: string | null
  email: string
  role: Role
  createdAt: string
}
