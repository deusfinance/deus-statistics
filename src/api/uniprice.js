import { useState, useEffect } from 'react';
import gql from 'graphql-tag'
import BigNumber from 'bignumber.js';
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
  }),
  cache: new InMemoryCache(),
})

const GET_PAIR_SUMMARY = gql`
  query pair($id: String) {
    pair(id: $id) {
      reserveUSD
      totalSupply
    }
  }
`

function useUniPrice(token) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    function getPrice() {
      let pariId = ''
      if (token === 'deus_eth') {
        pariId = '0x4d9824fbc04eff50ab1dac614eae4e20859d5c91'
      } else if (token === 'dea_usdc') {
        pariId = '0x83973dcaa04a6786ecc0628cc494a089c1aee947'
      } else if (token === 'deus_dea') {
        pariId = '0x92adab6d8dc13dbd9052b291cfc1d07888299d65'
      }
      if(pariId) {
        client.query({query: GET_PAIR_SUMMARY, variables: {id: pariId}})
          .then(resp => {
            setPrice(new BigNumber(resp['data']['pair']['reserveUSD']).div(new BigNumber(resp['data']['pair']['totalSupply'])).toFixed(2) || 0);
          })
      }
    }

    getPrice();
  }, [token])

  return price;
}

export default useUniPrice;