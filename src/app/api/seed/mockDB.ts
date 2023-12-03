import { v4 as uuidv4 } from 'uuid'
import Column from '@/shared/entities/Column'
import Task from '@/shared/entities/Task'

export const creativeColumns: Column[] = [
  new Column({ id: uuidv4(), title: 'Idea Factory', order: 1 }),
  new Column({ id: uuidv4(), title: 'Action Station', order: 2 }),
  new Column({ id: uuidv4(), title: 'Victory Lane', order: 3 }),
  new Column({ id: uuidv4(), title: 'Future Plans', order: 4 }),
  new Column({ id: uuidv4(), title: 'Challenge Zone', order: 5 }),
  new Column({ id: uuidv4(), title: 'Quality Check', order: 6 }),
]

export const creativeTasks: Task[] = [
  // Tasks for 'Idea Factory'
  new Task({
    id: uuidv4(),
    title: 'Brainstorm Session',
    content:
      'Gather team for a creative brainstorming session to generate innovative ideas. And some more thext just to be sure that it will be wrapped correctly.',
    order: 1,
    columnId: creativeColumns[0].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Market Research',
    content:
      'Conduct market research to identify new trends and opportunities.',
    order: 2,
    columnId: creativeColumns[0].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Competitor Analysis',
    content:
      'Analyze competitors to understand their strengths and weaknesses.',
    order: 3,
    columnId: creativeColumns[0].id,
  }),
  // Tasks for 'Action Station'
  new Task({
    id: uuidv4(),
    title: 'Website Redesign',
    content: 'Create a modern, user-friendly design for our main website.',
    order: 1,
    columnId: creativeColumns[1].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Product Development',
    content: 'Develop a prototype for the new product line.',
    order: 2,
    columnId: creativeColumns[1].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Campaign Launch',
    content: 'Launch the new marketing campaign across all channels.',
    order: 3,
    columnId: creativeColumns[1].id,
  }),
  // Tasks for 'Victory Lane'
  new Task({
    id: uuidv4(),
    title: 'Project Completion',
    content: 'Finalize and deliver the client project on time.',
    order: 1,
    columnId: creativeColumns[2].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Sales Milestone',
    content: 'Achieve the quarterly sales target set by the team.',
    order: 2,
    columnId: creativeColumns[2].id,
  }),
  // Tasks for 'Future Plans'
  new Task({
    id: uuidv4(),
    title: 'Strategy Meeting',
    content: "Plan the next quarter's strategy with the leadership team.",
    order: 1,
    columnId: creativeColumns[3].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Customer Feedback Analysis',
    content: 'Analyze recent customer feedback for improvement ideas.',
    order: 2,
    columnId: creativeColumns[3].id,
  }),
  // Tasks for 'Challenge Zone'
  new Task({
    id: uuidv4(),
    title: 'Bug Fixing',
    content:
      'Identify and fix critical bugs reported in the latest software release.',
    order: 1,
    columnId: creativeColumns[4].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Process Optimization',
    content: 'Improve the current workflow to enhance efficiency.',
    order: 2,
    columnId: creativeColumns[4].id,
  }),
  // Tasks for 'Quality Check'
  new Task({
    id: uuidv4(),
    title: 'Code Review',
    content:
      'Conduct a thorough review of the new codebase for quality assurance.',
    order: 1,
    columnId: creativeColumns[5].id,
  }),
  new Task({
    id: uuidv4(),
    title: 'Product Testing',
    content: 'Test the new product features before the official release.',
    order: 2,
    columnId: creativeColumns[5].id,
  }),
]
