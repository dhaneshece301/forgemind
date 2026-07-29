"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
};
