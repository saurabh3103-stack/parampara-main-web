import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { fetchPujaDetails } from './PoojaService';
import PoojaSamagri from "./poojaSamagri";
import RelatedPooja from "./RelatedPooja";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserByEmail } from './getUserByEmail.js';

export default function PujaDetailContent({ id }) {
  const navigate = useNavigate();
  const [pujaDetails, setPujaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("with-samagri");
  const [pujaDate, setPujaDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [productAmount, setProductAmount] = useState(0);
  const [samagriStatus, setSamagriStatus] = useState(1);
  const imgUrl = "http://34.131.41.101:3000";
  const [userData, setUserData] = useState(null);
  const ApiUrl = "http://34.131.41.101:3000/api"; // Replace with your actual API URL
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'; // Replace with your actual auth token

  useEffect(() => {
    async function loadPujaDetails() {
      try {
        setLoading(true);
        const data = await fetchPujaDetails(id);
        setPujaDetails(data.data);
        setProductAmount(data.data.price_withSamagri);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load puja details");
      } finally {
        setLoading(false);
      }
    }
    loadPujaDetails();
  }, [id]);
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

  const handleSamagriChange = (e) => {
    const value = e.target.value;
    setSelectedPackage(value);
    if (value === "with-samagri") {
      setProductAmount(pujaDetails.price_withSamagri);
      setSamagriStatus(1);
    } else {
      setProductAmount(pujaDetails.price_withoutSamagri);
      setSamagriStatus(0);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!pujaDate || !preferredTime) {
      toast.error("Please select required fields: Puja date and preferred time.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const formData = {
      user_id: userData?._id || "default_user_id", // Provide a default if userData is null
      username: userData?.username || "default_username",
      userphone: userData?.mobile || "0000000000",
      productType: "Pooja",
      product_id: pujaDetails._id,
      product_name: pujaDetails.pooja_name,
      product_amount: productAmount,
      isSamagri: samagriStatus,
      quantity: 1,
      pooja_date: pujaDate,
      pooja_time: preferredTime,
    };

    try {
      const response = await axios.post(`${ApiUrl}/cart/addCart`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
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
        toast.error(response.data.message || "Failed to add item to cart.", {
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
      toast.error(error.response?.data?.message || "An error occurred while adding to cart.", {
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

  const handleAddToCart = () => {
    if (!pujaDate || !preferredTime) {
      toast.error("Please select required fields: Puja date and preferred time.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    toast.success(`${pujaDetails?.pooja_name} has been added to your cart.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => setTimeout(() => navigate("/cart"), 100),
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!pujaDetails) return <div>No puja details found</div>;

  return (
    <>
      <ToastContainer />

      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700">
          <Home className="h-4 w-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link to="/puja" className="text-gray-500 hover:text-gray-700">
          Puja
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-900 font-medium">{pujaDetails.pooja_name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="relative aspect-square">
            <img
              src={`${imgUrl}${pujaDetails.pooja_image}`}
              alt={pujaDetails.pooja_name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{pujaDetails.pooja_name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(pujaDetails.rating || 4)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted stroke-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">({pujaDetails.rating || 4.9})</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-600">{pujaDetails.reviews || 123} Reviews</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold">₹{pujaDetails.price_withoutSamagri?.toLocaleString() || '0'}</span> -
            <span className="text-2xl font-bold">₹{pujaDetails.price_withSamagri?.toLocaleString() || '0'}</span>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">{pujaDetails.short_discription}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Status: Available</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {pujaDetails.pooja_Samegristatus === "1" && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Choose Package:</h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="with-samagri"
                        name="package"
                        value="with-samagri"
                        checked={selectedPackage === "with-samagri"}
                        onChange={handleSamagriChange}
                        className="form-radio h-4 w-4 text-blue-600"
                        required
                      />
                      <label htmlFor="with-samagri" className="font-medium">
                        With Samagri
                      </label>
                    </div>
                    <span className="font-semibold">₹{pujaDetails.price_withSamagri?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="without-samagri"
                        name="package"
                        value="without-samagri"
                        checked={selectedPackage === "without-samagri"}
                        onChange={handleSamagriChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="without-samagri" className="font-medium">
                        Without Samagri
                      </label>
                    </div>
                    <span className="font-semibold">₹{pujaDetails.price_withoutSamagri?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="puja-date" className="font-medium mb-2 block">
                  Puja Date:
                </label>
                <div className="relative">
                  <input
                    id="puja-date"
                    type="date"
                    name="pooja_date"
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
                    name="pooja_time"
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
                  <Link to="#" className="text-sm text-blue-600 hover:underline">
                    Discover all pickup locations
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Shipping & Delivery:</p>
                  <p className="text-sm text-gray-600">Available to your area from</p>
                  <Link to="#" className="text-sm text-blue-600 hover:underline">
                    Enter your location
                  </Link>
                </div>
              </div>

              <div className="flex items-start">
                <Info className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Easy Return:</p>
                  <p className="text-sm text-gray-600">Return this item until Jul 22.</p>
                  <Link to="#" className="text-sm text-blue-600 hover:underline">
                    Learn more about Return Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-sm text-gray-600 mb-6">
            <img src="/image/trust-symbols_a.webp" className="img-fluid w-fullmax-w-full h-auto" alt="transaction" />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Product Overview</h2>
        <div className="border rounded-lg divide-y">
          <details className="px-4">
            <summary className="py-4 font-medium cursor-pointer">Puja & Description</summary>
            <div className="pb-4 text-gray-700">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pujaDetails.long_description
                }}
              />
            </div>
          </details>
          {pujaDetails.pooja_Samegristatus === "1" && (
            <details className="px-4">
              <summary className="py-4 font-medium cursor-pointer">Puja Samagri</summary>
              <div className="pb-4 text-gray-700">
                <p className="mb-2">The Puja Samagri (materials) includes:</p>
                <PoojaSamagri poojaId={pujaDetails._id} />
                <p className="mt-4 text-sm italic">
                  Note: If you select "Without Samagri" option, you will need to arrange these items yourself.
                </p>
              </div>
            </details>
          )}
        </div>
      </div>

      <div className="mt-12">
        <RelatedPooja currentPujaId={pujaDetails._id} />
      </div>
    </>
  );
}