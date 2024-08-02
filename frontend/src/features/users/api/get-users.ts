import axios from "axios";
import { User } from "../../../types/api.ts";
interface UserApiResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

const getUsers = async (page: number, results: number): Promise<User[]> => {
  try {
    const response = await axios.get<UserApiResponse>(
      `https://randomuser.me/api/?page=${page}&results=${results}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default getUsers;
