export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="text-[30px] mt-5 w-full text-white p-[10px] rounded-xl bg-purple-500 hover:bg-purple-400 outline-none border-none">
      {children}
    </button>
  );
};
