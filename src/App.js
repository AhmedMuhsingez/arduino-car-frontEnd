import React from "react"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CancelIcon from "@mui/icons-material/Cancel"
export default function App() {
	const value1 = "forward"
	const value2 = "backward"
	const value3 = "right"
	const value4 = "left"
	const value5 = "stop"
	const [data, setData] = React.useState({})

	React.useEffect(() => {
		const inn = setInterval(() => {
			handleDistance()
		}, 1200)

		return () => {
			clearInterval(inn)
		}
	}, [])

	const handleState = async (value) => {
		await fetch(`/${value}`, { method: "post" })
	}

	const handleDistance = async (value) => {
		const res = await fetch(`/distance`)
		setData(await res.json())
	}
	const test = Boolean
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
			<div
				className="buttonsContainer"
				style={{
					display: "flex",
					justifyContent: "space-around",
					height: "100%",
					alignItems: "center",
				}}
			>
				<div style={{ display: "flex" }}>
					<button
						type="button"
						onClick={() => {
							handleState(value1)
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
								handleState(value3)
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
								handleState(value5)
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
								handleState(value4)
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
							handleState(value2)
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
			<div
				className="valuesContainer"
				style={{
					display: "flex",
					justifyContent: "center",
					marginBottom: "10%",
				}}
			>
				<div className="frontSensor">
					Distance from the right sensor:
					{data ? (data[0] <= 15 ? " " + data[0] + " cm" : " Null") : "Null"}
				</div>
				<div className="backSensor" style={{ margin: "0px 32px" }}>
					Distance from the front sensor:
					{data ? (data[1] <= 15 ? " " + data[1] + " cm" : " Null") : "Null"}
				</div>
				<div className="rightSensor">
					Distance from the left sensor:
					{data ? (data[2] <= 15 ? " " + data[2] + " cm" : " Null") : "Null"}
				</div>
			</div>
		</div>
	)
}
