"use client";

import React, { useState } from "react";
import { Key, Database, Cpu, Moon, UserCheck } from "lucide-react";
import { SystemSettings } from "@/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/store";

interface SettingsFormProps {
  settings: SystemSettings;
  onSave: (payload: any) => Promise<void>;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave }) => {
  const { user } = useAuthStore();
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(settings.nvidia_model);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const payload: any = { nvidia_model: model };
    if (apiKey.trim()) {
      payload.nvidia_api_key = apiKey.trim();
    }

    await onSave(payload);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NVIDIA NIM API Configuration */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-slate-100">NVIDIA NIM API Configuration</h3>
            </div>
            {settings.nvidia_api_key_configured ? (
              <Badge variant="success">API Key Active</Badge>
            ) : (
              <Badge variant="warning">Fallback Simulated Mode</Badge>
            )}
          </div>

          <div className="space-y-4">
            <Input
              label="NVIDIA API Key"
              type="password"
              placeholder="nvapi-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-[11px] text-slate-500">
              Enter your NVIDIA NIM API Key to execute live inference with LLAMA 3.1 70B Instruct.
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Selected NIM Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-slate-900 text-slate-100 border border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
              >
                <option value="meta/llama-3.1-70b-instruct">meta/llama-3.1-70b-instruct (Recommended)</option>
                <option value="meta/llama-3.1-405b-instruct">meta/llama-3.1-405b-instruct</option>
                <option value="nvidia/neva-22b">nvidia/neva-22b</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Database Read-Only Status */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-100">MongoDB Database Status</h3>
            </div>
            <Badge variant={settings.mongodb_status.includes("Connected") ? "success" : "info"}>
              {settings.mongodb_status}
            </Badge>
          </div>
          <p className="text-xs text-slate-400">
            Read-only status metric for Motor async MongoDB driver connection.
          </p>
        </Card>

        {/* Theme Settings */}
        <Card className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-slate-100">System Theme</h3>
            </div>
            <Badge variant="purple">Dark Mode Default</Badge>
          </div>
          <p className="text-xs text-slate-400">
            ForgeMind X is engineered with dark SaaS design by default for high visual clarity.
          </p>
        </Card>

        {/* User Profile Info */}
        <Card className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <UserCheck className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-slate-100">Engineer Profile</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block">Full Name</span>
              <span className="font-semibold text-slate-100">{user?.full_name || "Engineer"}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email Address</span>
              <span className="font-semibold text-slate-100">{user?.email || "engineer@forgemind.ai"}</span>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between pt-2">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-400 font-mono">
              ✓ Settings saved successfully!
            </span>
          )}
          <div className="ml-auto">
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
