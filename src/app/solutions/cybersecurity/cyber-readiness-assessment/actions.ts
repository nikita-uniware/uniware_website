"use server";

import type { AnswerValue, TierId } from "@/content/cyber-readiness-assessment-data";

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
 * TODO(dev): replace with the real email send to sales@uniware.net.
 * Must include every field on AssessmentSubmission — the raw per-question
 * answers are required for the specialist follow-up review, not just the tier.
 */
export async function submitAssessment(
  submission: AssessmentSubmission,
): Promise<{ ok: true }> {
  console.log("submitAssessment stub — wire up email send", submission);
  return { ok: true };
}
