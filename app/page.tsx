import Image from "next/image";
import BakeryCost from "./calculations/backeryCost";
import Clientcost from "./calculations/clientCost";

export default function Home() {
  return (
    <div>
      <BakeryCost/>
      <Clientcost  />
    </div>
  );
}
