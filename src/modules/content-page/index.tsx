import { useParams } from "react-router-dom";

import { useStaticContentPublic } from "@/hooks/static-content";

import { StyledReactQuill } from "./styles";

const ContentPage = () => {
  const { slug } = useParams();
  const { data } = useStaticContentPublic(slug);
  const modules = {
    toolbar: false,
  };

  return (
    <>
      <StyledReactQuill value={data?.data.data.content} readOnly={true} modules={modules} />
    </>
  );
};

export default ContentPage;
