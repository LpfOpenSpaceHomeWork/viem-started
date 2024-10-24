import { getTokenURI, getTokenOwner } from "../src/read-orbit-nft-contract";

const main = async () => {
  console.log(await getTokenURI(315n));
  console.log(await getTokenOwner(315n));
};

main();
