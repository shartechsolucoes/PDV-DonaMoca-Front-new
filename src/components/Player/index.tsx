import { useState, useRef, useEffect } from "react";
import { TfiYoutube } from "react-icons/tfi";
import { FaVimeoV } from "react-icons/fa";
import './player.css';

type PlayerProps = {
    player: number;           // "1" = YouTube, "0" = Vimeo
    setPlayer: (val: number) => void;
};

export default function Player({ player, setPlayer }: PlayerProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="input-group-append" ref={dropdownRef} style={{ position: "relative" }}>
            <button
                type="button"
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 button-url"
                onClick={() => setOpen(!open)}
            >
                {player === 1 ? (
                    <>
                        <TfiYoutube color="red" /> YouTube
                    </>
                ) : (
                    <>
                        <FaVimeoV color="#1ab7ea" /> Vimeo
                    </>
                )}
            </button>

            {open && (
                <ul
                    className="dropdown-menu show"
                >
                    <li>
                        <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={() => {
                                setPlayer(1);
                                setOpen(false);
                            }}
                        >
                            <TfiYoutube color="red" /> YouTube
                        </button>
                    </li>
                    <li>
                        <button
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={() => {
                                setPlayer(0);
                                setOpen(false);
                            }}
                        >
                            <FaVimeoV color="#1ab7ea" /> Vimeo
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}
