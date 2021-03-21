import { useState, useEffect } from 'react';

function useLocked() {
  const [locked, setLocked] = useState({});

  useEffect(() => {
    function getLocked() {
      fetch(`https://app.deus.finance/tvl.json`, {method: 'GET'})
          .then(data => data.json())
          .then(resp => {
            setLocked(resp || {});
          })
    }

    getLocked();
  }, [])

  return locked;
}

export default useLocked;