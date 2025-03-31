import * as React from "react";

const AccordionContext = React.createContext();

export function Accordion({ children, type = "single", collapsible = false }) {
    const [openItems, setOpenItems] = React.useState([]);

    const toggleItem = (value) => {
        setOpenItems((prev) => {
            if (type === "single") {
                return prev.includes(value) ? (collapsible ? [] : prev) : [value];
            }
            return prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];
        });
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem }}>
            <div className="border rounded-md">{children}</div>
        </AccordionContext.Provider>
    );
}

export function AccordionItem({ value, children }) {
    const { openItems } = React.useContext(AccordionContext);
    const isOpen = openItems.includes(value);

    return (
        <div className="border-b">
            {React.Children.map(children, (child) => React.cloneElement(child, { value, isOpen }))}
        </div>
    );
}

export function AccordionTrigger({ children, value }) {
    const { toggleItem } = React.useContext(AccordionContext);

    return (
        <button
            onClick={() => toggleItem(value)}
            className="w-full text-left p-3 font-medium flex justify-between items-center hover:bg-gray-100"
        >
            {children}
            <span>{value}</span>
        </button>
    );
}

export function AccordionContent({ children, isOpen }) {
    return (
        <div className={`overflow-hidden transition-all ${isOpen ? "max-h-screen p-3" : "max-h-0 p-0"}`}>
            {children}
        </div>
    );
}