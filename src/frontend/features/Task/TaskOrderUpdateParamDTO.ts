import Task from '@/shared/entities/Task'

export type TaskOrderUpdateParamDTO = {
  id: Task['id']
  order: Task['order']
  columnId: Task['columnId']
}
