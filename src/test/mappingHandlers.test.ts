import { subqlTest } from "@subql/testing";
import { RewardPayout } from "../types";

subqlTest(
    "handleBlock test",
    191,
    [],
    [
      RewardPayout.create({
        id: '0xe430ab806de0b5f4a07140b2f708a6f6ccd1a5fbd9c8e1ca98e936c48ae757b8', 
        // field1: 191,
      }),
    ],
    'handleBlock',
  );
