'use client'
import * as React from "react";
import { ProfileForm } from "./profileForm";
import { ChevronRight, User, MapPin, CreditCard, PackageOpen, XCircle, Heart } from "lucide-react";
import MyOrder from "./myOrder";
import AdminOrderManagement from "./oderAdmin";
import AdminOrderManagementACopy from "./oderAdmin copy";
import AddProductForm from '../add-Product/addProduct';
import GetupdateProduct from '../updateProduct/updateProduct';
// import ManageProfile from "./manageProfile"; // Assuming you have a ManageProfile component
// import AddProduct from "./addProduct"; // Assuming you have an AddProduct component
// import UpdateProduct from "./updateProduct"; // Assuming you have an UpdateProduct component

interface NavigationItem {
  label: string;
  isActive?: boolean;
  opacity?: string;
  icon?: React.ReactNode;
}

interface SidebarSection {
  title: string;
  items: NavigationItem[];
  icon?: React.ReactNode;
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Quản lý tài khoản",
    icon: <User className="w-5 h-5" />,
    items: [
      { label: "Thông tin của tôi", isActive: true, icon: <User className="w-4 h-4" /> },
    ]
  },
  {
    title: "My Orders",
    icon: <PackageOpen className="w-5 h-5" />,
    items: [
      { label: "Đơn hàng của tôi", opacity: "50", icon: <PackageOpen className="w-4 h-4" /> },
      // { label: "My Cancellations", opacity: "50", icon: <XCircle className="w-4 h-4" /> }
    ]
  },
  {
    title: "My WishList",
    icon: <Heart className="w-5 h-5" />,
    items: []
  }
];

// Additional items for admin role
const adminSidebarSections: SidebarSection[] = [
  {
    title: "Quản lý tài khoản",
    icon: <User className="w-5 h-5" />,
    items: [
      { label: "Thông tin của tôi", icon: <User className="w-4 h-4" /> },
      // { label: "Manage Profile", icon: <User className="w-4 h-4" /> },
      { label: "Quản lý", icon: <User className="w-4 h-4" /> },
      { label: "Thêm sản phẩm", icon: <PackageOpen className="w-4 h-4" /> },
      { label: "Sửa sản phẩm", icon: <PackageOpen className="w-4 h-4" /> },
    ]
  },
  {
    title: "Đơn hàng",
    icon: <PackageOpen className="w-5 h-5" />,
    items: [
      { label: "Quản lý đơn hàng", icon: <PackageOpen className="w-4 h-4" /> },
      { label: "Order Returns", icon: <PackageOpen className="w-4 h-4" /> }
    ]
  }
];

export function ProfileLayout() {
  const role = sessionStorage.getItem('role');
  console.log(role);
  const [activePage, setActivePage] = React.useState<string>("profile"); // State to track the active page

  // Function to handle the navigation of the sidebar
  const handleNavigation = (page: string) => {
    setActivePage(page); // Update the active page when a link is clicked
  };

  const sections = role === 'ADMIN' ? adminSidebarSections : sidebarSections;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-sm">
        <nav className="flex flex-wrap justify-between items-center max-w-7xl mx-auto px-4 py-4" role="navigation" aria-label="User navigation">
          <div className="flex items-center space-x-2 text-sm text-gray-600"></div>
          <div className="text-sm"></div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8 max-md:flex-col">
          <aside className="w-64 flex-shrink-0 max-md:w-full" role="complementary">
            <nav className="bg-white rounded-lg shadow-sm p-6" aria-label="Account navigation">
              {sections.map((section, index) => (
                <div key={index} className={`${index > 0 ? 'mt-8' : ''}`}>
                  <div className="flex items-center space-x-2 text-gray-900">
                    {section.icon}
                    <h2 className="font-medium">{section.title}</h2>
                  </div>
                  {section.items.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href="#"
                          onClick={() => handleNavigation(item.label)} // Set the active page on click
                          className={`flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors
                            ${activePage === item.label // Highlight the active item
                              ? 'text-red-600 bg-red-50 hover:bg-red-100'
                              : `text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${item.opacity ? `opacity-${item.opacity}` : ''}`
                            }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Conditionally render different components based on the active page */}
              {activePage === "My Profile" && <ProfileForm />}
              {/* {activePage === "Manage Profile" && <ManageProfile />} */}
              {/* {activePage === "Employees" && <ManageProfile />}  */}
              {activePage === "Thêm sản phẩm" && <AddProductForm />}
              {activePage === "Sửa sản phẩm" && <GetupdateProduct />}
              {activePage === "Quản lý đơn hàng" && <AdminOrderManagement />}
              {activePage === "Order Returns" && <AdminOrderManagementACopy />}
              {activePage === "My Returns" && <MyOrder />}
              {activePage === "My Cancellations" && <AdminOrderManagementACopy />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileLayout;
