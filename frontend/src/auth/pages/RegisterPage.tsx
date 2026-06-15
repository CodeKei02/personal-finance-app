import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { ApiError } from "@/lib/api";

export const RegisterPage = () => {
  const register = useAuthStore((state) => state.register);
  const guestLogin = useAuthStore((state) => state.guestLogin);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(email, password, displayName || undefined);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setError(null);
    setLoading(true);
    try {
      await guestLogin();
    } catch {
      setError("Could not start guest session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beigeLight grid place-items-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-xl p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl font-bold text-greyDark mb-6">Create account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-greyNormal">
            Name
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="rounded-lg border border-beigeNormal py-3 px-4 text-greyDark"
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-greyNormal">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-beigeNormal py-3 px-4 text-greyDark"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-greyNormal">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg border border-beigeNormal py-3 px-4 text-greyDark"
              placeholder="At least 6 characters"
            />
          </label>

          {error && <p className="text-red text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-greyDark text-white font-bold rounded-lg py-3 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : "Sign up"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGuest}
          disabled={loading}
          className="w-full mt-3 border border-beigeNormal text-greyDark font-semibold rounded-lg py-3 cursor-pointer disabled:opacity-50"
        >
          Iniciar como invitado
        </button>

        <p className="text-sm text-greyNormal mt-6 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-greyDark font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
