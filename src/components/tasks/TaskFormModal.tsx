"use client";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskInput } from "@/lib/validators";

export default function TaskFormModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (v: TaskInput) => Promise<void>;
  defaultValues?: Partial<TaskInput>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TaskInput>({ resolver: zodResolver(taskSchema) });

  useEffect(() => {
    if (open) {
      reset(
        defaultValues ?? { title: "", description: "", priority: 0, status: 0 }
      );
    }
  }, [open, defaultValues, reset]);

  const handleClose = () => {
    reset({ title: "", description: "", priority: 0, status: 0 });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Task">
      <form
        onSubmit={handleSubmit(async (v) => {
          await onSubmit(v);
          handleClose();
        })}
        className="space-y-4"
      >
        <Input placeholder="Title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}

        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}

        <label className="block text-sm font-medium">Priority</label>
        <Select {...register("priority", { valueAsNumber: true })}>
          <option value="0">None</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
          <option value="4">Urgent</option>
        </Select>

        <label className="block text-sm font-medium mt-2">Status</label>
        <Select {...register("status", { valueAsNumber: true })}>
          <option value="0">Backlog</option>
          <option value="1">In Progress</option>
          <option value="2">Completed</option>
          <option value="3">Cancelled</option>
        </Select>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {defaultValues?.title ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
