import ApiRoutes from "@/app/services/Api";

export interface SocialIconProps {
    src: string;
    alt: string;
  }
  
  export interface InputFieldProps {
    icon: string;
    placeholder: string;
    type?: string;
    rightIcon?: string;
  }

  export interface Tag {
    id: number;
    name: string;
  }

  export const fetchTag = async(): Promise<Tag[]> => {
    const response = await fetch (ApiRoutes.Tag_getAll, {
      method: "POST",
    });
  
    if(!response.ok){
      throw new Error ("Fail to fetch Tags");
    }
    // console.log(response);
    return response.json();
  }