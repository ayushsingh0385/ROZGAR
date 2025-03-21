import { useWorkersStore } from "@/store/useWorkersStore";
import { Button } from "./ui/button.jsx";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label.jsx";

// Filter options array with no types
const filterOptions = [
  { id: "Painter", label: "Painter" },
  { id: "Carpenter", label: "Carpenter" },
  { id: "Labour", label: "Labour" },
  { id: "Trowel", label: "Trowel" },
];

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useWorkersStore();

  const appliedFilterHandler = (value) => {
    setAppliedFilter(value);
  };

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by Occupation</h1>
        <Button variant={"link"} onClick={resetAppliedFilter}>Reset</Button>
      </div>
      {filterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <Checkbox
            id={option.id}
            checked={appliedFilter.includes(option.label)}
            onClick={() => appliedFilterHandler(option.label)}
          />
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterPage;