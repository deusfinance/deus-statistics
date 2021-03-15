import gql from 'graphql-tag'

export const GET_ALL_STAKING_SUMMARY = gql`
  query summary {
    stakingSummaryEntity(id: "0") {
      id
      totalValueLocked
      balancerLocked
      sDeaLocked
      sDeusLocked
      timeLocked
    }
  }
`