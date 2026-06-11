import { uploadChatFile } from "@/features/chat/api/upload";
import { apiClient } from "@/lib/api-client";
import { reportRoutes } from "./routes";

const FALLBACK_REPORT_REASONS = [
  "Harassment or bullying",
  "Inappropriate or explicit content",
  "Spam or scam",
  "Impersonation",
  "Underage user concern",
  "Other",
];

type RestrictionsResponse = {
  reports?: string[];
};

export async function fetchReportReasons(): Promise<string[]> {
  try {
    const data = await apiClient.get<RestrictionsResponse>(
      reportRoutes.getRestrictions,
    );
    const reports = data?.reports?.filter((r) => r.trim()) ?? [];
    return reports.length > 0 ? reports : FALLBACK_REPORT_REASONS;
  } catch {
    return FALLBACK_REPORT_REASONS;
  }
}

export type SubmitReportInput = {
  reporterId: string;
  reporteeId: string;
  reason: string;
  explanation: string;
  files?: File[];
};

export async function submitUserReport(input: SubmitReportInput): Promise<void> {
  const attachments: string[] = [];

  for (const file of input.files ?? []) {
    const uploaded = await uploadChatFile(file, input.reporterId);
    attachments.push(uploaded.publicUrl);
  }

  await apiClient.post(reportRoutes.submitReport, {
    explaination: input.explanation,
    reporter: input.reporterId,
    userId: input.reporteeId,
    reportee: input.reporteeId,
    attachment: attachments,
    reason: input.reason,
  });
}
