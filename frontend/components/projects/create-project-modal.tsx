"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Please enter at least 10 characters describing the product concept"),
  category: z.string().min(2, "Select or enter a category"),
  target_budget: z.coerce.number().positive("Target budget must be a positive number"),
  target_timeline_weeks: z.coerce.number().min(1, "Timeline must be at least 1 week"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isLoading?: boolean;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Aerospace & Robotics",
      target_budget: 50000,
      target_timeline_weeks: 12,
    },
  });

  const handleFormSubmit = async (data: ProjectFormData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Autonomous Project" maxWidth="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Product Title"
          placeholder="e.g. Lightweight Titanium Quadcopter Frame with Integrated Thermal Cooling"
          error={errors.title?.message}
          {...register("title")}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Product Concept & Engineering Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe the product requirements, intended environment, functional objectives, and key performance constraints..."
            className="w-full p-3 text-xs bg-slate-900/90 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-rose-400 font-medium">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Engineering Sector</label>
            <select
              className="w-full h-9 px-2.5 text-xs bg-slate-900 text-slate-100 border border-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
              {...register("category")}
            >
              <option value="Aerospace & Robotics">Aerospace & Robotics</option>
              <option value="Automotive & Propulsion">Automotive & Propulsion</option>
              <option value="Medical Devices">Medical Devices</option>
              <option value="Consumer Electronics">Consumer Electronics</option>
              <option value="Industrial Energy">Industrial Energy</option>
            </select>
          </div>

          <Input
            label="Target Budget (₹)"
            type="number"
            error={errors.target_budget?.message}
            {...register("target_budget")}
          />

          <Input
            label="Timeline (Weeks)"
            type="number"
            error={errors.target_timeline_weeks?.message}
            {...register("target_timeline_weeks")}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Launching..." : "Initialize Engineering Swarm"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
