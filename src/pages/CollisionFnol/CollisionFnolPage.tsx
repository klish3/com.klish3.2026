import React, { useState } from "react";
import { CollisionFnol, type CollisionFnolPayload } from "../../components/collision-fnol";

/**
 * Showcase page for the CollisionFnol component: a sketch-first motor
 * first-notification-of-loss flow. Submissions are not sent anywhere; the
 * resulting payload is shown below the component so the contract can be inspected.
 */
export const CollisionFnolPage: React.FC = () => {
  const [payload, setPayload] = useState<CollisionFnolPayload | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 px-4 pb-32 pt-24 dark:bg-stone-950 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
            Prototype
          </p>
          <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-tight text-stone-900 dark:text-stone-50 md:text-8xl">
            Collision{" "}
            <span className="font-light italic text-stone-500 dark:text-stone-400">
              FNOL.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300 md:text-xl">
            A sketch-first motor first notification of loss. Find where it
            happened, draw the vehicles and their movements on a map or a road
            schematic, then check and send. Nothing is submitted from this page;
            the payload that would go to the back end is shown below instead.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 md:p-8">
          <CollisionFnol
            onSubmit={async (p) => {
              setPayload(p);
              return { reference: `DEMO-${p.clientSubmissionId.slice(0, 8).toUpperCase()}` };
            }}
          />
        </div>

        {payload && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-50">
              Payload
            </h2>
            <p className="mb-4 text-stone-600 dark:text-stone-300">
              This is what the back end would receive.
            </p>
            <pre className="max-h-[32rem] overflow-auto rounded-2xl border border-stone-200 bg-stone-100 p-6 text-xs leading-relaxed text-stone-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
};
