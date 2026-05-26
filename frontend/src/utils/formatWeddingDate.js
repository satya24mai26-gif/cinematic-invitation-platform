export function formatWeddingDate(

    dateString
  
  ) {
  
    if (!dateString) {
  
      return ''
  
    }
  
    const weddingDate =
      new Date(dateString)
  
    const day =
      weddingDate.getDate()
  
    const month =
      weddingDate.toLocaleString(
  
        'en-US',
  
        {
  
          month: 'long'
  
        }
  
      )
  
    const year =
      weddingDate.getFullYear()
  
    function getOrdinal(n) {
  
      if (
  
        n > 3 && n < 21
  
      ) {
  
        return 'th'
  
      }
  
      switch (n % 10) {
  
        case 1:
          return 'st'
  
        case 2:
          return 'nd'
  
        case 3:
          return 'rd'
  
        default:
          return 'th'
  
      }
  
    }
  
    return `${day}${getOrdinal(day)} ${month} ${year}`
  
  }
  
  export function getWeddingDay(
  
    dateString
  
  ) {
  
    if (!dateString) {
  
      return ''
  
    }
  
    const weddingDate =
      new Date(dateString)
  
    return weddingDate.toLocaleDateString(
  
      'en-US',
  
      {
  
        weekday: 'long'
  
      }
  
    )
  
  }

  /*
FORMAT TIME
*/

export function formatWeddingTime(

    timeString
  
  ) {
  
    if (!timeString) {
  
      return ''
  
    }
  
    const [
  
      hours,
  
      minutes
  
    ] = timeString.split(':')
  
    const date =
      new Date()
  
    date.setHours(hours)
  
    date.setMinutes(minutes)
  
    return date.toLocaleTimeString(
  
      'en-US',
  
      {
  
        hour: 'numeric',
  
        minute: '2-digit',
  
        hour12: true
  
      }
  
    )
  
  }