"use client";
import Link from "next/link";
import React from "react";

interface ButtonsProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  bgColor?: string; 
  textColor?: string; 
  hoverColor?: string; 
}

const Buttons: React.FC<ButtonsProps> = ({ 
  text, 
  icon, 
  onClick, 
  className, 
  href, 
  bgColor = "#014F86", 
  textColor = "white", 
  hoverColor = "#FC9B89" 
}) => {
  const content = (
    <div 
      className={`flex items-center space-x-2 px-10 py-2 rounded-3xl transition-all duration-300 ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{text}</span>
    </div>
  );

  return href ? (
    <Link href={href}>
      <div className="hover:opacity-50">{content}</div>
    </Link>
  ) : (
    <button 
      onClick={onClick} 
      className="hover:opacity-50" 
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {content}
    </button>
  );
};

export default Buttons;