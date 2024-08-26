const networkConfig = {
  84532: {
    name: "sepolia",
    ethUsdPriceFeed: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
  },
  31337: {
    name: "localhost",
  },
  137: {
    name: "polygon",
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  },
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
};
