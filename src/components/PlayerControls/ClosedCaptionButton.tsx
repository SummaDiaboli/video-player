import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, useRef } from "react"

const CloseCaptionButton = ({
    changeCaptionFile,
    hasCC,
}: {
    changeCaptionFile: (e: ChangeEvent<HTMLInputElement>) => void
    hasCC: boolean
}) => {
    const ccRef = useRef<HTMLInputElement>(null)

    const selectCaptionFile = () => {
        ccRef.current?.click()
    }

    return (
        <div>
            <input
                type="file"
                hidden
                ref={ccRef}
                onChange={(e) => changeCaptionFile(e)}
            />
            <FontAwesomeIcon
                icon={faClosedCaptioning}
                className={`text-2xl ${
                    hasCC
                        ? "text-green-500 hover:text-green-600"
                        : "text-gray-300 hover:text-gray-400"
                } hover:cursor-pointer transition`}
                onClick={selectCaptionFile}
            />
        </div>
    )
}

export default CloseCaptionButton
