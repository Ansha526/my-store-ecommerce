import { useState } from "react";
import { createAccount, signIn } from "../accounts";
export default function Auth({ register, onLogin }) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const profile = register
        ? await createAccount(name, email, password)
        : await signIn(email, password);
      onLogin(profile);
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="container py-12">
      <section className="panel mx-auto max-w-md">
        <p className="eyebrow">YOUR MY STORE ACCOUNT</p>
        <h1 className="hero-title mt-3 text-3xl">
          {register ? "A little more personal." : "Welcome back."}
        </h1>
        <p className="mt-3 text-xs leading-6 text-[#829287]">
          {register
            ? "Create a demo account to try the shopping experience."
            : "Sign in to the account you created in this browser."}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {register && (
            <label className="label block">
              Your name
              <input
                required
                maxLength={60}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="field"
                autoComplete="name"
              />
            </label>
          )}
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
            Password
            <input
              required
              type="password"
              minLength={6}
              maxLength={100}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field"
              autoComplete={register ? "new-password" : "current-password"}
            />
          </label>
          {error && (
            <p role="alert" className="text-xs text-red-700">
              {error}
            </p>
          )}
          <button disabled={busy} className="primary w-full">
            {busy ? "Please wait…" : register ? "Create account" : "Sign in"}
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-[#829287]">
          {register ? "Already have an account?" : "New to My Store?"}{" "}
          <a
            href={register ? "#login" : "#signup"}
            className="font-medium text-[#1e4945] underline"
          >
            {register ? "Sign in" : "Create account"}
          </a>
        </p>
        <p className="mt-5 rounded-xl bg-[#f4f6ef] p-3 text-[10px] leading-5 text-[#829287]">
          Frontend demo accounts only. Use a sample password. Browser-local
          accounts are not secure server authentication and do not work on other
          devices.
        </p>
      </section>
    </main>
  );
}
