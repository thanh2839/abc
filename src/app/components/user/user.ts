
export interface inforUser {
    username: string;
    password: string;
    fullname: string;
    email: string;
    avatar: string;
}

export interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    width?: string;
    height?: string;
    type?: "text" | "textarea" | "password" | "email";
}

// get USER INFOR
export const getUserInfo = async (token: string): Promise<inforUser> => {
    const response = await fetch("/api/user/info", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user info.");
    }

    return await response.json();
};

// Delete User infor
export const deleteUserAccount = async () => {
    const response = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete account.");
    }

    return await response.json();
};


export const uploadImageToGoogleDrive = async (file: File, accessToken: string) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=media", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to upload image.");
    }

    return await response.json();
};