import type { MediaVerificationStatus } from "@/lib/verification-status";

export type CallStage =
  | "idle"
  | "searching"
  | "connecting"
  | "connected"
  | "feedback";

export type FeedbackPhase = "pending" | "waiting" | "matched" | "done";

export type VideoPartner = {
  id: string;
  name: string;
  profileUrl: string;
  email?: string;
  distance?: string;
  /** Profile photo moderation — API `profileStatus`. */
  profileStatus?: MediaVerificationStatus;
  /** From `peer_found.otherUserProfileStatus`. */
  otherUserProfileStatus?: MediaVerificationStatus;
};

export type VideoChatMessage = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMine: boolean;
};

export type SparkDatingConfig = {
  maxWaitTime: number;
  sparkDatingRounds: number;
  roundExpireTime: number;
  distanceMaxThreshold: number;
};

export type SparkPlanQuota = {
  amount: number;
  unlimited: boolean;
};

export type PeerFoundPayload = {
  roomId: string;
  otherUser: string;
  otherUserName: string;
  otherUserProfilePic?: string;
  otherUserEmail?: string;
  /** Parsed `profileStatus` from `peer_found`. */
  otherUserProfileStatus?: MediaVerificationStatus;
  profileStatus?: MediaVerificationStatus;
};

export type VideoFilterInput = {
  gender: "Everyone" | "Female" | "Male" | "Other";
  minAge: number;
  maxAge: number;
  maxDistance: number;
};

export type RandomCallFilter = "all" | "random" | "spark";

export type RandomCallPartner = VideoPartner & {
  age?: number;
  gender?: string;
  username?: string;
  bio?: string;
  interests?: string[];
  isActive?: boolean;
};

export type RandomCallEntry = {
  id: string;
  partner: RandomCallPartner;
  durationSec: number;
  timestamp: Date;
  distance?: string;
  liked?: boolean;
  callType?: RandomCallFilter;
};

export type PaginatedRandomCallHistory = {
  type: RandomCallFilter;
  entries: RandomCallEntry[];
  totalCalls: number;
  currentPage: number;
  totalPages: number;
};
