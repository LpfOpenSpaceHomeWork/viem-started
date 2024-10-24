import { printEventLog, readUSDCEventLogs } from "../src/usdc-event-logs";

const main = async () => {
  const logs = await readUSDCEventLogs();
  logs.forEach((log) => {
    printEventLog(log);
  });
};

main();
