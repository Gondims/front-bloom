type BadgeColor = "red" | "blue" | "green" | "yellow" | "purple" | "pink";

interface BadgeProps {
  count?: number;
  color?: BadgeColor;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Badge({
  count = 0,
  color = "red",
  children,
  onClick,
}: BadgeProps) {
  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
  };

  return (
    <div className="relative inline-flex cursor-pointer" onClick={onClick}>
      {children}
      {count > 0 && (
        <span
          className={`absolute -right-2 -top-2 ${colorClasses[color]} flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white`}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
}
