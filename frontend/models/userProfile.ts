export interface IProfile {
  id: number;
  username: string;
  createdAt: string;
  pfp: string;
  bio?: string;
  followedBy: number;
  following: number;
  twitAmount: number;
  isFollowing: boolean;
}
