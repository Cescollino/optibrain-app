/* Displays the data depending on the time frame selected by the user */

import { createContext } from "react";

type TimeFrame = {
    selectedFrameLabel: string;
    updateFrameTime: (option: string) => void;
};

const TimeFrameContext = createContext<TimeFrame>({ selectedFrameLabel: '3', updateFrameTime: () => {} });

export default TimeFrameContext;



