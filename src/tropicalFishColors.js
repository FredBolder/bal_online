export function getTropicalFishColor(palette) {
    let colors = null;

    switch (palette) {
        case 2:
            colors = {
                body: "#FFD94A",
                stripe: "#FF8C00",
                fin: "#3E8E41",
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
                fin: "#5FA6C0",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 6:
            colors = {
                body: "#C9D6DF",
                stripe: "#5F6F7A",
                fin: "#AEBFCB",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 7:
            colors = {
                body: "#1F5F8B",
                stripe: "#0B2F4A",
                fin: "#174C70",
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
        case 22:
            colors = {
                body: "#E66A2C",
                stripe: "#9E3A1E",
                fin: "#C85A26",
                tail: "#F08A4B",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 23:
            colors = {
                body: "#D9C94A",
                stripe: "#8A7A1F",
                fin: "#B0A33A",
                tail: "#E8D85C",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 24:
            colors = {
                body: "#7A3F9E",
                stripe: "#4F2668",
                fin: "#62307F",
                tail: "#8A52B0",
                eye: "#1A1A1A",
                eyePupil: "#0A0E12"
            }
            break;
        case 25:
            colors = {
                body: "#BFCAD2",
                stripe: "#6A7A85",
                fin: "#9FAEB8",
                tail: "#C9D6DF",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }

            break;
        case 26:
            colors = {
                body: "#1F4E6E",
                stripe: "#0F2F45",
                fin: "#163A54",
                tail: "#2F6A8C",
                eye: "#0E1418",
                eyePupil: "#0A0E12"
            }
            break;
        case 27:
            colors = {
                body: "#C43C3C",
                stripe: "#F2C94C",
                fin: "#9E2E2E",
                tail: "#D95C69",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 28:
            colors = {
                upperBody: "#1F4E6E",
                body: "#4F8FA8",
                stripe: "#2F3F48",
                fin: "#3F7488",
                tail: "#5FA2B5",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 29:
            colors = {
                upperBody: "#C45A2A",
                body: "#E89A6A",
                stripe: "#9E3A1E",
                fin: "#C27648",
                tail: "#F0B080",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 30:
            colors = {
                upperBody: "#9E8F2A",
                body: "#D9C94A",
                stripe: "#6F621F",
                fin: "#B0A33A",
                tail: "#E8D85C",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 31:
            colors = {
                upperBody: "#5A1F6B",
                body: "#8A4FA0",
                stripe: "#3F154F",
                fin: "#6A3A80",
                tail: "#9E6BB8",
                eye: "#1A1A1A",
                eyePupil: "#0A0E12"
            }
            break;
        case 32:
            colors = {
                upperBody: "#9FAEB8",
                body: "#C9D6DF",
                stripe: "#6A7A85",
                fin: "#AEBFCB",
                tail: "#D7E1E7",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        case 33:
            colors = {
                upperBody: "#8A2E2E",
                body: "#C43C3C",
                stripe: "#F2C94C",
                fin: "#9E2E2E",
                tail: "#D95C69",
                eye: "#1A1F24",
                eyePupil: "#0A0E12"
            }
            break;
        default:
            colors = {
                body: "#FF6347",
                stripe: "#FF4500",
                fin: "#E6B800",
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

