import { PreSatori } from "@/utils/pre-satori";

interface BirthdayMenuProps {
	width?: number;
	height?: number;
	params?: {
		mode?: string;
		sisterName?: string;
		age?: number;
		title?: string;
		item1?: string;
		item2?: string;
		item3?: string;
		item4?: string;
		item5?: string;
	};
}

export default function BirthdayMenu({
	width = 800,
	height = 480,
	params,
}: BirthdayMenuProps) {
	// Parse the mode with a robust fallback
	const rawMode = (params?.mode || "apero").toLowerCase().trim();
	let mode: "apero" | "plat" | "dessert" = "apero";
	if (rawMode.includes("plat")) {
		mode = "plat";
	} else if (rawMode.includes("dessert")) {
		mode = "dessert";
	}

	// Preset definitions for each mode
	const PRESETS = {
		apero: {
			title: "L'Apéritif de Fête",
			items: [
				"Verrines Saumon Fumé / Tzatziki",
				"Verrines Ktipiti (Poivron / Féta)",
				"Escargots en pâte feuilletée au Pesto",
				"Feuilletés façon Pizza, Quiche Lorraine, tarte flambée",
				"Sacristains",
			],
		},
		plat: {
			title: "Le Plat Principal",
			items: ["Veau et spaetzles"],
		},
		dessert: {
			title: "Le Dessert",
			items: [
				"Féminin Fraise Framboise",
				"Tarte yuzu",
				"Barista",
				"glace café, praliné, chocolat et vanille",
			],
		},
	};

	const preset = PRESETS[mode];
	const sisterName = params?.sisterName || "Justine";
	const age = params?.age ?? 30;
	const menuTitle = params?.title || preset.title;

	// Collect user overrides (filter out empty inputs)
	const rawOverrides = [
		params?.item1,
		params?.item2,
		params?.item3,
		params?.item4,
		params?.item5,
	].filter(
		(item): item is string => typeof item === "string" && item.trim() !== "",
	);

	// Fallback to preset if no user overrides are configured
	const itemsToRender = rawOverrides.length > 0 ? rawOverrides : preset.items;

	// MenuItem helper function - dynamic font sizes and margins based on items count
	const renderMenuItem = (text: string, idx: number, totalItems: number) => {
		if (!text) return null;

		let fontSizeClass = "text-[22px]";
		let marginClass = "my-1.5";

		if (totalItems === 1) {
			fontSizeClass = "text-[32px]";
			marginClass = "my-6";
		} else if (totalItems === 2) {
			fontSizeClass = "text-[28px]";
			marginClass = "my-5";
		} else if (totalItems === 3) {
			fontSizeClass = "text-[25px]";
			marginClass = "my-4";
		}

		return (
			<div
				key={idx}
				className={`flex flex-col items-center text-center w-full ${marginClass}`}
			>
				<h3
					className={`font-inter font-black uppercase leading-tight text-black max-w-[650px] break-words ${fontSizeClass}`}
				>
					{text}
				</h3>
			</div>
		);
	};

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
						className="w-full h-full flex flex-col items-center p-6 relative"
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
						<span className="absolute bottom-1 right-2 text-[10px] font-bold">
							~
						</span>

						{/* Header Section */}
						<div className="flex flex-col items-center w-full mt-1">
							<h1 className="font-inter text-[34px] font-black tracking-widest uppercase text-black leading-none text-center">
								{menuTitle}
							</h1>

							<div className="font-inter text-[18px] tracking-widest text-neutral-700 mt-2 uppercase font-semibold">
								Joyeux {age} ans, {sisterName} !
							</div>

							{/* Elegant divider */}
							<div className="flex items-center justify-center my-2.5 w-full max-w-[450px]">
								<div className="flex-1 h-[2px] bg-black"></div>
								<div className="mx-3 w-2.5 h-2.5 rounded-full bg-black"></div>
								<div className="flex-1 h-[2px] bg-black"></div>
							</div>
						</div>

						{/* Menu Items Container - vertically centered using my-auto */}
						<div className="flex flex-col justify-center items-center my-auto w-full">
							{itemsToRender.map((item, idx) =>
								renderMenuItem(item, idx, itemsToRender.length),
							)}
						</div>
					</div>
				</div>
			</div>
		</PreSatori>
	);
}
