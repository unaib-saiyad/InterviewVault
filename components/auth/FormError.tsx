type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg bg-red-50 px-4 py-4 text-sm text-red-700 border border-red-200/60">
      <div className="flex-1">
        <p className="font-medium leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
