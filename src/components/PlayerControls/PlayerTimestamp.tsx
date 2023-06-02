const PlayerTimestamp = ({
    playedSeconds,
    duration,
}: {
    playedSeconds: number
    duration: number
}) => {
    const fancyTimeFormat = (duration: number): string => {
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600)
        const mins = ~~((duration % 3600) / 60)
        const secs = ~~duration % 60

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let timeStr = ""

        timeStr += "" + hrs + ":" + (mins < 10 ? "0" : "")

        timeStr += "" + mins + ":" + (secs < 10 ? "0" : "")
        timeStr += "" + secs

        return timeStr
    }

    return (
        <div className="text-gray-400">
            {fancyTimeFormat(playedSeconds)} / {fancyTimeFormat(duration)}
        </div>
    )
}

export default PlayerTimestamp
