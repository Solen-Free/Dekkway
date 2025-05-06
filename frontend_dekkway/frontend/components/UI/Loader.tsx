interface LoaderProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function Loader({ fullScreen = false, size = 'md', color = '#014F86' }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-t-1 border-b-1',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-t-3 border-b-3',
  };

  return (
    <div className={`flex justify-center items-center ${fullScreen ? 'h-screen' : 'h-40'}`}>
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2`}
        style={{ borderColor: color }}
      ></div>
    </div>
  );
}