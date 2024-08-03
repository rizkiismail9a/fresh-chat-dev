import { create } from "zustand";

/*
 * This is just the alternative of custom hook useage
 * Which mean you can use the custom hook
 */

const useConversationStore = create((set) => {
  return {
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    loading: false,
    setLoading: (isLoading) => set({ loading: isLoading }),
    showSidebar: true,
    setShowSidebar: (isSideBarShown) => set({ showSidebar: isSideBarShown }),
    conversations: [],
    setConversations: (conv) => set({ conversations: conv }),
  };
});

export default useConversationStore;
