import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  onClick?: (tag: string) => void;
  active?: boolean;
  className?: string;
}

export function TagBadge({ tag, onClick, active, className }: TagBadgeProps) {
  const isClickable = !!onClick;
  
  return (
    <span
      onClick={(e) => {
        if (isClickable) {
          e.preventDefault();
          e.stopPropagation();
          onClick(tag);
        }
      }}
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground",
        isClickable && !active && "hover:bg-secondary/80 cursor-pointer active:scale-95",
        isClickable && active && "hover:bg-primary/90 cursor-pointer active:scale-95",
        className
      )}
    >
      #{tag}
    </span>
  );
}
