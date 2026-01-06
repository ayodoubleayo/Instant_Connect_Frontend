import { Metadata } from "next";
import CasualClientPage from "./CasualClientPage";

export const metadata: Metadata = {
  title: "Casual Dating | Relaxed Connections on InstantConnect",
  description: "Explore casual dating and meet people interested in relaxed connections.",
};

export default function Page() {
  return <CasualClientPage />;
}
