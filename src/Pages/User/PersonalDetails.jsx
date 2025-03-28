import { Link } from "react-router-dom"
import { User, Calendar, Phone, Mail, Users, CreditCard, MapPin, Flag, Edit } from "lucide-react"
import { Diya } from "./DevotionalIcons"

const PersonalDetails = ({ userData }) => {
  const personalInfo = [
    { label: "Full Name", value: userData.username, icon: <User className="h-4 w-4 text-orange-500" /> },
    { label: "Date of Birth", value: userData.dob, icon: <Calendar className="h-4 w-4 text-orange-500" /> },
    { label: "Phone", value: userData.mobile, icon: <Phone className="h-4 w-4 text-orange-500" /> },
    { label: "Alternate Phone", value: userData.alternate_no, icon: <Phone className="h-4 w-4 text-orange-500" /> },
    { label: "Email address", value: userData.email, icon: <Mail className="h-4 w-4 text-orange-500" /> },
    { label: "Gender", value: userData.gender, icon: <Users className="h-4 w-4 text-orange-500" /> },
    { label: "Aadhar Number", value: userData.aadhar_no, icon: <CreditCard className="h-4 w-4 text-orange-500" /> },
    { label: "Address", value: userData.address, icon: <MapPin className="h-4 w-4 text-orange-500" /> },
    { label: "City", value: userData.city, icon: <MapPin className="h-4 w-4 text-orange-500" /> },
    { label: "State", value: userData.state, icon: <MapPin className="h-4 w-4 text-orange-500" /> },
    { label: "Postal Code", value: userData.pincode, icon: <MapPin className="h-4 w-4 text-orange-500" /> },
    { label: "Country", value: userData.country, icon: <Flag className="h-4 w-4 text-orange-500" /> },
  ]

  return (
    <div className="rounded-xl border border-orange-200 bg-white shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-orange-100">
        <div className="flex items-center gap-2">
          <Diya className="h-5 w-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-orange-800">Personal Details</h2>
        </div>
        <Link
          to="/user/profile"
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors"
        >
          <Edit className="h-4 w-4" />
          <span>Edit Profile</span>
        </Link>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {personalInfo.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="w-8 mt-0.5">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-800">{item.value || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails

