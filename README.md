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

```graphql
{
  query {
  	rewardPayouts(first: 10, orderBy: HOWMUCH_DESC) {
      nodes {
        id,
        who,
        howmuch,
      }
    }
  }
}
```
