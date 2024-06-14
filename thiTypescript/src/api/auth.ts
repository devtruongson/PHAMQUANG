import { instants } from ".";
import { signinForm, signupForm } from "./models";

export const signupData = (data: signupForm) => {
  const uri = "/signup";
  return instants.post(uri, data);
};

export const signin = (data: signinForm) => {
  const uri = "/signin";
  return instants.post(uri, data);
};

export const getAllUser = () => {
  const uri = "/get-allUser";
  return instants.get(uri);
};
export const removelUser = (id: string) => {
  const uri = "/remove-user/" + id;
  return instants.get(uri);
};
export const saveNoteByUser = (id: string, data: any) => {
  const uri = "/saveNoteByUser/" + id;
  return instants.post(uri, data);
};

export const getIdUser = (id: string) => {
  const uri = "/get-idUser/" + id;
  return instants.get(uri);
};
