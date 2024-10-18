"use client";

import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import bg1 from "@/public/img/home/bg1.png";
import PlayStoreLink from "./PlayStoreLink";
import AppleStoreLink from "./AppleStoreLink";

export default function Footer() {
  return (
    <div className="w-full overflow-hidden">
      <footer
        style={{
          backgroundColor: "#131313",
          backgroundImage: `url(${bg1.src})`,
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full text-white px-[50px] md:px-[20px] pt-[50px] mt-20"
      >
        <div className="w-full grid grid-cols-4 md:grid-cols-1 md:gap-10 py-5 border-b-[2px] border-b-neutral-900">
          <div className="">
            <img src="/img/shride-logo-white.png" width="100" alt="" />
            <p className="mt-10">
              6, Ilupeju road, Oluyole Sharp Corner Ibadan.
            </p>
            <p className="mt-5">
              <a href="tel:08064223253" className="">
                0806 4223 253
              </a>{" "}
            </p>
          </div>
          <div className="">
            <p className="font-bold">Our Services</p>
            <ul className="space-y-4 mt-6">
              <li>
                <a href="/business" className="">
                  Shride For Bikes
                </a>
              </li>
              <li>
                <a href="/business" className="">
                  Shride For Delivery
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="font-bold">Links</p>
            <ul className="space-y-4 mt-6">
              <li>
                <a href="/rider" className="">
                  Rides
                </a>
              </li>
              <li>
                <a href="/rider" className="">
                  Become a Rider
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="font-bold">Company</p>
            <ul className="space-y-4 mt-6">
              <li>
                <a href="/about-us" className="">
                  About Us
                </a>
              </li>
              <li>
                <a href="" className="">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex md:flex-col justify-between md:gap-6 items-center py-5 border-b-[2px] border-b-neutral-900">
          <div className="flex gap-5 items-center">
            <a
              href="https://www.facebook.com/share/hQZUoZrCocfnWAZg/?mibextid=LQQJ4d"
              target="_blank"
              className=""
            >
              <FaFacebook size={25} />
            </a>
            <a
              href="https://instagram.com/shrideapp"
              target="_blank"
              className=""
            >
              <FaInstagram size={25} />
            </a>
            <a href="https://x.com/theshrideapp" target="_blank" className="">
              <FaTwitter size={25} />
            </a>
            <a
              href="https://www.tiktok.com/@shrideapp"
              target="_blank"
              className=""
            >
              <FaTiktok size={25} />
            </a>
          </div>
          <div className="">
            <a
              href="/#downloadapp"
              className="inline-flex rounded-full bg-white px-5 py-3 text-[#131313] hover:scale-95 duration-300"
            >
              Get the Shride App
            </a>
          </div>
        </div>
        <div className="w-full py-5 flex md:flex-col text-sm font-light  md:gap-6 justify-between items-center">
          <div className="flex gap-5 items-center">
            <p className="">&copy; 2024 Shride</p>
          </div>
          <div className="flex items-center md:flex-wrap gap-5">
            {/* <a href="" className="">
              Terms and Conditions
            </a>

            <a href="" className="">
              Privacy
            </a>

            <a href="" className="">
              Cookies
            </a> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
