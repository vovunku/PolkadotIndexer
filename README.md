# SubQuery - PolkadotIndexer

Here I will index some interesting stuff in order to study Subquery.

## Building

```
yarn install
```

```
yarn codegen
```

```
yarn build
```

## Indexing and Query

#### Run required systems in docker

```
docker-compose pull && docker-compose up
```

#### Query the project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

For the `subql-starter` project, you can try to query with the following code to get a taste of how it works.

##### Reward payouts for each account

rewards sorted by payout

```graphql
{
  query {
  	rewardPayouts(first: 10, orderBy: HOW_MUCH_DESC) {
      nodes {
        id,
        who,
        howMuch,
      }
    }
  }
}
```

rewards for some account

```graphql
{
  query {
  	rewardPayouts(first: 10, filter: {who: {equalTo: "13SkL2uACPqBzpKBh3d2n5msYNFB2QapA5vEDeKeLjG2LS3Y"}}) {
      nodes {
        id,
        who,
        howMuch,
      }
    }
  }
}
```

##### Rewards accumulated for each account

```graphql
{
  query {
  	accountGains(first: 10, orderBy: HOW_MUCH_DESC) {
      nodes {
        id,
        howMuch,
        lastSync
      }
    }
  }
}
```

##### Child Bounties (base bounties are not interesting)

```graphql
{
  query {
  	childBounties(first: 10) {
      nodes {
        id,
        claimedBy,
        reward
      }
    }
  }
}
```