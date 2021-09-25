export interface IProfile {
  id: number;
  username: string;
  createdAt: string;
  bio?: string;
  followedBy: number;
  following: number;
  twitAmount: number;
  isFollowing: boolean;
}
