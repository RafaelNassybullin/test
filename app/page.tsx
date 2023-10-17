import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[500px] flex justify-center items-center">
        <div className="w-[440px] flex flex-col items-center">
          <div className="bg-neutral-300 hover:bg-neutral-400 cursor-pointer w-[150px] mb-[50px] h-[150px] rounded-full"></div>

          <input
            className="text-[30px] w-full p-[10px] rounded-xl bg-neutral-300 outline-none border-none"
            type="text"
            placeholder="Твое имя..."
          />
          <button className="text-[30px] mt-5 w-full text-white p-[10px] rounded-xl bg-purple-500 hover:bg-purple-400 outline-none border-none">
            Готово
          </button>
        </div>
      </div>
    </>
  );
}
