"use client";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick, className, href }) => {
  const content = (
    <div className={`flex items-center space-x-2 px-10 py-2 rounded-3xl bg-[#014F86] text-white hover:bg-[#FC9B89] ${className}`}>
      {icon && <span className="text-xl">{icon}</span>}
      <span>{text}</span>
    </div>
  );
  
  return href ? (
    <Link href={href}>{content}</Link> // Si href existe, utilise un lien
  ) : (
    <button onClick={onClick}>{content}</button> // Sinon, un bouton classique
  );
};

export default Button;
