export function StoreTransition() {
  return (
    <div className="min-h-[250px] ring-2 ring-gray-300 rounded-md px-2 py-2 cursor-pointer animate-pulse">
      <div className="h-[160px] bg-gray-200 w-full rounded-md overflow-hidden relative"></div>

      <div className="w-full flex items-center gap-5 justify-between mt-[15px]">
        <div className="h-[15px] w-[200px] bg-gray-200 rounded-md"></div>

        <div className=""></div>
      </div>

      <div className="w-full mt-[5px]">
        <div className="h-[15px] w-[100px] bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}
