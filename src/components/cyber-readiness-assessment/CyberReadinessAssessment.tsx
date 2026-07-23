"use client";

import { useEffect, useState } from "react";
import { submitAssessment } from "@/lib/cyber-readiness-assessment/actions";
import { questions, type AnswerValue } from "@/content/cyber-readiness-assessment-data";
import { getAllDomainScores, getOverallScore, getTier } from "@/lib/cyber-readiness-scoring";
import { ContactFormScreen, type ContactDetails } from "./ContactFormScreen";
import { DomainIntroScreen } from "./DomainIntroScreen";
import { IntroScreen } from "./IntroScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultsScreen } from "./ResultsScreen";

type Screen = "intro" | "domain-intro" | "question" | "contact" | "results";

const EMPTY_ANSWERS: (AnswerValue | null)[] = Array(questions.length).fill(null);
const EMPTY_CONTACT: ContactDetails = { firstName: "", company: "", email: "" };

export function CyberReadinessAssessment() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerValue | null)[]>(EMPTY_ANSWERS);
  const [contact, setContact] = useState<ContactDetails>(EMPTY_CONTACT);
  const [submitting, setSubmitting] = useState(false);

  const currentDomainIndex = Math.floor(questionIndex / 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  function handleSelect(value: AnswerValue) {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  }

  function handleNext() {
    if (answers[questionIndex] === null) return;
    if (questionIndex === questions.length - 1) {
      setScreen("contact");
      return;
    }
    const newIndex = questionIndex + 1;
    const newDomain = Math.floor(newIndex / 3);
    setQuestionIndex(newIndex);
    setScreen(newDomain !== currentDomainIndex ? "domain-intro" : "question");
  }

  function handleBack() {
    if (questionIndex === 0) {
      setScreen("intro");
      return;
    }
    const newIndex = questionIndex - 1;
    const newDomain = Math.floor(newIndex / 3);
    setQuestionIndex(newIndex);
    setScreen(newDomain !== currentDomainIndex ? "domain-intro" : "question");
  }

  async function handleSubmit() {
    setSubmitting(true);
    const domainScores = getAllDomainScores(answers);
    const overallScore = getOverallScore(answers);
    const tier = getTier(overallScore);

    await submitAssessment({
      firstName: contact.firstName,
      company: contact.company,
      email: contact.email,
      answers: answers as AnswerValue[],
      domainScores,
      overallScore,
      tier,
      timestamp: new Date().toISOString(),
    });

    setSubmitting(false);
    setScreen("results");
  }

  function handleStartOver() {
    setScreen("intro");
    setQuestionIndex(0);
    setAnswers(EMPTY_ANSWERS);
    setContact(EMPTY_CONTACT);
  }

  if (screen === "intro") {
    return <IntroScreen onStart={() => setScreen("domain-intro")} />;
  }

  if (screen === "domain-intro") {
    return (
      <DomainIntroScreen
        domainIndex={currentDomainIndex}
        onBegin={() => setScreen("question")}
      />
    );
  }

  if (screen === "question") {
    return (
      <QuestionScreen
        questionIndex={questionIndex}
        selectedValue={answers[questionIndex]}
        onSelect={handleSelect}
        onBack={handleBack}
        onNext={handleNext}
      />
    );
  }

  if (screen === "contact") {
    return (
      <ContactFormScreen
        contact={contact}
        onChange={setContact}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    );
  }

  const domainScores = getAllDomainScores(answers);
  const overallScore = getOverallScore(answers);
  const tier = getTier(overallScore);

  return (
    <ResultsScreen tier={tier} domainScores={domainScores} onStartOver={handleStartOver} />
  );
}
