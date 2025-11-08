import { cn } from "@/libs/utils";

export const CardTitle = ({
  className,
  ...props
}: React.ComponentPropsWithRef<"h3">) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
};
