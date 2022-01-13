import { AnnotationDTO } from "../annotationsSchema";

export default interface UserDTO {
    email: string;
    name: string;
    password: string;
    annotations: AnnotationDTO[];
}