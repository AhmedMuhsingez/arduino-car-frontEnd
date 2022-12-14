import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function App() {
	const value1 = "forward";
	const value2 = "backward";
	const value3 = "right";
	const value4 = "left";
	const value5 = "stop";

	const [data, setData] = React.useState({});
	const [speed, setSpeed] = React.useState("");

	const handleSpeed = async (value) => {
		await fetch(`/${value}`, { method: "post" });
	};
	const handleRadioChange = (event) => {
		handleSpeed(event.target.value);
		setSpeed(event.target.value);
	};

	const handleState = async (value) => {
		await fetch(`/${value}`, { method: "post" });
	};

	const handleDistance = async () => {
		const res = await fetch(`/distance`);
		setData(await res.json());
	};

	React.useEffect(() => {
		const inn = setInterval(() => {
			handleDistance();
		}, 1500);

		return () => {
			clearInterval(inn);
		};
	}, [data]);

	React.useEffect(() => {
		const x = setInterval(() => {
			data[0] <= 8 && fetch(`/${value5}`, { method: "post" });
		}, 1500);
		return () => {
			clearInterval(x);
		};
	});

	console.log("dis1", data[0], "dis2", data[1], "dis3", data[2]);

	//Style:
	const speedContainer = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		fontSize: 28,
	};

	const speedControlTitle = {
		display: "flex",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 28,
		marginBottom: 22,
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around",
				width: "100vw",
				height: "100vh",
				backgroundColor: "#F0F2F5",
			}}
		>
			{/* buttons */}
			<div
				className="buttonsContainer"
				style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<div style={{ display: "flex" }}>
					<button
						type="button"
						onClick={() => {
							handleState(value4);
						}}
						style={{
							padding: 8,
							marginRight: 16,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 8,
						}}
					>
						<ArrowBackIcon style={{ marginRight: 6 }} />
						Turn Left
					</button>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<button
							type="button"
							onClick={() => {
								handleState(value1);
							}}
							style={{
								padding: 8,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 8,
							}}
						>
							Move Forward
							<ArrowUpwardIcon style={{ marginLeft: 6 }} />
						</button>

						<button
							type="button"
							onClick={() => {
								handleState(value5);
							}}
							style={{
								padding: 8,
								margin: "16px 0",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 8,
							}}
						>
							Stop
							<CancelIcon style={{ marginLeft: 6, fontSize: 16 }} />
						</button>

						<button
							type="button"
							onClick={() => {
								handleState(value2);
							}}
							style={{
								padding: 8,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 8,
							}}
						>
							Move Backward
							<ArrowDownwardIcon style={{ marginLeft: 6 }} />
						</button>
					</div>

					<button
						type="button"
						onClick={() => {
							handleState(value3);
						}}
						style={{
							padding: 8,
							marginLeft: 16,
							display: "flex",
							alignItems: "center",
							borderRadius: 8,
						}}
					>
						Turn Right
						<ArrowForwardIcon style={{ marginLeft: 6 }} />
					</button>
				</div>
			</div>

			{/* speed handler */}
			<div style={speedContainer}>
				<div style={{ marginTop: 32 }}>
					<div style={speedControlTitle}>Speed Control</div>
					<RadioGroup
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						value={speed}
						onChange={handleRadioChange}
					>
						<FormControlLabel value={"lowest"} control={<Radio />} label="Lowest" />
						<FormControlLabel value={"low"} control={<Radio />} label="Low" />
						<FormControlLabel value={"medium"} control={<Radio />} label="Medium" />
						<FormControlLabel value={"high"} control={<Radio />} label="High" />
					</RadioGroup>
				</div>
			</div>

			{/* values */}
			<div
				className="valuesContainer"
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div className="frontSensor">
					Distance from the right sensor:
					{/* {data ? (data[0] <= 15 ? " " + data[0] + " cm" : " Too Far") : "Null"} */}
					{/* {data ? data[0] + " cm" : "Null"} */}
				</div>
				<div className="frontSensor" style={{ margin: "0px 32px" }}>
					Distance from the front sensor:
					{data ? data[0] + " cm" : "Null"}
				</div>
				<div className="rightSensor">
					Distance from the left sensor:
					{/* {data ? data[2] + " cm" : "Null"} */}
				</div>
			</div>
		</div>
	);
}
