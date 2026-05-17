import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  variant?: "filled" | "ghost" | "text";
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export function Button({ children, variant = "filled", className, href, ...props }: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-[0.82rem] font-medium uppercase tracking-[0.08em] transition duration-300",
    variant === "filled" && "bg-[var(--color-gold)] text-[var(--color-espresso)] hover:bg-[var(--color-ivory)]",
    variant === "ghost" && "border border-[var(--color-border)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-espresso)]",
    variant === "text" && "px-0 text-[var(--color-gold)] hover:text-[var(--color-ivory)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
