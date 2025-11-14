import ContentLoader from "react-content-loader"

const ProductsSkeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox="0 0 528 250"
    backgroundColor="#999"
    foregroundColor="#ccc"
  >
    <rect x="0" y="0" rx="18" ry="18" width="528" height="165" /> 
    <rect x="14" y="191" rx="2" ry="2" width="125" height="16" /> 
    <rect x="14" y="217" rx="2" ry="2" width="220" height="14" />    
  </ContentLoader>
  )
}

export default ProductsSkeleton