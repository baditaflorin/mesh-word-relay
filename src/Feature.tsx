import { useState } from "react";
import { useSharedWordRelay } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";

type Props = { room: YRoom | null; config: MeshConfig };

export function Feature({ room, config }: Props) {
  const relay = useSharedWordRelay(room);
  const [draft, setDraft] = useState("");
  const add = () => {
    if (relay.add(draft)) setDraft("");
  };
  return (
    <main className="creative-app relay-app">
      <p className="eyebrow">One room, one evolving line</p>
      <h1>Word Relay</h1>
      <p className="lede">Add the next word, phrase, or tiny plot twist. Keep it moving.</p>
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
      >
        <label className="sr-only" htmlFor="relay-word">
          Next word or phrase
        </label>
        <input
          id="relay-word"
          maxLength={48}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Your next word…"
          value={draft}
        />
        <button disabled={!draft.trim() || !room} type="submit">
          Pass it on
        </button>
      </form>
      <section aria-label="Shared word relay" className="relay-line">
        {relay.entries.map((entry, index) => (
          <span className="relay-word" key={entry.id}>
            <b>{index + 1}</b> {entry.word}
          </span>
        ))}
      </section>
      <div className="card-actions">
        <button disabled={!relay.entries.length} type="button" onClick={relay.undoMine}>
          Undo my last
        </button>
        <button disabled={!relay.entries.length} type="button" onClick={relay.clear}>
          Clear relay
        </button>
      </div>
      <p aria-live="polite" className="status">
        {room
          ? `${relay.entries.length} turn${relay.entries.length === 1 ? "" : "s"} in the relay`
          : config.description}
      </p>
    </main>
  );
}
