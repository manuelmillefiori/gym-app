import axios from "axios";

const reqUri = import.meta.env.VITE_PATH_REQ;

// Function to fetch the members
export const fetchMembers = async () => {
   const url = reqUri + "/members";

   try {
      // Wait the response
      const response = await axios.get(url);

      // Obtain all the members
      // null or undefined ret an empty array
      return response.data || [];
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to fetch the courses
export const fetchCourses = async () => {
   const url = reqUri + "/courses";

   try {
      // Wait the response
      const response = await axios.get(url);

      // Obtain all the courses
      // null or undefined ret an empty array
      return response.data || [];
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to add a member
export const addMember = async (newMember) => {
   try {
      const url = reqUri + "/members";
      await axios.post(url, newMember);
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to add a course
export const addCourse = async (newCourse) => {
   const url = reqUri + "/courses";
   
   try {
      await axios.post(url, newCourse);
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to fetch data of a single member by his id
export const fetchMember = async (_id) => {
   const url = reqUri + "/members/" + _id;

   try {
      const response = await axios.get(url);
      return response.data;
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to update member data
export const updateMember = async (_id, member) => {
   const url = reqUri + "/members/" + _id + "/edit";
   
   try {
      await axios.put(url, member);
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to fetch data of a single course by his id
export const fetchCourse = async (_id) => {
   const url = reqUri + "/courses/" + _id;

   try {
      const response = await axios.get(url);
      return response.data;
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to update course data
export const updateCourse = async (_id, course) => {
   const url = reqUri + "/courses/" + _id + "/edit";
   
   try {
      await axios.put(url, course);
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to delete a member
export const delMember = async (_id) => {
   const url = reqUri + "/members/" + _id;

   try {
      // Request to delete the member
      await axios.delete(url);
   } catch (error) {
      // Throw the error
      throw error;
   }
};

// Function to delete a course
export const delCourse = async (_id) => {
   const url = reqUri + "/courses/" + _id;

   try {
      // Request to delete the course
      await axios.delete(url);
   } catch (error) {
      // Throw the error
      throw error;
   }
};
