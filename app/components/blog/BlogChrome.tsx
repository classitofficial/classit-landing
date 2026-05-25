import type { ReactNode } from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export function BlogShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[#0b0e14] text-[#f8faff]">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export function ClassitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_2670_41676)">
        <rect width="24" height="24" fill="#0360EF"/>
        <rect width="24" height="24" fill="url(#paint0_linear_2670_41676)"/>
        <rect width="24" height="24" fill="url(#paint1_linear_2670_41676)"/>
        <path d="M5.5 11.5C5.5 7.63401 8.63401 4.5 12.5 4.5C16.366 4.5 19.5 7.63401 19.5 11.5C19.5 15.366 16.366 18.5 12.5 18.5H8.5C6.84315 18.5 5.5 17.1569 5.5 15.5V11.5Z" fill="white"/>
        <path d="M13.2705 15H9.77618V13.2186H13.2705C13.3944 13.2186 13.5015 13.1746 13.59 13.0875C13.6785 13.0004 13.7232 12.8952 13.7232 12.7732C13.7232 12.6513 13.6785 12.5634 13.59 12.524C13.5015 12.4846 13.3944 12.4649 13.2705 12.4649H11.3805C11.0657 12.4649 10.7708 12.4059 10.4952 12.2885C10.2204 12.1703 9.98018 12.0113 9.77618 11.8105C9.57217 11.6053 9.40973 11.3675 9.2904 11.0971C9.17493 10.8267 9.11719 10.5358 9.11719 10.226C9.11719 9.91625 9.17493 9.62616 9.2904 9.35501C9.4105 9.08461 9.57217 8.8483 9.77618 8.64759C9.98018 8.44687 10.2196 8.28933 10.4952 8.17648C10.77 8.05832 11.0657 8 11.3805 8H15.0612V9.78143H11.3805C11.2566 9.78143 11.1496 9.82536 11.061 9.91246C10.9725 9.99957 10.9279 10.1048 10.9279 10.2268C10.9279 10.3487 10.9725 10.4623 11.061 10.554C11.1496 10.6411 11.2566 10.685 11.3805 10.685H13.2705C13.5815 10.685 13.8741 10.7373 14.1489 10.8418C14.4237 10.9425 14.6639 11.0842 14.8679 11.2675C15.0719 11.4508 15.2344 11.6712 15.3537 11.9287C15.4738 12.1862 15.5339 12.468 15.5339 12.7732C15.5339 13.0784 15.4738 13.3738 15.3537 13.6442C15.2336 13.9108 15.0719 14.1464 14.8679 14.3517C14.6639 14.5524 14.4245 14.7114 14.1489 14.8296C13.8741 14.9432 13.5808 15 13.2705 15Z" fill="#3D82F5"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_2670_41676" x1="6.43078" y1="-3.26851e-08" x2="18.2601" y2="14.0166" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0360EF"/>
          <stop offset="1" stopColor="#004DC4"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2670_41676" x1="0" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3D82F5"/>
          <stop offset="1" stopColor="#0360EF"/>
        </linearGradient>
        <clipPath id="clip0_2670_41676">
          <rect width="24" height="24" rx="12" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}
