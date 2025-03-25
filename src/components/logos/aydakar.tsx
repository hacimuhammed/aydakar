import React from "react";
import { Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";
import { pacifico } from "@/app/fonts/pacifico";

const Aydakar = ({
  as: Component = "span",
  icon = true,
  className,
  text = "aydakar",
  ...props
}: {
  as?: React.ElementType;
  icon?: boolean;
  text?: string;
} & React.HTMLAttributes<HTMLElement>) => {
  return (
    <>
      {icon && <Snowflake className="w-6 h-6" />}
      <Component
        className={cn(pacifico.className, "text-2xl", className)}
        {...props}
      >
        {text}
      </Component>
    </>
  );
};

export default Aydakar;
