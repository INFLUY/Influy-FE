export interface UserProfileType {
  id: number;
  username: string;
  nickname: string;
  profileImg: string | null;
  createdAt: string;
}

export interface UserEditProfileType {
  nickname?: string;
  profileUrl?: string;
}
