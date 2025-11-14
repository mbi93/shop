import ContentLoader from "react-content-loader"

const UserSkeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={190}
    height={350}
    viewBox="0 0 190 350"
    backgroundColor="#999"
    foregroundColor="#ccc"
  >
    <circle cx="45" cy="45" r="45" /> 
    <rect x="0" y="118" rx="2" ry="2" width="160" height="16" /> 
    <rect x="0" y="142" rx="2" ry="2" width="105" height="11" /> 
    <rect x="0" y="209" rx="2" ry="2" width="100" height="13" /> 
    <rect x="0" y="267" rx="2" ry="2" width="100" height="13" /> 
    <rect x="0" y="323" rx="2" ry="2" width="100" height="13" /> 
   
  </ContentLoader>
  )
}

export default UserSkeleton