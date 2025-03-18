import { Article } from '@prisma/client'
import { IArticle } from 'components/article-card/type'

export const ArticleService = {
  getAll: async (): Promise<IArticle[]> => {
    const response = await fetch('/api/articles')
    if (!response.ok) throw new Error('Failed to fetch articles')
    return response.json()
  },

  getById: async (id: string): Promise<IArticle> => {
    const response = await fetch(`/api/articles/${id}`)
    if (!response.ok) throw new Error('Failed to fetch article')
    return response.json()
  },

  getBySlug: async (slug: string): Promise<IArticle> => {
    const response = await fetch(`/api/articles/slug/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch article')
    return response.json()
  },

  create: async (data: Partial<Article>): Promise<Article> => {
    console.log('data: ', data)
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create article')
    return response.json()
  },

  update: async (id: string, data: Partial<Article>): Promise<Article> => {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update article')
    return response.json()
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete article')
  },
}
