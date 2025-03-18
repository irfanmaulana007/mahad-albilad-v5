export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  GAME_OPS = 'GAME_OPS',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
}

export type SortKey = keyof Account

export type SortConfig = {
  key: SortKey | null
  direction: 'asc' | 'desc'
}

export type Account = {
  id: string
  name: string | null
  email: string
  role: Role
  createdAt: string
}
