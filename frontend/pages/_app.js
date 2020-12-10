import "firebase/firestore";
import "firebase/auth";
import { Fuego, FuegoProvider } from "@nandorojo/swr-firestore";
import { firebaseConfig } from "../utils/auth/initFirebase";
import "../scss/sb-admin-2.scss";
import "react-placeholder/lib/reactPlaceholder.css";

const fuego = new Fuego(firebaseConfig);

function MyApp({ Component, pageProps }) {
  return (
    <FuegoProvider fuego={fuego}>
      <Component {...pageProps} />
    </FuegoProvider>
  );
}

export default MyApp;
