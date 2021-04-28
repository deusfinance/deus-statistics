export const formatCol = (col) => {
  if (col[0] === 'Ξ') {
    return (
      <>
        <span style={{ fontFamily: 'system-ui' }}>Ξ</span>
        <span>{col.slice(1)}</span>
      </>
    )
  } else {
    return col
  }
}

export const formatSecondText = (text) => {
  if(text.includes('/')) {
    return (
      <>
        <span>{text.split('/')[0]}</span>
        /
        <span style={{opacity: 0.5}}>{text.split('/')[1]}</span>
      </>
    )
  } else if(text.includes('-')) {
    return (
      <>
        <span>{text.split('-')[0]}</span>
        /
        <span style={{opacity: 0.5}}>{text.split('-')[1]}</span>
      </>
    )
  } else {
    return text
  }
}

export const formatIncreasing = (text) => {
  return <span style={{ color: '#00D16C'}}>+{text}%</span>
}
export const formatDecreasing = (text) => {
  return <span style={{ color: '#D40000'}}>{text}%</span>
}