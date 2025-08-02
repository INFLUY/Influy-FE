export interface BaseNotice {
  title: string;
  content: string;
}

export interface NoticeType extends BaseNotice {
  id: number;
  createdAt: string;
  isPrimary: boolean;
}

export interface PrimaryNoticeType {
  id: number;
  title: string;
  totalAnnouncements: number;
}
