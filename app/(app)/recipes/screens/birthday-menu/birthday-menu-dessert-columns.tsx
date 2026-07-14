import { PreSatori } from "@/utils/pre-satori";

interface BirthdayMenuDessertColumnsProps {
	width?: number;
	height?: number;
	params?: {
		sisterName?: string;
		age?: number;
		title?: string;
		dessert1?: string;
		dessert1Desc?: string;
		dessert2?: string;
		dessert2Desc?: string;
		dessert3?: string;
		dessert3Desc?: string;
		glace1?: string;
		glace2?: string;
		glace3?: string;
		glace4?: string;
		glace5?: string;
		glace6?: string;
		glace7?: string;
		glaceSubtitle?: string;
	};
}

export default function BirthdayMenuDessertColumns({
	width = 800,
	height = 480,
	params,
}: BirthdayMenuDessertColumnsProps) {
	// Extract parameters with default values
	const sisterName = params?.sisterName || "Justine";
	const age = params?.age ?? 30;
	const menuTitle = params?.title || "Les Desserts de Fête";
	const glaceSubtitle = params?.glaceSubtitle || "(coupelles chocolat en gaufrette)";

	const desserts = [
		{
			title: params?.dessert1 || "Féminin fraise-framboise",
			desc:
				params?.dessert1Desc ||
				"Mousse fromage blanc, panna cotta citron vert, compotée fraise-framboise, biscuit amandes",
		},
		{
			title: params?.dessert2 || "Tarte yuzu",
			desc:
				params?.dessert2Desc || "Fond sablé, crémeux citron, meringue au yuzu",
		},
		{
			title: params?.dessert3 || "Barista",
			desc:
				params?.dessert3Desc ||
				"Biscuit noisette, croustillant gianduja, crémeux cappuccino, ganaches café et noisette",
		},
	].filter((d) => d.title);

	const glacesLine1 = [
		params?.glace1 || "Vanille",
		params?.glace2 || "Chocolat",
		params?.glace3 || "Café",
		params?.glace4 || "Praliné",
	].filter(Boolean);

	const glacesLine2 = [
		params?.glace5 || "Pamplemousse rose",
		params?.glace6 || "Citron vert",
		params?.glace7 || "Orange sanguine",
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
						className="w-full h-full flex flex-col items-center p-5 relative justify-start gap-1.5"
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
						<div className="flex flex-col items-center w-full mt-0.5">
							<h1 className="font-inter text-[30px] font-black tracking-widest uppercase text-black leading-none text-center">
								{menuTitle}
							</h1>

							<div className="font-inter text-[16px] tracking-widest text-neutral-700 mt-1 uppercase font-semibold">
								Joyeux {age} ans, {sisterName} !
							</div>

							{/* Elegant divider */}
							<div className="flex items-center justify-center my-1.5 w-full max-w-[450px]">
								<div className="flex-1 h-[2px] bg-black"></div>
								<div className="mx-3 w-2.5 h-2.5 rounded-full bg-black"></div>
								<div className="flex-1 h-[2px] bg-black"></div>
							</div>
						</div>

						{/* Line-based (row) Middle Section */}
						<div className="flex flex-col w-full flex-grow justify-start px-4 pt-1 gap-2">
							{/* Pâtisseries Section Header */}
							<div className="flex flex-row items-center w-full border-b border-black pb-1">
								<h2 className="font-inter text-[18px] font-extrabold tracking-widest uppercase text-black">
									Les Pâtisseries
								</h2>
							</div>

							{/* Pastry Rows */}
							<div className="flex flex-col w-full gap-2">
								{desserts.map((item, idx) => (
									<div
										key={idx}
										className="flex flex-row w-full items-start justify-between py-1 border-b border-dashed border-neutral-300 last:border-b-0"
									>
										{/* Title Left */}
										<div className="w-[38%] flex items-start pr-2 mt-0.5">
											<span className="font-inter text-[18px] font-black uppercase tracking-wide text-left leading-tight">
												{item.title}
											</span>
										</div>

										{/* Description Right */}
										<div className="w-[60%] flex items-start pl-2">
											<span className="font-inter text-[17px] font-bold text-black text-left leading-snug">
												{item.desc}
											</span>
										</div>
									</div>
								))}
							</div>

							{/* Glaces / Sorbets Row Section */}
							<div
								className="flex flex-row w-full items-center justify-between mt-auto pt-2.5 pb-0.5"
								style={{ borderTop: "2px solid #000000" }}
							>
								{/* Title Left */}
								<div className="w-[38%] flex flex-col items-start pr-2">
									<h2 className="font-inter text-[18px] font-black uppercase tracking-widest text-left leading-tight">
										Les Glaces / Sorbets
									</h2>
									{glaceSubtitle && (
										<span className="font-inter text-[14px] font-bold text-neutral-800 text-left leading-none mt-1">
											{glaceSubtitle}
										</span>
									)}
								</div>

								{/* Flavors Right */}
								<div className="w-[60%] flex flex-col items-start justify-center pl-2 gap-1">
									<span className="font-inter text-[16px] font-black uppercase tracking-wider text-black text-left leading-tight">
										{glacesLine1.join("  •  ")}
									</span>
									<span className="font-inter text-[16px] font-black uppercase tracking-wider text-black text-left leading-tight">
										{glacesLine2.join("  •  ")}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PreSatori>
	);
}
