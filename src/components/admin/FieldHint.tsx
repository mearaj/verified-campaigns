import type { ReactNode } from "react";

interface FieldHintProps {
  children: ReactNode;
}

export default function FieldHint({ children }: FieldHintProps) {
  return <p className="mt-1 text-[11px] leading-relaxed text-vc-muted">{children}</p>;
}
