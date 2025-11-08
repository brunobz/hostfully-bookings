import { cn } from "@/libs/utils";

export const Card = ({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-primary",
        className
      )}
      {...props}
    />
  );
};
