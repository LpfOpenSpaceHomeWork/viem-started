import { mainnetPublicClient } from "../client";
import { parseAbiItem } from "viem";

const USDC_CONTRACT_ADDRESS =
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as const;
const USDC_DECIMALS = 6;

export const readUSDCEventLogs = async () => {
  const currentBlockNum = await mainnetPublicClient.getBlockNumber({
    cacheTime: 0,
  });
  const eventLogs = await mainnetPublicClient.getLogs({
    address: USDC_CONTRACT_ADDRESS,
    event: parseAbiItem(
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ),
    fromBlock: currentBlockNum - 100n,
    toBlock: currentBlockNum,
  });
  return eventLogs;
};

type PromiseResult<T> = T extends Promise<infer R> ? R : never;
type Log = PromiseResult<ReturnType<typeof readUSDCEventLogs>>[number];

export const printEventLog = (log: Log) => {
  const { from, to, value } = log.args;
  const amount = Number(value || 0n) / 10 ** USDC_DECIMALS;
  console.log(
    `从 ${from} 转账给 ${to} ${amount} $USDC (交易ID：${log.transactionHash})`
  );
};
