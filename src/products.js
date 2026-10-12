export const products = [
  {
    id: "linen-tote",
    name: "Everyday Linen Tote",
    category: "Accessories",
    price: 2800,
    oldPrice: 3400,
    image: "photo-1553062407-98eeb64c6a62",
    tag: "Bestseller",
    color: "Natural",
    description:
      "A simple carry-all for your everyday routine. Roomy enough for the things you need, with comfortable straps and a clean, minimal shape.",
    details: [
      "Linen-look fabric",
      "Interior pocket",
      "Lightweight everyday design",
    ],
  },
  {
    id: "ceramic-mug",
    name: "Stoneware Coffee Mug",
    category: "Home",
    price: 1800,
    image: "photo-1514228742587-6b1558fcca3d",
    tag: "New arrival",
    color: "Sand",
    description:
      "A softly shaped mug for slow mornings and your favourite coffee. The subtle finish makes every cup feel a little more considered.",
    details: ["Ceramic finish", "Comfortable handle", "350 ml capacity"],
  },
  {
    id: "wireless-headphones",
    name: "Studio Wireless Headphones",
    category: "Electronics",
    price: 12500,
    oldPrice: 14500,
    image: "photo-1505740420928-5e560c06d30e",
    tag: "Popular",
    color: "Black",
    description:
      "A comfortable companion for music, study sessions and a little time to yourself. A clean design with an adjustable headband.",
    details: [
      "Wireless connectivity",
      "Adjustable fit",
      "Charging cable included",
    ],
  },
  {
    id: "classic-watch",
    name: "Minimal Everyday Watch",
    category: "Accessories",
    price: 6800,
    image: "photo-1524805444758-089113d48a6d",
    color: "Brown",
    description:
      "A timeless accessory with a clean dial and an understated strap. Designed to pair easily with your daily wardrobe.",
    details: ["Minimal dial", "Adjustable strap", "Gift-ready presentation"],
  },
  {
    id: "desk-lamp",
    name: "Arc Desk Lamp",
    category: "Home",
    price: 5200,
    image: "photo-1507473885765-e6ed057f782c",
    color: "Warm white",
    description:
      "Bring a little warmth to your workspace. The simple silhouette works just as well on a bedside table as on a desk.",
    details: [
      "Compact tabletop design",
      "Warm lighting style",
      "Easy on/off switch",
    ],
  },
  {
    id: "daily-sneakers",
    name: "Daily Canvas Sneakers",
    category: "Clothing",
    price: 4800,
    oldPrice: 5600,
    image: "photo-1525966222134-fcfa99b8ae77",
    tag: "Bestseller",
    color: "White",
    description:
      "An easy-going pair for everyday adventures. A versatile shape and casual finish make them a useful wardrobe staple.",
    details: ["Canvas-style upper", "Rubber sole", "Demo size: EU 40"],
  },
  {
    id: "plant-pot",
    name: "Terracotta Plant Pot",
    category: "Home",
    price: 2200,
    image: "photo-1485955900006-10f4d324d411",
    color: "Terracotta",
    description:
      "A home for a little greenery. Its warm finish and simple proportions add a natural touch to shelves, desks and windowsills.",
    details: [
      "Indoor decorative pot",
      "Plant pictured for illustration",
      "Medium tabletop size",
    ],
  },
  {
    id: "travel-backpack",
    name: "Weekend Travel Backpack",
    category: "Accessories",
    price: 7500,
    image: "photo-1622260614153-03223fb72052",
    tag: "New arrival",
    color: "Olive",
    description:
      "A practical bag for busy weekdays and small weekend escapes. Multiple compartments help keep your essentials organised.",
    details: [
      "Main zip compartment",
      "Padded shoulder straps",
      "Everyday travel size",
    ],
  },
  {
    id: "cotton-shirt",
    name: "Relaxed Cotton Shirt",
    category: "Clothing",
    price: 3600,
    image: "photo-1598033129183-c4f50c736f10",
    color: "Cream",
    description:
      "A relaxed wardrobe essential with a clean shape and easy styling. Wear it on its own or layer it for a casual look.",
    details: ["Cotton-style fabric", "Relaxed fit", "Demo size: Medium"],
  },
  {
    id: "desk-speaker",
    name: "Compact Desk Speaker",
    category: "Electronics",
    price: 8900,
    image: "photo-1608043152269-423dbba4e7e1",
    color: "Charcoal",
    description:
      "A small speaker that fits comfortably into your everyday space. Keep your favourite playlists close at hand.",
    details: [
      "Wireless connectivity",
      "Compact form",
      "Charging cable included",
    ],
  },
  {
    id: "sunglasses",
    name: "Classic Frame Sunglasses",
    category: "Accessories",
    price: 2400,
    image: "photo-1511499767150-a48a237f0083",
    color: "Tortoise",
    description:
      "A classic frame with an easy everyday shape. A simple finishing touch for your outdoor plans.",
    details: ["Lightweight frame", "Protective case", "Demo fashion accessory"],
  },
  {
    id: "notebook",
    name: "Everyday Notes Journal",
    category: "Home",
    price: 1200,
    image: "photo-1517842645767-c639042777db",
    color: "Sage",
    description:
      "Make a little room for your ideas. A simple journal for notes, plans and the thoughts you want to keep.",
    details: ["Lined pages", "Soft-touch style cover", "Portable A5 size"],
  },
];
export function productImage(product, width = 650) {
  return `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=${width}&q=85`;
}
export function money(amount) {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}
export function cartTotals(cart) {
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (products.find((product) => product.id === item.id)?.price || 0) *
        item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 10000 ? 0 : 250;
  return { subtotal, shipping, total: subtotal + shipping };
}
