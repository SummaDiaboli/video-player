import { SubtitleInfo } from "@/types/SubtitleInfo"

const Subtitles = ({
    subtitles,
    playedSeconds,
}: {
    subtitles: SubtitleInfo[]
    playedSeconds: number
}) => {
    const currentSubtitle = () => {
        let subtitle = subtitles.find(
            (subtitle) =>
                subtitle.endSeconds >= playedSeconds &&
                subtitle.startSeconds <= playedSeconds
        )?.text

        // subtitles.map((subtitle) => {
        //     if (
        //         subtitle.startSeconds <= playedSeconds &&
        //         subtitle.endSeconds >= playedSeconds
        //     ) {
        //         // console.log(subtitle)
        //         sub = subtitle.text
        //     }
        // })

        return subtitle
    }

    return (
        <div className=" z-10 w-full text-center items-center justify-center flex  absolute bottom-[15%]">
            <p className="bg-gray-800/50 text-white text-2xl">
                {currentSubtitle()}
            </p>
        </div>
    )
}

export default Subtitles
