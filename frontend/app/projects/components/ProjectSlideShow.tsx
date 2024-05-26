import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { ProjectSlideShowItem } from "./ProjectSlideShowItem";
import { GetProjectQuery } from "../../../gql/graphql";
import { useEffect } from "react";
import { MdSlideshow } from "react-icons/md";
import { PROJECT_MESSAGE } from "../../../common/message/Project.message";

type Props = {
  project: GetProjectQuery["project"];
};

export function ProjectSlideShow({ project }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    const elem = window.document.documentElement;
    if (isOpen) {
      elem.requestFullscreen();
      return;
    }
    if (window.document.fullscreenElement) {
      window.document.exitFullscreen();
    }
    window.document.addEventListener("fullscreenchange", () => {
      if (window.document.fullscreenElement) {
        return;
      }
      onClose();
    });
  }, [isOpen, onClose]);

  return (
    <>
      <Button onPress={onOpen} size="sm">
        <MdSlideshow />
        {PROJECT_MESSAGE.project.show}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className="w-[90vw] h-[90vh] max-w-[90vw] max-h-[90vh] p-4"
        backdrop="blur"
      >
        <ModalContent>
          <ProjectSlideShowItem project={project} />
        </ModalContent>
      </Modal>
    </>
  );
}
