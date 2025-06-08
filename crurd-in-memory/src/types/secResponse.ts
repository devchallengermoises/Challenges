import { Company } from "./company";

export type SECResponse = {
    fields: Company;
    data: Array<[number, string, string, string]>;
}
