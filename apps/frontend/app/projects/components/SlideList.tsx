import { GetProjectQuery } from "../../../gql/graphql";
import SlideListItem from "./SlideListItem";

type Props = {
  slides: GetProjectQuery["project"]["slides"];
  projectId: string;
};

export function SlideList({ slides, projectId }: Props) {
  return (
    <div className="w-full">
      {slides.map((slide, index) => (
        <SlideListItem key={index} slide={slide} projectId={projectId} />
      ))}
    </div>
  );
}
