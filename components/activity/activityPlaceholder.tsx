export default function ActivityPlaceholder() {
	return (
		<div className="bg-white dark:bg-slate-800 p-4 mb-6 rounded-md max-w-3xl mx-auto">
			<div className="flex items-center mb-4">
				<div className="flex w-full items-center animate-pulse">
					<div className="h-20 w-20 flex items-center justify-center rounded-lg overflow-hidden bg-slate-400"></div>
					<div className="flex-1 ml-4">
						<h2 className="w-2/3 h-4 mb-4 bg-slate-400"></h2>
						<p className="w-1/3 h-4 bg-slate-400"></p>
					</div>
				</div>
			</div>
			<div className="h-32 bg-slate-400 rounded-md animate-pulse"></div>
		</div>
	);
}
