import { anvilPublicClient } from "../client";
import { hexToBigInt, keccak256, trim, toHex, slice } from "viem";

const ES_RNT_CA = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as const;

/**
 * 
  contract esRNT {
    struct LockInfo{
      address user; // 占20个字节
      uint64 startTime; // 占8字节
      uint256 amount; // 占32字节一个slot
    }
    LockInfo[] private _locks; // 一个元素占2个slot, user和startTime共占一个，amount单独占一个

    constructor() {
      for (uint256 i = 0; i < 11; i++) {
        _locks.push(LockInfo(address(uint160(i+1)), uint64(block.timestamp*2-i), 1e18*(i+1)));
      }
    }
  }
 */

export const readLockInfos = async () => {
  const lengthHex = await anvilPublicClient.getStorageAt({
    address: ES_RNT_CA,
    slot: toHex(0),
  });
  const length = hexToBigInt(lengthHex!);
  const result: Array<{
    user: string;
    startTime: bigint;
    amount: bigint;
  }> = [];
  const baseSlot = hexToBigInt(keccak256(toHex(0, { size: 32 })));
  for (let i = 0n; i < length; i++) {
    const userAndStartTimeSlot = baseSlot + i * 2n;
    const amountSlot = userAndStartTimeSlot + 1n;
    const [userAndStartTimeHex, amountHex] = await Promise.all(
      [userAndStartTimeSlot, amountSlot].map((slot) => {
        return anvilPublicClient.getStorageAt({
          address: ES_RNT_CA,
          slot: toHex(slot, { size: 32 }),
        });
      })
    );
    const trimedUserAndStartTimeHex = trim(userAndStartTimeHex!);
    const startTimeHex = slice(trimedUserAndStartTimeHex, 0, 8); // uint64占前8个字节
    const userHex = slice(trimedUserAndStartTimeHex, 9); // address占后20个字节
    result.push({
      user: userHex!,
      startTime: hexToBigInt(startTimeHex!),
      amount: hexToBigInt(amountHex!),
    });
  }
  console.log(result);
};
