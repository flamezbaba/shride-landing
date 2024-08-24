"use client";

export default function AppleStoreLink() {
  return (
    <a
    className="inline-flex gap-2 text-sm items-center rounded-full bg-[#131313] px-5 py-3 text-white hover:scale-95 duration-300"
    href="https://apps.apple.com/us/app/shride/id6538715492" target="_blank"
  >
    <img src="/img/apple.png" className="w-[15px]" alt="" />
    App Store
  </a>
  );
}
