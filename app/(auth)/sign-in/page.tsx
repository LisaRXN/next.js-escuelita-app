// import { SignIn } from "@clerk/nextjs";
// import Image from "next/image";
// import React from "react";

// export default function SignInPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
//         <Image
//           src="/img/logos/logo.png"
//           alt="La Escuelita Logo"
//           width={200}
//           height={200}
//         />
//         <SignIn
//           appearance={{
//             elements: {
//               card: "shadow-lg rounded-xl p-6",
//               headerTitle: "text-xl font-bold text-center",
//               formButtonPrimary: "bg-slate-600 hover:bg-slate-700",
//               formButtonSecondary: "bg-gray-300 hover:bg-gray-400",
//               footerActionLink: "text-blue-600 hover:underline",
//               footerActionText: "text-gray-600",
//               socialButtonsBlockButtonIconContainer:
//                 "bg-blue-500 hover:bg-blue-600",
//             },
//           }}
//           routing="hash"
//           signUpUrl="/sign-up"
//           fallbackRedirectUrl="/register"
//         />
//     </div>
//   );
// }

// // import { SignInButton } from "@clerk/nextjs";

// // export default function SignIn() {

// //     return (
// //         <div className="flex items-center justify-center min-h-screen bg-gray-100 rounded-xl">
// //         <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
// //             <h1 className="text-2xl font-bold mb-6 text-center">La Escuelita</h1>
// //             <Image src="/img/logos/logo.png" alt="La Escuelita Logo" width={100} height={100} />
// //             <SignInButton mode="modal">
// //             <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
// //                 Se connecter
// //             </button>
// //             </SignInButton>
// //         </div>
// //         </div>
// //     );

// // }

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: "shadow-lg rounded-xl p-6",
          headerTitle: "text-xl font-bold text-center",
          formButtonPrimary: "bg-slate-600 hover:bg-slate-700",
          formButtonSecondary: "bg-gray-300 hover:bg-gray-400",
          footerActionLink: "text-blue-600 hover:underline",
          footerActionText: "text-gray-600",
          socialButtonsBlockButtonIconContainer:
            "bg-blue-500 hover:bg-blue-600",
        },
      }}
      routing="hash"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/register"
    />
  );
}
