"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Settings as SettingsIcon } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { SettingsForm } from "@/components/settings/settings-form";
import { settingsApi } from "@/lib/api";

export default function SettingsPage() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsApi.get(),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => settingsApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  const handleSave = async (payload: any) => {
    await updateMutation.mutateAsync(payload);
  };

  return (
    <Shell title="System Settings & Configuration">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-sky-400" />
            System Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage NVIDIA NIM API keys, AI models, database connections, and engineer profile
          </p>
        </div>

        {isLoading || !settings ? (
          <div className="flex items-center justify-center p-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
          </div>
        ) : (
          <SettingsForm settings={settings} onSave={handleSave} />
        )}
      </div>
    </Shell>
  );
}
