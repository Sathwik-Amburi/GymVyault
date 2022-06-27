import axios from "axios";
import { UserProfileDetails } from "../models/allModels";

export default class ApiCalls {
  public static registerUser = async (
    firstName: any,
    lastName: any,
    phoneNumber: any,
    email: any,
    password: any
  ) => {
    return await axios.post("/authentication/signup", {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
  };

  public static getAllGyms = async () => {
    return await axios.get("/gyms/get-all-gyms", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getGymsByPriceRange = async (priceRange: number[]) => {
    return await axios.post(
      "/gyms/filter/price-range",
      { priceRange },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  public static getResults = async (
    type: string,
    name: string,
    city: string
  ) => {
    return await axios.get(`/${type}/search?name=${name}&city=${city}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getGym = async (id: string) => {
    return await axios.get(`/gyms/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getAllCourses = async () => {
    return await axios.get("/gyms/get-all-courses", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getAllGymsByCityOrName = async (
    city: string,
    name: string | null
  ) => {
    return await axios.get(`/gyms/filter?city=${city}&name=${name}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getAllCoursesByCityOrName = async (
    city: string,
    name: string | null
  ) => {
    return await axios.get(`/courses/filter?city=${city}&name=${name}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getCourse = async (id: string) => {
    return await axios.get(`/courses/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static getSubscriptionsByGymId = async (gymId: string) => {
    return await axios.get(`/gyms/subscriptions/get-subscriptions/${gymId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  public static userLogin = async (email: string, password: string) => {
    return await axios.post("/authentication/login", {
      email,
      password,
    });
  };

  public static getUserProfile = async (token: string | null) => {
    return await axios.get<UserProfileDetails>("/user/profile", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": (token ??= ""),
      },
    });
  };
}
