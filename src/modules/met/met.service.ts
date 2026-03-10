const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

// Types

export type TMetObject = {
  objectID: number;
  isHighlight: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  additionalImages: string[];
  department: string;
  objectName: string;
  title: string;
  culture: string;
  period: string;
  artistDisplayName: string;
  artistDisplayBio: string;
  artistNationality: string;
  objectDate: string;
  objectBeginDate: number;
  objectEndDate: number;
  medium: string;
  dimensions: string;
  creditLine: string;
  geographyType: string;
  city: string;
  country: string;
  classification: string;
  objectURL: string;
  isPublicDomain: boolean;
};

export type TMetSearchResult = {
  total: number;
  objectIDs: number[] | null;
};

export type TMetDepartment = {
  departmentId: number;
  displayName: string;
};

// Service

export class MetService {
  static async search(query: string) {
    const res = await fetch(
      `${BASE_URL}/objects?q=${encodeURIComponent(query)}`
    );
    return res.json() as Promise<TMetSearchResult>;
  }

  static async getObject(objectID: number) {
    const res = await fetch(`${BASE_URL}/objects/${objectID}`);
    return res.json() as Promise<TMetObject>;
  }

  static async getDepartments() {
    const res = await fetch(`${BASE_URL}/departments`);
    const data = await res.json();
    return data.departments as TMetDepartment[];
  }
}
