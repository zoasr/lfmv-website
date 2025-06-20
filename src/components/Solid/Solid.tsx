/** @jsxImportSource solid-js */
import SolidLastFMViewer from "@lastfm-viewer/solid";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";

type ComponentParams = {
	user: null | string;
	updateInterval: null | number;
	mode: "dev" | "prod";
	changed: boolean;
};

type Mode = "dev" | "prod";

const Solid = () => {
	const [params, setParams] = createStore<ComponentParams>({
		user: null,
		updateInterval: null,
		mode: "dev",
		changed: false,
	});
	const urlParams = new URLSearchParams(window.location.search);
	setParams({
		user: urlParams.get("username"),
		updateInterval: Number(urlParams.get("updateInterval")),
		mode: urlParams.get("updateInterval") as Mode,
	});
	window.addEventListener("querychanged", () => {
		const urlParams = new URLSearchParams(window.location.search);
		setParams({
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
			mode: urlParams.get("mode") as Mode,
			changed: true,
		});
		setParams((prev) => ({
			...prev,
			changed: false,
		}));
	});
	return (
		<>
			<Show
				when={params.user && !params.changed}
				fallback={<p>Component will render here</p>}
			>
				<SolidLastFMViewer
					user={params.user as string}
					updateInterval={
						params.updateInterval
							? params.updateInterval
							: undefined
					}
					mode={params.mode}
				/>
			</Show>
		</>
	);
};

export default Solid;
