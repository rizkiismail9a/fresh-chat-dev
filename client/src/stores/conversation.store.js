import { create } from "zustand";

/*
 * This is just the alternative of custom hook useage
 * Which mean you can use the custom hook
 */

const useConversationStore = create((set) => {
  return {
    selectedConversation: null,
    setSelectedConversation: (conv) =>
      set(() => ({ selectedConversation: conv })),
    messages: [],
    setMessages: (messages) => set(messages),
  };
});

export default useConversationStore;
