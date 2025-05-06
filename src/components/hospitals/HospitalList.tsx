import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchHospitals } from '../../store/slices/hospitalSlice';
import { RootState, AppDispatch } from '../../store';

const HospitalList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { hospitals, loading, error } = useSelector((state: RootState) => state.hospitals);

  useEffect(() => {
    dispatch(fetchHospitals());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Hospitals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <Link
            key={hospital._id}
            to={`/hospital/${hospital._id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48 rounded-t-lg overflow-hidden">
              <img
                src={hospital.image || 'https://via.placeholder.com/400x300'}
                alt={hospital.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-indigo-600">
                {hospital.rating} ★
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{hospital.name}</h2>
              <p className="text-gray-600 mb-2">{hospital.address}</p>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {hospital.phone}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HospitalList; 