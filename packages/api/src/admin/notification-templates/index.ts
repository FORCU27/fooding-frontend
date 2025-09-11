export * from './type';

import {
  AdminCreateNotificationTemplateRequest,
  AdminUpdateNotificationTemplateRequest,
  AdminNotificationTemplateResponseSchema,
  GetNotificationTemplateListResponse,
  GetNotificationTemplateResponse,
} from './type';
import { api } from '../../shared';

const ENDPOINT = '/admin/notification-template';

export const notificationTemplateApi = {
  getNotificationTemplateList: async (
    page: number = 0,
    size: number = 10,
    title?: string,
    type?: string,
    isActive?: boolean,
  ) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (title) params.append('title', title);
    if (type) params.append('type', type);
    if (isActive !== undefined) params.append('isActive', isActive.toString());

    const response = await api.get(`${ENDPOINT}?${params.toString()}`);
    return GetNotificationTemplateListResponse.parse(response);
  },

  getNotificationTemplate: async (id: string) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return GetNotificationTemplateResponse.parse(response);
  },

  getNotificationTemplateById: async (id: string) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return AdminNotificationTemplateResponseSchema.parse(response);
  },

  createNotificationTemplate: async (body: AdminCreateNotificationTemplateRequest) => {
    return api.post(ENDPOINT, body);
  },

  updateNotificationTemplate: async ({ id, body }: { id: string; body: AdminUpdateNotificationTemplateRequest }) => {
    return api.post(`${ENDPOINT}/${id}`, body);
  },

  deleteNotificationTemplate: async (id: string) => {
    return api.delete(`${ENDPOINT}/${id}`);
  },
};
