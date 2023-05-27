import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { StarterEntity } from "../types";
import { Balance } from "@polkadot/types/interfaces";
import assert from "assert";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  //Retrieve the record by its ID
  const record = new StarterEntity(
    event.block.block.header.hash.toString() + " : " + account.toString()
  );
  // assert(record, "record does not exist")

  record.qui = account.toString();
  //Big integer type Balance of a transfer event
  record.combien = (balance as Balance).toBigInt();

  logger.info("\nREWARD in block : " + record.id,
              "\nFOR : " + record.qui,
              "\nBIGINT : " + record.combien,)
  await record.save();
}
