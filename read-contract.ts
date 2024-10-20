import { ORBIT_NFT_ABI } from "./abi";
import { createPublicClient, getContract, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const ORBIT_NFT_ADDRESS = "0x0483b0dfc6c78062b9e999a82ffb795925381415" as const;

const orbitContract = getContract({
  abi: ORBIT_NFT_ABI,
  client,
  address: ORBIT_NFT_ADDRESS,
});

export const getTokenOwner = async (tokenId: bigint) => {
  return await orbitContract.read.ownerOf([tokenId]);
};

export const getTokenURI = async (tokenId: bigint) => {
  return await orbitContract.read.tokenURI([tokenId]);
};
