"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, RefObject, useState } from "react"
// import { faPlayCircle } from "@fortawesome/free-regular-svg-icons"
import {
    faForwardStep,
    faBackwardStep,
    faPlay,
    faPause,
    faCog,
} from "@fortawesome/free-solid-svg-icons"
import ReactPlayer from "react-player"
import CloseCaptionButton from "./ClosedCaptionButton"
import VolumeSlider from "./VolumeSlider"
import PlayerTimestamp from "./PlayerTimestamp"
import ProgressBar from "./ProgressBar"

const PlayerControls = ({
    player,
    togglePlaying,
    playProgress,
    playedSeconds,
    isPlaying,
    hasCC,
    changeVolume,
    changeCaptionFile,
}: {
    player: RefObject<ReactPlayer>
    isPlaying: boolean
    playedSeconds: number
    playProgress: number
    togglePlaying: () => void
    changeVolume: (e: ChangeEvent<HTMLInputElement> | number) => void
    changeCaptionFile: (e: ChangeEvent<HTMLInputElement>) => void
    hasCC: boolean
}) => {
    const handlePlay = () => {
        togglePlaying()
    }

    const backTenSeconds = () => {
        player.current?.seekTo(player.current.getCurrentTime() - 10)
    }

    const forwardTenSeconds = () => {
        player.current?.seekTo(player.current.getCurrentTime() + 10)
    }

    const seekToProgress = (event: ChangeEvent<HTMLInputElement>) => {
        player.current?.seekTo(parseFloat(event.target.value))
    }

    return (
        <div
            className={`z-20 absolute bottom-0 w-full backdrop-blur-lg bg-gray-500/30 h-28 flex flex-col items-center`}
        >
            <ProgressBar
                playProgress={playProgress}
                seekFunction={seekToProgress}
            />

            {/* Controls */}
            <div className="w-[95%] flex flex-row mt-6 justify-between">
                <div className="flex flex-row justify-center items-center space-x-6">
                    <FontAwesomeIcon
                        icon={faBackwardStep}
                        className="text-2xl text-gray-300 hover:cursor-pointer hover:text-gray-400 transition"
                        onClick={() => backTenSeconds()}
                    />

                    <FontAwesomeIcon
                        icon={isPlaying ? faPause : faPlay}
                        className="text-4xl text-gray-300 hover:cursor-pointer hover:text-gray-400 transition"
                        onClick={handlePlay}
                    />

                    <FontAwesomeIcon
                        icon={faForwardStep}
                        className="text-2xl text-gray-300 hover:cursor-pointer hover:text-gray-400 transition"
                        onClick={() => forwardTenSeconds()}
                    />

                    <VolumeSlider
                        volume={player.current?.props.volume!}
                        changeVolume={changeVolume}
                    />

                    <PlayerTimestamp
                        playedSeconds={playedSeconds}
                        duration={player.current?.getDuration()!}
                    />
                </div>

                {/* <SettingsMenu /> */}
                <CloseCaptionButton
                    changeCaptionFile={changeCaptionFile}
                    hasCC={hasCC}
                />
            </div>
        </div>
    )
}

// TODO: Come back to it later
const SettingsMenu = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div>
            <FontAwesomeIcon
                icon={faCog}
                className="text-2xl text-gray-300 hover:cursor-pointer hover:rotate-45 transition"
                onClick={() => setShowMenu((e) => !e)}
            />
            {showMenu && (
                <ul className="absolute top-0 right-16 bg-gray-500/30 h-full">
                    <li>Playback speed</li>
                </ul>
            )}
        </div>
    )
}

export default PlayerControls
