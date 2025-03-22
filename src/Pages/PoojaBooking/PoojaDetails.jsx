import PujaDetailContent from "./PoojaDetailContent";
import { useParams } from "react-router-dom";

// PujaDetailPage component (default export)
export default function PoojaDetails({ params }) {
  const { id } = useParams(); // Extracting id from URL params

  return (
    <div className="container mx-auto px-4 py-6">
      <PujaDetailContent id={id} />
    </div>
  )
}