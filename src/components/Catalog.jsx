import { useState } from "react";
import { ArrowRight, Truck, ShieldCheck, Package, Search } from "lucide-react";
import { products } from "../products";
import ProductCard from "./ProductCard";
export default function Catalog({ onAdd, query, setQuery }) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const list = products
    .filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (product.name + " " + product.category)
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : 0,
    );
  return (
    <>
      <section className="container pt-6">
        <div className="grid overflow-hidden rounded-2xl bg-[#edf1e9] md:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="eyebrow !text-[#6b8875]">THE EVERYDAY COLLECTION</p>
            <h1 className="hero-title mt-5 text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              Everyday,
              <br />
              thoughtfully
              <br />
              <span className="italic text-[#6f8977]">chosen.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#7c8e7e]">
              Simple pieces. Useful details. Discover a collection that feels
              right at home in your everyday life.
            </p>
            <a
              href="#shop"
              onClick={() =>
                setTimeout(
                  () =>
                    document
                      .getElementById("collection")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  0,
                )
              }
              className="primary mt-7"
            >
              Explore the collection
              <ArrowRight size={17} />
            </a>
            <p className="mt-6 text-[10px] text-[#8b9b8c]">
              Your next everyday favourite is waiting.
            </p>
          </div>
          <div className="relative min-h-[250px] bg-[#dfe8db]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85"
              alt="Warm living room with thoughtfully arranged furniture"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 px-5 py-4">
              <p className="eyebrow">A LITTLE LESS ORDINARY</p>
              <p className="hero-title mt-1 text-xl">Make yourself at home.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 border-b border-[#e7ece4] py-6 sm:grid-cols-3">
          {[
            [Truck, "Simple delivery", "Demo shipping: PKR 250"],
            [
              ShieldCheck,
              "Thoughtful selection",
              "Explore our sample collection",
            ],
            [
              Package,
              "Made for your everyday",
              "Useful finds, considered design",
            ],
          ].map(([Icon, title, detail]) => (
            <div key={title} className="flex items-center justify-center gap-3">
              <Icon size={23} strokeWidth={1.4} className="text-[#79907d]" />
              <div>
                <p className="text-xs font-medium">{title}</p>
                <p className="mt-1 text-[10px] text-[#9ba79d]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="collection" className="container py-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">FIND YOUR EVERYDAY FAVOURITES</p>
            <h2 className="hero-title mt-2 text-3xl">The collection</h2>
          </div>
          <label className="text-xs text-[#829287]">
            Sort by{" "}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="ml-2 rounded-lg border border-[#e3e8e1] bg-white p-2"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="my-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["All", "Home", "Accessories", "Clothing", "Electronics"].map(
              (value) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  aria-pressed={category === value}
                  className={`rounded-full px-4 py-2 text-xs ${category === value ? "bg-[#1e4945] text-white" : "bg-[#f2f5ef] text-[#7d8e81]"}`}
                >
                  {value}
                </button>
              ),
            )}
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#e3e8e1] px-3">
            <Search size={15} className="text-[#9ba79d]" />
            <input
              aria-label="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a product…"
              className="w-[170px] bg-transparent py-2 text-xs outline-none"
            />
          </div>
        </div>
        <p className="mb-5 text-[10px] text-[#9ba79d]">
          {list.length} products · Sample catalogue
        </p>
        {list.length ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        ) : (
          <p className="py-14 text-center text-sm text-[#829287]">
            No products match your search.
          </p>
        )}
      </section>
      <section className="container pb-12">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#1e4945] p-8 text-white">
          <div>
            <p className="eyebrow !text-[#afc5b7]">GOOD THINGS, EVERY DAY</p>
            <h2 className="hero-title mt-2 text-3xl">
              A store that feels like you.
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-6 text-[#afc5b7]">
            An independent collection of sample products for everyday living.
            Browse, save your favourites in the cart, and try the checkout
            experience.
          </p>
        </div>
      </section>
    </>
  );
}
