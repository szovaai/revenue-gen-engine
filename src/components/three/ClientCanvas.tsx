import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useEffect, useState, type ReactNode } from "react";

type ClientCanvasProps = Omit<CanvasProps, "children"> & {
  children: ReactNode;
  fallback?: ReactNode;
};

export function ClientCanvas({ children, fallback = null, ...canvasProps }: ClientCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === "undefined") {
    return <>{fallback}</>;
  }

  return <Canvas {...canvasProps}>{children}</Canvas>;
}