"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Cpu, ArrowRight } from "lucide-react";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const registerSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "Senior Systems Engineer",
      email: "engineer@forgemind.ai",
      password: "SecurePassword123!",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await authApi.register(data);
      setAuth(res.user, res.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center justify-center">
            <Logo size="lg" mode="dark" />
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Create your account</h2>
          <p className="text-xs text-slate-400">Initialize your autonomous manufacturing workspace</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs font-medium text-rose-400 bg-rose-950/60 border border-rose-800/60 rounded-md">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Dr. Alex Mercer"
              error={errors.full_name?.message}
              {...register("full_name")}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="engineer@forgemind.ai"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" variant="primary" className="w-full h-10 gap-2 text-sm" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-400 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
