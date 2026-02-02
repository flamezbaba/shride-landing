import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <CgSpinner size={33} />
      <h2 className="text-2xl font-semibold">Loading....</h2>
    </div>
  );
}
