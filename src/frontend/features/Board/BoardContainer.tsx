"use client";

import useService from "@/frontend/helpers/useService";
import GetTasksService from "../Task/GetTasksService";
import GetColumnsService from "../Column/GetColumnsService";
import { useEffect, useState } from "react";
import Column from "@/models/Column";
import Task from "@/models/Task";
import KanbanBoard from "./KanbanBoard";

export default function BoardContainer() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    execute: executeTasks,
    isLoading: isLoadingTasks,
    result: resultTasks,
  } = useService({
    service: new GetTasksService(),
  });

  const {
    execute: executeColumns,
    isLoading: isLoadingColumns,
    result: resultColumns,
  } = useService({
    service: new GetColumnsService(),
  });

  useEffect(() => {
    executeTasks();
    executeColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!resultTasks || resultTasks?.data) return;

    setTasks(resultTasks.data?.tasks || []);
  }, [resultTasks]);

  useEffect(() => {
    if (!resultColumns || resultColumns?.data) return;

    setColumns(resultColumns.data?.columns || []);
  }, [resultColumns]);

  if (isLoadingTasks || isLoadingColumns) {
    return <div>Loading...</div>;
  }

  const handleSetColumns = (columns: Column[]) => {
    setColumns(columns);
  };

  const handleSetTasks = (tasks: Task[]) => {
    setTasks(tasks);
  };

  console.log("columns 11", columns);

  return (
    <div>
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        setColumns={handleSetColumns}
        setTasks={handleSetTasks}
      />
    </div>
  );
}
