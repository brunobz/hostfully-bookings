import { cn } from "@/libs/utils";

export const CardHeader = ({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-4 border-b", className)}
      {...props}
    />
  );
};
