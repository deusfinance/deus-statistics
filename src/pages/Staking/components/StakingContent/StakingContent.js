import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';

import { GET_STAKING_SUMMARY } from 'api/query';
import useLocked from 'api/locked';
import usePrice from 'api/price';
import useStaticApi from 'api/static-api';
import { formatUsd } from 'utils/formatNumber';
import Select from 'components/Select/Select';
import InfoBox from 'components/InfoBox/InfoBox';
import Table from 'components/Table/Table';
import BlurBar from 'components/BlurBar/BlurBar';
import styles from './StakingContent.module.scss';
import IconButton from 'components/IconButton/IconButton';
import { client } from 'api/client'
import { SwapService } from 'services/SwapService';

const titles = [
  { title: 'Native Balancer Pool', address: '0x136193485A8f4870f31B864429a72A9037a1fCE2', second: 'BPT', alias: 'bpt_native', ticker: 'BPT' },
  { title: 'sDEA', address: '0xFd82cdf5A0212A5C838D7A69f43Ceb4A624ad7eF', second: 'Sealed DEA', alias: 'dea', ticker: 'sDEA' },
  { title: 'sDEUS', address: '0x417d16BF319B7F413E950e131D0335004536A37E', second: 'Sealed DEUS', alias: 'deus', ticker: 'sDEUS' },
  { title: 'Time', address: '0x982C54303622347fB3724Ee757cCF6ACc553A5f8', second: 'Time Token', alias: 'timetoken', ticker: 'TIME' },
]

const rows = [
  [ ['Native Balancer Pool', 'BPT'], '-300%', '1,239.8493', '$10,535,432.34', 'Ξ343.3452', <BlurBar /> ],
  [ ['sDEA', 'Sealed DEA'], '-300%', '1,239.8493', '$12,000,000.00', 'Ξ343.3452', <BlurBar /> ],
  [ ['sDEUS', 'Sealed DEUS'], '-300%', '1,239.8493', '$12,000,000.00', 'Ξ343.3452', <BlurBar /> ],
  [ ['Time', 'Time Token'], '-300%', '1,239.8493', '', '', <BlurBar /> ]
]

export default function Staking() {
  const { account, chainId } = useWeb3React()
  const [userStaking, setUserStaking] = useState({stakingSummaryEntity: null})
  const [earned, setEarned] = useState([0,0,0,0])
  useEffect(() => {
    async function fetchData() {
      if(account && chainId) {
        try {
          const swapServie = new SwapService(account, chainId)
          let newEarned = [0, 0, 0, 0]
          for (let i = 0; i < 4; i ++) {
            try {
              swapServie.StakingContract.options.address = titles[i].address
              newEarned[i] = await swapServie.StakingContract.methods.pendingReward(account.toLowerCase()).call()
            } catch(e) { }
          }
          setEarned(newEarned)
          const useQueryData = await client.query({query: GET_STAKING_SUMMARY, variables: {id: account.toLowerCase()}})
          setUserStaking(useQueryData?.data)
        } catch(e) {
          console.error(e)
        }
      } else {
        setUserStaking({stakingSummaryEntity: null})
      }
    }
    fetchData()
  }, [account, chainId])
  const [selectActiveItem, setSelectActiveItem] = useState('TOTAL');
  const { data: totalStaking } = useQuery(GET_STAKING_SUMMARY, {variables: {id: '0'}})
  const locked = useLocked();
  const staticApi = useStaticApi();
  const deaPrice = usePrice('dea', 'usd');
  const deusPrice = usePrice('deus-finance', 'usd');
  const ethPrice = usePrice('ethereum', 'usd');
  const bptPrice = usePrice('bpt', 'usd');

  const RewardClaim = async (address) => {
    try {
      if(account && chainId) {
        const swapServie = new SwapService(account, chainId)
        swapServie.StakingContract.options.address = address
        await swapServie.StakingContract.methods.withdraw(0).call()
      }
    } catch(e) { }
  }

  const getRows = () => {
    const stakingData = selectActiveItem === 'TOTAL' ? totalStaking : userStaking
    let balancerLocked = 0, sDeaLocked = 0, sDeusLocked = 0, timeLocked = 0
    if(stakingData && stakingData.stakingSummaryEntity) {
      balancerLocked = stakingData.stakingSummaryEntity.balancerLocked;
      sDeaLocked = stakingData.stakingSummaryEntity.sDeaLocked;
      sDeusLocked = stakingData.stakingSummaryEntity.sDeusLocked;
      timeLocked = stakingData.stakingSummaryEntity.timeLocked;
    }
    rows[0][2] = new BigNumber(balancerLocked).div(new BigNumber(10).pow(18)).toFixed(4);
    rows[0][3] = '$' + formatUsd(new BigNumber(balancerLocked).times(bptPrice).div(new BigNumber(10).pow(18)).toFixed(4));
    rows[0][4] = 'Ξ' + formatUsd(new BigNumber(balancerLocked).times(bptPrice).div(new BigNumber(10).pow(18)).div(ethPrice).toFixed(4));
    rows[1][2] = new BigNumber(sDeaLocked).div(new BigNumber(10).pow(18)).toFixed(4);
    rows[1][3] = '$' + formatUsd(new BigNumber(sDeaLocked).times(deaPrice).div(new BigNumber(10).pow(18)).toFixed(4));
    rows[1][4] = 'Ξ' + formatUsd(new BigNumber(sDeaLocked).times(deaPrice).div(new BigNumber(10).pow(18)).div(ethPrice).toFixed(4));
    rows[2][2] = new BigNumber(sDeusLocked).div(new BigNumber(10).pow(18)).toFixed(4);
    rows[2][3] = '$' + formatUsd(new BigNumber(sDeusLocked).times(deusPrice).div(new BigNumber(10).pow(18)).toFixed(4));
    rows[2][4] = 'Ξ' + formatUsd(new BigNumber(sDeusLocked).times(deusPrice).div(new BigNumber(10).pow(18)).div(ethPrice).toFixed(4));
    rows[3][2] = new BigNumber(timeLocked).div(new BigNumber(10).pow(18)).toFixed(4);
    if(selectActiveItem === 'TOTAL') {
      rows[3][3] = {
        value: 'Can you measure the true value of time?',
        colspan: 2
      }
      rows[3][4] = {
        colspan: -1
      }
    } else {
      rows[3][3] = '$0.00';
      rows[3][4] = 'Ξ0.00';
    }
    for (let i=0; i<4; i++) {
      rows[i][0] = [
        <>
          {titles[i].title}
          <IconButton type='copy' address={titles[i].address} />
          <IconButton type='etherscan' address={titles[i].address} />
        </>,
        titles[i].second
      ]
      
      if(staticApi && staticApi.apy)
        rows[i][1] = staticApi.apy[titles[i].alias] + '%'

      rows[i][2] = rows[i][2] + ' ' + titles[i].ticker

      if(selectActiveItem === 'TOTAL') {
        rows[i][5] = ''
        rows[i][6] = ''
      }
      else {
        rows[i][5] = formatUsd(new BigNumber(earned[i]).div(new BigNumber(10).pow(18))) + ' DEA'
        rows[i][6] = 
          <Button onClick={() => RewardClaim(titles[i].address)} disabled={new BigNumber(earned[i]).isEqualTo(0)}>
            Claim DEA
          </Button>
      }
    }
    return rows;
  }

  const getTotalValueEth = () => {
    let total = new BigNumber(0);
    
    if(locked) {
      if(locked.stakingLockedValue) {
        total = total.plus(new BigNumber(locked.stakingLockedValue))
      }
      if(locked.vaultLockedValue) {
        total = total.plus(new BigNumber(locked.vaultLockedValue))
      }
      if(locked.balancerLockedValue) {
        total = total.plus(new BigNumber(locked.balancerLockedValue))
      }
      if(locked.uniswapLockedValue) {
        total = total.plus(new BigNumber(locked.uniswapLockedValue))
      }
      if(locked.etherLockedInMarketMaker) {
        total = total.plus(new BigNumber(locked.etherLockedInMarketMaker))
      }
    }

    return formatUsd(total.div(new BigNumber(ethPrice)).toFixed(3));
  }

  const getTotalValueUsd = () => {
    let total = new BigNumber(0);
    
    if(locked) {
      if(locked.stakingLockedValue) {
        total = total.plus(new BigNumber(locked.stakingLockedValue))
      }
      if(locked.vaultLockedValue) {
        total = total.plus(new BigNumber(locked.vaultLockedValue))
      }
      if(locked.balancerLockedValue) {
        total = total.plus(new BigNumber(locked.balancerLockedValue))
      }
      if(locked.uniswapLockedValue) {
        total = total.plus(new BigNumber(locked.uniswapLockedValue))
      }
      if(locked.etherLockedInMarketMaker) {
        total = total.plus(new BigNumber(locked.etherLockedInMarketMaker))
      }
    }
    
    return formatUsd(total.toFixed(2));
  }

  const getTotalStakedEth = () => {
    let staked = new BigNumber(0);
    
    if(locked && locked.stakingLockedValue) {
      staked = new BigNumber(locked.stakingLockedValue);
    }

    return formatUsd(staked.div(new BigNumber(ethPrice)).toFixed(3));
  }

  const getTotalStakedUsd = () => {
    let staked = new BigNumber(0);
    
    if(locked && locked.stakingLockedValue) {
      staked = new BigNumber(locked.stakingLockedValue);
    }
    
    return formatUsd(staked.toFixed(2));
  }

  return (
    <div className={styles.main}>
      <div className={styles.topBoxes}>
        <InfoBox topText="Total Value Locked" bottomText={`${getTotalValueEth()} ETH / $${getTotalValueUsd()}`} className={styles.eachBox} />
        <InfoBox topText="Total Staked Amount" bottomText={`${getTotalStakedEth()} ETH / $${getTotalStakedUsd()}`} className={styles.eachBox} />
        <InfoBox topText="Prices" bottomText={`$${deusPrice} DEUS – $${deaPrice} DEA`} className={styles.eachBox} />
      </div>
      <Select left='TOTAL' right='WALLET' activeItem={selectActiveItem} setActiveItem={setSelectActiveItem} />
      <div className={styles.table}>
        <Table
          headers={['Staking Pools', 'APY', 'Tokens', 'Value in USD', 'Value in ETH', selectActiveItem === 'TOTAL' ? 'USD earned (coming soon)' : 'Claimable DEA', selectActiveItem === 'TOTAL' ? '' : '']}
          sizes={[18, 13, 15, 15, 15, 15, 9]}
          rows={getRows()}
        />
        <div className={styles.apyContainer}>
          <div className={styles.apyText}>*APY is estimated based on the current total $ Value Locked and the rewards paid out per Block,</div>
          <div className={styles.apyText}>APY can change at any time and should be seen as highly fluctuating.</div>
        </div>
      </div>
    </div>
  )
}