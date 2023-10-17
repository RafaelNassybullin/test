export default function ListItemWrapper({ children, className }: any) {
  return (
    <div
      className={`${className} w-[95%] flex items-center justify-between rounded-lg bg-neutral-100 hover:bg-neutral-200 h-[77px] px-5 ml-5 mb-5`}
    >
      {children}
    </div>
  );
}
