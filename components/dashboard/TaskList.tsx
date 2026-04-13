import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  className?: string;
};

export function TaskList({ tasks, className }: TaskListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {tasks.map((task) => (
        <div key={task.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-colors duration-200 hover:bg-slate-100">
          <span className={cn(
            'mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl',
            task.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
          )}>
            {task.completed ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          </span>
          <p className={cn(
            'text-sm leading-6',
            task.completed ? 'text-slate-500 line-through' : 'text-slate-800'
          )}>
            {task.title}
          </p>
        </div>
      ))}
    </div>
  );
}