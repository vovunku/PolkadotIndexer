import {
  SubstrateEvent,
} from "@subql/types";
import { AccountGain, RewardPayout } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import assert from "assert";

export async function handleRewardPayout(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;

  const record = new RewardPayout(
    event.block.block.header.hash.toString() + "-" + event.idx
  );

  record.who = account.toString();
  //Big integer type Balance of a payout event
  record.howMuch = (balance as Balance).toBigInt();

  logger.info("\nREWARD in block : " + record.id,
              "\nFOR : " + record.who,
              "\nBIGINT : " + record.howMuch,)
  await record.save();
}

function newAccountGain(id: string) {
  let record = new AccountGain(
    id,
    BigInt(0)
  )
  return record;
}

export async function handleAccountGain(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;

  let record = await AccountGain.get(
    account.toString()
  );

  if (record === undefined) {
    record = newAccountGain(account.toString())
  }

  //Big integer type Balance of a payout event
  record.howMuch += (balance as Balance).toBigInt();

  record.lastSync = event.block.block.header.number.toBigInt();

  logger.info("\nNEW REWARD FOR : " + record.id,
              "\nTOTAL : " + record.howMuch,)
  await record.save();
}