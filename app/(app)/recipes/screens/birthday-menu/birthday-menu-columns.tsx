import React from "react";
import { PreSatori } from "@/utils/pre-satori";

interface BirthdayMenuColumnsProps {
	width?: number;
	height?: number;
	params?: {
		sisterName?: string;
		age?: number;
		title?: string;
		verrine1?: string;
		verrine2?: string;
		verrine3?: string;
		verrine4?: string;
		verrine5?: string;
		feuillete1?: string;
		feuillete2?: string;
		feuillete3?: string;
		feuillete4?: string;
		tartelette1?: string;
		tartelette2?: string;
		tartelette3?: string;
		tartelette4?: string;
	};
}

export default function BirthdayMenuColumns({
	width = 800,
	height = 480,
	params,
}: BirthdayMenuColumnsProps) {
	// Extract parameters with default values based on the request
	const sisterName = params?.sisterName || "Justine";
	const age = params?.age ?? 30;
	const menuTitle = params?.title || "L'Apéritif";

	const verrines = [
		params?.verrine1 || "Saumon fumé / Tzatziki",
		params?.verrine2 || "Ktipiti (Poivrons / Féta)",
		params?.verrine3 || "Mousse de carotte et\nCrème de chou fleur",
		params?.verrine4 || "Émulsion de crevettes et pétoncles rôties",
		params?.verrine5 || "Crème de betterave et chantilly chèvre",
	].filter(Boolean);

	const feuilletes = [
		params?.feuillete1 || "Spirales au Pesto",
		params?.feuillete2 || "Sacristains",
		params?.feuillete3 || "Anchois",
		params?.feuillete4 || "Crackers sésame",
	].filter(Boolean);

	const tartelettes = [
		params?.tartelette1 || "Flambées",
		params?.tartelette2 || "Oignons",
		params?.tartelette3 || "Quiches",
		params?.tartelette4 || "Pizzas",
	].filter(Boolean);

	return (
		<PreSatori useDoubling={true} width={width} height={height}>
			<div className="w-full h-full p-3 bg-white flex flex-col items-center justify-center text-black font-inter">
				{/* Outer heavy border */}
				<div
					className="w-full h-full flex flex-col p-2"
					style={{
						borderWidth: 6,
						borderStyle: "solid",
						borderColor: "#000000",
						borderRadius: 16,
						boxSizing: "border-box",
					}}
				>
					{/* Inner thin border */}
					<div
						className="w-full h-full flex flex-col items-center pt-5 px-5 pb-3 relative justify-between"
						style={{
							borderWidth: 2,
							borderStyle: "solid",
							borderColor: "#000000",
							borderRadius: 8,
							boxSizing: "border-box",
						}}
					>
						{/* Decorative Corners */}
						<span className="absolute top-1 left-2 text-[10px] font-bold">
							~
						</span>
						<span className="absolute top-1 right-2 text-[10px] font-bold">
							~
						</span>
						<span className="absolute bottom-1 left-2 text-[10px] font-bold">
							~
						</span>
						<div className="absolute bottom-1.5 right-3 flex flex-row items-center gap-1.5 text-black">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="17"
								height="17"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="3.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Tout maison</title>
								<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
								<polyline points="9 22 9 12 15 12 15 22" />
							</svg>
							<div className="flex flex-col items-start leading-[0.95] mt-0.5">
								<span className="font-inter text-[11px] font-black uppercase tracking-wider">
									Tout
								</span>
								<span className="font-inter text-[11px] font-black uppercase tracking-wider">
									Maison
								</span>
							</div>
						</div>

						{/* Header Section */}
						<div className="flex flex-col items-center w-full mt-0">
							<h1 className="font-inter text-[30px] font-black tracking-widest uppercase text-black leading-none text-center">
								{menuTitle}
							</h1>

							<div className="font-inter text-[16px] tracking-widest text-neutral-700 mt-1.5 uppercase font-semibold">
								Joyeux {age} ans, {sisterName} !
							</div>

							{/* Elegant divider */}
							<div className="flex items-center justify-center my-1.5 w-full max-w-[450px]">
								<div className="flex-1 h-[2px] bg-black"></div>
								<div className="mx-3 w-2.5 h-2.5 rounded-full bg-black"></div>
								<div className="flex-1 h-[2px] bg-black"></div>
							</div>
						</div>

						{/* Two-Column Middle Section */}
						<div className="flex flex-row w-full justify-between items-stretch my-1 flex-1">
							{/* Left Column - Verrines */}
							<div className="w-[47%] flex flex-col items-center">
								<h2
									className="font-inter text-[18px] font-extrabold tracking-widest uppercase text-black pb-1 mb-2 text-center"
									style={{ borderBottom: "2px solid #000000", width: "80%" }}
								>
									Les Verrines
								</h2>
								<div className="flex flex-col items-center justify-center flex-1 gap-2.5">
									{verrines.map((item, idx) => (
										<span
											key={idx}
											className="font-inter text-[16.5px] font-black text-center uppercase tracking-wide leading-tight max-w-[310px] break-words"
											style={{ whiteSpace: "pre-line" }}
										>
											{item}
										</span>
									))}
								</div>
							</div>

							{/* Vertical Separator */}
							<div
								style={{
									width: 2,
									backgroundColor: "#000000",
									alignSelf: "stretch",
									marginTop: 4,
									marginBottom: 4,
								}}
							/>

							{/* Right Column - Feuilletés */}
							<div className="w-[47%] flex flex-col items-center">
								<h2
									className="font-inter text-[18px] font-extrabold tracking-widest uppercase text-black pb-1 mb-2 text-center"
									style={{ borderBottom: "2px solid #000000", width: "80%" }}
								>
									Les Feuilletés
								</h2>
								<div className="flex flex-col items-center justify-center flex-1 gap-2.5">
									{feuilletes.map((item, idx) => (
										<span
											key={idx}
											className="font-inter text-[16.5px] font-black text-center uppercase tracking-wide leading-tight max-w-[310px] break-words"
											style={{ whiteSpace: "pre-line" }}
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Bottom Section - Tartelettes */}
						<div className="flex flex-col items-center w-full mt-0.5">
							{/* Horizontal Divider */}
							<div className="w-[90%] h-[1.5px] bg-neutral-400 mb-1.5"></div>

							<h2
								className="font-inter text-[18px] font-extrabold tracking-widest uppercase text-black pb-1 mb-1.5 text-center"
								style={{ borderBottom: "2px solid #000000", width: "40%" }}
							>
								Les Tartelettes
							</h2>

							<div className="flex flex-row items-center justify-center gap-6">
								{tartelettes.map((item, idx) => (
									<React.Fragment key={idx}>
										<span className="font-inter text-[16.5px] font-black uppercase tracking-wider">
											{item}
										</span>
										{idx < tartelettes.length - 1 && (
											<span className="text-[14px] font-bold text-neutral-400">
												•
											</span>
										)}
									</React.Fragment>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</PreSatori>
	);
}
