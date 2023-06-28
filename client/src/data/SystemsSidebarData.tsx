import BrainIcon from "@/components/icons/BrainIcon";
import GastroIcon from "@/components/icons/GastroIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import InfectionIcon from "@/components/icons/InfectionIcon";
import KidneyIcon from "@/components/icons/KidneyIcon";
import LungsIcon from "@/components/icons/LungsIcon";

const SystemsSidebarData = [
        {
            title: "brain",
            icon: <BrainIcon />,
            link: "/brain",
        },

        {
            title: "respiratory",
            icon: <LungsIcon />,
            link: "/respiratory"
        },

        {
            title: "heart",
            icon: <HeartIcon />,
            link: "/heart"
        },

        {
            title: "kidney",
            icon: <KidneyIcon />,
            link: "/kidney"
        },

        {
            title: "infection",
            icon: <InfectionIcon />,
            link: "/infection"
        },

        {
            title: "gastro",
            icon: <GastroIcon />,
            link: "/gastro"
        }
]

export default SystemsSidebarData;