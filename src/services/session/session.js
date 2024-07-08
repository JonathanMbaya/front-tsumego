const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

export const setLoggedUser = (data) => {
   if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data));
   }
};

export const getUser = () => {
   if (typeof sessionStorage !== "undefined") {
      return JSON.parse(sessionStorage.getItem(TOKEN_KEY));
   }
};

export const removeUser = () => {
   if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem(TOKEN_KEY);
   }
};
