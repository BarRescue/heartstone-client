import { environment } from './environment';

export const endpoints = {
  login : environment.api_endpoint + "auth/login",
  register : environment.api_endpoint + "auth/register"
}
