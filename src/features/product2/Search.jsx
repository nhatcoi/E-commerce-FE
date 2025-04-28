import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Search as SearchIcon, X} from "lucide-react";
import {Input} from "src/components/ui/input.jsx";
import {Button} from "src/components/ui/button.jsx";
import {cn} from "src/lib/utils.js";

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const searchContainerRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 100); // Short delay for the animation to start
        }
    }, [isOpen]);

    // Handle click outside to close search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Handle escape key to close search
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
            setIsOpen(false);
        }
    };

    const toggleSearch = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setSearchTerm("");
        }
    };

    // Mobile search is full width at the top of the screen
    if (isMobile) {
        return (
            <div ref={searchContainerRef} className="relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="search-toggle h-9 w-9 rounded-full hover:bg-primary/10"
                    onClick={toggleSearch}
                    aria-label="Search"
                >
                    <SearchIcon className="h-[1.2rem] w-[1.2rem]"/>
                </Button>

                <div
                    className={cn(
                        "fixed inset-x-0 top-0 z-50 bg-background/95 backdrop-blur-sm shadow-md transition-all duration-300",
                        isOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-full opacity-0 pointer-events-none"
                    )}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center p-2 container mx-auto"
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="mr-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5"/>
                        </Button>

                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search everything..."
                            className="flex-1 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <Button
                            type="submit"
                            size="icon"
                            className="ml-2"
                            disabled={!searchTerm.trim()}
                        >
                            <SearchIcon className="h-4 w-4"/>
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    // Desktop search is a dropdown
    return (
        <div ref={searchContainerRef} className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="search-toggle h-9 w-9 rounded-full hover:bg-primary/10 transition-colors"
                onClick={toggleSearch}
                aria-label="Search"
                data-state={isOpen ? "open" : "closed"}
            >
                <SearchIcon className={cn(
                    "h-[1.2rem] w-[1.2rem] transition-transform duration-200",
                    isOpen && "scale-110"
                )}/>
            </Button>

            <div
                className={cn(
                    "absolute right-0 top-full mt-2 z-50 origin-top-right transition-all duration-300",
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                )}
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center bg-background rounded-lg shadow-lg overflow-hidden border"
                >
                    <div className="relative flex-1">
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search everything..."
                            className="border-0 shadow-none focus-visible:ring-0 h-11 pr-10 pl-4 min-w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-11 w-11 rounded-none"
                                onClick={() => setSearchTerm("")}
                            >
                                <X className="h-4 w-4"/>
                            </Button>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="h-11 rounded-none px-4 rounded-r-lg"
                        disabled={!searchTerm.trim()}
                    >
                        <SearchIcon className="h-4 w-4 mr-2"/>
                        <span>Search</span>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Search;
