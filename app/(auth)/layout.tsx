import AuthNavbar from "./_components/AuthNavbar";
import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <Toaster />
        <AuthNavbar />
        <div className="pt-20 flex items-center justify-center m-auto min-h-screen bg-myteal text-myzinc text-open font-medium">
          {children}
        </div>
      </ReactQueryProvider>
    </ClerkProvider>
  );
};

export default ClerkLayout;
