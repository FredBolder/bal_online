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
                fin: "#E0B93A",
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
                fin: "#D9A92E",
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
                fin: "#E67818",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 9:
            // Red Tail shark
            colors = {
                body: "#2B2B2B",
                stripe: "#1F1F1F",
                fin: "#3A3A3A",
                tail: "#C93636",
                eye: "#1A1A1A",
                eyePupil: "#0A0E12"
            }
            break;
        case 10:
            // Yellow Tail Acei Cichlid
            colors = {
                body: "#7294B2",
                stripe: "#4F6D8D",
                fin: "#E3D44A",
                tail: "#EAE041",
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
                fin: "#182F78",
                tail: "#F2CC3A",
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
                body: "#75808A",
                stripe: "#D8BF48",
                fin: "#D9C255",
                tail: "#E5D46A",
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
                fin: "#8F329E",
                tail: "#9538A4",
                eye: "#1A1A1A",
                eyePupil: "#0A0E12"
            }
            break;
        case 16:
            // Blue Diamond Discus
            colors = {
                body: "#4F8FA8",
                stripe: "#2F3F48",
                fin: "#456F82",
                tail: "#5A98AA",
                eye: "#E39B2E",
                eyePupil: "#0A0E12"
            }
            break;
        case 17:
            // Orange-red Discus
            colors = {
                body: "#E86A2A",
                stripe: "#B23A1E",
                fin: "#E07A40",
                tail: "#EA8A52",
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
                body: "#F2C94C",
                stripe: "#9E8A2B",
                fin: "#D9B43A",
                tail: "#CFAF34",
                barb: "#F2F2F2",
                eye: "#1B1F22",
                eyePupil: "#0B0F14",
            }
            break;
        case 20:
            // Purple Tang
            colors = {
                body: "#5B2D8B",
                stripe: "#4A256F",
                fin: "#4F277E",
                tail: "#F2C94C",
                barb: "#DAD3C6",
                eye: "#1A1A1A",
                eyePupil: "#000000",
            }
            break;
        case 21:
            // Brigham’s snapper or Gindai
            colors = {
                body: "#E76F7D",
                stripe: "#F9D342",
                fin: "#CF5A66",
                upperFin: "#EFBF4A",
                tail: "#F2C94C",
                upperTail: "#E8B777",
                eye: "#2A2A2A",
                eyePupil: "#050505",
            };
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
    colors.upperFin = colors.upperFin ?? colors.fin;
    colors.tail = colors.tail ?? colors.fin;
    colors.upperTail = colors.upperTail ?? null;
    colors.barb = colors.barb ?? "#F2F2F2";
    colors.eye = colors.eye ?? "#1A1F24";
    colors.eyePupil = colors.eyePupil ?? "#0A0E12";
    colors.secondStripe = colors.secondStripe ?? null;
    colors.stripeOutline = colors.stripeOutline ?? null;

    return colors;
}

