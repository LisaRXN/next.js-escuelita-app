import AuthNavbar from "./_components/AuthNavbar";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthNavbar />
      <div className="min-h-screen h-full flex items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default ClerkLayout;
