import { createPublicClient, http } from "viem";
import { anvil, mainnet } from "viem/chains";

export const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: http("https://eth-pokt.nodies.app"),
});

export const anvilPublicClient = createPublicClient({
  chain: anvil,
  transport: http("http://127.0.0.1:8545"),
});
