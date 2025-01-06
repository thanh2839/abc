'use client'
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMemberInfor, MemberInfor, UpdateMember, UpdateUser } from './UserInfor';
import { fetchTag, Tag } from '../login/types';
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

const memberTags = [
    { id: 1, label: 'Early Adopter' },
    { id: 2, label: 'Premium Member' },
    { id: 3, label: 'Active Contributor' },
    { id: 4, label: 'Event Participant' }
];

export function ProfileForm() {
    const idUser = sessionStorage.getItem('UserId');
    const accessToken = sessionStorage.getItem('accessToken');


    const [tag, setTag] = useState<Tag[]>([]);
    const [memberTag, setMemberTag] = useState<number[]>([]);


    const [formData, setFormData] = useState<MemberInfor>({
        username: '',
        fullname: '',
        email: '',
        avatar: '',
        gender: '',
        dateOfBirth: '',
        tier: { id: 0, name: '' },
        point: 0,
        bio: '',
        tag: []
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        if (!image) return;

        const imageFormData = new FormData();
        imageFormData.append('file', image);
        imageFormData.append('upload_preset', "shop_Santuary");

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dsymtu3j5/image/upload', {
                method: 'POST',
                body: imageFormData,
            });

            const data = await response.json();
            if (response.ok) {
                setFormData(prev => ({
                    ...prev,
                    avatar: data.secure_url,
                }));
            }
        } catch (err) {
            console.log('Image upload failed:', err);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.getElementById('avatarInput')?.click();
    };

    useEffect(() => {
        if (!idUser || !accessToken) return;

        const fetchMember = async () => {
            try {
                const data = await getMemberInfor(Number(idUser), accessToken);
                setFormData(data);

                setMemberTag(data.tags.map(tag => tag.id));

                const tagData = await fetchTag();
                setTag(tagData.data);
            } catch (e) {
                console.error("Error fetching member data:", e);
            }
        };

        fetchMember();
    }, [idUser, accessToken]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name)
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    // tag
    const handleTagToggle = (tagId: number) => {
        setMemberTag(prev => {
            return prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId];
        });
    };


    //submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!idUser || !accessToken) return;
        try {
            console.log("fullname: ", formData.fullname)

            const updateMemberResponse = await UpdateMember(Number(idUser), accessToken, formData.gender, formData.dateOfBirth, formData.bio, memberTag)
            const updateUserResponse = await UpdateUser(Number(idUser), accessToken, formData.fullname, formData.email, formData.avatar);
            if (!updateMemberResponse.success) {
                throw new Error(updateMemberResponse.message || 'Failed to update member details');
            }

            if (!updateUserResponse.success) {
                throw new Error(updateUserResponse.message || 'Failed to update user details');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Card className="flex-1 ml-5 max-w-4xl">
            <CardHeader>
                <CardTitle className="text-xl font-medium text-red-500">
                    Thay đổi thông tin
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                            <img
                                src={formData.avatar || 'path/to/default-image.jpg'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <Button variant="outline" className="h-10" onClick={handleClick}>
                            Change Photo
                        </Button>
                        <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                className="bg-neutral-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-neutral-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value: string) => setFormData(prev => ({ ...prev, gender: value }))}
                            >
                                <SelectTrigger className="bg-neutral-100">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <div className="relative">
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                                    onChange={handleInputChange}
                                    className="bg-neutral-100"
                                />
                                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleTextareaChange}
                            className="bg-neutral-100 min-h-[100px]"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div>
                        <label className="block mb-2">Tag Member</label>
                        <Select
                            onValueChange={(value) => {
                                handleTagToggle(Number(value));
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn tag Member" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Hiển thị danh sách tag dựa trên từ khóa tìm kiếm */}
                                {tag.map(tag => {
                                    const isSelected = memberTag.includes(tag.id);
                                    return (
                                        <SelectItem
                                            key={tag.id}
                                            value={tag.id.toString()}
                                        >
                                            <div className="flex items-center gap-2">
                                                {tag.name}
                                                {isSelected}
                                            </div>
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>

                        {/* Hiển thị các tags đã chọn */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {memberTag.map(tagId => {
                                const selectedTag = tag.find(t => t.id === tagId);
                                return selectedTag && (
                                    <Badge
                                        key={tagId}
                                        variant="secondary"
                                        className="pl-2 pr-1 py-1 text-sm font-medium"
                                    >
                                        {selectedTag.name}
                                        <button
                                            onClick={() => handleTagToggle(tagId)}
                                            className="ml-1 hover:bg-destructive/10 rounded-full p-1 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button variant="ghost" type="button">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-red-500 hover:bg-red-600">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default ProfileForm;