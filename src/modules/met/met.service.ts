const BASE_URL = "https://met-interview-api.vercel.app/api/v1";

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
  private static async handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  static async search(query: string) {
    const res = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`,
    );
    return this.handleResponse<TMetSearchResult>(res);
  }

  static async getObject(objectID: number) {
    const res = await fetch(`${BASE_URL}/objects/${objectID}`);
    return this.handleResponse<TMetObject>(res);
  }

  // static async getDepartments() {
  //   const res = await fetch(`${BASE_URL}/departments`);
  //   const data = await this.handleResponse<{ departments: TMetDepartment[] }>(res);
  //   return data.departments;
  // }
}
