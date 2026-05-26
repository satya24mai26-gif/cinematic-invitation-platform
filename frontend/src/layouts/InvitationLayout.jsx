function InvitationLayout() {

    const { slug } =
    useParams()
  
    const { setData } =
    useInvitation()
  
    useEffect(() => {
  
      async function loadInvitation() {
  
        const invitation =
          await getInvitation(slug)
  
        setData(invitation)
  
      }
  
      loadInvitation()
  
    }, [slug])
  
    return <Outlet />
  
  }