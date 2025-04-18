import React from 'react';

interface IconProps {
  className?: string;
}

export const LocationIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 3.33C13.55 3.33 8.33 8.55 8.33 15C8.33 23.75 20 36.67 20 36.67C20 36.67 31.67 23.75 31.67 15C31.67 8.55 26.45 3.33 20 3.33ZM20 19.17C17.7 19.17 15.83 17.3 15.83 15C15.83 12.7 17.7 10.83 20 10.83C22.3 10.83 24.17 12.7 24.17 15C24.17 17.3 22.3 19.17 20 19.17Z" fill="#FC9B89"/>
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.33 6.67H6.67C4.83 6.67 3.35 8.17 3.35 10L3.33 30C3.33 31.83 4.83 33.33 6.67 33.33H33.33C35.17 33.33 36.67 31.83 36.67 30V10C36.67 8.17 35.17 6.67 33.33 6.67ZM33.33 13.33L20 21.67L6.67 13.33V10L20 18.33L33.33 10V13.33Z" fill="#FC9B89"/>
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.03 17.98C13.43 22.7 17.3 26.57 22.02 28.97L25.68 25.3C26.15 24.83 26.8 24.7 27.38 24.88C29.25 25.5 31.25 25.83 33.33 25.83C34.25 25.83 35 26.58 35 27.5V33.33C35 34.25 34.25 35 33.33 35C17.68 35 5 22.32 5 6.67C5 5.75 5.75 5 6.67 5H12.5C13.42 5 14.17 5.75 14.17 6.67C14.17 8.75 14.5 10.75 15.12 12.62C15.3 13.2 15.17 13.85 14.7 14.32L11.03 17.98Z" fill="#FC9B89"/>
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20C23.68 20 26.67 17.02 26.67 13.33C26.67 9.65 23.68 6.67 20 6.67C16.32 6.67 13.33 9.65 13.33 13.33C13.33 17.02 16.32 20 20 20ZM20 23.33C15.55 23.33 6.67 25.57 6.67 30V33.33H33.33V30C33.33 25.57 24.45 23.33 20 23.33Z" fill="#FC9B89"/>
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.67 5H30V1.67H26.67V5H13.33V1.67H10V5H8.33C6.48 5 5.02 6.5 5.02 8.33L5 31.67C5 33.5 6.48 35 8.33 35H31.67C33.5 35 35 33.5 35 31.67V8.33C35 6.5 33.5 5 31.67 5ZM31.67 31.67H8.33V13.33H31.67V31.67ZM11.67 16.67H20V25H11.67V16.67Z" fill="#FC9B89"/>
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.98 3.33C10.78 3.33 3.33 10.8 3.33 20C3.33 29.2 10.78 36.67 19.98 36.67C29.2 36.67 36.67 29.2 36.67 20C36.67 10.8 29.2 3.33 19.98 3.33ZM20 33.33C12.63 33.33 6.67 27.37 6.67 20C6.67 12.63 12.63 6.67 20 6.67C27.37 6.67 33.33 12.63 33.33 20C33.33 27.37 27.37 33.33 20 33.33ZM20.83 11.67H18.33V21.67L27.08 26.92L28.33 24.87L20.83 20.42V11.67Z" fill="#FC9B89"/>
  </svg>
);

export const PaymentIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.33 6.67H6.67C4.82 6.67 3.35 8.15 3.35 10L3.33 30C3.33 31.85 4.82 33.33 6.67 33.33H33.33C35.18 33.33 36.67 31.85 36.67 30V10C36.67 8.15 35.18 6.67 33.33 6.67ZM33.33 30H6.67V20H33.33V30ZM33.33 13.33H6.67V10H33.33V13.33Z" fill="#FC9B89"/>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg width="40" height="40" className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.67 33.33V23.33H23.33V33.33H31.67V20H36.67L20 5L3.33 20H8.33V33.33H16.67Z" fill="#FC9B89"/>
  </svg>
);