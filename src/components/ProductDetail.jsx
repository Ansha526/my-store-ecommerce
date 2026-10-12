import { useState } from "react";
import { ArrowLeft, ShoppingBag, Truck } from "lucide-react";
import { products, productImage, money } from "../products";
import ProductCard from "./ProductCard";
export default function ProductDetail({ id, onAdd, onBuy }) {
  const [quantity, setQuantity] = useState(1);
  const product = products.find((item) => item.id === id);
  if (!product)
    return (
      <div className="container py-20">
        <h1>Product not found.</h1>
        <a href="#shop" className="primary mt-5">
          Back to store
        </a>
      </div>
    );
  return (
    <main className="container py-8">
      <a
        href="#shop"
        className="flex items-center gap-2 text-xs text-[#829287]"
      >
        <ArrowLeft size={14} />
        Back to collection
      </a>
      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:gap-16">
        <img
          src={productImage(product, 1100)}
          alt={product.name}
          className="aspect-square w-full rounded-2xl bg-[#f2f3ef] object-cover"
        />
        <section className="py-3">
          <p className="eyebrow">{product.category}</p>
          <h1 className="hero-title mt-3 text-3xl sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-5 text-xl font-semibold">
            {money(product.price)}
            {product.oldPrice && (
              <span className="ml-3 text-sm font-normal text-[#9ba79d] line-through">
                {money(product.oldPrice)}
              </span>
            )}
          </p>
          <p className="mt-6 text-sm leading-7 text-[#829287]">
            {product.description}
          </p>
          <p className="mt-6 text-xs">
            Colour: <strong>{product.color}</strong>
          </p>
          <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#58796a]">
            <span className="h-5 w-5 rounded-full bg-[#c6cdbd]" />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <label className="text-xs text-[#829287]" htmlFor="quantity">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="rounded-lg border border-[#d8e1dc] p-2"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => onAdd(product.id, quantity)}
              className="secondary"
            >
              <ShoppingBag size={17} />
              Add to cart
            </button>
            <button
              onClick={() => onBuy(product.id, quantity)}
              className="primary"
            >
              Buy now
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[11px] text-[#829287]">
            <Truck size={15} />
            Free demo shipping over PKR 10,000
          </p>
          <details open className="mt-7 border-t border-[#e3e8e1] pt-5">
            <summary className="cursor-pointer text-sm font-medium">
              Product details
            </summary>
            <ul className="mt-3 space-y-2 text-xs text-[#829287]">
              {product.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          </details>
          <p className="mt-5 text-[10px] leading-5 text-[#9ba79d]">
            Sample product. Photos are illustrative; specifications are demo
            catalogue content. No real purchase is processed.
          </p>
        </section>
      </div>
      <section className="mt-14">
        <h2 className="hero-title mb-6 text-2xl">You might also like</h2>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products
            .filter((item) => item.id !== id)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} onAdd={onAdd} />
            ))}
        </div>
      </section>
    </main>
  );
}
