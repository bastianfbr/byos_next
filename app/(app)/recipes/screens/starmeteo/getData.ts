import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

interface StarMeteoData {
	currentMax: string;
	currentMin: string;
	currentIcon: string;
	time: string;
	probeTemp: string;
	forecastTomorrowMax: string;
	forecastTomorrowMin: string;
	forecastTomorrowIcon: string;
	forecastDay3Max: string;
	forecastDay3Min: string;
	forecastDay3Icon: string;
	forecastDay4Max: string;
	forecastDay4Min: string;
	forecastDay4Icon: string;
}

type StarMeteoParams = {
	location?: string;
	latitude?: number;
	longitude?: number;
};

interface GeocodingResponse {
	results: Array<{
		name: string;
		country: string;
		latitude: number;
		longitude: number;
	}>;
}

interface OpenMeteoResponse {
	timezone: string;
	current: {
		time: string;
		temperature_2m: number;
		weather_code: number;
	};
	daily: {
		time: string[];
		weather_code: number[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
	};
}

function mapWeatherCodeToIconType(code: number): string {
	if (code === 0) return "sun";
	if (code === 1 || code === 2) return "sun-cloud";
	if (code === 3 || code === 45 || code === 48) return "cloud";
	if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
		return "rain";
	if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
	if ([95, 96, 99].includes(code)) return "thunder";
	return "sun-cloud"; // Default fallback
}

async function geocodeLocation(
	locationName: string,
): Promise<{ latitude: number; longitude: number; name: string } | null> {
	try {
		const response = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`,
			{
				headers: { Accept: "application/json" },
				next: { revalidate: 0 },
			},
		);

		if (!response.ok) return null;

		const data: GeocodingResponse = await response.json();

		if (data.results && data.results.length > 0) {
			const result = data.results[0];
			return {
				latitude: result.latitude,
				longitude: result.longitude,
				name: `${result.name}, ${result.country}`,
			};
		}
		return null;
	} catch (error) {
		console.error("Error geocoding location:", error);
		return null;
	}
}

async function getStarMeteoData(
	latitude?: number,
	longitude?: number,
	locationName?: string,
): Promise<StarMeteoData | null> {
	try {
		let finalLat = latitude;
		let finalLng = longitude;

		if ((!finalLat || !finalLng) && locationName) {
			const geocoded = await geocodeLocation(locationName);
			if (geocoded) {
				finalLat = geocoded.latitude;
				finalLng = geocoded.longitude;
			}
		}

		// Fallback to Paris coordinates if nothing could be determined
		if (!finalLat || !finalLng) {
			finalLat = 48.8566;
			finalLng = 2.3522;
		}

		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${finalLat}&longitude=${finalLng}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
			{
				headers: { Accept: "application/json" },
				next: { revalidate: 0 },
			},
		);

		if (!response.ok) {
			throw new Error(`Open-Meteo responded with status: ${response.status}`);
		}

		const data: OpenMeteoResponse = await response.json();

		if (!data.current || !data.daily) {
			throw new Error("Missing weather data in API response");
		}

		// Helper to format temp to rounded string
		const formatTemp = (val: number): string => Math.round(val).toString();

		// Calculate local time for the timezone
		const localTime = new Date().toLocaleTimeString("en-GB", {
			timeZone: data.timezone || "Europe/Paris",
			hour: "2-digit",
			minute: "2-digit",
		});

		return {
			currentMax: formatTemp(data.daily.temperature_2m_max[0]),
			currentMin: formatTemp(data.daily.temperature_2m_min[0]),
			currentIcon: mapWeatherCodeToIconType(data.current.weather_code),
			time: localTime,
			probeTemp: Math.round((data.current.temperature_2m * 10) / 10).toFixed(1), // keep 1 decimal place for external probe (e.g. 17.3)
			forecastTomorrowMax: formatTemp(data.daily.temperature_2m_max[1]),
			forecastTomorrowMin: formatTemp(data.daily.temperature_2m_min[1]),
			forecastTomorrowIcon: mapWeatherCodeToIconType(
				data.daily.weather_code[1],
			),
			forecastDay3Max: formatTemp(data.daily.temperature_2m_max[2]),
			forecastDay3Min: formatTemp(data.daily.temperature_2m_min[2]),
			forecastDay3Icon: mapWeatherCodeToIconType(data.daily.weather_code[2]),
			forecastDay4Max: formatTemp(data.daily.temperature_2m_max[3]),
			forecastDay4Min: formatTemp(data.daily.temperature_2m_min[3]),
			forecastDay4Icon: mapWeatherCodeToIconType(data.daily.weather_code[3]),
		};
	} catch (error) {
		console.error("Error fetching weather data for StarMeteo:", error);
		return null;
	}
}

const getCachedStarMeteoData = unstable_cache(
	async (params?: StarMeteoParams): Promise<StarMeteoData> => {
		const data = await getStarMeteoData(
			params?.latitude,
			params?.longitude,
			params?.location,
		);

		if (!data) {
			throw new Error("Invalid or empty data - skip caching");
		}
		return data;
	},
	["starmeteo-weather-data"],
	{
		tags: ["starmeteo", "weather"],
		revalidate: 900, // Cache for 15 minutes
	},
);

export default async function getData(
	params?: StarMeteoParams,
): Promise<StarMeteoData> {
	const location = params?.location || "Paris";

	try {
		return await getCachedStarMeteoData({
			location,
			latitude: params?.latitude,
			longitude: params?.longitude,
		});
	} catch (error) {
		console.log("Cache skipped or error, fallback to direct fetch:", error);
		const directData = await getStarMeteoData(
			params?.latitude,
			params?.longitude,
			location,
		);

		return (
			directData || {
				currentMax: "23",
				currentMin: "12",
				currentIcon: "sun-cloud",
				time: "12:34",
				probeTemp: "17.3",
				forecastTomorrowMax: "20",
				forecastTomorrowMin: "10",
				forecastTomorrowIcon: "sun-cloud",
				forecastDay3Max: "17",
				forecastDay3Min: "8",
				forecastDay3Icon: "cloud",
				forecastDay4Max: "19",
				forecastDay4Min: "10",
				forecastDay4Icon: "rain",
			}
		);
	}
}
