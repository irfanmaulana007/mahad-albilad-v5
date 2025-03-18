import { Activity, ActivityTypeEnum } from '@prisma/client'

export const ActivityService = {
  create: async (data: { articleId: string; action: ActivityTypeEnum }): Promise<Activity> => {
    const response = await fetch('/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create activity')
    return response.json()
  },

  getByArticleId: async (articleId: string): Promise<Activity[]> => {
    const response = await fetch(`/api/activities/article/${articleId}`)
    if (!response.ok) throw new Error('Failed to fetch activities')
    return response.json()
  },

  trackView: async (articleId: string): Promise<Activity> => {
    return ActivityService.create({
      articleId,
      action: ActivityTypeEnum.VIEW_ARTICLE,
    })
  },

  trackLike: async (articleId: string): Promise<Activity> => {
    return ActivityService.create({
      articleId,
      action: ActivityTypeEnum.LIKE_ARTICLE,
    })
  },

  trackShare: async (articleId: string): Promise<Activity> => {
    return ActivityService.create({
      articleId,
      action: ActivityTypeEnum.SHARE_ARTICLE,
    })
  },
}
