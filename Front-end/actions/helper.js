
export const getAuthHeaders = () => ({
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`,
  });
