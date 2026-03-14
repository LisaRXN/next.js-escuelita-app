import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <Toaster />
        <div className="min-h-screen bg-[#193252] flex items-center justify-center px-4 py-12">
          {children}
        </div>
      </ReactQueryProvider>
    </ClerkProvider>
  );
};

export default ClerkLayout;
