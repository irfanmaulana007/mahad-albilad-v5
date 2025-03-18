import type { User } from 'types/user'

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch('/api/admin/users')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return response.json()
  },

  getMe: async (): Promise<User> => {
    const response = await fetch('/api/admin/users/me')
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return response.json()
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetch(`/api/admin/users/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    return response.json()
  },

  create: async (userData: { name: string; email: string; role: string }) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create user')
    }

    return response.json()
  },

  update: async (id: string, userData: { name?: string; email?: string; role?: string }) => {
    const response = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update user')
    }

    return response.json()
  },

  // We can add more user-related API calls here later
  // For example:
  // create: async (data: CreateUserData) => { ... }
  // update: async (id: string, data: UpdateUserData) => { ... }
  // delete: async (id: string) => { ... }
}

export type { User }
