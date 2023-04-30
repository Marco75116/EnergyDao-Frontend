import { Magic } from "magic-sdk";

const customNodeOptions = {
  rpcUrl: "https://matic-mumbai.chainstacklabs.com",
  chainId: 80001,
};

export const m = new Magic("pk_live_8112EC8639264542", {
  network: customNodeOptions,
});
