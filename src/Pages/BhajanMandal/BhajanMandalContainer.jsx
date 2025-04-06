import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchBhajanDetails } from "./BhajanService";
import Breadcrumb from "../../Component/Breadcrumb";
import ProductImageSlider from "../PoojaBooking/ProductImageSlider";
import TranscationSecurity from "../../Component/TranscationSecurity";
import StringToHTML from "../../Component/StringtoHtml";
import CustomerReview from "../../Component/Data/CustomerReview";
import RelatedMandali from "./RelatedMandli";
import { getUserByEmail } from '../PoojaBooking/getUserByEmail.js';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import {
  Calendar,
  ChevronRight,
  Clock,
  Heart,
  Home,
  Info,
  Lock,
  MapPin,
  Star,
  Truck,
} from "lucide-react";

const BhajanMandalContainer = () => {
  const { slug_url } = useParams(); 
  const navigate = useNavigate();
  const [bhajan, setBhajan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [pujaDate, setPujaDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const ApiUrl = "http://localhost:3000/api";
  const tokken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
  const currencySymbol = "₹";
  const imgUrl = 'http://localhost:3000';

  useEffect(() => {
    const getBhajanDetails = async () => {
      try {
        const response = await fetchBhajanDetails(slug_url);
        setBhajan(response?.data || null);
      } catch (err) {
        setError("Failed to fetch bhajan details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug_url) {
      getBhajanDetails();
    }
  }, [slug_url]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await getUserByEmail();

      if (data) {
        setUserData(data);
      } else {
        setUserData(null);
        setError(error || "No user data found.");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    const startHour = 4;
    const endHour = 22;
    for (let hour = startHour; hour <= endHour; hour++) {
      const ampm = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      const time = `${formattedHour}:00 ${ampm}`;
      times.push(time);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      user_id: formData.get('user_id'),
      username: formData.get('username'),
      userphone: formData.get('userphone'),
      productType: formData.get('productType'),
      product_id: formData.get('product_id'),
      product_name: formData.get('product_name'),
      product_amount: bhajan?.bhajan_price,
      product_image: bhajan?.bhajan_image,
      quantity: formData.get('quantity'),
      pooja_date: formData.get('booking_date'),
      pooja_time: formData.get('booking_time'),
    };

    try {
      const response = await axios.post(`${ApiUrl}/cart/addCart`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokken,
        },
      });

      if (response.status === 200) {
        toast.success("Item added to cart!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => setTimeout(() => navigate("/cart"), 100),
        });
      } else {
        toast.error("Failed to add item to cart.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add item to cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <ToastContainer />
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="flex items-center text-gray-500 hover:text-gray-700">
          <Home className="h-4 w-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link href="/puja" className="text-gray-500 hover:text-gray-700">
          Puja
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{bhajan.bhajan_name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              {/* <ProductImageSlider slider={bhajan?.bhajan_image} /> */}
              <img
              src={imgUrl + '' + bhajan.bhajan_image}
              alt={bhajan.bhajan_image}
              fill
              className="w-full object-cover"
            />
            </div>
            </div>

        <div>
          {/* Right Side - Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{bhajan?.bhajan_name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(bhajan?.rating || 4)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">({bhajan?.rating || 4.9})</span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">{bhajan?.reviews || 123} Reviews</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold">{currencySymbol}{bhajan?.bhajan_price}</span>
              <span className="bg-green-700 px-3 py-1 text-base font-semibold text-white">Save $30</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Experience: {bhajan?.exp_year} years</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Status: Available</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="puja-date" className="font-medium mb-2 block">
                    Bhajan Date:
                  </label>
                  <div className="relative">
                    <input
                      id="puja-date"
                      type="date"
                      name="booking_date"
                      min={today}
                      value={pujaDate}
                      onChange={(e) => setPujaDate(e.target.value)}
                      className="pl-10 w-full p-2 border rounded"
                      required
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="preferred-time" className="font-medium mb-2 block">
                    Preferred Time:
                  </label>
                  <div className="relative">
                    <select
                      id="preferred-time"
                      name="booking_time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="pl-10 w-full p-2 border rounded"
                      required
                    >
                      <option value="">--Choose Time--</option>
                      {timeOptions.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                    <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {userData && (
                <>
                  <input type="hidden" name="user_id" value={userData._id} />
                  <input type="hidden" name="username" value={userData.username} />
                  <input type="hidden" name="userphone" value={userData.mobile} />
                  <input type="hidden" name="useremail" value={userData.email} />
                </>
              )}
              <input type="hidden" name="productType" value="Bhajan Mandali" />
              <input type="hidden" name="product_name" value={bhajan?.bhajan_name} />
              <input type="hidden" name="quantity" value="1" />
              <input type="hidden" name="product_id" value={bhajan?._id} />

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                >
                  Add to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                >
                  Book Now
                </button>
              </div>
            </form>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm font-medium mb-4">Get it in 7 days</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Store Pickup:</p>
                  <p className="text-sm text-gray-600">Order now for pickup on Wed, Jul 7 at Noida Store.</p>
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    Discover all pickup locations
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Shipping & Delivery:</p>
                  <p className="text-sm text-gray-600">Available to your area from</p>
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    Enter your location
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <Info className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Easy Return:</p>
                  <p className="text-sm text-gray-600">Return this item until Jul 22.</p>
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    Learn more about Return Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-sm text-gray-600 mb-6">
            <img src="/image/trust-symbols_a.webp" className="img-fluid w-fullmax-w-full h-auto" alt="transcation" />
          </div>
          </div>
        </div>
        </div>
        {/* Product Overview */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Product Overview</h2>
          <div className="border rounded-lg divide-y">
          <details className="px-4">
            <summary className="py-4 font-medium cursor-pointer">Puja & Description</summary>
            <div className="pb-4 text-gray-700">
                <div className="prose max-w-none"/>
                    <StringToHTML htmlString={bhajan?.long_discription} />
                </div>
          </details>
          
        </div>
        </div>
        

        {/* Related Mandali */}
        <div className="mt-12">
          <RelatedMandali category={bhajan?.bhajan_category} current={bhajan?._id} />
        </div>
    </>
  );
};

export default BhajanMandalContainer;