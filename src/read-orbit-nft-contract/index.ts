import { ORBIT_NFT_ABI } from "./orbit-nft-abi";
import { mainnetPublicClient } from "../client";
import { getContract } from "viem";

const ORBIT_NFT_ADDRESS = "0x0483b0dfc6c78062b9e999a82ffb795925381415" as const;

const orbitContract = getContract({
  abi: ORBIT_NFT_ABI,
  client: mainnetPublicClient,
  address: ORBIT_NFT_ADDRESS,
});

export const getTokenOwner = async (tokenId: bigint) => {
  return await orbitContract.read.ownerOf([tokenId]);
};

export const getTokenURI = async (tokenId: bigint) => {
  return await orbitContract.read.tokenURI([tokenId]);
};
