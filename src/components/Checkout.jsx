import { useState } from "react";
import { cartTotals, money } from "../products";
export default function Checkout({ cart, user, onOrder }) {
  const [name, setName] = useState(user?.name || ""),
    [email, setEmail] = useState(user?.email || ""),
    [address, setAddress] = useState(""),
    [city, setCity] = useState("");
  if (!cart.length)
    return (
      <div className="container py-20">
        <h1>Your bag is empty.</h1>
        <a href="#shop" className="primary mt-5">
          Continue shopping
        </a>
      </div>
    );
  const totals = cartTotals(cart);
  function submit(event) {
    event.preventDefault();
    onOrder({ name, email, address, city, total: totals.total, items: cart });
  }
  return (
    <main className="container py-10">
      <h1 className="hero-title text-4xl">Checkout</h1>
      <p className="mt-3 text-xs text-[#829287]">
        Demo checkout. No money is collected and no products are shipped.
      </p>
      <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_350px]">
        <form onSubmit={submit} className="panel space-y-5">
          <h2 className="text-lg font-medium">Delivery details</h2>
          {!user && (
            <p className="text-xs text-[#829287]">
              Checkout as a guest or{" "}
              <a href="#login" className="underline">
                sign in
              </a>
              .
            </p>
          )}
          <label className="label block">
            Full name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="field"
              autoComplete="name"
            />
          </label>
          <label className="label block">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="field"
              autoComplete="email"
            />
          </label>
          <label className="label block">
            Address
            <input
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="field"
              autoComplete="street-address"
            />
          </label>
          <label className="label block">
            City
            <input
              required
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="field"
              autoComplete="address-level2"
            />
          </label>
          <div className="rounded-xl bg-[#f4f6ef] p-4">
            <p className="text-xs font-medium">Payment: Demo order only</p>
            <p className="mt-2 text-[11px] text-[#829287]">
              No card or bank information is required.
            </p>
          </div>
          <button className="primary w-full">Place demo order</button>
        </form>
        <aside className="panel h-fit">
          <h2 className="text-lg font-medium">Order summary</h2>
          <p className="mt-5 flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{money(totals.subtotal)}</span>
          </p>
          <p className="mt-4 flex justify-between text-sm text-[#829287]">
            <span>Demo shipping</span>
            <span>{money(totals.shipping)}</span>
          </p>
          <p className="mt-4 flex justify-between border-t border-[#e3e8e1] pt-4 font-semibold">
            <span>Total</span>
            <span>{money(totals.total)}</span>
          </p>
        </aside>
      </div>
    </main>
  );
}
