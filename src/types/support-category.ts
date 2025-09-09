export interface SupportCategory {
  id: number;
  name: string;
  description: string;
  applicationId: number;
}

export interface SupportCategoryHierarchy extends SupportCategory {
  subCategories: SupportCategoryHierarchy[];
  questions: SupportQuestion[];
}

export interface SupportQuestion {
  title: string;
  answer: string;
}
