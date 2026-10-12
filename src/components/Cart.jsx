import { Trash2, Minus, Plus } from "lucide-react";
import { products, productImage, money, cartTotals } from "../products";
export default function Cart({ cart, onQuantity, onRemove }) {
  const totals = cartTotals(cart);
  return (
    <main className="container py-10">
      <p className="eyebrow">YOUR EVERYDAY FINDS</p>
      <h1 className="hero-title mt-2 text-4xl">Shopping bag</h1>
      {!cart.length ? (
        <section className="panel mt-8 py-16 text-center">
          <h2 className="text-xl">Your bag is waiting for a favourite.</h2>
          <a href="#shop" className="primary mt-6">
            Explore the collection
          </a>
        </section>
      ) : (
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_350px]">
          <div className="space-y-4">
            {cart.map((item) => {
              const product = products.find(
                (product) => product.id === item.id,
              );
              return (
                <article key={item.id} className="panel flex gap-4 !p-4">
                  <a href={`#product/${product.id}`}>
                    <img
                      src={productImage(product, 250)}
                      alt={product.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  </a>
                  <div className="min-w-0 flex-1">
                    <a
                      href={`#product/${product.id}`}
                      className="text-sm font-medium"
                    >
                      {product.name}
                    </a>
                    <p className="mt-1 text-xs text-[#829287]">
                      {product.color}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-[#d8e1dc]">
                        <button
                          disabled={item.quantity === 1}
                          onClick={() => onQuantity(item.id, item.quantity - 1)}
                          className="icon-button"
                          aria-label={`Decrease ${product.name}`}
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-2 text-xs">{item.quantity}</span>
                        <button
                          disabled={item.quantity === 10}
                          onClick={() => onQuantity(item.id, item.quantity + 1)}
                          className="icon-button"
                          aria-label={`Increase ${product.name}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="icon-button"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    {money(product.price * item.quantity)}
                  </p>
                </article>
              );
            })}
          </div>
          <aside className="panel h-fit">
            <h2 className="text-lg font-medium">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>{money(totals.subtotal)}</span>
              </p>
              <p className="flex justify-between text-[#829287]">
                <span>Demo shipping</span>
                <span>{totals.shipping ? money(totals.shipping) : "Free"}</span>
              </p>
              <p className="flex justify-between border-t border-[#e3e8e1] pt-4 font-semibold">
                <span>Total</span>
                <span>{money(totals.total)}</span>
              </p>
            </div>
            <a href="#checkout" className="primary mt-6 w-full">
              Proceed to checkout
            </a>
            <p className="mt-3 text-center text-[10px] text-[#9ba79d]">
              Frontend demo · no real payment
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
