export function getTropicalFishColor(palette) {
    let colors = null;

    switch (palette) {
        case 2:
            colors = {
                body: "#FFD94A",
                stripe: "#FF8C00",
                fin: "#4CAF50",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 3:
            // Juvenile Golden Trevally
            // Can be combined with jellyfish
            colors = {
                body: "#FFD23C",
                stripe: "#1A1A1A",
                fin: "#FFE680",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 4:
            // Juvenile Golden Trevally
            // Can be combined with jellyfish
            colors = {
                body: "#FFC107",
                stripe: "#000000",
                fin: "#FFEB99",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 5:
            colors = {
                body: "#7EC8E3",
                stripe: "#2A6F97",
                fin: "#A9DCEC",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 6:
            // Can be combined with jellyfish
            colors = {
                body: "#C9D6DF",
                stripe: "#5F6F7A",
                fin: "#E3EDF2",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 7:
            // Can be combined with jellyfish
            colors = {
                body: "#1F5F8B",
                stripe: "#0B2F4A",
                fin: "#3F7FA6",
                eye: "#0E1418",
                eyePupil: "#0A0E12"
            }
            break;
        case 8:
            // Clownfish
            colors = {
                body: "#FF8C1A",
                stripe: "#FFFFFF",
                stripeOutline: "#000000",
                fin: "#FFB347",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 9:
            // Red Tail shark
            colors = {
                body: "#222222",
                stripe: "#222222",
                fin: "#333333",
                tail: "#FF3B3B",
                eye: "#1A1A1A",
                eyePupil: "#0A0E12"
            }
            break;
        case 10:
            // Yellow Tail Acei Cichlid
            colors = {
                body: "#7FA8C3",
                stripe: "#5D7A9B",
                fin: "#F8E14D",
                tail: "#FFEA3C",
                eye: "#1C1C1C",
                eyePupil: "#0A0E12"
            }
            break;
        case 11:
            // Siamese Algae Eater
            colors = {
                body: "#8FA1A8",
                stripe: "#0E1418",
                fin: "#6F838B",
                tail: "#7C8F96",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 12:
            // Yellow Tail Damselfish
            colors = {
                body: "#1F3FAE",
                stripe: "#2A4FCF",
                fin: "#2A4EC0",
                tail: "#FFD83D",
                eye: "#0E1418",
                eyePupil: "#0A0E12"
            }
            break;
        case 13:
            // Zebra Angelfish
            colors = {
                body: "#C7CDD1",
                stripe: "#1A1E23",
                fin: "#9AA3A9",
                tail: "#8F979C",
                eye: "#B5342A",
                eyePupil: "#0A0E12"
            }
            break;
        case 14:
            // Smallmouth Grunt
            colors = {
                body: "#7E8A90",
                stripe: "#F2D24B",
                fin: "#EBCB55",
                tail: "#F7E06A",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 15:
            // Bicolor Anthias
            colors = {
                body: "#7A2E8E",
                upperBody: "#E6B72E",
                stripe: "#5A1F6B",
                fin: "#B043C6",
                tail: "#B043C6",
                eye: "#1A1A1A",
                eyePupil: "#0A0E12"
            }
            break;
        case 16:
            // Blue Diamond Discus
            colors = {
                body: "#4F8FA8",
                stripe: "#2F3F48",
                fin: "#6FB7C9",
                tail: "#8FD3E0",
                eye: "#E39B2E",
                eyePupil: "#0A0E12"
            }
            break;
        case 17:
            // Orange-red Discus
            colors = {
                body: "#E86A2A",
                stripe: "#B23A1E",
                fin: "#F08A4B",
                tail: "#D45C2C",
                eye: "#F2B13A",
                eyePupil: "#120A08"
            }
            break;
        case 18:
            // Black Neon Tetra
            colors = {
                upperBody: "#C9B56A",
                body: "#E2E5E2",
                stripe: "#1A1E21",
                secondStripe: "#7FAFB6",
                fin: "#B9C0BB",
                tail: "#AEB5B0",
                eye: "#E1A13A",
                eyePupil: "#0C0F12"
            }
            break;
        case 19:
            // Yellow Tang
            colors = {
                body: "#F2C94C",      // rich golden yellow body
                stripe: "#9E8A2B",    // no stripe, but for other fish
                fin: "#D9B43A",       // slightly darker fins for visibility
                tail: "#CFAF34",      // denser tail
                eye: "#1B1F22",       // dark eye
                eyePupil: "#0B0F14",  // deep black pupil
                accent: "#E07A1F"     // subtle orange accent (scalpel / depth hint)
            }
            break;
        default:
            colors = {
                body: "#FF6347",
                stripe: "#FF4500",
                fin: "#FFD700",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            };
            break;
    }

    colors.upperBody = colors.upperBody ?? null;
    colors.tail = colors.tail ?? colors.fin;
    colors.eye = colors.eye ?? "#1A1F24";
    colors.eyePupil = colors.eyePupil ?? "#0A0E12";
    colors.secondStripe = colors.secondStripe ?? null;
    colors.stripeOutline = colors.stripeOutline ?? null;

    return colors;
}

