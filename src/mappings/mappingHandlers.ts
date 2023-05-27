import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { RewardPayout } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import assert from "assert";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;

  const record = new RewardPayout(
    event.block.block.header.hash.toString() + "-" + event.idx
  );

  record.who = account.toString();
  //Big integer type Balance of a transfer event
  record.howmuch = (balance as Balance).toBigInt();

  logger.info("\nREWARD in block : " + record.id,
              "\nFOR : " + record.who,
              "\nBIGINT : " + record.howmuch,)
  await record.save();
}
