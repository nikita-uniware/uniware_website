"use server";

import type { AnswerValue, TierId } from "@/content/cyber-readiness-assessment-data";
import { notifyAssessmentSubmission } from "@/lib/notifyAssessmentSubmission";

export type AssessmentSubmission = {
  firstName: string;
  company: string;
  email: string;
  answers: AnswerValue[];
  domainScores: number[];
  overallScore: number;
  tier: TierId;
  timestamp: string;
};

/**
 * Persist/notify assessment submission.
 * Email is best-effort: SMTP failure is logged and does not fail the user flow.
 */
export async function submitAssessment(
  submission: AssessmentSubmission,
): Promise<{ ok: true }> {
  try {
    await notifyAssessmentSubmission(submission);
  } catch (error) {
    console.error("[submitAssessment] email notification failed:", error);
  }

  return { ok: true };
}
