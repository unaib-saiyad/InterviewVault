import { CheckCircle } from 'lucide-react';

type FormSuccessProps = {
  message?: string;
};

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg bg-green-50 px-4 py-4 text-sm text-green-700 border border-green-200/60">
      <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium leading-relaxed">{message}</p>
      </div>
    </div>
  );
}