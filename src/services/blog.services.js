
import axiosInstance from "../../axios.config";

const blogService = {
  getAllBlogs: async ({ page = 1, authorId, tag }) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      if (authorId) params.append("authorId", authorId);
      if (tag) params.append("tag", tag);

      const response = await axiosInstance.get(`/blog?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  },

  getBlogById: async (id) => {
    try {
      const response = await axiosInstance.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  },

  createBlog: async (blogData,token) => {
    try {
      const response = await axiosInstance.post("/blog/create", blogData,{
       headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  editPost: async (id, updatedData,token) => {
    try {
      const response = await axiosInstance.put(`/blog/${id}`, updatedData,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
      return response.data;
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  },

  deletePost: async (id) => {
    try {
      const response = await axiosInstance.delete(`/blog/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  },

  search: async (query, authorId) => {
  try {
    const params = new URLSearchParams();
    if (query) params.set("s", query);
    if (authorId) params.set("authorId", authorId);

    const response = await axiosInstance.get(`/blog/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error searching blog:", error);
  }
}
};

export default blogService;
