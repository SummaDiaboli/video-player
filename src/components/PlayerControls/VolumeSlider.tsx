import {
    faVolumeHigh,
    faVolumeLow,
    faVolumeMute,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent } from "react"

const VolumeSlider = ({
    changeVolume,
    volume,
}: {
    volume: number
    changeVolume: (e: ChangeEvent<HTMLInputElement> | number) => void
}) => {
    const handleMute = () => {
        if (volume !== 0) {
            changeVolume(0)
        } else {
            changeVolume(1)
        }
    }

    const volumeLevel =
        volume > 0.5 ? faVolumeHigh : volume !== 0 ? faVolumeLow : faVolumeMute

    return (
        <div className="flex flex-row space-x-3 group">
            <FontAwesomeIcon
                icon={volumeLevel}
                onClick={handleMute}
                className="text-2xl text-gray-300 hover:cursor-pointer hover:text-gray-400 transition"
            />

            <input
                type="range"
                min={0}
                max={1}
                step={"any"}
                value={volume}
                onChange={(e) => changeVolume(e)}
                className="accent-transparent/30 hidden opacity-0 group-hover:flex group-hover:opacity-100 transition"
            />
        </div>
    )
}

export default VolumeSlider
