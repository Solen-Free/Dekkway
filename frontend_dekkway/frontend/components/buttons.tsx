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
  textSize?: string;  
  fontWeight?: string; 
}

const Buttons: React.FC<ButtonsProps> = ({ 
  text, 
  icon, 
  onClick, 
  className, 
  href, 
  bgColor = "#014F86", 
  textColor = "white", 
  hoverColor = "#FC9B89",
  textSize = "text-lg",
  fontWeight = "font-bold"
}) => {
  return (
    <Link href={href || "#"} passHref>
      <button
        onClick={onClick}
        className={`
          flex items-center justify-center space-x-2 px-4 py-2 rounded-3xl transition-all duration-300 
          shadow-md hover:shadow-lg hover:scale-105 border border-transparent 
          ${textSize} ${fontWeight} ${className}
          sm:px-3 sm:py-1 md:px-4 md:py-2 lg:px-4 lg:py-2
          sm:text-base md:text-lg lg:text-xl
        `}
        style={{ backgroundColor: bgColor, color: textColor }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor!)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor!)}
      >
        {icon && <span className="text-xl sm:text-xl md:text-xl">{icon}</span>}
        <span>{text}</span>
      </button>
    </Link>
  );
};

export default Buttons;
