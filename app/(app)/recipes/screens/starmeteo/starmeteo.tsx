import React from 'react';
import fontData from "@/components/bitmap-font/bitmap-font.json";
import { BitmapText } from "@/components/bitmap-font/bitmap-text";
import { PreSatori } from "@/utils/pre-satori";

// Interface stricte pour matcher le format simple du projet
interface StarMeteoProps {
	width?: number;
	height?: number;
	currentMax?: number;
	currentMin?: number;
	currentIcon?: 'sun-cloud' | 'cloud' | 'rain';
	time?: string;
	probeTemp?: number;
}

export default function StarMeteo({
	width = 800,
	height = 480,
	currentMax = 19,
	currentMin = 11,
	currentIcon = 'sun-cloud',
	time = '12:34',
	probeTemp = 23.5,
}: StarMeteoProps) {
	
	// Composant SVG interne pour les icônes
	const WeatherIcon = ({ type, className = "h-16 w-16" }: { type: string, className?: string }) => {
		if (type === 'sun-cloud') {
			return (
				<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M20 12h2M5.75 18.25l-1.43 1.43M19.78 4.22l-1.42 1.42" strokeLinecap="round"/>
					<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" fill="white" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			);
		}
		if (type === 'rain') {
			return (
				<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" strokeLinecap="round" strokeLinejoin="round"/>
					<line x1="8" y1="19" x2="6" y2="22" strokeLinecap="round"/>
					<line x1="12" y1="19" x2="10" y2="22" strokeLinecap="round"/>
					<line x1="16" y1="19" x2="14" y2="22" strokeLinecap="round"/>
				</svg>
			);
		}
		return (
			<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" fill="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		);
	};

	return (
		<PreSatori useDoubling={true} width={width} height={height}>
			<div className="w-full h-full bg-white text-black p-4 flex flex-col justify-between font-sans select-none border border-black">
				
				{/* 1. SECTION SUPÉRIEURE : Temps Actuel */}
				<div className="border-2 border-black rounded-2xl p-4 flex items-center justify-between relative h-[170px]">
					<div className="absolute top-1 left-4 font-bold text-sm text-gray-700">APRES-MIDI</div>
					
					<div className="flex items-baseline pl-4">
						<span className="text-sm font-bold align-super mr-2">Ht</span>
						<span className="text-7xl font-inter font-extrabold">{currentMax}</span>
						<span className="text-4xl font-light align-super">°</span>
					</div>

					<div className="flex justify-center items-center">
						<WeatherIcon type={currentIcon} className="h-28 w-28 text-black" />
					</div>

					<div className="flex items-baseline pr-4 relative">
						<span className="text-sm font-bold align-super mr-2">Bs</span>
						<span className="text-7xl font-inter font-extrabold">{currentMin}</span>
						<span className="text-4xl font-light align-super">°</span>
						
						<div className="absolute bottom-2 -right-2 flex flex-col items-end gap-[2px]">
							<span className="w-4 h-[2px] bg-black"></span>
							<span className="w-3 h-[2px] bg-black"></span>
							<span className="w-2 h-[2px] bg-black"></span>
							<span className="w-1 h-[2px] bg-black"></span>
						</div>
					</div>
				</div>

				{/* 2. SECTION CENTRALE : Horloge & Sonde */}
				<div className="flex items-center justify-between px-6 h-[100px]">
					<div className="text-6xl font-inter font-bold tracking-normal">
						{time}
					</div>
					
					<div className="flex items-center gap-2">
						<div className="flex items-baseline">
							<span className="text-7xl font-inter font-bold">{probeTemp.toFixed(1)}</span>
							<span className="text-4xl font-light align-super">°</span>
						</div>
						<div className="flex flex-col text-[10px] font-bold border-l border-black pl-1 leading-tight justify-center">
							<span>INT</span>
							<span className="bg-black text-white px-[2px] rounded-sm mt-[2px] text-[8px]">PROBE</span>
						</div>
					</div>
				</div>

				{/* 3. SECTION INFÉRIEURE : Prévisions 3 Jours */}
				<div className="grid grid-cols-3 gap-3 h-[160px]">
					{/* Bloc Demain */}
					<div className="border-2 border-black rounded-2xl p-2 flex flex-col justify-between relative bg-white">
						<div className="text-xs font-black tracking-wide text-center pt-0.5 border-b border-black pb-0.5 mx-4">DEMAIN</div>
						<div className="flex justify-center my-1">
							<WeatherIcon type="sun-cloud" className="h-14 w-14 text-black" />
						</div>
						<div className="flex justify-between items-baseline px-2 text-sm font-semibold">
							<div className="flex items-baseline">
								<span className="text-[10px] mr-1 opacity-70">Ht</span>
								<span className="text-xl font-bold font-inter">18</span><span>°</span>
							</div>
							<div className="flex items-baseline">
								<span className="text-[10px] mr-1 opacity-70">Bs</span>
								<span className="text-xl font-bold font-inter">10</span><span>°</span>
							</div>
						</div>
					</div>

					{/* Bloc Jour 3 */}
					<div className="border-2 border-black rounded-2xl p-2 flex flex-col justify-between relative bg-white">
						<div className="text-xs font-black tracking-wide text-center pt-0.5 border-b border-black pb-0.5 mx-4">JOUR 3</div>
						<div className="flex justify-center my-1">
							<WeatherIcon type="cloud" className="h-14 w-14 text-black" />
						</div>
						<div className="flex justify-between items-baseline px-2 text-sm font-semibold">
							<div className="flex items-baseline">
								<span className="text-[10px] mr-1 opacity-70">Ht</span>
								<span className="text-xl font-bold font-inter">16</span><span>°</span>
							</div>
							<div className="flex items-baseline">
								<span className="text-[10px] mr-1 opacity-70">Bs</span>
								<span className="text-xl font-bold font-inter">9</span><span>°</span>
							</div>
						</div>
					</div>

					{/* Bloc Jour 4 */}
					<div className="border-2 border-black rounded-2xl p-2 flex flex-col justify-between relative bg-white">
						<div className="text-xs font-black tracking-wide text-center pt-0.5 border-b border-black pb-0.5 mx-4">JOUR 4</div>
						<div className="flex justify-center my-1">
							<WeatherIcon type="rain" className="h-14 w-14 text-black" />
						</div>
						<div className="flex justify-between items-baseline px-2 text-sm font-semibold">
							<div className="flex items-baseline">
								<span className="text-[10px] mr-1 opacity-70">Ht</span>
								<span className="text-xl font-bold font-inter">15</span><span>°</span>
							</div>
							<div className="flex items-baseline">
								<span className="text-[10px] mr-1 opacity-70">Bs</span>
								<span className="text-xl font-bold font-inter">8</span><span>°</span>
							</div>
						</div>
					</div>
				</div>

			</div>
		</PreSatori>
	);
}
