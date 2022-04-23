import { Imprimivel } from "../utils/imprimivel.js";
import { comparavel } from "./comparavel.js";

export interface Modelo<T> extends Imprimivel, comparavel<T> {

}