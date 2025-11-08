import { cn } from "@/libs/utils";

export const CardContent = ({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) => {
  return <div className={cn("p-4 space-y-3", className)} {...props} />;
};
