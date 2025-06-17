export type NoticePostType = {
  title: string;
  content: string;
};

export type NoticeType = {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  isPrimary?: boolean;
};
