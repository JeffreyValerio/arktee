export const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
      {title}
    </h1>
  );
};
