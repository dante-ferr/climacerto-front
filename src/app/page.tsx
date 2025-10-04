import styles from "./page.module.scss";
import Map from "@/app/components/Map";
import { LocationProvider } from "@/app/context/LocationContext";
import Sidebar from "@/app/components/Sidebar";

export default function Home() {
  return (
    // Wrap the components that need access to the location state
    // with the LocationProvider.
    <LocationProvider>
      <main className={styles.page}>
        <Sidebar />
        <Map />
      </main>
    </LocationProvider>
  );
}
