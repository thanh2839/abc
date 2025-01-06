// RegisterForm.tsx
'use client'
import { useState, useEffect } from 'react';
import * as React from "react"
import { format, addMonths, subMonths } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchTag, Tag } from './types';
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'



interface RegisterFormProps {
  onSubmit: (username: String, password: String, fullname: String, email: String, gender: string, date: Date | undefined, memberTag: number[]) => void;
  passwordError: string;
  onSwitchToLogin: () => void;
  setPasswordError: (error: string) => void;
  // setPasswordError2: (error: string) => void;
}

const RegisterForm = ({ onSubmit, passwordError, setPasswordError, onSwitchToLogin }: RegisterFormProps) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [Error, setError] = useState('');

  const [gender, setGender] = useState('');
  const [date, setDate] = React.useState<Date>()
  const [month, setMonth] = React.useState(new Date())
  const [isYearSelectOpen, setIsYearSelectOpen] = React.useState(false)

  const [memberTag, setMemberTag] = useState<number[]>([]);

  const [tag, setTag] = useState<Tag[]>([]);

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 80 + i)

  const handleYearSelect = (year: string) => {
    const newDate = new Date(parseInt(year), month.getMonth(), 1)
    setMonth(newDate)
    setIsYearSelectOpen(false)
  }

  const handleMonthNavigation = (direction: 'prev' | 'next') => {
    setMonth(prevMonth => direction === 'prev' ? subMonths(prevMonth, 1) : addMonths(prevMonth, 1))
  }

  const handleTagToggle = (tagId: number) => {
    setMemberTag(prev => {
      return prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId];
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagData = await fetchTag();
        setTag(tagData.data);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };

    fetchData();
  }, []);


  //Password regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = () => {

    onSubmit(username, password, fullname, email, gender, date, memberTag);

    onSwitchToLogin();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Tên
            </label>
            <input
              type="text"
              id="name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Full Name"
            />
          </div>



          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                const newPassword = e.target.value;
                setPassword(newPassword);
              }}
              onBlur={() => {
                if (passwordRegex.test(password) || password === '') {
                  setPasswordError('');
                } else {
                  setPasswordError(
                    'Password must be at least 8 characters long, include uppercase, lowercase, and a number.'
                  );
                }
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Password"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => {
                if (confirmPassword === password || confirmPassword === '') {
                  setError('');
                } else {
                  setError('Passwords do not match!');
                }
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Confirm Password"
            />
            {Error && <p className="text-red-500 text-sm mt-1">{Error}</p>}
          </div>
        </div>

        {/* Right Column */}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Email Address"
            />
          </div>


          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Giới tính
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
              Ngày sinh
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dob"
                  variant={"outline"}
                  className={cn(
                    "w-full px-4 py-2 h-auto border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 font-normal justify-start",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>chọn ngày sinh</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4 bg-white rounded-lg shadow-lg" style={{ width: '255px', height: '350px' }}>
                  <div className="flex justify-between items-center mb-4">
                    {isYearSelectOpen ? (
                      <Select onValueChange={handleYearSelect} value={month.getFullYear().toString()}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder={month.getFullYear().toString()} />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y) => (
                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={() => setIsYearSelectOpen(true)}
                        className="text-lg font-semibold px-2 h-9"
                      >
                        {format(month, "yyyy")}
                      </Button>
                    )}
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMonthNavigation('prev')}
                        className="h-9 w-9"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setIsYearSelectOpen(false)}
                        className="text-sm font-medium px-2 h-9"
                      >
                        {format(month, "MMMM")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMonthNavigation('next')}
                        className="h-9 w-9"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    month={month}
                    onMonthChange={setMonth}
                    showOutsideDays
                    weekStartsOn={1}
                    className="border-none"
                    classNames={{
                      months: "flex flex-col space-y-4",
                      month: "space-y-4 w-full",
                      caption: "hidden",
                      caption_label: "hidden",
                      nav: "hidden",
                      nav_button: "hidden",
                      nav_button_previous: "hidden",
                      nav_button_next: "hidden",
                      table: "w-full h-[240px] border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: cn(
                        "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                        "[&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md"
                      ),
                      day: cn(
                        Button,
                        "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      ),
                      day_range_end: "day-range-end",
                      day_selected: "bg-red-500 text-white hover:bg-red-600 hover:text-white focus:bg-red-500 focus:text-white",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-30",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block mb-2">Nhãn Sản Phẩm</label>
            <Select
              onValueChange={(value) => {
                handleTagToggle(Number(value));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn nhãn sản phẩm" />
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
        </div>
      </div>

      {/* Submit Button - Full Width Below Both Columns */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
        Đăng ký
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
