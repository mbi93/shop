import ContentLoader from "react-content-loader";

const PerProductSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={"710"}
      height={"335"}
      viewBox="0 0 710 335"
      backgroundColor="#999"
      foregroundColor="#ccc"
    >
      <rect x="0" y="0" rx="15" ry="15" width="38" height="38" />
      <rect x="79" y="4" rx="2" ry="2" width="249" height="34" />
      <rect x="564" y="0" rx="22" ry="22" width="143" height="43" />
      <rect x="0" y="75" rx="18" ry="18" width="323" height="248" />
      <rect x="372" y="79" rx="2" ry="2" width="197" height="17" />
      <rect x="372" y="132" rx="2" ry="2" width="197" height="17" />
      <rect x="372" y="181" rx="2" ry="2" width="197" height="50" />
    </ContentLoader>
  );
};

export default PerProductSkeleton;
