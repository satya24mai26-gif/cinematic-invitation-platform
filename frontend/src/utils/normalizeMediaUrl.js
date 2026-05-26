function normalizeMediaUrl(url) {

    /*
    GITHUB BLOB URL
    */
  
    if (
  
      url.includes('github.com')
  
      &&
  
      url.includes('/blob/')
  
    ) {
  
      return url
  
        .replace(
  
          'https://github.com/',
  
          'https://raw.githubusercontent.com/'
  
        )
  
        .replace('/blob/', '/')
  
    }
  
    /*
    DEFAULT
    */
  
    return url
  
  }
  
  export default normalizeMediaUrl