export interface BaseAnnouncement {
  title: string;
  content: string;
}

export interface AnnouncementType extends BaseAnnouncement {
  id: number;
  createdAt: string;
  isPrimary: boolean;
}

export interface PrimaryAnnouncementType {
  id: number;
  title: string;
  totalAnnouncements: number;
}
