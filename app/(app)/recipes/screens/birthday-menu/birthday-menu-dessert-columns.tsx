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

	const glaces = [
		params?.glace1 || "Café",
		params?.glace2 || "Praliné",
		params?.glace3 || "Chocolat",
		params?.glace4 || "Vanille",
		params?.glace5 || "",
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
						className="w-full h-full flex flex-col items-center p-6 relative justify-between"
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
							<h1 className="font-inter text-[32px] font-black tracking-widest uppercase text-black leading-none text-center">
								{menuTitle}
							</h1>

							<div className="font-inter text-[16.5px] tracking-widest text-neutral-700 mt-1.5 uppercase font-semibold">
								Joyeux {age} ans, {sisterName} !
							</div>

							{/* Elegant divider */}
							<div className="flex items-center justify-center my-2 w-full max-w-[450px]">
								<div className="flex-1 h-[2px] bg-black"></div>
								<div className="mx-3 w-2.5 h-2.5 rounded-full bg-black"></div>
								<div className="flex-1 h-[2px] bg-black"></div>
							</div>
						</div>

						{/* Two-Column Middle Section */}
						<div className="flex flex-row w-full justify-between items-stretch my-2 flex-1">
							{/* Left Column - Pâtisseries */}
							<div className="w-[47%] flex flex-col items-center">
								<h2
									className="font-inter text-[19px] font-extrabold tracking-widest uppercase text-black pb-1.5 mb-3 text-center"
									style={{ borderBottom: "2px solid #000000", width: "80%" }}
								>
									Les Pâtisseries
								</h2>
								<div className="flex flex-col items-center justify-center flex-grow gap-4">
									{desserts.map((item, idx) => (
										<div
											key={idx}
											className="flex flex-col items-center w-full"
										>
											<span className="font-inter text-[16.5px] font-black text-center uppercase tracking-wide leading-tight max-w-[310px] break-words">
												{item.title}
											</span>
											{item.desc && (
												<span className="font-inter text-[11.5px] italic font-normal text-black text-center tracking-normal leading-tight mt-0.5 max-w-[280px] break-words">
													{item.desc}
												</span>
											)}
										</div>
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

							{/* Right Column - Glaces / Sorbets */}
							<div className="w-[47%] flex flex-col items-center">
								<h2
									className="font-inter text-[19px] font-extrabold tracking-widest uppercase text-black pb-1.5 mb-3 text-center"
									style={{ borderBottom: "2px solid #000000", width: "80%" }}
								>
									Les Glaces / Sorbets
								</h2>
								<div className="flex flex-col items-center justify-center flex-grow gap-5">
									{glaces.map((item, idx) => (
										<span
											key={idx}
											className="font-inter text-[18px] font-black text-center uppercase tracking-wide leading-snug max-w-[310px] break-words"
											style={{ whiteSpace: "pre-line" }}
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PreSatori>
	);
}
