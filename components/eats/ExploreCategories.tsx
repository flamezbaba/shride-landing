import Link from "next/link";

export default function ExploreCategories() {
  const categories = [
    { name: "shawarma", image: "/img/webeats/categories/shawarma.png" },
    { name: "bakery", image: "/img/webeats/categories/bakery.png" },
    { name: "tacos", image: "/img/webeats/categories/tacos.png" },
    { name: "smoothie", image: "/img/webeats/categories/smoothie.png" },
    { name: "pharmacy", image: "/img/webeats/categories/pharmacy.png" },
    { name: "grocery", image: "/img/webeats/categories/grocery.png" },
    { name: "pizza", image: "/img/webeats/categories/pizza.png" },
    { name: "rice", image: "/img/webeats/categories/rice.png" },
    { name: "burger", image: "/img/webeats/categories/burger.png" },
    { name: "local food", image: "/img/webeats/categories/localfood.png" },
    { name: "pasta", image: "/img/webeats/categories/pasta.png" },
    { name: "combos", image: "/img/webeats/categories/combos.png" },
  ];

  return (
    <div className="">
      <p className="font-semibold text-2xl">Explore Categories</p>
      <div className="w-full flex gap-12 overflow-scroll mt-3 s-none">
        {categories?.map((c, i) => (
          <Link
            href={`/search/?q=${c.name}`}
            key={i}
            className="inline-flex flex-col items-center justify-center px-2 py-2 cursor-pointer"
          >
            <img
              src={c?.image}
              alt=""
              className="w-[50px] h-[50px] object-contain"
            />
            <p className="mt-2 text-base capitalize text-center whitespace-nowrap">
              {c?.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
