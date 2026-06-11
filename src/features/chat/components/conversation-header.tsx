"use client";

import { UserAvatar } from "@/components/chat/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypingDots } from "@/components/chat/typing-indicator";
import { BlockConfirmDialog } from "@/features/report/components/block-confirm-dialog";
import { ReportUserDialog } from "@/features/report/components/report-user-dialog";
import { ArrowLeft, Ban, Flag, MoreHorizontal, UserMinus } from "lucide-react";
import { useState } from "react";
import { chatSocket } from "../services/socket-service";
import type { ChatRoom } from "../types";

type ConversationHeaderProps = {
  room: ChatRoom;
  onBack?: () => void;
};

export function ConversationHeader({ room, onBack }: ConversationHeaderProps) {
  const { otherUser } = room;
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);

  return (
    <>
      <header className="chat-conversation-header">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text)] hover:bg-[var(--surface-2)] md:hidden"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        <UserAvatar
          name={otherUser.name}
          url={otherUser.profileUrl}
          size="lg"
          isOnline={otherUser.isActive}
          showStatus
        />

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold">{otherUser.name}</h1>
          {room.typing ? (
            <p className="chat-header-status chat-header-status--typing">
              <TypingDots size="sm" />
              <span>Typing…</span>
            </p>
          ) : (
            <p
              className={
                otherUser.isActive
                  ? "chat-header-status chat-header-status--online"
                  : "chat-header-status chat-header-status--offline"
              }
            >
              {otherUser.isActive
                ? "Online"
                : otherUser.location?.text || "Offline"}
            </p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="chat-header-menu-btn"
              aria-label="Conversation options"
            >
              <MoreHorizontal className="h-[18px] w-[18px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="chat-menu-panel">
            <DropdownMenuItem
              className="chat-menu-item"
              onClick={() => {
                const matchId = String(
                  (room.users as { _id?: string })._id ?? room.roomId,
                );
                chatSocket.unmatch(room.roomId, matchId, otherUser.email);
              }}
            >
              <UserMinus className="h-4 w-4" />
              Unpair
            </DropdownMenuItem>
            <DropdownMenuItem
              className="chat-menu-item chat-menu-item--report"
              onClick={() => setReportOpen(true)}
            >
              <Flag className="h-4 w-4" />
              Report {otherUser.name}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="chat-menu-item chat-menu-item--danger"
              onClick={() => setBlockOpen(true)}
            >
              <Ban className="h-4 w-4" />
              Block {otherUser.name}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <ReportUserDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        reporteeId={otherUser.uid}
        reporteeName={otherUser.name}
        roomId={room.roomId}
        reporteeEmail={otherUser.email}
      />

      <BlockConfirmDialog
        open={blockOpen}
        userName={otherUser.name}
        onClose={() => setBlockOpen(false)}
        onConfirm={() => {
          setBlockOpen(false);
          chatSocket.blockUser(room.roomId, otherUser.email);
        }}
      />
    </>
  );
}
