"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileImport } from "@fortawesome/free-solid-svg-icons"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ReactPlayer from "react-player"
import Link from "next/link"
// import screenfull from "screenfull"
import PlayerControls from "@/components/PlayerControls"
import srtParser from "srt-parser-2"
import Subtitles from "@/components/Subtitles"
import { SubtitleInfo } from "@/types/SubtitleInfo"

export default function Home() {
    // const [file, setFile] = useState<File | null>(null)
    const [filePath, setFilePath] = useState<string | null>(null)
    const [hideControls, setHideControls] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [playedSeconds, setPlayedSeconds] = useState<number>(0)
    const [currentProgress, setCurrentProgress] = useState(0)
    const [volume, setVolume] = useState(1)
    const [captionFile, setCaptionFile] = useState<File | null>(null)
    const player = useRef<ReactPlayer>(null)
    const [subtitles, setSubtitles] = useState<SubtitleInfo[]>([])

    const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const video = event.target.files![0]

        setFilePath(URL.createObjectURL(video))
    }

    const togglePlaying = () => {
        setPlaying((value) => !value)
    }

    const changeVolume = (value: ChangeEvent<HTMLInputElement> | number) => {
        if (typeof value === "number") {
            setVolume(value)
        } else {
            const volumeNumber = parseFloat(value.target.value)
            setVolume(volumeNumber)
        }
    }

    const changeCaptionFile = (event: ChangeEvent<HTMLInputElement>) => {
        setCaptionFile(event.target.files![0])
    }

    const keyboardShortcut = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
            player.current?.seekTo(player.current.getCurrentTime() - 10)
        }
        if (event.key === "ArrowRight") {
            player.current?.seekTo(player.current.getCurrentTime() + 10)
        }
        // if (event.key === "ArrowUp") {
        //     if (volume < 1) setVolume(volume + 0.05)
        //     console.log(volume)
        // }
        // if (event.key === "ArrowDown") {
        //     if (volume > 0) setVolume(volume - 0.05)
        //     console.log(volume)
        // }
        if (event.key === " ") {
            togglePlaying()
        }
        // console.log(event.key)
    }, [])

    const displayClosedCaptions = async () => {
        const captionText = await captionFile?.text()
        if (captionText) {
            let parser = new srtParser()
            let srtArray: SubtitleInfo[] = parser.fromSrt(captionText)
            setSubtitles(srtArray)
            // console.log(srtArray)
            // console.log(playedSeconds)
        }
        // const captionArray = captionText?.split("\n\n")

        // type Caption = {
        //     captionNo: string
        //     captionRange: string[]
        //     captionText: string
        // }

        // const sortedCaptions: Caption[] = []

        // captionArray?.map((text) => {
        //     const value: Caption = {
        //         captionNo: "",
        //         captionRange: [],
        //         captionText: "",
        //     }

        //     if (text.length > 0) {
        //         const newLineSplit = text.split("\n")
        //         value.captionNo = newLineSplit[0]
        //         value.captionRange = newLineSplit[1].split(" --> ")
        //         value.captionText = newLineSplit.slice(2).join(" ")
        //         sortedCaptions.push(value)
        //     }
        // })

        // console.log(sortedCaptions)
        // console.log(playedSeconds)
    }

    useEffect(() => {
        const interval = setInterval(() => setHideControls(true), 5000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        displayClosedCaptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [captionFile])

    useEffect(() => {
        document.addEventListener("keydown", keyboardShortcut, false)

        return () => {
            document.removeEventListener("keydown", keyboardShortcut, false)
        }
    }, [keyboardShortcut])

    return (
        <main
            className="min-h-screen"
            onMouseMove={() => {
                setHideControls(false)
            }}
        >
            {!filePath ? (
                <div className="flex flex-col min-h-screen items-center justify-center">
                    <FileSelection
                        filePath={filePath}
                        selectFile={selectFile}
                    />
                </div>
            ) : (
                <div
                    className="h-screen w-full"
                    // onKeyDown={(e) => keyboardShortcut(e)}
                >
                    <ReactPlayer
                        ref={player}
                        playing={playing}
                        url={filePath}
                        width={"100%"}
                        height={"100%"}
                        onProgress={(e) => {
                            setPlayedSeconds(e.playedSeconds)
                            setCurrentProgress(e.played)
                        }}
                        onPause={() => setPlaying(false)}
                        onPlay={() => setPlaying(true)}
                        volume={volume!}
                    />

                    <AnimatePresence>
                        {!hideControls && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 2 }}
                                exit={{ opacity: 0 }}
                                key={`player`}
                            >
                                <PlayerControls
                                    player={player}
                                    isPlaying={playing}
                                    playedSeconds={playedSeconds}
                                    playProgress={currentProgress}
                                    togglePlaying={togglePlaying}
                                    changeVolume={changeVolume}
                                    changeCaptionFile={changeCaptionFile}
                                    hasCC={subtitles.length > 0}
                                />
                            </motion.div>
                        )}

                        {/* <motion.div key={`subtitles`}> */}
                        <Subtitles
                            subtitles={subtitles}
                            playedSeconds={playedSeconds}
                        />
                        {/* </motion.div> */}
                    </AnimatePresence>
                </div>
            )}
        </main>
    )
}

const FileSelection = ({
    filePath,
    selectFile,
}: {
    filePath: string | null
    selectFile: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <div className="flex flex-col justify-start items-start z-20">
            <input
                type="file"
                accept="video/*"
                name=""
                id="fileInput"
                // value={file?.name}
                onChange={(e) => selectFile(e)}
                // placeholder=""
                className="absolute top-0 left-0 h-screen w-screen opacity-0 bg-gray-50"
            />

            {filePath ? (
                <div className="h-full w-full flex flex-col justify-evenly items-center">
                    <p className="p-10">{filePath}</p>
                    <Link
                        href={"/player"}
                        className="bg-green-900 px-3 py-2 rounded-sm z-20"
                    >
                        Proceed to Player
                    </Link>
                </div>
            ) : (
                <div className="h-full w-full flex flex-col justify-evenly items-center space-y-10">
                    <label htmlFor="fileInput">
                        Click to select or drag video
                    </label>
                    <FontAwesomeIcon
                        icon={faFileImport}
                        className="text-white text-8xl"
                    />
                </div>
            )}
        </div>
    )
}
