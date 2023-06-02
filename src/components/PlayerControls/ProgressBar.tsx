import { ChangeEvent } from "react"

const ProgressBar = ({
    playProgress,
    seekFunction,
}: {
    playProgress: number
    seekFunction: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <div className="w-full relative flex flex-row justify-center">
            <div className="w-[95%] rounded-lg bg-gray-500 h-2 px-10 mt-3"></div>
            {/* TODO: Make the seeker an input tag and use it to seek the p ercent value */}
            <input
                type="range"
                className="absolute mt-3 accent-green-700/80 h-2 w-[95%] hover:cursor-pointer transition"
                min={0}
                max={0.999999}
                step={"any"}
                value={playProgress}
                onChange={seekFunction}
            />
        </div>
    )
}

export default ProgressBar
