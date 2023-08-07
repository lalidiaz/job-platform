export interface IObjectKeys {
  [key: string]: string | string[] | boolean | undefined | number | Date;
}

export interface IJob extends IObjectKeys {
  _id?: string;
  isLoading?: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions?: string[];
  jobType: string;
  statusOptions?: string[];
  status: string;
  isEditing?: boolean;
  editJobId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMontlhyApplications {
  date: string;
  count: number;
}

export interface IStats {
  pending: number;
  interview: number;
  declined: number;
}
export interface IAllJobs {
  [x: string]: any;
  isLoading: boolean;
  jobs: IJob[];
  totalJobs: number;
  numPages: number;
  page: number;
  stats?: IStats | null;
  monthlyApplications: IMontlhyApplications[];
}

export interface InitialFilters {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
}
