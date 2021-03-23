import { useState, useEffect } from 'react';

function usePrice(token, currency) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    function getPrice() {
      if (token === 'bpt') {
        fetch(`https://app.deus.finance/bpt.json`, {method: 'GET'})
          .then(data => data.json())
          .then(resp => {
            setPrice(resp['bpt_price'] || 0);
          })
      } else if (token === 'dea' || token === 'deus') {
        fetch(`https://app.deus.finance/price.json`, {method: 'GET'})
          .then(data => data.json())
          .then(resp => {
            setPrice(resp[token] || 0);
          })
      } else {
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=${currency}`, {method: 'GET'})
          .then(data => data.json())
          .then(resp => {
            console.log(resp, token)
            setPrice(resp[token][currency] || 0);
          })
      }
    }

    getPrice();
  }, [token, currency])

  return price;
}

export default usePrice;