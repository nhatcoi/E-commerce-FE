import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import PropTypes from 'prop-types';
import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import { Calendar } from "src/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "src/components/ui/popover";

export function DatePickerWithRange({ className, value, onChange }) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {format(value.from, "LLL dd, y")} -{" "}
                                    {format(value.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(value.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={onChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

DatePickerWithRange.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
    }),
    onChange: PropTypes.func
};

DatePickerWithRange.defaultProps = {
    className: "",
    value: null,
    onChange: () => {}
};