export interface BaseNotice {
  title: string;
  content: string;
}

export interface NoticeType extends BaseNotice {
  id: number;
  createdAt: string;
  isPrimary: boolean;
}

export interface NoticeResponse {
  announcements: NoticeType[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface PrimaryNoticeResponse {
  id: number;
  title: string;
  totalAnnouncements: number;
}
