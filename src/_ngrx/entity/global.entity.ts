import { DefaultDataServiceConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetadata: EntityMetadataMap = {
  IK_Post: {},
  IK_PostRequestReponse: {} // needed to handle pagination
}

export const entityConfig = {
  entityMetadata
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://localhost:8000/api/',
  timeout: 3000,
}
