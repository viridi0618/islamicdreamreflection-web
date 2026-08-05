import type { Metadata } from "next";
import { MyDreamsClient } from "@/components/MyDreamsClient";

/** Personal history lives on-device — never index it. */
export const metadata: Metadata = {
  title: "My Dream Reflections",
  robots: { index: false, follow: false }
};

export default function MyDreamsPage() {
  return (
    <article className="shell my-dreams-page">
      <div className="my-dreams__head">
        <h1>My Dream Reflections</h1>
        <p>
          Reflections you saved on this device. Nothing here is shared or
          uploaded.
        </p>
      </div>
      <MyDreamsClient />
    </article>
  );
}
