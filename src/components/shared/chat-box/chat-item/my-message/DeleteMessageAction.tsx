"use client";

import CotopiaPrompt from "@/components/shared-ui/c-prompt";
import { useChat } from "@/hooks/chat/use-chat";
import useLoading from "@/hooks/use-loading";
import { removeMessageAction } from "@/store/redux/slices/room-slice";
import { useAppDispatch } from "@/store/redux/store";

import { ChatItemType } from "@/types/chat";
import { useCallback } from "react";
import { toast } from "sonner";

interface Props {
  message: ChatItemType;
  onClose: () => void;
}

const DeleteMessageAction = ({ message, onClose }: Props) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { deleteMessage } = useChat();

  const appDispatch = useAppDispatch();

  const deleteMessageHandler = useCallback(async () => {
    try {
      startLoading();
      const res = await deleteMessage(message.nonce_id as number);
      appDispatch(removeMessageAction({ message: res }));
      toast.success("Your message has been deleted successfully");
      stopLoading();
      onClose();
    } catch (error) {
      stopLoading();
    }
  }, [message, onClose, appDispatch]);

  return (
    <CotopiaPrompt
      open
      title='Delete Message'
      submitText='Delete'
      loading={isLoading}
      description='Do you want to delete this message?'
      onSubmit={deleteMessageHandler}
      onClose={onClose}
      isPortal={false}
    />
  );
};

export default DeleteMessageAction;
