import { Plus, ArrowUpRight } from "lucide-react";
import { productImage, money } from "../products";
export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <a
        href={`#product/${product.id}`}
        className="relative block overflow-hidden rounded-xl bg-[#f2f3ef]"
      >
        <img
          loading="lazy"
          src={productImage(product)}
          alt={product.name}
          className="product-image aspect-[4/4.2] w-full object-cover"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-medium">
            {product.tag}
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
          <ArrowUpRight size={15} />
        </span>
      </a>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="eyebrow !text-[9px]">{product.category}</p>
          <a
            href={`#product/${product.id}`}
            className="mt-1 block text-sm font-medium"
          >
            {product.name}
          </a>
          <p className="mt-2 text-sm font-semibold">
            {money(product.price)}
            {product.oldPrice && (
              <span className="ml-2 text-[11px] font-normal text-[#9ba79d] line-through">
                {money(product.oldPrice)}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => onAdd(product.id)}
          className="icon-button mt-3 !bg-[#f0f4ed]"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
}
