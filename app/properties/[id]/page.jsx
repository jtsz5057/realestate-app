'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa'
import PropertyDetails from "@/components/PropertyDetails";

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    }

    if (property === null) {
      fetchPropertyData();
    }
   }, [id, property]);

   if (!property && !loading) {
    return (
      <h1 classNameName="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    )
   }

  return (
    <>
      {!loading && property && (
      <>
        <PropertyHeaderImage image={ property.image[0]}/>
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties.html"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="mr-2"/> Back to Properties
            </Link>
          </div>
        </section>
    </>
    )
    }
    </>
  )
}

export default PropertyPage