import { useEffect, useState } from "react";
import { ShoppingBag, UserRound, Menu, X, Check } from "lucide-react";
import Catalog from "./components/Catalog";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Auth from "./components/Auth";
import Checkout from "./components/Checkout";
import { products, money } from "./products";
import { readStorage, writeStorage } from "./accounts";
export default function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || "shop");
  const [cart, setCart] = useState(() => {
    const stored = readStorage("cart", []);
    return Array.isArray(stored)
      ? stored.filter(
          (item) =>
            products.some((product) => product.id === item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            item.quantity <= 10,
        )
      : [];
  });
  const [user, setUser] = useState(() => {
    const stored = readStorage("session", null);
    return stored &&
      typeof stored.name === "string" &&
      typeof stored.email === "string"
      ? stored
      : null;
  });
  const [query, setQuery] = useState(""),
    [notice, setNotice] = useState(""),
    [menuOpen, setMenuOpen] = useState(false),
    [order, setOrder] = useState(null);
  useEffect(() => {
    function change() {
      setRoute(location.hash.slice(1) || "shop");
      setMenuOpen(false);
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    try {
      writeStorage("cart", cart);
    } catch {
      setNotice("Your bag could not be saved. Browser storage may be blocked.");
    }
  }, [cart]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);
  function add(id, quantity = 1) {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === id);
      return existing
        ? previous.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
              : item,
          )
        : [...previous, { id, quantity }];
    });
    setNotice("Added to your shopping bag.");
  }
  function buy(id, quantity) {
    add(id, quantity);
    location.hash = "checkout";
  }
  function login(profile) {
    setUser(profile);
    try {
      writeStorage("session", profile);
    } catch {}
    setNotice("You are signed in to this demo.");
    location.hash = "shop";
  }
  function logout() {
    setUser(null);
    try {
      writeStorage("session", null);
    } catch {}
    setNotice("Signed out.");
  }
  function placeOrder(details) {
    setOrder({ ...details, id: crypto.randomUUID().slice(0, 8).toUpperCase() });
    setCart([]);
    location.hash = "success";
  }
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  let page;
  if (route.startsWith("product/"))
    page = (
      <ProductDetail key={route} id={route.slice(8)} onAdd={add} onBuy={buy} />
    );
  else if (route === "cart")
    page = (
      <Cart
        cart={cart}
        onQuantity={(id, quantity) =>
          setCart((previous) =>
            previous.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
          )
        }
        onRemove={(id) =>
          setCart((previous) => previous.filter((item) => item.id !== id))
        }
      />
    );
  else if (route === "login" || route === "signup")
    page = <Auth key={route} register={route === "signup"} onLogin={login} />;
  else if (route === "checkout")
    page = <Checkout cart={cart} user={user} onOrder={placeOrder} />;
  else if (route === "success" && order)
    page = (
      <main className="container py-16">
        <section className="panel mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf2e7] text-[#6b8875]">
            <Check size={28} />
          </span>
          <h1 className="hero-title mt-6 text-3xl">
            Your demo order is complete.
          </h1>
          <p className="mt-4 text-sm text-[#829287]">
            Thank you, {order.name}. Order #{order.id}
          </p>
          <p className="mt-3 text-sm font-medium">{money(order.total)}</p>
          <p className="mt-4 text-xs leading-6 text-[#829287]">
            This is a frontend demonstration. No payment was taken, no email was
            sent and no goods will be shipped.
          </p>
          <a href="#shop" className="primary mt-6">
            Continue shopping
          </a>
        </section>
      </main>
    );
  else page = <Catalog onAdd={add} query={query} setQuery={setQuery} />;
  return (
    <>
      <div className="bg-[#1e4945] px-4 py-2 text-center text-[10px] tracking-wide text-[#d0dfd2]">
        Thoughtfully chosen, for your everyday · Frontend store demo
      </div>
      <header className="sticky top-0 z-20 border-b border-[#e7ece4] bg-white/95 backdrop-blur">
        <div className="container flex h-[78px] items-center justify-between gap-4">
          <a href="#shop" className="text-xl font-semibold tracking-[-.8px]">
            My Store<span className="text-[#8da18d]">.</span>
          </a>
          <nav className="hidden gap-7 text-xs text-[#6c8179] md:flex">
            <a href="#shop">Shop all</a>
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
            >
              The collection
            </a>
            <a href="#cart">Your bag</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden text-xs sm:block">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button
                  onClick={logout}
                  className="text-[11px] text-[#829287] underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a href="#login" className="icon-button" aria-label="Sign in">
                <UserRound size={19} />
              </a>
            )}
            <a
              href="#cart"
              className="icon-button relative"
              aria-label={`Shopping bag: ${count} items`}
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b68c68] text-[9px] text-white">
                  {count}
                </span>
              )}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="icon-button md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="container flex gap-6 border-t border-[#e7ece4] py-4 text-sm md:hidden">
            <a href="#shop" onClick={() => setMenuOpen(false)}>
              Shop all
            </a>
            <a href="#cart">Shopping bag</a>
            <a href="#login">Sign in</a>
          </nav>
        )}
      </header>
      <div className="page-enter" key={route}>
        {page}
      </div>
      <footer className="border-t border-[#e7ece4] bg-[#f6f8f4]">
        <div className="container grid gap-6 py-9 sm:grid-cols-3">
          <div>
            <p className="text-xl font-semibold">My Store.</p>
            <p className="mt-3 text-xs leading-6 text-[#829287]">
              Everyday, thoughtfully chosen.
              <br />A React + Tailwind CSS storefront.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold">Explore</p>
            <div className="mt-3 flex flex-col gap-2 text-xs text-[#829287]">
              <a href="#shop">The collection</a>
              <a href="#cart">Shopping bag</a>
              <a href="#signup">Create an account</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold">About this store</p>
            <p className="mt-3 text-[11px] leading-6 text-[#829287]">
              Sample catalogue, browser-local accounts and demo checkout. No
              real orders or payments. Images are illustrative.
            </p>
          </div>
        </div>
        <div className="container border-t border-[#e3e8e1] py-4 text-[10px] text-[#9ba79d]">
          © {new Date().getFullYear()} My Store · Educational frontend project
        </div>
      </footer>
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 w-max max-w-[90vw] -translate-x-1/2 rounded-xl bg-[#1e4945] px-5 py-3 text-xs text-white shadow-lg"
        >
          {notice}
        </div>
      )}
    </>
  );
}
