function buildMediaUrl(
    sourceType,
    sourceId
  ) {
  
    switch (sourceType) {
  
      case 'youtube':
  
        return `https://www.youtube.com/embed/${sourceId}?autoplay=1&mute=1&loop=1&playlist=${sourceId}`
  
      case 'googleDrive':
  
        return `https://drive.google.com/file/d/${sourceId}/preview`

      case 'github':
  
      return sourceId
  
      case 'upload':
  
        return sourceId
  
      default:
  
        return ''
  
    }
  
  }
  
  export default buildMediaUrl