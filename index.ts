import { getTokenURI, getTokenOwner } from "./read-contract";

const main = async () => {
  console.log(await getTokenURI(315n));
  console.log(await getTokenOwner(315n));
};

main();
