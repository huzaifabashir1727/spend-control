import { useState } from "react";
import { useData } from "../context/DataContext";

function History({ history }) {
  const { updateSpending, deleteSpending } = useData();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("Deduct");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function openEntry(entry, index) {
    setSelectedEntry({ entry, index });
    setAmount(String(Math.abs(Number(entry.amount))));
    setDetail(entry.detail);
    setStatus(entry.status);
    setError("");
  }

  function closeEditor() {
    setSelectedEntry(null);
    setError("");
  }

  async function handleSave(event) {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0 || !detail.trim()) {
      setError("Enter an amount greater than zero and a detail.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await updateSpending(
        selectedEntry.index,
        numericAmount,
        detail.trim(),
        status
      );
      closeEditor();
    } catch {
      setError("Could not save this entry. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this entry? This cannot be undone.")) return;

    setSaving(true);
    setError("");
    try {
      await deleteSpending(selectedEntry.index);
      closeEditor();
    } catch {
      setError("Could not delete this entry. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-center px-2 h-83 md:h-75">
      <h1 className="text-center text-3xl mt-3 text-white">History</h1>
      <div className="bg-gray-950 rounded-2xl mt-3 w-full h-65 md:w-135 md:h-55 overflow-hidden">
        <div className="h-full  overflow-y-auto custom-scroll">
          {history.length > 0 ? (
            history.map((spend, index) => {
              const isAdded = spend.status === "Add";
              const colorClass = isAdded ? "text-green-500" : "text-red-500";
              return (
                <button
                  type="button"
                  key={`${spend.timestamp?.seconds ?? spend.timestamp ?? "entry"}-${index}`}
                  onClick={() => openEntry(spend, index)}
                  aria-label={`Edit ${spend.status.toLowerCase()} entry: ${spend.detail}`}
                  className={`flex justify-between w-full text-left mt-0.5 cursor-pointer hover:bg-gray-800 ${colorClass}`}
                >
                  <span className="text-2xl md:text-3xl pl-3">
                    {spend.amount}
                  </span>
                  <span className="text-2xl md:text-3xl pr-3 break-all">
                    {spend.detail}
                  </span>
                </button>
              );
            })
            ) : (
            <h1 className="text-gray-400 text-2xl md:text-3xl text-center mt-2">No history yet</h1>
          )}
        </div>
      </div>
      {selectedEntry && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) closeEditor();
          }}
        >
          <form
            onSubmit={handleSave}
            className="w-full max-w-md rounded-2xl border border-white bg-gray-900 p-5 text-white shadow-xl"
          >
            <h2 className="mb-4 text-2xl font-semibold">Edit entry</h2>
            <label className="mb-3 block">
              <span className="mb-1 block">Amount</span>
              <input
                type="number"
                min="0.01"
                step="any"
                required
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full rounded-lg border border-gray-400 bg-gray-800 p-2"
              />
            </label>
            <label className="mb-3 block">
              <span className="mb-1 block">Detail</span>
              <input
                type="text"
                required
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                className="w-full rounded-lg border border-gray-400 bg-gray-800 p-2"
              />
            </label>
            <label className="mb-4 block">
              <span className="mb-1 block">Entry type</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-lg border border-gray-400 bg-gray-800 p-2"
              >
                <option value="Add">Added</option>
                <option value="Deduct">Deducted</option>
              </select>
            </label>
            {error && <p role="alert" className="mb-3 text-red-400">{error}</p>}
            <div className="flex flex-wrap justify-between gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeEditor}
                  disabled={saving}
                  className="rounded-lg border border-gray-400 px-4 py-2 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default History