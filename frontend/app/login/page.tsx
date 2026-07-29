"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Eye,
  EyeOff,
  Zap,
  Lock,
  Mail,
  CheckCircle2,
  Bot,
  Activity,
  Box,
} from "lucide-react";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "engineer@forgemind.ai",
      password: "SecurePassword123!",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await authApi.login(data);
      setAuth(res.user, res.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = () => {
    setValue("email", "engineer@forgemind.ai");
    setValue("password", "SecurePassword123!");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-sky-500 selection:text-white relative overflow-hidden flex flex-col justify-between">
      {/* Ambient Gradient Glow Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-sky-600/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] pointer-events-none" />

      {/* Navbar Header */}
      <header className="h-16 border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo size="md" mode="dark" />
          </Link>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>New to ForgeMind X?</span>
            <Link href="/register">
              <Button variant="outline" size="sm" className="text-xs border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-sky-400 border-sky-500/30">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-4 sm:p-8 my-auto">
        {/* Left Column: Platform Showcase (Hidden on small screens) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col space-y-8 pr-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-400 text-xs font-mono w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NVIDIA NIM LLAMA-3.1-70B Active</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight">
            Autonomous AI Swarm for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400">
              Hardware Engineering
            </span>
          </h1>

          <p className="text-slate-400 text-base leading-relaxed max-w-xl">
            Orchestrate 6 specialized AI agents to analyze specifications, construct 3D CAD models, compute FEA yield stress math, generate BOM cost matrices, and route 5-axis CNC toolpaths.
          </p>

          {/* Feature Badges Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs">
                <Box className="w-4 h-4" /> 3D CAD Parametric Mesh
              </div>
              <p className="text-[11px] text-slate-400">Real-time WebGL rendering with automated dimensioning.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs">
                <Activity className="w-4 h-4" /> FEA Stress Analytics
              </div>
              <p className="text-[11px] text-slate-400">Von Mises stress heatmaps & factor of safety verification.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Cpu className="w-4 h-4" /> 5-Axis CNC Toolpaths
              </div>
              <p className="text-[11px] text-slate-400">G-Code routing, tool selection & machining cycle time.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" /> Executive PDF Exporter
              </div>
              <p className="text-[11px] text-slate-400">ReportLab automated executive engineering report synthesis.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphism Login Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 relative">
            {/* Quick Demo Credentials Banner */}
            <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-800/60 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-sky-300">
                <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Quick demo credentials ready</span>
              </div>
              <button
                type="button"
                onClick={fillDemoAccount}
                className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-[11px] transition-colors shrink-0"
              >
                Auto-fill
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">Engineer Sign In</h2>
              <p className="text-xs text-slate-400">Enter your credentials to access your manufacturing workspace</p>
            </div>

            {errorMsg && (
              <div className="p-3 text-xs font-medium text-rose-400 bg-rose-950/80 border border-rose-800/80 rounded-lg flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="engineer@forgemind.ai"
                    {...register("email")}
                    className="w-full h-10 px-3.5 text-xs bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full h-10 pl-3.5 pr-10 text-xs bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full h-11 text-xs gap-2 font-semibold bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-lg shadow-lg shadow-sky-500/20"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Bot className="w-4 h-4 animate-spin" />
                    Authenticating Engineer...
                  </>
                ) : (
                  <>
                    Sign In to Platform <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="pt-3 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                Don&apos;t have an engineering account?{" "}
                <Link href="/register" className="text-sky-400 hover:underline font-semibold">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 px-6 text-center text-xs text-slate-500 font-mono">
        Built with ❤️ by <span className="text-slate-300 font-semibold">Sabestain</span> & the ForgeMind X Team.
      </footer>
    </div>
  );
}
