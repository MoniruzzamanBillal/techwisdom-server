export type TerrorSource = {
  path: string | number;
  message: string;
}[];
export type TerrorMessages = {
  path: string | number;
  message: string;
}[];

export type TgenericResponse = {
  errorSources?: TerrorSource;
  statusCode: number;
  message: string;
  errorMessages?: TerrorMessages;
};
