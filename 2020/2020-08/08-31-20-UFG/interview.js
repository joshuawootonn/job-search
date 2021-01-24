


const Component = () => {

  const [api, setApi] = useState(null);

  useEffect(() => {
    axios.get('www.api.com').then((response) => {
      setApi(response.data);
    })
  }, [])


  if(!api){
    return <p>...Loading</p>
  }

  return(
    <p>{api}</p>
  )

}