import { useState, useEffect } from 'react';

function useStaticApi() {
  const [staticApi, setStaticApi] = useState({});

  useEffect(() => {
    function getStaticApi() {
      fetch(`https://app.deus.finance/static-api.json`, {method: 'GET'})
          .then(data => data.json())
          .then(resp => {
            setStaticApi(resp || {});
          })
    }

    getStaticApi();
  }, [])

  return staticApi;
}

export default useStaticApi;