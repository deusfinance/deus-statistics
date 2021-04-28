import React,{ useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'

import useLocked from 'api/locked'
import usePrice from 'api/price'
import useUniPrice from 'api/uniprice'
import { formatUsd } from 'utils/formatNumber'
import { formatIncreasing, formatDecreasing } from 'utils/formatUI'
import { SwapService } from 'services/SwapService'

import InfoBox from 'components/InfoBox/InfoBox'
import Table from 'components/Table/Table'
import styles from './VaultsContent.module.scss'

const rows = [
  [ 'All', '', '', '' ],
  [ 'UNI-LP-DEUS-DEA Vaults', '', '', '' ],
  [ 'UNI-LP-DEA-USDC Vaults', '', '', '' ],
  [ 'UNI-LP-DEUS-ETH Vaults', '', '', '' ],
  [ 'DEUS Single Vault', '', '', '' ],
  [ 'DEA Single Vault', '', '', '' ]
]

const titles = [
  { title: 'UNI-LP-DEUS-DEA Vaults', address: '0xEC7269Ebb7D219C905c28E3fD5Cc35F30dfB870b', abi: 'uni-dd' },
  { title: 'UNI-LP-DEA-USDC Vaults', address: '0x4D01703442509233eFa9879E638278a59b4A5EBB', abi: 'uni-du' },
  { title: 'UNI-LP-DEUS-ETH Vaults', address: '0xc8c91801Bed699598b5483F2ad55f89eBd35157F', abi: 'uni-de' },
  { title: 'DEUS Single Vault', address: '0xF8bcAF889F60E3d277EA0139e75047a0301D3307', abi: 'deus' },
  { title: 'DEA Single Vault', address: '0x1591Da306e9726CF8a60BfF1CE96d7714D7b24cd', abi: 'dea' },
]

export default function Vaults() {
  const { account, chainId } = useWeb3React()
  const deaPrice = usePrice('dea', 'usd')
  const deusPrice = usePrice('deus-finance', 'usd')
  const ethPrice = usePrice('ethereum', 'usd')
  const dePrice = useUniPrice('deus_eth')
  const duPrice = useUniPrice('dea_usdc')
  const ddPrice = useUniPrice('deus_dea')
  const locked = useLocked()
  const [vaults, setVaults] = useState(null)
  const [totalGrowth, setTotalGRowth] = useState(0)

  const getTotalValueEth = () => {
    let total = new BigNumber(0)
    
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

    return formatUsd(total.div(new BigNumber(ethPrice)))
  }

  const getTotalValueUsd = () => {
    let total = new BigNumber(0)
    
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
    
    return formatUsd(total)
  }

  const getTotalVaultEth = () => {
    let vault = new BigNumber(0)
    
    if(locked && locked.vaultLockedValue) {
      vault = new BigNumber(locked.vaultLockedValue)
    }

    return formatUsd(vault.div(new BigNumber(ethPrice)))
  }

  const getTotalVaultUsd = () => {
    let vault = new BigNumber(0)
    
    if(locked && locked.vaultLockedValue) {
      vault = new BigNumber(locked.vaultLockedValue)
    }
    
    return formatUsd(vault)
  }

  useEffect(() => {
    async function fetchData() {
      if(account && chainId) {
        try {
          const swapServie = new SwapService(account, chainId)
          const oneDayBefore = await swapServie.getHeight() -5760
          let newVaults = [], newGrowth = new BigNumber(0), tvl = new BigNumber(0)
          for (let i = 0; i < 5; i ++) {
            try {
              swapServie.VaultContract.options.address = titles[i].address
              const token_address = await swapServie.VaultContract.methods.lockedToken().call()
              swapServie.TokenContract.options.address = token_address
              const currBal = await swapServie.TokenContract.methods.balanceOf(titles[i].address).call(null)
              const prevBal = await swapServie.TokenContract.methods.balanceOf(titles[i].address).call(null, oneDayBefore)
              let vault = {
                tvl: new BigNumber(currBal).div(new BigNumber(10).pow(18)),
                growth: (new BigNumber(currBal).times(100).div(new BigNumber(prevBal)).minus(100)).toFixed(2),
                tokens: (new BigNumber(currBal)).div(new BigNumber(10).pow(18)).toFixed(2)
              }
              newVaults.push(vault)
              newGrowth = newGrowth.plus(vault.tvl.times(vault.growth))
              tvl = tvl.plus(vault.tvl)
            } catch(e) {
              newVaults = null
              console.error(e)
            }
          }
          setVaults(newVaults)
          setTotalGRowth(newGrowth.div(tvl).toFixed(2))
        } catch(e) {
          setVaults(null)
          setTotalGRowth(0)
          console.error(e)
        }
      } else {
        setVaults(null)
        setTotalGRowth(0)
      }
    }
    fetchData()
  }, [account, chainId])

  const getRows = () => {
    let vaultLocked = 0
    if(locked.vaultLockedValue) {
      vaultLocked = locked.vaultLockedValue
    }
    rows[0][1] = '$' + new BigNumber(vaultLocked).div(new BigNumber(10).pow(6)).toFixed(1) + 'M'
    rows[0][2] = totalGrowth >= 0 ? formatIncreasing(totalGrowth) : formatDecreasing(totalGrowth)
    rows[0][3] = formatUsd(new BigNumber(vaultLocked).div(new BigNumber(ethPrice)))

    for(let i = 0; i < 5; i ++) {
      rows[i + 1][0] = titles[i].title
      if(vaults && vaults[i]) {
        let price = 0
        if(titles[i].abi == 'uni-dd') price = ddPrice
        if(titles[i].abi == 'uni-du') price = duPrice
        if(titles[i].abi == 'uni-de') price = dePrice
        if(titles[i].abi == 'dea') price = deaPrice
        if(titles[i].abi === 'deus') price = deusPrice
        rows[i + 1][1] = '$' + new BigNumber(vaults[i].tvl).times(new BigNumber(price)).div(new BigNumber(10).pow(6)).toFixed(1) + 'M'
        rows[i + 1][2] = vaults[i].growth >= 0 ? formatIncreasing(vaults[i].growth) : formatDecreasing(vaults[i].growth)
        rows[i + 1][3] = vaults[i].tokens
      }
    }
    return rows
  }

  return (
    <div className={styles.main}>
      <div className={styles.topBoxes}>
        <InfoBox topText="Total Value Locked" bottomText={`${getTotalValueEth()} ETH / $${getTotalValueUsd()}`} className={styles.eachBox} />
        <InfoBox topText="Total Vault Value" bottomText={`${getTotalVaultEth()} ETH / $${getTotalVaultUsd()}`} className={styles.eachBox} />
        <InfoBox topText="Prices" bottomText={`$${formatUsd(deusPrice)} DEUS – $${formatUsd(deaPrice)} DEA`} className={styles.eachBox} />
      </div>
      <div className={styles.table}>
        <Table
          headers={['Vaults', 'TVL', 'TVL growth last 24th', 'Total Locked Tokens']}
          sizes={[25, 20, 20, 35]}
          rows={getRows()}
        />
      </div>
    </div>
  )
}