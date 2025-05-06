const axios = require('axios');
const config = require('../config/config');

const GOOGLE_MAPS_API_KEY = config.GOOGLE_MAPS_API_KEY;

/**
 * Geocode an address to get coordinates
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number}>} - The coordinates
 */
const geocode = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return [{ latitude: lat, longitude: lng }];
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};

/**
 * Get distance between two coordinates
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} - Distance in kilometers
 */
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} - Radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Get nearby places
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} type - Place type (e.g., 'hospital', 'pharmacy')
 * @param {number} radius - Search radius in meters
 * @returns {Promise<Array>} - Array of nearby places
 */
const getNearbyPlaces = async (lat, lng, type, radius = 5000) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status === 'OK') {
      return response.data.results;
    } else {
      throw new Error(`Nearby search failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Nearby search error:', error);
    throw error;
  }
};

/**
 * Get directions between two points
 * @param {number} originLat - Origin latitude
 * @param {number} originLng - Origin longitude
 * @param {number} destLat - Destination latitude
 * @param {number} destLng - Destination longitude
 * @param {string} mode - Travel mode (driving, walking, bicycling, transit)
 * @returns {Promise<Object>} - Directions data
 */
const getDirections = async (
  originLat,
  originLng,
  destLat,
  destLng,
  mode = 'driving'
) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status === 'OK') {
      return response.data;
    } else {
      throw new Error(`Directions request failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Directions error:', error);
    throw error;
  }
};

module.exports = {
  geocode,
  getDistance,
  getNearbyPlaces,
  getDirections
};
