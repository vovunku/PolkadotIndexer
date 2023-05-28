import {
  SubstrateEvent,
} from "@subql/types";
import { AccountGain, RewardPayout, ChildBounty } from "../types";
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



export async function handleChildBountiesAdded(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [rootId, childId],
    },
  } = event;

  let record = new ChildBounty(rootId + "-" + childId);
  // record.createdBy = event. TODO: find sender

  logger.info("\nNEW CHILDBOUNTY" +
              "\nROOT : " + rootId,
              "\nPARENT : " + childId,)
  await record.save();
}

export async function handleChildBountiesClaimed(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [rootId, childId, amount, receiver],
    },
  } = event;

  let record = await ChildBounty.get(rootId + "-" + childId);

  assert(record !== undefined);

  record.reward = (amount as Balance).toBigInt();
  record.claimedBy = receiver.toString();

  logger.info("\CHALDBOUNTY CLAIM" +
              "\nREWARD : " + record.reward,
              "\nCLAIMEDBY : " + record.claimedBy,)
  await record.save();
}