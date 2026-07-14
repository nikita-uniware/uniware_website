export function ContentWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-content mx-auto px-4 md:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
