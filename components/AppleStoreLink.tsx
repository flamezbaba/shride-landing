"use client";

export default function AppleStoreLink() {
  return (
    <a
      className="inline-flex gap-2 text-sm items-center rounded-lg bg-[#131313] px-8 py-5 md:px-8 md:py-4 text-white hover:scale-95 duration-300"
      href="https://apps.apple.com/us/app/shride/id6538715492"
      target="_blank"
    >
      <img src="/img/apple.png" className="w-[15px]" alt="" />
      <span>Download on App Store</span>
    </a>
  );
}
