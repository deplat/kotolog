import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary
                "orange-vivid-050": "#FFE8D9",
                "orange-vivid-100": "#FFD0B5",
                "orange-vivid-200": "#FFB088",
                "orange-vivid-300": "#FF9466",
                "orange-vivid-400": "#F9703E",
                "orange-vivid-500": "#F35627",
                "orange-vivid-600": "#DE3A11",
                "orange-vivid-700": "#C52707",
                "orange-vivid-800": "#AD1D07",
                "orange-vivid-900": "#841003",

                // Neutrals
                "cool-grey-050": "#F5F7FA",
                "cool-grey-100": "#E4E7EB",
                "cool-grey-200": "#CBD2D9",
                "cool-grey-300": "#9AA5B1",
                "cool-grey-400": "#7B8794",
                "cool-grey-500": "#616E7C",
                "cool-grey-600": "#52606D",
                "cool-grey-700": "#3E4C59",
                "cool-grey-800": "#323F4B",
                "cool-grey-900": "#1F2933",

                // Supporting
                "indigo-050": "#E0E8F9",
                "indigo-100": "#BED0F7",
                "indigo-200": "#98AEEB",
                "indigo-300": "#7B93DB",
                "indigo-400": "#647ACB",
                "indigo-500": "#4C63B6",
                "indigo-600": "#4055A8",
                "indigo-700": "#35469C",
                "indigo-800": "#2D3A8C",
                "indigo-900": "#19216C",

                "red-050": "#FFEEEE",
                "red-100": "#FACDCD",
                "red-200": "#F29B9B",
                "red-300": "#E66A6A",
                "red-400": "#D64545",
                "red-500": "#BA2525",
                "red-600": "#A61B1B",
                "red-700": "#911111",
                "red-800": "#780A0A",
                "red-900": "#610404",

                "yellow-050": "#FFFAEB",
                "yellow-100": "#FCEFC7",
                "yellow-200": "#F8E3A3",
                "yellow-300": "#F9DA8B",
                "yellow-400": "#F7D070",
                "yellow-500": "#E9B949",
                "yellow-600": "#C99A2E",
                "yellow-700": "#A27C1A",
                "yellow-800": "#7C5E10",
                "yellow-900": "#513C06",

                "green-050": "#E3F9E5",
                "green-100": "#C1EAC5",
                "green-200": "#A3D9A5",
                "green-300": "#7BC47F",
                "green-400": "#57AE5B",
                "green-500": "#3F9142",
                "green-600": "#2F8132",
                "green-700": "#207227",
                "green-800": "#0E5814",
                "green-900": "#05400A",
            }
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
export default config;
