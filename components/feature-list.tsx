import type { ReactNode } from "react"

export default function FeatureList({ children }: { children: ReactNode }) {
  return <ul className="space-y-3">{children}</ul>
}

