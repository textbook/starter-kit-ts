import { get } from "./api";

export const getMessage = async (): Promise<string> => {
	const response = await get<{ message: string }>("/");
	return response.data.message;
};
