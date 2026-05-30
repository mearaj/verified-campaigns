import { useState, type FormEvent } from "react";
import { inviteAdminByEmail } from "@/services/adminAccess";

export default function InviteAdminForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);
    try {
      await inviteAdminByEmail(email);
      setMessage(`Invited ${email.trim().toLowerCase()}. They sign in with Google using that address.`);
      setEmail("");
    } catch {
      setError("Could not send invite.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mb-6 rounded-xl border border-vc-border bg-vc-card p-4">
      <h2 className="text-sm font-semibold text-gray-200">Invite organizer</h2>
      <p className="mt-1 text-xs text-vc-muted">
        Enter their Gmail address. When they sign in with Google, they get admin
        access automatically.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-wrap gap-2">
        <input
          type="email"
          required
          placeholder="email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-vc-border bg-vc-bg px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-vc-green px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          Invite
        </button>
      </form>
      {message && <p className="mt-2 text-xs text-vc-green-text">{message}</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </section>
  );
}
