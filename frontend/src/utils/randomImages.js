const brideImages = Object.values(
    import.meta.glob('../assets/couples/bride/*.{jpg,jpeg,png,webp}', {
      eager: true,
    })
  ).map((module) => module.default)
  
  const groomImages = Object.values(
    import.meta.glob('../assets/couples/groom/*.{jpg,jpeg,png,webp}', {
      eager: true,
    })
  ).map((module) => module.default)

  const galleryModules = import.meta.glob(
    '../assets/gallery/*.{png,jpg,jpeg,webp}',
    {
      eager: true
    }
  )
  
  const defaultGalleryImages =
    Object.values(galleryModules).map(
      (module) => module.default
    )
  
  export default defaultGalleryImages
  
  export const randomBrideImage =
    brideImages[Math.floor(Math.random() * brideImages.length)]
  
  export const randomGroomImage =
    groomImages[Math.floor(Math.random() * groomImages.length)]
