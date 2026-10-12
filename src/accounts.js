export function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem("my-store-" + key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value) {
  localStorage.setItem("my-store-" + key, JSON.stringify(value));
}
async function hashPassword(password, salt) {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(salt + password),
  );
  return Array.from(new Uint8Array(buffer), (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
}
export async function createAccount(name, email, password) {
  email = email.trim().toLowerCase();
  const accounts = readStorage("accounts", []);
  if (accounts.some((account) => account.email === email))
    throw new Error("This email already has a demo account. Please sign in.");
  const salt = crypto.randomUUID();
  const account = {
    name: name.trim(),
    email,
    salt,
    passwordHash: await hashPassword(password, salt),
  };
  writeStorage("accounts", [...accounts, account]);
  return { name: account.name, email };
}
export async function signIn(email, password) {
  email = email.trim().toLowerCase();
  const account = readStorage("accounts", []).find(
    (account) => account.email === email,
  );
  if (
    !account ||
    (await hashPassword(password, account.salt)) !== account.passwordHash
  )
    throw new Error(
      "Email or password is incorrect. Create a demo account first.",
    );
  return { name: account.name, email };
}
