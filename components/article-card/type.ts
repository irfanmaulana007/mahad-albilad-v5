import { Article, User } from '@prisma/client'

export interface IArticleCard {
  article: IArticle
}

export interface IArticle extends Article {
  author: User
  totalViews: number
  totalLikes: number
  totalShares: number
}
