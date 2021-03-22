import gql from 'graphql-tag'

export const GET_STAKING_SUMMARY = gql`
  query summary($id: String) {
    stakingSummaryEntity(id: $id) {
      id
      totalValueLocked
      balancerLocked
      sDeaLocked
      sDeusLocked
      timeLocked
    }
  }
`