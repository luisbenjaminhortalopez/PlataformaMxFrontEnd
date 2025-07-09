type Props = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 text-gray-400 text-sm md:text-base">{description}</p>
      )}
    </div>
  );
};
