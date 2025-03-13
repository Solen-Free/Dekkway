"use client";

import Link from "next/link";

interface DetailButtonProps {
  href: string;
  text?: string;
}

export default function DetailButton({ href, text = "Détails" }: DetailButtonProps) {
  return (
    <Link
      href={href}
      className="w-full max-w-[120px] bg-[#014F86] text-white text-center text-sm font-bold py-1 px-3 
                 rounded-3xl hover:bg-[#FC9B89] transition"
    >
      {text}
    </Link>
  );
}
