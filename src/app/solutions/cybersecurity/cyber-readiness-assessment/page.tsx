import type { Metadata } from "next";
import { CyberReadinessAssessment } from "@/components/cyber-readiness-assessment/CyberReadinessAssessment";
import { ContentWrapper } from "@/components/ContentWrapper";
import { contactPhoneDisplay, contactPhoneHref } from "@/content/cyber-readiness-assessment-data";

export const metadata: Metadata = {
  title: "Cyber Readiness Assessment",
  description:
    "A 15-question assessment of your organisation's incident response readiness across five domains.",
};

export default function Page() {
  return (
    <>
      <noscript>
        <section className="bg-uw-white py-12 md:py-16 lg:py-24">
          <ContentWrapper>
            <div className="max-w-[640px] mx-auto text-center">
              <h1 className="font-display font-semibold text-[length:var(--text-h4-sm)] lg:text-h4 leading-[1.3] text-uw-black mb-4">
                Just one thing stopping you
              </h1>
              <p className="text-body font-body text-uw-body-text leading-[1.75]">
                This assessment needs JavaScript to run. If you&apos;re seeing this message, your
                company has likely disabled it as a security measure. That&apos;s completely
                normal and means your IT team is doing their job well. To complete the
                assessment, try opening this page on a personal device or a different browser.
                Or reach out to us directly and we&apos;ll walk you through it personally. Email{" "}
                <a href="mailto:sales@uniware.net" className="text-uw-amber-light underline">
                  sales@uniware.net
                </a>{" "}
                or call Nirmal Kumar at{" "}
                <a href={`tel:${contactPhoneHref}`} className="text-uw-amber-light underline">
                  {contactPhoneDisplay}
                </a>
                .
              </p>
            </div>
          </ContentWrapper>
        </section>
      </noscript>
      <CyberReadinessAssessment />
    </>
  );
}
