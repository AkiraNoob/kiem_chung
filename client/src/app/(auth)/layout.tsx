import AuthHeader from "./_components/UI/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <main className="h-fit bg-black md:bg-neutral-900">
        <AuthHeader />
        {children}
      </main>
    </div>
  );
}
