"use client";

export default function PlayStoreLink() {
  return (
    <a
      className="inline-flex gap-2 text-sm items-center rounded-full bg-[#131313] px-5 py-3 text-white hover:scale-95 duration-300"
      href="https://play.google.com/store/apps/details?id=com.shride.app" target="_blank"
    >
      <img src="/img/google.png" className="w-[15px]" alt="" />
      Play Store
    </a>
  );
}
