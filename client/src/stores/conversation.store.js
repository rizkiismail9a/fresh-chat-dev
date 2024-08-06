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
    page: 1,
    setPage: (num) => set({ page: num }),
    userScroll: false,
    setUserScroll: (isScroll) => set({ userScroll: isScroll }),
    showScrollArrow: false,
    setShowScrollArrow: (isShown) => set({ showScrollArrow: isShown }),
  };
});

export default useConversationStore;
