const API_URL = "http://localhost:8080/api";
const LOCAL_STORAGE_KEY = 'IK_';
export const ENV = {
  IK : {
    LOCAL_STORAGE : {
      KEY : LOCAL_STORAGE_KEY,
      AUTH_USER : `${LOCAL_STORAGE_KEY}AUTH_USER`,
    }
  },
  SERVER_URLS: {
    API : {
      LOGIN : `${API_URL}/login_check`,
      REGISTER : `${API_URL}/register`,
      BASE : API_URL,
      POSTS : `${API_URL}/posts`,
      USERS : `${API_URL}/users`,
      COMMENTS : `${API_URL}/comments`,
      CHAT_MESSAGE : `${API_URL}/user_chat_message`,
      CHAT : `${API_URL}/user_chats`,
    }
  }
}
