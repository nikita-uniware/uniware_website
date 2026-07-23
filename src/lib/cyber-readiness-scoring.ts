import type { AnswerValue, TierId } from "@/content/cyber-readiness-assessment-data";

export const QUESTIONS_PER_DOMAIN = 3;
export const DOMAIN_COUNT = 5;
export const MAX_DOMAIN_SCORE = QUESTIONS_PER_DOMAIN * 2;
export const MAX_OVERALL_SCORE = DOMAIN_COUNT * MAX_DOMAIN_SCORE;

export function getDomainScore(
  answers: (AnswerValue | null)[],
  domainIndex: number,
): number {
  const start = domainIndex * QUESTIONS_PER_DOMAIN;
  let total = 0;
  for (let i = start; i < start + QUESTIONS_PER_DOMAIN; i++) {
    total += answers[i] ?? 0;
  }
  return total;
}

export function getAllDomainScores(answers: (AnswerValue | null)[]): number[] {
  return Array.from({ length: DOMAIN_COUNT }, (_, i) => getDomainScore(answers, i));
}

export function getOverallScore(answers: (AnswerValue | null)[]): number {
  return getAllDomainScores(answers).reduce((sum, score) => sum + score, 0);
}

export function getTier(overallScore: number): TierId {
  if (overallScore >= 25) return "good";
  if (overallScore >= 13) return "some";
  return "attention";
}

export type DomainStatus = "strong" | "developing" | "needs-attention";

export function getDomainStatus(domainScore: number): DomainStatus {
  if (domainScore >= 5) return "strong";
  if (domainScore >= 3) return "developing";
  return "needs-attention";
}

export function getBarWidthPercent(domainScore: number): number {
  return Math.round((domainScore / MAX_DOMAIN_SCORE) * 100);
}
