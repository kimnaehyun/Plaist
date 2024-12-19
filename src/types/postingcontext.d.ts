type InputTagsContext = {
  courseTitle?: string;
  courseDescription?: string;
  locationObjs?: {
    locationName: string;
    locationAddress: string;
    locationCategory: string;
    locationPhoneNum: string;
    location_id: string;
    like: number;
  }[];
  estimatedTime?: number;
  estimatedCost?: number;
  withWhom: string[];
  style: string[];
  image?: File | undefined;
  channelIdList?: string[];
};

type InputCourseDetailsContext = {
  courseTitle?: string;
  courseDescription?: string;
  locationObjs?: {
    locationName: string;
    locationAddress: string;
    locationCategory: string;
    locationPhoneNum: string;
    location_id: string;
    like: number;
  }[];
  estimatedTime?: number;
  estimatedCost?: number;
  withWhom: string[];
  style: string[];
  image?: File | undefined;
  channelIdList?: string[];
};

type InputLocationContext = {
  courseTitle?: string;
  courseDescription?: string;
  locationObjs: {
    locationName: string;
    locationAddress: string;
    locationCategory: string;
    locationPhoneNum: string;
    location_id: string;
    like: number;
  }[];
  estimatedTime: number;
  estimatedCost: number;
  withWhom: string[];
  style: string[];
  image?: File | undefined;
  channelIdList?: string[];
};

type InputExplainationContext = {
  courseTitle?: string;
  courseDescription?: string;
  locationObjs: {
    locationName: string;
    locationAddress: string;
    locationCategory: string;
    locationPhoneNum: string;
    location_id: string;
    like: number;
  }[];
  estimatedTime: number;
  estimatedCost: number;
  withWhom: string[];
  style: string[];
  image?: File | undefined;
  courseImage?: string;
  channelIdList: string[];
};

type PostResultContext = {
  courseTitle: string;
  courseDescription: string;
  locationObjs: {
    locationName: string;
    locationAddress: string;
    locationCategory: string;
    locationPhoneNum: string;
    location_id: string;
    like: number;
  }[];
  estimatedTime: number;
  estimatedCost: number;
  withWhom: string[];
  style: string[];
  image: File | undefined;
  channelIdList: string[];
};