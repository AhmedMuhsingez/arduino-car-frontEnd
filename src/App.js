import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

export default function App() {
	const value1 = "forward";
	const value2 = "backward";
	const value3 = "right";
	const value4 = "left";
	const value5 = "stop";

	const [data, setData] = React.useState({});
	const [speed, setSpeed] = React.useState("");
	const [distanceToStopAt, setDistanceToStopAt] = React.useState("");
	const [isRunning, setIsRunning] = React.useState(false);

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
		handleDistance();
		data[0] === distanceToStopAt && fetch(`/stop`, { method: "post" });
	}, [data]);

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

	const userInputContainer = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
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
							handleState(value3);
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
							handleState(value4);
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
						<FormControlLabel value={"Lowest"} control={<Radio />} label="Lowest" />
						<FormControlLabel value={"Low"} control={<Radio />} label="Low" />
						<FormControlLabel value={"Medium"} control={<Radio />} label="Medium" />
						<FormControlLabel value={"High"} control={<Radio />} label="High" />
					</RadioGroup>
				</div>
			</div>

			<div style={userInputContainer}>
				<p>Enter the distance you want to the car to stop at in cm:</p>
				<TextField
					id="outlined-basic"
					label="Distance in cm"
					variant="outlined"
					onChange={(e) => {
						setDistanceToStopAt(e.target.value);
					}}
					style={{ marginLeft: 16 }}
					type="number"
					disabled={isRunning}
					InputProps={{
						endAdornment: (
							<IconButton
								style={{ margin: "0 6px 0 12px" }}
								edge="end"
								color="primary"
								onClick={(e) => {
									setIsRunning(true);
								}}
								disabled={isRunning || distanceToStopAt <= 0}
							>
								<DoneIcon />
							</IconButton>
						),
					}}
				></TextField>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					opacity: isRunning ? 1 : 0,
					transition: "all 0.3s ease-in-out",
				}}
			>
				<p>The car will stop at: {distanceToStopAt} cm</p>
				<IconButton
					style={{ marginLeft: 12 }}
					onClick={() => {
						setIsRunning(false);
					}}
				>
					<EditIcon />
				</IconButton>
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
					{/* {data ? (data[0] <= 15 ? " " + data[0] + " cm" : " Null") : "Null"} */}
				</div>
				<div className="frontSensor" style={{ margin: "0px 32px" }}>
					Distance from the front sensor:
					{/* {data ? (data[1] <= 15 ? " " + data[1] + " cm" : " Null") : "Null"} */}
					{/* {data[2]} */}
					{data ? data[0] : "no data"}
				</div>
				<div className="rightSensor">
					Distance from the left sensor:
					{/* {data ? (data[2] <= 15 ? " " + data[2] + " cm" : " Null") : "Null"} */}
				</div>
			</div>
		</div>
	);
}
