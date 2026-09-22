import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 120000,
  withCredentials: true,
})

export async function chatWithAgent(message){
  try{
    const response = await api.post("/api/agent/chat",{message});

    return response.data;
  } catch (error) {
    console.error("Error chatting with agent:", error);
    throw error;
  }
}

export async function getAgentHistory(){
  try{
    const response = await api.get("/api/agent/history");

    return response.data;
  }catch (error) {
    console.error("Error fetching agent history:", error);
    throw error;
  }
}