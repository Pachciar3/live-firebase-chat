const registerItem = (key) => {
  return {
    get: () => localStorage.getItem(key),
    remove: () => localStorage.removeItem(key),
    set: value => localStorage.setItem(key, value)
  }
}

export const chatNickname = registerItem("chat_nickname");
export const messageSound = registerItem("chat_sound");